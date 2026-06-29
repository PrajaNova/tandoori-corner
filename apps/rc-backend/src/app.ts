import cors from "@fastify/cors";
import Fastify from "fastify";

import { getConfig } from "./config.js";
import type { PrismaClient } from "./generated/prisma/client.js";
import { registerErrorHandler } from "./lib/error-handler.js";
import { createPrismaClient } from "./lib/prisma.js";
import { registerBookingRoutes } from "./routes/bookings.js";
import { registerCatalogRoutes } from "./routes/catalog.js";
import { registerCateringRoutes } from "./routes/catering.js";
import { registerEventEnquiryRoutes } from "./routes/event-enquiries.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerMenuRoutes } from "./routes/menu.js";
import { registerOrderRoutes } from "./routes/orders.js";
import {
  type AuditService,
  createNullAuditService,
  createPrismaAuditService,
} from "./services/audit-service.js";
import {
  type BookingService,
  createPrismaBookingService,
} from "./services/booking-service.js";
import {
  type CatalogService,
  createPrismaCatalogService,
} from "./services/catalog-service.js";
import {
  type CateringService,
  createPrismaCateringService,
} from "./services/catering-service.js";
import {
  createPrismaEventEnquiryService,
  type EventEnquiryService,
} from "./services/event-enquiry-service.js";
import {
  createPrismaMenuService,
  type MenuService,
} from "./services/menu-service.js";
import {
  createProviderNotificationService,
  type NotificationService,
} from "./services/notification-service.js";
import {
  createPrismaOrderService,
  type OrderService,
} from "./services/order-service.js";
import {
  createStripePaymentService,
  type PaymentService,
} from "./services/payment-service.js";

interface AppDependencies {
  adminApiToken?: string;
  auditService?: AuditService;
  bookingService?: BookingService;
  catalogService?: CatalogService;
  cateringService?: CateringService;
  eventEnquiryService?: EventEnquiryService;
  menuService?: MenuService;
  notificationService?: NotificationService;
  orderService?: OrderService;
  paymentService?: PaymentService;
  prisma?: PrismaClient;
}

declare module "fastify" {
  interface FastifyRequest {
    rawBody?: string;
  }
}

export async function buildApp(dependencies: AppDependencies = {}) {
  const config = getConfig();
  const app = Fastify({
    logger: true,
  });
  app.removeContentTypeParser("application/json");
  app.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    (request, body, done) => {
      const rawBody = body.toString();
      request.rawBody = rawBody;
      try {
        done(null, JSON.parse(rawBody));
      } catch (error) {
        done(error as Error);
      }
    },
  );
  registerErrorHandler(app);

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
  const menuService =
    dependencies.menuService ?? createPrismaMenuService(prisma as PrismaClient);
  const bookingService =
    dependencies.bookingService ??
    createPrismaBookingService(prisma as PrismaClient);
  const eventEnquiryService =
    dependencies.eventEnquiryService ??
    createPrismaEventEnquiryService(prisma as PrismaClient);
  const orderService =
    dependencies.orderService ??
    createPrismaOrderService(prisma as PrismaClient, catalogService);
  const paymentService =
    dependencies.paymentService ??
    createStripePaymentService({
      currency: config.stripeCurrency,
      stripeSecretKey: config.stripeSecretKey,
      stripeWebhookSecret: config.stripeWebhookSecret,
    });
  const auditService =
    dependencies.auditService ??
    (prisma ? createPrismaAuditService(prisma) : createNullAuditService());
  const notificationService =
    dependencies.notificationService ??
    createProviderNotificationService({
      brevoApiKey: config.brevoApiKey,
      brevoFromEmail: config.brevoFromEmail,
      metaGraphApiVersion: config.metaGraphApiVersion,
      whatsAppAccessToken: config.whatsAppAccessToken,
      whatsAppPhoneNumberId: config.whatsAppPhoneNumberId,
    });

  if (prisma && !dependencies.prisma) {
    app.addHook("onClose", async () => {
      await prisma.$disconnect();
    });
  }

  await app.register(registerHealthRoutes);
  await app.register(registerCatalogRoutes, {
    prefix: "/api/catalog",
    adminApiToken: dependencies.adminApiToken ?? config.adminApiToken,
    auditService,
    catalogService,
  });
  await app.register(registerMenuRoutes, {
    prefix: "/api/menu",
    adminApiToken: dependencies.adminApiToken ?? config.adminApiToken,
    auditService,
    menuService,
  });
  await app.register(registerCateringRoutes, {
    prefix: "/api/catering",
    cateringService,
  });
  await app.register(registerBookingRoutes, {
    prefix: "/api/bookings",
    adminApiToken: dependencies.adminApiToken ?? config.adminApiToken,
    auditService,
    bookingService,
    notificationService,
    restaurantEmail: config.bookingRestaurantEmail,
    restaurantWhatsApp: config.bookingRestaurantWhatsApp,
  });
  await app.register(registerEventEnquiryRoutes, {
    prefix: "/api/event-enquiries",
    adminApiToken: dependencies.adminApiToken ?? config.adminApiToken,
    auditService,
    eventEnquiryService,
    notificationService,
    restaurantEmail: config.eventRestaurantEmail,
    webhookToken: config.eventWebhookToken,
  });
  await app.register(registerOrderRoutes, {
    prefix: "/api/orders",
    adminApiToken: dependencies.adminApiToken ?? config.adminApiToken,
    auditService,
    notificationService,
    orderService,
    paymentService,
  });

  return app;
}
