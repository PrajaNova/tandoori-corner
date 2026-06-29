# Security and Access

## Access Model

There are no customer accounts in the current build.

Admin access is protected by a shared bearer token:

- Env key: `ADMIN_API_TOKEN`
- Header: `Authorization: Bearer <token>`
- Guard: `apps/rc-backend/src/lib/admin-auth.ts`

The admin Next.js app reads `ADMIN_API_TOKEN` server-side and forwards it to backend admin endpoints. The browser does not call protected backend routes directly.

## Protected Surfaces

Admin-only backend routes:

- Catalog/menu create, update, and delete routes.
- `GET /api/bookings`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id/status`
- `GET /api/event-enquiries`
- `GET /api/event-enquiries/:id`
- `PATCH /api/event-enquiries/:id/status`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PATCH /api/orders/:id/status`

Webhook route:

- `POST /api/event-enquiries/webhook` requires `x-event-webhook-token: <EVENT_WEBHOOK_TOKEN>`.
- `POST /api/orders/webhook/stripe` verifies `stripe-signature` when `STRIPE_WEBHOOK_SECRET` is configured.

## Public Write Controls

Public writes are intentionally limited to guest workflows:

- `POST /api/bookings`
- `POST /api/event-enquiries`
- `POST /api/orders`

Booking and order creation routes include rate limiting. Route handlers validate payload shape before writing.

## Audit

Backend mutations write `AuditLog` rows through `apps/rc-backend/src/services/audit-service.ts`.

Audit records include:

- actor
- action
- entity type and id
- before and after snapshots
- creation timestamp

## Secrets

Do not commit real values. Required runtime secret groups:

- Database: `DATABASE_URL`
- Admin: `ADMIN_API_TOKEN`
- Event webhook: `EVENT_WEBHOOK_TOKEN`
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- Brevo: `BREVO_API_KEY`, `BREVO_FROM_EMAIL`
- Meta WhatsApp: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `META_GRAPH_API_VERSION`

## Current Limits

- Admin identity is token-based, not per-user login.
- No role-based permission model.
- No customer authentication.
- No PCI card handling in this app; Stripe owns payment processing.
