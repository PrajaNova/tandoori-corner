import type {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { createAdminAuthGuard, getAdminActor } from "../lib/admin-auth.js";
import type { AuditService } from "../services/audit-service.js";
import {
  type EventEnquiry,
  EventEnquiryError,
  type EventEnquiryService,
  type EventEnquiryStatus,
} from "../services/event-enquiry-service.js";
import type { NotificationService } from "../services/notification-service.js";

interface EventEnquiryRouteOptions {
  adminApiToken?: string;
  auditService: AuditService;
  eventEnquiryService: EventEnquiryService;
  notificationService: NotificationService;
  restaurantEmail?: string;
  webhookToken?: string;
}

const statuses = [
  "new",
  "contacted",
  "confirmed",
  "cancelled",
  "closed",
] as const;

const enquiryProperties = {
  name: { type: "string", minLength: 1, maxLength: 120 },
  email: { type: "string", minLength: 3, maxLength: 160 },
  phone: { type: "string", minLength: 6, maxLength: 40 },
  eventType: { type: "string", minLength: 1, maxLength: 120 },
  guests: { type: "integer", minimum: 1, maximum: 500 },
  date: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
  notes: { type: "string", maxLength: 1000 },
  source: { type: "string", maxLength: 80 },
  externalId: { type: "string", maxLength: 160 },
} as const;

const createEnquirySchema = {
  body: {
    type: "object",
    required: ["name", "email", "phone", "eventType", "guests"],
    additionalProperties: false,
    properties: enquiryProperties,
  },
} as const;

const webhookSchema = createEnquirySchema;

const idParamsSchema = {
  params: {
    type: "object",
    required: ["id"],
    additionalProperties: false,
    properties: {
      id: { type: "string", minLength: 1 },
    },
  },
} as const;

const updateStatusSchema = {
  ...idParamsSchema,
  body: {
    type: "object",
    required: ["status"],
    additionalProperties: false,
    properties: {
      status: { type: "string", enum: statuses },
    },
  },
} as const;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimitPublicWrites(max = 10, windowMs = 60_000) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const now = Date.now();
    const current = hits.get(request.ip);
    const next =
      current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + windowMs };
    hits.set(request.ip, next);

    if (next.count > max) {
      return reply.code(429).send({
        error: "RATE_LIMITED",
        message: "Too many event enquiries. Please try again shortly.",
      });
    }
  };
}

function createWebhookAuth(token?: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!token) {
      return reply.code(503).send({
        error: "WEBHOOK_NOT_CONFIGURED",
        message: "Event enquiry webhook is not configured.",
      });
    }
    if (request.headers["x-event-webhook-token"] !== token) {
      return reply.code(401).send({
        error: "WEBHOOK_UNAUTHORIZED",
        message: "Webhook access is required.",
      });
    }
  };
}

function sendEventError(reply: FastifyReply, error: unknown) {
  if (error instanceof EventEnquiryError) {
    if (error.code === "NOT_FOUND") {
      return reply.code(404).send({
        error: "EVENT_ENQUIRY_NOT_FOUND",
        message: "Event enquiry was not found.",
      });
    }

    return reply.code(400).send({
      error: "INVALID_EVENT_ENQUIRY",
      message: "Please check your event enquiry and try again.",
    });
  }
  throw error;
}

function formatEnquiry(enquiry: EventEnquiry) {
  const date = enquiry.preferredDate
    ? new Date(enquiry.preferredDate).toLocaleDateString("en-SG", {
        dateStyle: "medium",
      })
    : "date flexible";
  return `${enquiry.customerName}, ${enquiry.eventType}, ${enquiry.guestCount} guests, ${date}`;
}

async function sendWithRetry(
  label: string,
  send: () => Promise<void>,
  log: FastifyBaseLogger,
) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      await send();
      return;
    } catch (error) {
      log.error({ error, label, attempt }, "Event enquiry notification failed");
    }
  }
}

