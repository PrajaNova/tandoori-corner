import { randomUUID } from "node:crypto";

import type {
  PrismaClient,
  OrderStatus as PrismaOrderStatus,
  PaymentStatus as PrismaPaymentStatus,
} from "../generated/prisma/client.js";
import type { CatalogItem, CatalogService } from "./catalog-service.js";

export type FulfillmentType = "pickup" | "delivery" | "dine-in";
export type PublicOrderStatus =
  | "pending_payment"
  | "paid"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";
export type PublicPaymentStatus =
  | "requires_payment"
  | "paid"
  | "failed"
  | "refunded";

export interface CreateOrderInput {
  customerId?: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  items: Array<{
    menuItemId: string;
    quantity: number;
    notes?: string;
  }>;
  fulfillment: {
    type: FulfillmentType;
    requestedAt?: string;
    address?: string;
  };
  notes?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  notes?: string;
  totalCents: number;
}

export interface Order {
  id: string;
  customerId?: string;
  customerName: string;
  email?: string;
  phone: string;
  fulfillmentType: FulfillmentType;
  requestedAt?: string;
  address?: string;
  notes?: string;
  subtotalCents: number;
  taxCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  currency: "SGD";
  status: PublicOrderStatus;
  paymentStatus: PublicPaymentStatus;
  stripePaymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface UpdateOrderStatusInput {
  status: PublicOrderStatus;
}

export type OrderErrorCode =
  | "NOT_FOUND"
  | "INVALID_ORDER"
  | "MENU_ITEM_NOT_FOUND";

export class OrderError extends Error {
  constructor(public code: OrderErrorCode) {
    super(code);
    this.name = "OrderError";
  }
}

export interface OrderService {
  createOrder: (input: CreateOrderInput) => Promise<Order>;
  listOrders: () => Promise<Order[]>;
  getOrder: (id: string) => Promise<Order | undefined>;
  getOrderByPaymentIntent: (
    paymentIntentId: string,
  ) => Promise<Order | undefined>;
  setPaymentIntent: (id: string, paymentIntentId: string) => Promise<Order>;
  markPaymentFailed: (paymentIntentId: string) => Promise<Order>;
  markPaymentPaid: (paymentIntentId: string) => Promise<Order>;
  updateOrderStatus: (
    id: string,
    input: UpdateOrderStatusInput,
  ) => Promise<Order>;
}

type PrismaOrderClient = Pick<PrismaClient, "order">;

type PrismaOrder = {
  id: string;
  customerId: string | null;
  customerName: string;
  email: string | null;
  phone: string;
  fulfillmentType: string;
  requestedAt: Date | null;
  address: string | null;
  notes: string | null;
  subtotalCents: number;
  taxCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  currency: string;
  status: PrismaOrderStatus;
  paymentStatus: PrismaPaymentStatus;
  stripePaymentIntentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: Array<{
    id: string;
    menuItemId: string;
    name: string;
    unitPriceCents: number;
    quantity: number;
    notes: string | null;
    totalCents: number;
  }>;
};

const orderStatuses = new Set<PublicOrderStatus>([
  "pending_payment",
  "paid",
  "confirmed",
  "preparing",
  "ready",
  "completed",
  "cancelled",
]);

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function cleanOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\s+/g, " ") : undefined;
}

function parseRequestedAt(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new OrderError("INVALID_ORDER");
  return date;
}

function toPublicOrderStatus(
  status: PrismaOrderStatus | PublicOrderStatus,
): PublicOrderStatus {
  return status.toLowerCase() as PublicOrderStatus;
}

function toPrismaOrderStatus(status: PublicOrderStatus): PrismaOrderStatus {
  return status.toUpperCase() as PrismaOrderStatus;
}

function toPublicPaymentStatus(
  status: PrismaPaymentStatus | PublicPaymentStatus,
): PublicPaymentStatus {
  return status.toLowerCase() as PublicPaymentStatus;
}

