import cors from "@fastify/cors";
import Fastify from "fastify";

import { getConfig } from "./config.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerMenuRoutes } from "./routes/menu.js";
import { registerOrderRoutes } from "./routes/orders.js";
import { createMenuService } from "./services/menu-service.js";
import { createOrderService } from "./services/order-service.js";

export async function buildApp() {
  const config = getConfig();
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: config.frontendOrigin,
  });

  const menuService = createMenuService();
  const orderService = createOrderService();

  await app.register(registerHealthRoutes);
  await app.register(registerMenuRoutes, {
    prefix: "/api/menu",
    menuService,
  });
  await app.register(registerOrderRoutes, {
    prefix: "/api/orders",
    menuService,
    orderService,
  });

  return app;
}
