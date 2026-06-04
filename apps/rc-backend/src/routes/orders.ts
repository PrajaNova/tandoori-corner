import type { FastifyInstance } from "fastify";

import type { CatalogService } from "../services/catalog-service.js";
import type {
  CreateOrderInput,
  OrderService,
} from "../services/order-service.js";

interface OrderRouteOptions {
  catalogService: CatalogService;
  orderService: OrderService;
}

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
          name: { type: "string", minLength: 1 },
          phone: { type: "string", minLength: 6 },
          email: { type: "string" },
        },
      },
      items: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          required: ["menuItemId", "quantity"],
          additionalProperties: false,
          properties: {
            menuItemId: { type: "string", minLength: 1 },
            quantity: { type: "integer", minimum: 1 },
            notes: { type: "string" },
          },
        },
      },
      fulfillment: {
        type: "object",
        required: ["type"],
        additionalProperties: false,
        properties: {
          type: { type: "string", enum: ["pickup", "delivery", "dine-in"] },
          requestedAt: { type: "string" },
          address: { type: "string" },
        },
      },
      notes: { type: "string" },
    },
  },
} as const;

export async function registerOrderRoutes(
  app: FastifyInstance,
  { catalogService, orderService }: OrderRouteOptions,
) {
  app.post("/", { schema: createOrderSchema }, async (request, reply) => {
    const input = request.body as CreateOrderInput;

    for (const item of input.items) {
      const found = await catalogService.getItem(item.menuItemId);
      if (!found) {
        return reply.code(400).send({
          error: "MENU_ITEM_NOT_FOUND",
          message: `Menu item ${item.menuItemId} was not found.`,
        });
      }
    }

    const order = orderService.create(input);

    return reply.code(201).send({
      order,
    });
  });

  app.get("/:orderId", async (request, reply) => {
    const { orderId } = request.params as { orderId: string };
    const order = orderService.get(orderId);

    if (!order) {
      return reply.code(404).send({
        error: "ORDER_NOT_FOUND",
        message: "Order was not found.",
      });
    }

    return {
      order,
    };
  });
}
