import Stripe from "stripe";

import type { Order } from "./order-service.js";

export interface PaymentIntentResult {
  provider: "stripe";
  paymentIntentId: string;
  clientSecret?: string;
}

export interface StripeWebhookResult {
  eventId?: string;
  type: "payment_intent.succeeded" | "payment_intent.payment_failed";
  paymentIntentId: string;
}

export class PaymentError extends Error {
  constructor(
    public code:
      | "PAYMENT_NOT_CONFIGURED"
      | "INVALID_WEBHOOK"
      | "UNSUPPORTED_EVENT",
  ) {
    super(code);
    this.name = "PaymentError";
  }
}

export interface PaymentService {
  createPaymentIntent: (order: Order) => Promise<PaymentIntentResult>;
  parseWebhook: (input: {
    parsedBody: unknown;
    rawBody?: string;
    signature?: string;
  }) => Promise<StripeWebhookResult>;
}

export interface StripePaymentConfig {
  currency?: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
}

function getPaymentIntentId(event: Stripe.Event) {
  const object = event.data.object as Stripe.PaymentIntent;
  if (!object.id) throw new PaymentError("INVALID_WEBHOOK");
  return object.id;
}

function parseSupportedEvent(event: Stripe.Event): StripeWebhookResult {
  if (
    event.type !== "payment_intent.succeeded" &&
    event.type !== "payment_intent.payment_failed"
  ) {
    throw new PaymentError("UNSUPPORTED_EVENT");
  }

  return {
    eventId: event.id,
    type: event.type,
    paymentIntentId: getPaymentIntentId(event),
  };
}

export function createMemoryPaymentService(): PaymentService {
  return {
    createPaymentIntent: async (order) => ({
      provider: "stripe",
      paymentIntentId: `pi_${order.id}`,
      clientSecret: `pi_${order.id}_secret_test`,
    }),
    parseWebhook: async ({ parsedBody }) => {
      const event = parsedBody as {
        id?: string;
        type?: string;
        data?: { object?: { id?: string } };
      };
      if (
        event.type !== "payment_intent.succeeded" &&
        event.type !== "payment_intent.payment_failed"
      ) {
        throw new PaymentError("UNSUPPORTED_EVENT");
      }
      const paymentIntentId = event.data?.object?.id;
      if (!paymentIntentId) throw new PaymentError("INVALID_WEBHOOK");
      return {
        eventId: event.id,
        type: event.type,
        paymentIntentId,
      };
    },
  };
}

export function createStripePaymentService(
  config: StripePaymentConfig,
): PaymentService {
  const stripe = config.stripeSecretKey
    ? new Stripe(config.stripeSecretKey)
    : null;
  const currency = (config.currency ?? "sgd").toLowerCase();

  return {
    createPaymentIntent: async (order) => {
      if (!stripe) throw new PaymentError("PAYMENT_NOT_CONFIGURED");

      const intent = await stripe.paymentIntents.create({
        amount: order.totalCents,
        currency,
        metadata: {
          orderId: order.id,
        },
        receipt_email: order.email,
      });

      return {
        provider: "stripe",
        paymentIntentId: intent.id,
        clientSecret: intent.client_secret ?? undefined,
      };
    },
    parseWebhook: async ({ parsedBody, rawBody, signature }) => {
      if (stripe && config.stripeWebhookSecret) {
        if (!rawBody || !signature) throw new PaymentError("INVALID_WEBHOOK");
        return parseSupportedEvent(
          stripe.webhooks.constructEvent(
            rawBody,
            signature,
            config.stripeWebhookSecret,
          ),
        );
      }

      return parseSupportedEvent(parsedBody as Stripe.Event);
    },
  };
}
