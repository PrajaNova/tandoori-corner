import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createStripePaymentService, PaymentError } from "./payment-service.js";

describe("Stripe payment service security", () => {
  it("fails closed when webhook signing is not configured", async () => {
    const service = createStripePaymentService({
      stripeSecretKey: "sk_test_123",
    });

    await assert.rejects(
      service.parseWebhook({
        parsedBody: {
          type: "payment_intent.succeeded",
          data: { object: { id: "pi_123" } },
        },
      }),
      (error) =>
        error instanceof PaymentError &&
        error.code === "PAYMENT_NOT_CONFIGURED",
    );
  });
});
