import type {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { createAdminAuthGuard, getAdminActor } from "../lib/admin-auth.js";
import type { AccountService } from "../services/account-service.js";
import type { AuditService } from "../services/audit-service.js";
import type { NotificationService } from "../services/notification-service.js";
import {
  type CreateOrderInput,
  type Order,
  OrderError,
  type OrderService,
  type PublicOrderStatus,
} from "../services/order-service.js";
import {
  PaymentError,
  type PaymentService,
} from "../services/payment-service.js";

interface OrderRouteOptions {
  accountService?: AccountService;
  adminApiToken?: string;
  auditService: AuditService;
  notificationService: NotificationService;
  orderService: OrderService;
  paymentService: PaymentService;
}

const orderStatuses = [
  "pending_payment",
  "paid",
  "confirmed",
  "preparing",
  "ready",
  "completed",
  "cancelled",
] as const;

const createOrderSchema = {
  body: {
    type: "object",
    required: ["customer", "items", "fulfillment"],
    additionalProperties: false,
    properties: {
      customer: {
        type: "object",
        required: ["name", "phone"],
        additionalProperties: false,
        properties: {
          name: { type: "string", minLength: 1, maxLength: 120 },
          phone: { type: "string", minLength: 6, maxLength: 40 },
          email: { type: "string", maxLength: 160 },
        },
      },
      items: {
        type: "array",
        minItems: 1,
        maxItems: 50,
        items: {
          type: "object",
          required: ["menuItemId", "quantity"],
          additionalProperties: false,
          properties: {
            menuItemId: { type: "string", minLength: 1, maxLength: 160 },
            quantity: { type: "integer", minimum: 1, maximum: 50 },
            notes: { type: "string", maxLength: 500 },
          },
        },
      },
      fulfillment: {
        type: "object",
        required: ["type"],
        additionalProperties: false,
        properties: {
          type: { type: "string", enum: ["pickup", "delivery", "dine-in"] },
          requestedAt: { type: "string", maxLength: 80 },
          address: { type: "string", maxLength: 500 },
        },
      },
      notes: { type: "string", maxLength: 1000 },
    },
  },
} as const;

const orderIdParamsSchema = {
  params: {
    type: "object",
    required: ["id"],
    additionalProperties: false,
    properties: {
      id: { type: "string", minLength: 1 },
    },
  },
} as const;

const updateStatusSchema = {
  ...orderIdParamsSchema,
  body: {
    type: "object",
    required: ["status"],
    additionalProperties: false,
    properties: {
      status: { type: "string", enum: orderStatuses },
    },
  },
} as const;

const stripeWebhookSchema = {
  body: {
    type: "object",
    required: ["type", "data"],
    additionalProperties: true,
    properties: {
      id: { type: "string" },
      type: { type: "string" },
      data: { type: "object" },
    },
  },
} as const;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimitPublicWrites(max = 10, windowMs = 60_000) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const now = Date.now();
    const current = hits.get(request.ip);
    const next =
      current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + windowMs };
    hits.set(request.ip, next);

    if (next.count > max) {
      return reply.code(429).send({
        error: "RATE_LIMITED",
        message: "Too many order requests. Please try again shortly.",
      });
    }
  };
}

function sendOrderError(reply: FastifyReply, error: unknown) {
  if (error instanceof OrderError) {
    if (error.code === "NOT_FOUND") {
      return reply.code(404).send({
        error: "ORDER_NOT_FOUND",
        message: "Order was not found.",
      });
    }
    if (error.code === "MENU_ITEM_NOT_FOUND") {
      return reply.code(400).send({
        error: "MENU_ITEM_NOT_FOUND",
        message: "One or more menu items are unavailable.",
      });
    }
    return reply.code(400).send({
      error: "INVALID_ORDER",
      message: "Please check your order details and try again.",
    });
  }

  if (error instanceof PaymentError) {
    if (error.code === "PAYMENT_NOT_CONFIGURED") {
      return reply.code(503).send({
        error: "PAYMENT_NOT_CONFIGURED",
        message: "Online payment is not configured yet.",
      });
    }
    if (error.code === "UNSUPPORTED_EVENT") {
      return reply.code(200).send({ received: true, ignored: true });
    }
    return reply.code(400).send({
      error: "INVALID_PAYMENT_WEBHOOK",
      message: "Stripe webhook payload could not be verified.",
    });
  }

  throw error;
}

function tokenFromHeader(value: string | undefined) {
  return value?.startsWith("Bearer ") ? value.slice("Bearer ".length) : "";
}

function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatOrder(order: Order) {
  const items = order.items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(", ");
  return `${order.customerName}, ${formatMoney(order.totalCents)}, ${items}`;
}

async function sendWithRetry(
  label: string,
  send: () => Promise<void>,
  log: FastifyBaseLogger,
) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      await send();
      return;
    } catch (error) {
      log.error({ error, label, attempt }, "Order notification failed");
    }
  }
}

