# Online Orders

## Models

- `Order` stores customer contact details, fulfillment type, totals in cents, lifecycle status, Stripe payment intent ID, and payment status.
- `OrderItem` snapshots the catalog item ID, display name, unit price, quantity, notes, and line total at checkout time.
- Status values: `pending_payment`, `paid`, `confirmed`, `preparing`, `ready`, `completed`, `cancelled`.
- Payment status values: `requires_payment`, `paid`, `failed`, `refunded`.

## API

### `POST /api/orders`

Public, rate-limited customer checkout endpoint.

```json
{
  "customer": {
    "name": "Asha Rao",
    "phone": "+6590000000",
    "email": "asha@example.com"
  },
  "fulfillment": {
    "type": "delivery",
    "address": "123 Balestier Road"
  },
  "items": [{ "menuItemId": "item_og_butter_chicken", "quantity": 2 }]
}
```

Returns the persisted order and Stripe payment intent metadata:

```json
{
  "order": { "id": "order_123", "status": "pending_payment" },
  "payment": {
    "provider": "stripe",
    "paymentIntentId": "pi_123",
    "clientSecret": "pi_123_secret_456"
  }
}
```

### `POST /api/orders/webhook/stripe`

Stripe webhook endpoint. Handles `payment_intent.succeeded` and `payment_intent.payment_failed`.

When `STRIPE_WEBHOOK_SECRET` is configured, requests must include the `stripe-signature` header and the raw JSON body is verified with Stripe before any order is updated.

### `GET /api/orders`

Admin-only list endpoint. Requires `Authorization: Bearer $ADMIN_API_TOKEN`.

### `GET /api/orders/:id`

Admin-only detail endpoint.

### `PATCH /api/orders/:id/status`

Admin-only status update endpoint.

```json
{ "status": "preparing" }
```

## Flow

1. Customer adds catalog-backed items to the cart on `/order`.
2. `/checkout` posts customer contact, fulfillment details, and catalog item IDs to `POST /api/orders`.
3. The backend snapshots item names/prices from the catalog, computes subtotal, GST, delivery fee, and total server-side.
4. `PaymentService` creates a Stripe PaymentIntent and stores its ID on the order.
5. Stripe calls `POST /api/orders/webhook/stripe`; successful payment marks the order `paid` and `paymentStatus=paid`.
6. Admin users manage order lifecycle from `/orders` in `tc-admin-app`.

## Notifications and Audit

- Customer order creation sends email when an email is present and WhatsApp to the submitted phone number.
- Payment success sends confirmation email/WhatsApp.
- Admin status changes send an email when the order has an email address.
- Create, Stripe payment updates, and admin status updates write `AuditLog` rows.
- Notification failures are logged and retried once by the route helper.

## Environment Variables

- `STRIPE_SECRET_KEY`: Stripe API secret key used to create PaymentIntents.
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret for verification.
- `STRIPE_CURRENCY`: Stripe currency code, defaults to `sgd`.
- `ADMIN_API_TOKEN`: bearer token required for admin order endpoints.
- `BREVO_*`, `WHATSAPP_*`, `META_GRAPH_API_VERSION`: shared notification provider settings.
