import cors from "@fastify/cors";
import Fastify from "fastify";

import { getConfig } from "./config.js";
import type { PrismaClient } from "./generated/prisma/client.js";
import { createPrismaClient } from "./lib/prisma.js";
import { registerCatalogRoutes } from "./routes/catalog.js";
import { registerCateringRoutes } from "./routes/catering.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerMenuRoutes } from "./routes/menu.js";
import { registerOrderRoutes } from "./routes/orders.js";
import {
  type CatalogService,
  createPrismaCatalogService,
} from "./services/catalog-service.js";
import {
  type CateringService,
  createPrismaCateringService,
} from "./services/catering-service.js";
import {
  createOrderService,
  type OrderService,
} from "./services/order-service.js";

interface AppDependencies {
  catalogService?: CatalogService;
  cateringService?: CateringService;
  orderService?: OrderService;
  prisma?: PrismaClient;
}

export async function buildApp(dependencies: AppDependencies = {}) {
  const config = getConfig();
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: config.frontendOrigin,
  });

  // Only spin up a Prisma client when a catalog service isn't injected
  // (tests inject an in-memory catalog service and skip the database).
  const prisma =
    dependencies.prisma ??
    (dependencies.catalogService
      ? undefined
      : createPrismaClient(config.databaseUrl));

  const catalogService =
    dependencies.catalogService ??
    createPrismaCatalogService(prisma as PrismaClient);
  const cateringService =
    dependencies.cateringService ??
    createPrismaCateringService(prisma as PrismaClient);
  const orderService = dependencies.orderService ?? createOrderService();

  if (prisma && !dependencies.prisma) {
    app.addHook("onClose", async () => {
      await prisma.$disconnect();
    });
  }

  await app.register(registerHealthRoutes);
  await app.register(registerCatalogRoutes, {
    prefix: "/api/catalog",
    catalogService,
  });
  await app.register(registerMenuRoutes, {
    prefix: "/api/menu",
    catalogService,
  });
  await app.register(registerCateringRoutes, {
    prefix: "/api/catering",
    cateringService,
  });
  await app.register(registerOrderRoutes, {
    prefix: "/api/orders",
    catalogService,
    orderService,
  });

  return app;
}