function mapOrder(order: PrismaOrder): Order {
  return {
    id: order.id,
    customerId: order.customerId ?? undefined,
    customerName: order.customerName,
    email: order.email ?? undefined,
    phone: order.phone,
    fulfillmentType: order.fulfillmentType as FulfillmentType,
    requestedAt: order.requestedAt?.toISOString(),
    address: order.address ?? undefined,
    notes: order.notes ?? undefined,
    subtotalCents: order.subtotalCents,
    taxCents: order.taxCents,
    deliveryFeeCents: order.deliveryFeeCents,
    totalCents: order.totalCents,
    currency: "SGD",
    status: toPublicOrderStatus(order.status),
    paymentStatus: toPublicPaymentStatus(order.paymentStatus),
    stripePaymentIntentId: order.stripePaymentIntentId ?? undefined,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      menuItemId: item.menuItemId,
      name: item.name,
      unitPriceCents: item.unitPriceCents,
      quantity: item.quantity,
      notes: item.notes ?? undefined,
      totalCents: item.totalCents,
    })),
  };
}

function mapMemoryOrder(order: Order): Order {
  return JSON.parse(JSON.stringify(order)) as Order;
}

async function validateAndBuild(
  input: CreateOrderInput,
  catalogService: Pick<CatalogService, "getItem">,
) {
  const customerName = cleanText(input.customer.name);
  const phone = cleanText(input.customer.phone);
  const email = cleanOptional(input.customer.email)?.toLowerCase();
  const address = cleanOptional(input.fulfillment.address);
  const notes = cleanOptional(input.notes);
  const requestedAt = parseRequestedAt(input.fulfillment.requestedAt);

  if (
    customerName.length < 1 ||
    phone.length < 6 ||
    (email && !email.includes("@")) ||
    input.items.length < 1 ||
    (input.fulfillment.type === "delivery" && !address)
  ) {
    throw new OrderError("INVALID_ORDER");
  }

  const items: OrderItem[] = [];
  for (const inputItem of input.items) {
    if (inputItem.quantity < 1 || inputItem.quantity > 50) {
      throw new OrderError("INVALID_ORDER");
    }
    const catalogItem = await catalogService.getItem(inputItem.menuItemId);
    if (!catalogItem || catalogItem.status === "inactive") {
      throw new OrderError("MENU_ITEM_NOT_FOUND");
    }
    items.push(toOrderItem(catalogItem, inputItem.quantity, inputItem.notes));
  }

  const subtotalCents = items.reduce((sum, item) => sum + item.totalCents, 0);
  const deliveryFeeCents = input.fulfillment.type === "delivery" ? 500 : 0;
  const taxCents = Math.round(subtotalCents * 0.09);

  return {
    customerName,
    email,
    phone,
    fulfillmentType: input.fulfillment.type,
    requestedAt,
    address,
    notes,
    subtotalCents,
    taxCents,
    deliveryFeeCents,
    totalCents: subtotalCents + taxCents + deliveryFeeCents,
    currency: "SGD" as const,
    items,
  };
}

function toOrderItem(
  catalogItem: CatalogItem,
  quantity: number,
  notes?: string,
): OrderItem {
  return {
    id: `order_item_${randomUUID()}`,
    menuItemId: catalogItem.id,
    name: catalogItem.name,
    unitPriceCents: catalogItem.priceCents,
    quantity,
    notes: cleanOptional(notes),
    totalCents: catalogItem.priceCents * quantity,
  };
}

function sortOrders(orders: Order[]) {
  return [...orders].sort((first, second) =>
    first.createdAt < second.createdAt ? 1 : -1,
  );
}