async function notifyOrderCreated(
  order: Order,
  notificationService: NotificationService,
  log: FastifyBaseLogger,
) {
  const summary = formatOrder(order);
  if (order.email) {
    await sendWithRetry(
      "order.customer.email",
      () =>
        notificationService.sendEmail({
          to: order.email as string,
          subject: "We received your Tandoori Corner order",
          text: `Thanks ${order.customerName}. We received your order and are waiting for payment confirmation: ${summary}.`,
        }),
      log,
    );
  }
  await sendWithRetry(
    "order.customer.whatsapp",
    () =>
      notificationService.sendWhatsApp({
        to: order.phone,
        text: `Tandoori Corner received your order and is waiting for payment confirmation: ${summary}.`,
      }),
    log,
  );
}

async function notifyOrderPaid(
  order: Order,
  notificationService: NotificationService,
  log: FastifyBaseLogger,
) {
  const summary = formatOrder(order);
  if (order.email) {
    await sendWithRetry(
      "order.paid.email",
      () =>
        notificationService.sendEmail({
          to: order.email as string,
          subject: "Your Tandoori Corner order is confirmed",
          text: `Payment is confirmed for your order: ${summary}. We will keep you posted as it moves through the kitchen.`,
        }),
      log,
    );
  }
  await sendWithRetry(
    "order.paid.whatsapp",
    () =>
      notificationService.sendWhatsApp({
        to: order.phone,
        text: `Payment confirmed for your Tandoori Corner order: ${summary}.`,
      }),
    log,
  );
}

async function notifyStatusChanged(
  order: Order,
  notificationService: NotificationService,
  log: FastifyBaseLogger,
) {
  if (order.email) {
    await sendWithRetry(
      "order.status.email",
      () =>
        notificationService.sendEmail({
          to: order.email as string,
          subject: `Your Tandoori Corner order is ${order.status}`,
          text: `Your order is now ${order.status}: ${formatOrder(order)}.`,
        }),
      log,
    );
  }
}

export async function registerOrderRoutes(
  app: FastifyInstance,
  options: OrderRouteOptions,
) {
  const requireAdmin = createAdminAuthGuard(options.adminApiToken);

  app.post(
    "/",
    { schema: createOrderSchema, preHandler: rateLimitPublicWrites() },
    async (request, reply) => {
      try {
        const body = request.body as CreateOrderInput;
        const token = tokenFromHeader(request.headers.authorization);
        const account = token
          ? await options.accountService
              ?.getAccountByToken(token)
              .catch(() => undefined)
          : undefined;
        const customer =
          account?.customer ??
          (await options.accountService?.linkCustomer({
            name: body.customer.name,
            email: body.customer.email,
            phone: body.customer.phone,
          }));
        let order = await options.orderService.createOrder({
          ...body,
          customerId: customer?.id,
        });
        await options.auditService.record({
          actor: "customer",
          action: "create",
          entityType: "order",
          entityId: order.id,
          after: order,
        });
        const payment = await options.paymentService.createPaymentIntent(order);
        const beforePayment = order;
        order = await options.orderService.setPaymentIntent(
          order.id,
          payment.paymentIntentId,
        );
        await options.auditService.record({
          actor: "system",
          action: "attachPaymentIntent",
          entityType: "order",
          entityId: order.id,
          before: beforePayment,
          after: order,
        });
        await notifyOrderCreated(
          order,
          options.notificationService,
          request.log,
        );
        return reply.code(201).send({ order, payment });
      } catch (error) {
        return sendOrderError(reply, error);
      }
    },
  );

  app.post(
    "/webhook/stripe",
    { schema: stripeWebhookSchema },
    async (request, reply) => {
      try {
        const event = await options.paymentService.parseWebhook({
          parsedBody: request.body,
          rawBody: request.rawBody,
          signature: request.headers["stripe-signature"] as string | undefined,
        });
        const before = await options.orderService.getOrderByPaymentIntent(
          event.paymentIntentId,
        );
        const order =
          event.type === "payment_intent.succeeded"
            ? await options.orderService.markPaymentPaid(event.paymentIntentId)
            : await options.orderService.markPaymentFailed(
                event.paymentIntentId,
              );
        await options.auditService.record({
          actor: "stripe",
          action: event.type,
          entityType: "order",
          entityId: order.id,
          before,
          after: order,
        });
        if (event.type === "payment_intent.succeeded") {
          await notifyOrderPaid(
            order,
            options.notificationService,
            request.log,
          );
        }
        return reply.send({ received: true });
      } catch (error) {
        return sendOrderError(reply, error);
      }
    },
  );

  app.get("/", { preHandler: requireAdmin }, async () => ({
    orders: await options.orderService.listOrders(),
  }));

  app.get(
    "/:id",
    { schema: orderIdParamsSchema, preHandler: requireAdmin },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const order = await options.orderService.getOrder(id);
      if (!order) return sendOrderError(reply, new OrderError("NOT_FOUND"));
      return { order };
    },
  );

  app.patch(
    "/:id/status",
    { schema: updateStatusSchema, preHandler: requireAdmin },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { status } = request.body as { status: PublicOrderStatus };
      const before = await options.orderService.getOrder(id);
      try {
        const order = await options.orderService.updateOrderStatus(id, {
          status,
        });
        await options.auditService.record({
          actor: getAdminActor(request),
          action: "updateStatus",
          entityType: "order",
          entityId: order.id,
          before,
          after: order,
        });
        await notifyStatusChanged(
          order,
          options.notificationService,
          request.log,
        );
        return reply.send({ order });
      } catch (error) {
        return sendOrderError(reply, error);
      }
    },
  );
}
