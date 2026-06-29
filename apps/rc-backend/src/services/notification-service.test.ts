import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createProviderNotificationService } from "./notification-service.js";

describe("notification service", () => {
  it("fails loudly when providers are not configured", async () => {
    const service = createProviderNotificationService({});

    await assert.rejects(
      service.sendEmail({ to: "guest@example.com", subject: "Hi", text: "Hi" }),
      /Email notifications are not configured/,
    );
    await assert.rejects(
      service.sendWhatsApp({ to: "+6590000000", text: "Hi" }),
      /WhatsApp notifications are not configured/,
    );
  });

  it("sends through Brevo and Meta Cloud API", async () => {
    const requests: Array<{ url: string; body: unknown }> = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input, init) => {
      requests.push({
        url: input.toString(),
        body: JSON.parse(init?.body?.toString() ?? "{}"),
      });
      return new Response("{}", { status: 200 });
    }) as typeof fetch;

    try {
      const service = createProviderNotificationService({
        brevoApiKey: "brevo-key",
        brevoFromEmail: "Tandoori Corner <bookings@tandooricorner.com.sg>",
        metaGraphApiVersion: "v23.0",
        whatsAppAccessToken: "whatsapp-token",
        whatsAppPhoneNumberId: "12345",
      });

      await service.sendEmail({
        to: "guest@example.com",
        subject: "Booking received",
        text: "Thanks",
      });
      await service.sendWhatsApp({ to: "+6590000000", text: "Thanks" });

      assert.equal(requests[0].url, "https://api.brevo.com/v3/smtp/email");
      assert.deepEqual(requests[0].body, {
        sender: {
          name: "Tandoori Corner",
          email: "bookings@tandooricorner.com.sg",
        },
        to: [{ email: "guest@example.com" }],
        subject: "Booking received",
        textContent: "Thanks",
      });
      assert.equal(
        requests[1].url,
        "https://graph.facebook.com/v23.0/12345/messages",
      );
      assert.deepEqual(requests[1].body, {
        messaging_product: "whatsapp",
        to: "6590000000",
        type: "text",
        text: { body: "Thanks" },
      });
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
