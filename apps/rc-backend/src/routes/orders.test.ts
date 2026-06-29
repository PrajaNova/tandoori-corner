import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { buildApp } from "../app.js";
import {
  type AuditEntry,
  createMemoryAuditService,
} from "../services/audit-service.js";
import { createMemoryBookingService } from "../services/booking-service.js";
import { createMemoryCatalogService } from "../services/catalog-service.js";
import { createMemoryEventEnquiryService } from "../services/event-enquiry-service.js";
import { createMemoryMenuService } from "../services/menu-service.js";
import type {
  EmailMessage,
  WhatsAppMessage,
} from "../services/notification-service.js";
import { createMemoryOrderService } from "../services/order-service.js";
import { createMemoryPaymentService } from "../services/payment-service.js";

const adminToken = "test-admin-token";
const adminHeaders = {
  authorization: `Bearer ${adminToken}`,
  "x-admin-user": "test-admin",
};

const orderPayload = {
  customer: {
    name: "Asha Rao",
    email: "asha@example.com",
    phone: "+6590000000",
  },
  fulfillment: {
    type: "delivery",
    address: "123 Balestier Road",
  },
  items: [
    {
      menuItemId: "item_og_butter_chicken",
      quantity: 2,
    },
  ],
};

async function buildTestApp(
  auditEntries: AuditEntry[] = [],
  sent: Array<EmailMessage | WhatsAppMessage> = [],
) {
  const catalogService = createMemoryCatalogService();
  return buildApp({
    adminApiToken: adminToken,
    auditService: createMemoryAuditService(auditEntries),
    bookingService: createMemoryBookingService(),
    catalogService,
    eventEnquiryService: createMemoryEventEnquiryService(),
    menuService: createMemoryMenuService([]),
    notificationService: {
      sendEmail: async (message) => {
        sent.push(message);
      },
      sendWhatsApp: async (message) => {
        sent.push(message);
      },
    },
    orderService: createMemoryOrderService(catalogService),
    paymentService: createMemoryPaymentService(),
  });
}

describe("order routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("creates an order, payment intent, audit log, and notifications", async () => {
    const auditEntries: AuditEntry[] = [];
    const sent: Array<EmailMessage | WhatsAppMessage> = [];
    app = await buildTestApp(auditEntries, sent);

    const response = await app.inject({
      method: "POST",
      url: "/api/orders",
      payload: orderPayload,
    });

    assert.equal(response.statusCode, 201);
    assert.equal(response.json().order.customerName, "Asha Rao");
    assert.equal(response.json().order.totalCents, 5296);
    assert.equal(response.json().payment.provider, "stripe");
    assert.equal(auditEntries[0].entityType, "order");
    assert.equal(auditEntries[0].action, "create");
    assert.equal(sent.length, 2);
  });

  it("requires admin auth to list orders", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/orders",
    });
    assert.equal(response.statusCode, 401);
  });

  it("updates order status and audit logs the change", async () => {
    const auditEntries: AuditEntry[] = [];
    app = await buildTestApp(auditEntries);
    const create = await app.inject({
      method: "POST",
      url: "/api/orders",
      payload: orderPayload,
    });
    const id = create.json().order.id;

    const update = await app.inject({
      method: "PATCH",
      url: `/api/orders/${id}/status`,
      headers: adminHeaders,
      payload: { status: "preparing" },
    });

    assert.equal(update.statusCode, 200);
    assert.equal(update.json().order.status, "preparing");
    assert.equal(auditEntries.at(-1)?.action, "updateStatus");
    assert.equal(auditEntries.at(-1)?.actor, "test-admin");
  });

  it("marks an order paid from a Stripe webhook", async () => {
    const auditEntries: AuditEntry[] = [];
    const sent: Array<EmailMessage | WhatsAppMessage> = [];
    app = await buildTestApp(auditEntries, sent);
    const create = await app.inject({
      method: "POST",
      url: "/api/orders",
      payload: orderPayload,
    });
    const paymentIntentId = create.json().payment.paymentIntentId;

    const webhook = await app.inject({
      method: "POST",
      url: "/api/orders/webhook/stripe",
      payload: {
        id: "evt_test",
        type: "payment_intent.succeeded",
        data: { object: { id: paymentIntentId } },
      },
    });

    assert.equal(webhook.statusCode, 200);
    assert.equal(webhook.json().received, true);
    assert.equal(auditEntries.at(-1)?.action, "payment_intent.succeeded");
    assert.equal(sent.length, 4);
  });
});
