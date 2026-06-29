import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { buildApp } from "../app.js";
import {
  type AuditEntry,
  createMemoryAuditService,
} from "../services/audit-service.js";
import { createMemoryBookingService } from "../services/booking-service.js";
import { createMemoryCatalogService } from "../services/catalog-service.js";
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

const bookingPayload = {
  name: "Asha Rao",
  email: "asha@example.com",
  phone: "+6590000000",
  partySize: 4,
  date: "2099-07-03",
  time: "19:30",
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

describe("booking routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("creates a booking, audit log, and customer notifications", async () => {
    const auditEntries: AuditEntry[] = [];
    const sent: Array<EmailMessage | WhatsAppMessage> = [];
    app = await buildTestApp(auditEntries, sent);

    const response = await app.inject({
      method: "POST",
      url: "/api/bookings",
      payload: bookingPayload,
    });

    assert.equal(response.statusCode, 201);
    assert.equal(response.json().booking.customerName, "Asha Rao");
    assert.equal(auditEntries[0].entityType, "booking");
    assert.equal(auditEntries[0].action, "create");
    assert.equal(sent.length, 2);
  });

  it("requires admin auth to list bookings", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/bookings",
    });
    assert.equal(response.statusCode, 401);
  });

  it("rejects bookings outside service hours", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/bookings",
      payload: { ...bookingPayload, time: "15:30" },
    });
    assert.equal(response.statusCode, 400);
  });

  it("updates booking status and audit logs the change", async () => {
    const auditEntries: AuditEntry[] = [];
    app = await buildTestApp(auditEntries);

    const create = await app.inject({
      method: "POST",
      url: "/api/bookings",
      payload: bookingPayload,
    });
    const id = create.json().booking.id;

    const update = await app.inject({
      method: "PATCH",
      url: `/api/bookings/${id}/status`,
      headers: adminHeaders,
      payload: { status: "confirmed" },
    });

    assert.equal(update.statusCode, 200);
    assert.equal(update.json().booking.status, "confirmed");
    assert.equal(auditEntries.at(-1)?.action, "updateStatus");
    assert.equal(auditEntries.at(-1)?.actor, "admin");
  });

  it("rate-limits public booking writes", async () => {
    app = await buildTestApp();

    for (let index = 0; index < 10; index += 1) {
      await app.inject({
        method: "POST",
        url: "/api/bookings",
        remoteAddress: "203.0.113.10",
        payload: { ...bookingPayload, email: `guest${index}@example.com` },
      });
    }

    const response = await app.inject({
      method: "POST",
      url: "/api/bookings",
      remoteAddress: "203.0.113.10",
      payload: { ...bookingPayload, email: "limited@example.com" },
    });
    assert.equal(response.statusCode, 429);
  });
});
