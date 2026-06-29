import type {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { createAdminAuthGuard, getAdminActor } from "../lib/admin-auth.js";
import type { AccountService } from "../services/account-service.js";
import type { AuditService } from "../services/audit-service.js";
import {
  type Booking,
  BookingError,
  type BookingService,
  type CreateBookingInput,
  type PublicBookingStatus,
} from "../services/booking-service.js";
import type { NotificationService } from "../services/notification-service.js";

interface BookingRouteOptions {
  accountService?: AccountService;
  adminApiToken?: string;
  auditService: AuditService;
  bookingService: BookingService;
  notificationService: NotificationService;
  restaurantEmail?: string;
  restaurantWhatsApp?: string;
}

const bookingStatuses = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
] as const;

const createBookingSchema = {
  body: {
    type: "object",
    required: ["name", "email", "phone", "partySize", "date", "time"],
    additionalProperties: false,
    properties: {
      name: { type: "string", minLength: 1, maxLength: 120 },
      email: { type: "string", minLength: 3, maxLength: 160 },
      phone: { type: "string", minLength: 6, maxLength: 40 },
      partySize: { type: "integer", minimum: 1, maximum: 30 },
      date: {
        type: "string",
        pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      },
      time: {
        type: "string",
        pattern: "^\\d{2}:\\d{2}$",
      },
      notes: { type: "string", maxLength: 1000 },
    },
  },
} as const;

const bookingIdParamsSchema = {
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
  ...bookingIdParamsSchema,
  body: {
    type: "object",
    required: ["status"],
    additionalProperties: false,
    properties: {
      status: { type: "string", enum: bookingStatuses },
    },
  },
} as const;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimitPublicWrites(max = 10, windowMs = 60_000) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const key = request.ip;
    const now = Date.now();
    const current = hits.get(key);
    const next =
      current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + windowMs };
    hits.set(key, next);

    if (next.count > max) {
      return reply.code(429).send({
        error: "RATE_LIMITED",
        message: "Too many booking requests. Please try again shortly.",
      });
    }
  };
}

function sendBookingError(reply: FastifyReply, error: unknown) {
  if (error instanceof BookingError) {
    if (error.code === "NOT_FOUND") {
      return reply.code(404).send({
        error: "BOOKING_NOT_FOUND",
        message: "Booking was not found.",
      });
    }

    return reply.code(400).send({
      error: "INVALID_BOOKING",
      message: "Please check your booking details and try again.",
    });
  }
  throw error;
}

function formatBooking(booking: Booking) {
  const date = new Date(booking.bookedFor);
  return `${booking.customerName}, ${booking.partySize} people, ${date.toLocaleString(
    "en-SG",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  )}`;
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
      log.error({ error, label, attempt }, "Booking notification failed");
    }
  }
}

async function notifyBookingCreated(
  booking: Booking,
  options: BookingRouteOptions,
  log: FastifyBaseLogger,
) {
  const summary = formatBooking(booking);
  await sendWithRetry(
    "booking.customer.email",
    () =>
      options.notificationService.sendEmail({
        to: booking.email,
        subject: "We received your Tandoori Corner booking request",
        text: `Thanks ${booking.customerName}. We received your booking request for ${summary}. We will confirm it shortly.`,
      }),
    log,
  );
  await sendWithRetry(
    "booking.customer.whatsapp",
    () =>
      options.notificationService.sendWhatsApp({
        to: booking.phone,
        text: `Tandoori Corner received your booking request: ${summary}. We will confirm it shortly.`,
      }),
    log,
  );

  if (options.restaurantEmail) {
    await sendWithRetry(
      "booking.restaurant.email",
      () =>
        options.notificationService.sendEmail({
          to: options.restaurantEmail as string,
          subject: "New table booking request",
          text: `${summary}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nNotes: ${booking.notes ?? "-"}`,
        }),
      log,
    );
  } else {
    log.warn("BOOKING_RESTAURANT_EMAIL is not configured");
  }

  if (options.restaurantWhatsApp) {
    await sendWithRetry(
      "booking.restaurant.whatsapp",
      () =>
        options.notificationService.sendWhatsApp({
          to: options.restaurantWhatsApp as string,
          text: `New booking request: ${summary}. Phone: ${booking.phone}`,
        }),
      log,
    );
  } else {
    log.warn("BOOKING_RESTAURANT_WHATSAPP is not configured");
  }
}

async function notifyStatusChanged(
  booking: Booking,
  log: FastifyBaseLogger,
  notificationService: NotificationService,
) {
  await sendWithRetry(
    "booking.status.email",
    () =>
      notificationService.sendEmail({
        to: booking.email,
        subject: `Your Tandoori Corner booking is ${booking.status}`,
        text: `Your booking is now ${booking.status}: ${formatBooking(booking)}.`,
      }),
    log,
  );
  await sendWithRetry(
    "booking.status.whatsapp",
    () =>
      notificationService.sendWhatsApp({
        to: booking.phone,
        text: `Your Tandoori Corner booking is now ${booking.status}: ${formatBooking(booking)}.`,
      }),
    log,
  );
}

export async function registerBookingRoutes(
  app: FastifyInstance,
  options: BookingRouteOptions,
) {
  const requireAdmin = createAdminAuthGuard(options.adminApiToken);

  app.post(
    "/",
    { schema: createBookingSchema, preHandler: rateLimitPublicWrites() },
    async (request, reply) => {
      try {
        const body = request.body as CreateBookingInput;
        const customer = await options.accountService?.linkCustomer({
          name: body.name,
          email: body.email,
          phone: body.phone,
        });
        const booking = await options.bookingService.createBooking({
          ...body,
          customerId: customer?.id,
        });
        await options.auditService.record({
          actor: "customer",
          action: "create",
          entityType: "booking",
          entityId: booking.id,
          after: booking,
        });
        await notifyBookingCreated(booking, options, request.log);
        return reply.code(201).send({ booking });
      } catch (error) {
        return sendBookingError(reply, error);
      }
    },
  );

  app.get("/", { preHandler: requireAdmin }, async () => ({
    bookings: await options.bookingService.listBookings(),
  }));

  app.get(
    "/:id",
    { schema: bookingIdParamsSchema, preHandler: requireAdmin },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const booking = await options.bookingService.getBooking(id);
      if (!booking)
        return sendBookingError(reply, new BookingError("NOT_FOUND"));
      return { booking };
    },
  );

  app.patch(
    "/:id/status",
    { schema: updateStatusSchema, preHandler: requireAdmin },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { status } = request.body as { status: PublicBookingStatus };
      const before = await options.bookingService.getBooking(id);

      try {
        const booking = await options.bookingService.updateBookingStatus(id, {
          status,
        });
        await options.auditService.record({
          actor: getAdminActor(request),
          action: "updateStatus",
          entityType: "booking",
          entityId: booking.id,
          before,
          after: booking,
        });
        await notifyStatusChanged(
          booking,
          request.log,
          options.notificationService,
        );
        return reply.send({ booking });
      } catch (error) {
        return sendBookingError(reply, error);
      }
    },
  );
}
