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
import type { EmailMessage } from "../services/notification-service.js";
import { createMemoryOrderService } from "../services/order-service.js";
import { createMemoryPaymentService } from "../services/payment-service.js";

const adminToken = "test-admin-token";
const webhookToken = "test-webhook-token";
const adminHeaders = {
  authorization: `Bearer ${adminToken}`,
  "x-admin-user": "test-admin",
};

const payload = {
  name: "Priya Sharma",
  email: "priya@example.com",
  phone: "+6590000000",
  eventType: "Birthday / Milestone",
  guests: 40,
  date: "2026-07-20",
  notes: "Cocktail style",
};

async function buildTestApp(
  auditEntries: AuditEntry[] = [],
  sent: EmailMessage[] = [],
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
      sendWhatsApp: async () => {},
    },
    orderService: createMemoryOrderService(catalogService),
    paymentService: createMemoryPaymentService(),
  });
}

describe("event enquiry routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("creates an enquiry, audit log, and email notification", async () => {
    const auditEntries: AuditEntry[] = [];
    const sent: EmailMessage[] = [];
    app = await buildTestApp(auditEntries, sent);

    const response = await app.inject({
      method: "POST",
      url: "/api/event-enquiries",
      payload,
    });

    assert.equal(response.statusCode, 201);
    assert.equal(response.json().enquiry.customerName, "Priya Sharma");
    assert.equal(auditEntries[0].entityType, "eventEnquiry");
    assert.equal(auditEntries[0].action, "create");
    assert.equal(sent.length, 1);
  });

  it("requires admin auth to list enquiries", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/event-enquiries",
    });
    assert.equal(response.statusCode, 401);
  });

  it("requires webhook auth", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/event-enquiries/webhook",
      payload,
    });
    assert.equal(response.statusCode, 503);
  });

  it("accepts configured webhook intake", async () => {
    const previous = process.env.EVENT_WEBHOOK_TOKEN;
    process.env.EVENT_WEBHOOK_TOKEN = webhookToken;
    try {
      app = await buildTestApp();
      const response = await app.inject({
        method: "POST",
        url: "/api/event-enquiries/webhook",
        headers: { "x-event-webhook-token": webhookToken },
        payload,
      });
      assert.equal(response.statusCode, 201);
      assert.equal(response.json().enquiry.source, "webhook");
    } finally {
      if (previous === undefined) {
        delete process.env.EVENT_WEBHOOK_TOKEN;
      } else {
        process.env.EVENT_WEBHOOK_TOKEN = previous;
      }
    }
  });

  it("updates enquiry status and audit logs the change", async () => {
    const auditEntries: AuditEntry[] = [];
    app = await buildTestApp(auditEntries);
    const create = await app.inject({
      method: "POST",
      url: "/api/event-enquiries",
      payload,
    });
    const id = create.json().enquiry.id;

    const update = await app.inject({
      method: "PATCH",
      url: `/api/event-enquiries/${id}/status`,
      headers: adminHeaders,
      payload: { status: "contacted" },
    });

    assert.equal(update.statusCode, 200);
    assert.equal(update.json().enquiry.status, "contacted");
    assert.equal(auditEntries.at(-1)?.action, "updateStatus");
    assert.equal(auditEntries.at(-1)?.actor, "test-admin");
  });
});
