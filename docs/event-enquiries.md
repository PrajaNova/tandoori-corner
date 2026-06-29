# Event Enquiries

## Model

`EventEnquiry` persists TCB Bar private event leads in `event_enquiries`:

- `customerName`, `email`, `phone`
- `eventType`
- `guestCount`
- `preferredDate`
- `notes`
- `source`, `externalId`
- `status`: `NEW`, `CONTACTED`, `CONFIRMED`, `CANCELLED`, `CLOSED`

Migration: `apps/rc-backend/prisma/migrations/20260628040000_event_enquiries/migration.sql`.

## API

Public:

- `POST /api/event-enquiries`

Webhook:

- `POST /api/event-enquiries/webhook`
- Requires `x-event-webhook-token: $EVENT_WEBHOOK_TOKEN`

Admin:

- `GET /api/event-enquiries`
- `GET /api/event-enquiries/:id`
- `PATCH /api/event-enquiries/:id/status`

Admin routes require `Authorization: Bearer $ADMIN_API_TOKEN`.

## Env

- `EVENT_RESTAURANT_EMAIL`
- `EVENT_WEBHOOK_TOKEN`
- SMTP env from `docs/bookings.md`

## Flow

1. Customer submits the private-events enquiry form.
2. Backend validates and rate-limits the request.
3. Backend creates the enquiry, writes an audit log, and sends email.
4. Webhook intake can create the same persisted enquiry shape.
5. Admin reviews `/event-enquiries` and updates lifecycle status.
