# Table Bookings

## Model

`Booking` persists table requests in `bookings`:

- `customerName`, `email`, `phone`
- `partySize`
- `bookedFor`
- `notes`
- `status`: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`

Migration: `apps/rc-backend/prisma/migrations/20260628030000_bookings/migration.sql`.

## API

Public:

- `POST /api/bookings`

```json
{
  "name": "Asha Rao",
  "email": "asha@example.com",
  "phone": "+6590000000",
  "partySize": 4,
  "date": "2026-07-03",
  "time": "19:30",
  "notes": "Window table if possible"
}
```

Admin:

- `GET /api/bookings`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id/status`

Admin routes require `Authorization: Bearer $ADMIN_API_TOKEN`.

## Notifications

Booking creation sends email and WhatsApp messages to the customer through the shared notification adapter. Restaurant recipients are optional env vars:

- `BOOKING_RESTAURANT_EMAIL`
- `BOOKING_RESTAURANT_WHATSAPP`

Provider delivery uses Brevo email API and Meta WhatsApp Cloud API:

- `BREVO_API_KEY`
- `BREVO_FROM_EMAIL`
- `META_GRAPH_API_VERSION`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`

## Flow

1. Customer submits the reservation form on `/`.
2. Backend validates and rate-limits the request.
3. Backend creates the booking, writes an audit log, and sends notifications.
4. Admin reviews `/bookings` and updates the status.
5. Status changes are audit-logged and notify the customer.