async function notifyCreated(
  enquiry: EventEnquiry,
  options: EventEnquiryRouteOptions,
  log: FastifyBaseLogger,
) {
  const summary = formatEnquiry(enquiry);
  await sendWithRetry(
    "event.customer.email",
    () =>
      options.notificationService.sendEmail({
        to: enquiry.email,
        subject: "We received your TCB Bar enquiry",
        text: `Thanks ${enquiry.customerName}. We received your private event enquiry: ${summary}. Our events team will reply shortly.`,
      }),
    log,
  );

  if (options.restaurantEmail) {
    await sendWithRetry(
      "event.restaurant.email",
      () =>
        options.notificationService.sendEmail({
          to: options.restaurantEmail as string,
          subject: "New private event enquiry",
          text: `${summary}\nPhone: ${enquiry.phone}\nEmail: ${enquiry.email}\nNotes: ${enquiry.notes ?? "-"}`,
        }),
      log,
    );
  } else {
    log.warn("EVENT_RESTAURANT_EMAIL is not configured");
  }
}

async function notifyStatusChanged(
  enquiry: EventEnquiry,
  notificationService: NotificationService,
  log: FastifyBaseLogger,
) {
  await sendWithRetry(
    "event.status.email",
    () =>
      notificationService.sendEmail({
        to: enquiry.email,
        subject: `Your TCB Bar enquiry is ${enquiry.status}`,
        text: `Your private event enquiry is now ${enquiry.status}: ${formatEnquiry(enquiry)}.`,
      }),
    log,
  );
}

export async function registerEventEnquiryRoutes(
  app: FastifyInstance,
  options: EventEnquiryRouteOptions,
) {
  const requireAdmin = createAdminAuthGuard(options.adminApiToken);
  const requireWebhook = createWebhookAuth(options.webhookToken);

  app.post(
    "/",
    { schema: createEnquirySchema, preHandler: rateLimitPublicWrites() },
    async (request, reply) => {
      try {
        const enquiry = await options.eventEnquiryService.createEnquiry(
          request.body as Parameters<EventEnquiryService["createEnquiry"]>[0],
        );
        await options.auditService.record({
          actor: "customer",
          action: "create",
          entityType: "eventEnquiry",
          entityId: enquiry.id,
          after: enquiry,
        });
        await notifyCreated(enquiry, options, request.log);
        return reply.code(201).send({ enquiry });
      } catch (error) {
        return sendEventError(reply, error);
      }
    },
  );

  app.post(
    "/webhook",
    { schema: webhookSchema, preHandler: requireWebhook },
    async (request, reply) => {
      try {
        const enquiry = await options.eventEnquiryService.createEnquiry({
          ...(request.body as Parameters<
            EventEnquiryService["createEnquiry"]
          >[0]),
          source: "webhook",
        });
        await options.auditService.record({
          actor: "webhook",
          action: "create",
          entityType: "eventEnquiry",
          entityId: enquiry.id,
          after: enquiry,
        });
        await notifyCreated(enquiry, options, request.log);
        return reply.code(201).send({ enquiry });
      } catch (error) {
        return sendEventError(reply, error);
      }
    },
  );

  app.get("/", { preHandler: requireAdmin }, async () => ({
    enquiries: await options.eventEnquiryService.listEnquiries(),
  }));

  app.get(
    "/:id",
    { schema: idParamsSchema, preHandler: requireAdmin },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const enquiry = await options.eventEnquiryService.getEnquiry(id);
      if (!enquiry) {
        return sendEventError(reply, new EventEnquiryError("NOT_FOUND"));
      }
      return { enquiry };
    },
  );

  app.patch(
    "/:id/status",
    { schema: updateStatusSchema, preHandler: requireAdmin },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { status } = request.body as { status: EventEnquiryStatus };
      const before = await options.eventEnquiryService.getEnquiry(id);

      try {
        const enquiry = await options.eventEnquiryService.updateStatus(
          id,
          status,
        );
        await options.auditService.record({
          actor: getAdminActor(request),
          action: "updateStatus",
          entityType: "eventEnquiry",
          entityId: enquiry.id,
          before,
          after: enquiry,
        });
        await notifyStatusChanged(
          enquiry,
          options.notificationService,
          request.log,
        );
        return reply.send({ enquiry });
      } catch (error) {
        return sendEventError(reply, error);
      }
    },
  );
}