export function createMemoryOrderService(
  catalogService: Pick<CatalogService, "getItem">,
  seed: Order[] = [],
): OrderService {
  const orders = [...seed].map(mapMemoryOrder);

  return {
    createOrder: async (input) => {
      const data = await validateAndBuild(input, catalogService);
      const now = new Date().toISOString();
      const order: Order = {
        id: `order_${randomUUID()}`,
        customerId: input.customerId,
        ...data,
        requestedAt: data.requestedAt?.toISOString(),
        status: "pending_payment",
        paymentStatus: "requires_payment",
        createdAt: now,
        updatedAt: now,
      };
      orders.push(order);
      return mapMemoryOrder(order);
    },
    listOrders: async () => sortOrders(orders).map(mapMemoryOrder),
    getOrder: async (id) => {
      const order = orders.find((candidate) => candidate.id === id);
      return order ? mapMemoryOrder(order) : undefined;
    },
    getOrderByPaymentIntent: async (paymentIntentId) => {
      const order = orders.find(
        (candidate) => candidate.stripePaymentIntentId === paymentIntentId,
      );
      return order ? mapMemoryOrder(order) : undefined;
    },
    setPaymentIntent: async (id, paymentIntentId) => {
      const order = orders.find((candidate) => candidate.id === id);
      if (!order) throw new OrderError("NOT_FOUND");
      order.stripePaymentIntentId = paymentIntentId;
      order.updatedAt = new Date().toISOString();
      return mapMemoryOrder(order);
    },
    markPaymentFailed: async (paymentIntentId) => {
      const order = orders.find(
        (candidate) => candidate.stripePaymentIntentId === paymentIntentId,
      );
      if (!order) throw new OrderError("NOT_FOUND");
      order.paymentStatus = "failed";
      order.updatedAt = new Date().toISOString();
      return mapMemoryOrder(order);
    },
    markPaymentPaid: async (paymentIntentId) => {
      const order = orders.find(
        (candidate) => candidate.stripePaymentIntentId === paymentIntentId,
      );
      if (!order) throw new OrderError("NOT_FOUND");
      order.status = "paid";
      order.paymentStatus = "paid";
      order.updatedAt = new Date().toISOString();
      return mapMemoryOrder(order);
    },
    updateOrderStatus: async (id, input) => {
      if (!orderStatuses.has(input.status))
        throw new OrderError("INVALID_ORDER");
      const order = orders.find((candidate) => candidate.id === id);
      if (!order) throw new OrderError("NOT_FOUND");
      order.status = input.status;
      order.updatedAt = new Date().toISOString();
      return mapMemoryOrder(order);
    },
  };
}

export function createPrismaOrderService(
  prisma: PrismaOrderClient,
  catalogService: Pick<CatalogService, "getItem">,
): OrderService {
  const includeItems = { items: { orderBy: { id: "asc" as const } } };

  return {
    createOrder: async (input) => {
      const data = await validateAndBuild(input, catalogService);
      const order = await prisma.order.create({
        data: {
          customerId: input.customerId,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          fulfillmentType: data.fulfillmentType,
          requestedAt: data.requestedAt,
          address: data.address,
          notes: data.notes,
          subtotalCents: data.subtotalCents,
          taxCents: data.taxCents,
          deliveryFeeCents: data.deliveryFeeCents,
          totalCents: data.totalCents,
          currency: data.currency,
          items: {
            create: data.items.map((item) => ({
              menuItemId: item.menuItemId,
              name: item.name,
              unitPriceCents: item.unitPriceCents,
              quantity: item.quantity,
              notes: item.notes,
              totalCents: item.totalCents,
            })),
          },
        },
        include: includeItems,
      });
      return mapOrder(order);
    },
    listOrders: async () => {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: includeItems,
      });
      return orders.map(mapOrder);
    },
    getOrder: async (id) => {
      const order = await prisma.order.findUnique({
        where: { id },
        include: includeItems,
      });
      return order ? mapOrder(order) : undefined;
    },
    getOrderByPaymentIntent: async (paymentIntentId) => {
      const order = await prisma.order.findUnique({
        where: { stripePaymentIntentId: paymentIntentId },
        include: includeItems,
      });
      return order ? mapOrder(order) : undefined;
    },
    setPaymentIntent: async (id, paymentIntentId) => {
      try {
        const order = await prisma.order.update({
          where: { id },
          data: { stripePaymentIntentId: paymentIntentId },
          include: includeItems,
        });
        return mapOrder(order);
      } catch {
        throw new OrderError("NOT_FOUND");
      }
    },
    markPaymentFailed: async (paymentIntentId) => {
      try {
        const order = await prisma.order.update({
          where: { stripePaymentIntentId: paymentIntentId },
          data: { paymentStatus: "FAILED" },
          include: includeItems,
        });
        return mapOrder(order);
      } catch {
        throw new OrderError("NOT_FOUND");
      }
    },
    markPaymentPaid: async (paymentIntentId) => {
      try {
        const order = await prisma.order.update({
          where: { stripePaymentIntentId: paymentIntentId },
          data: { paymentStatus: "PAID", status: "PAID" },
          include: includeItems,
        });
        return mapOrder(order);
      } catch {
        throw new OrderError("NOT_FOUND");
      }
    },
    updateOrderStatus: async (id, input) => {
      if (!orderStatuses.has(input.status))
        throw new OrderError("INVALID_ORDER");
      try {
        const order = await prisma.order.update({
          where: { id },
          data: { status: toPrismaOrderStatus(input.status) },
          include: includeItems,
        });
        return mapOrder(order);
      } catch {
        throw new OrderError("NOT_FOUND");
      }
    },
  };
}
