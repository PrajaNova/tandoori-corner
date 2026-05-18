export interface CreateOrderInput {
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
    type: "pickup" | "delivery" | "dine-in";
    requestedAt?: string;
    address?: string;
  };
  notes?: string;
}

export interface Order extends CreateOrderInput {
  id: string;
  status: "received" | "confirmed" | "preparing" | "ready" | "completed";
  createdAt: string;
}

export interface OrderService {
  create: (input: CreateOrderInput) => Order;
  get: (id: string) => Order | undefined;
}

export function createOrderService(): OrderService {
  const orders = new Map<string, Order>();

  return {
    create: (input) => {
      const id = `ord_${crypto.randomUUID()}`;
      const order: Order = {
        ...input,
        id,
        status: "received",
        createdAt: new Date().toISOString(),
      };

      orders.set(id, order);

      return order;
    },
    get: (id) => orders.get(id),
  };
}
