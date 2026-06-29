# CMS and Customer Accounts

## Scope

This feature adds a small restaurant CMS for promotions, gallery images, testimonials, and site settings, plus a passwordless customer account lookup for prior orders, bookings, and event enquiries.

## Backend Models

- `Promotion`: homepage or route-specific marketing content with optional CTA, active/inactive status, scheduling, and sort order.
- `GalleryImage`: managed image URL, alt text, category, status, and sort order.
- `Testimonial`: quote, author, optional source/rating, status, and sort order.
- `SiteSetting`: JSON settings keyed by name, currently used for contact details.
- `Customer`: shared customer identity keyed by email and/or phone.
- `CustomerOtp`: one-time login code hash and expiry.
- `CustomerSession`: bearer session token hash and expiry.

Existing `Booking`, `EventEnquiry`, and `Order` rows can link to `Customer` through nullable `customerId`.

## API Contract

Public CMS reads:

- `GET /api/cms/promotions` -> `{ promotions }`
- `GET /api/cms/gallery` -> `{ images }`
- `GET /api/cms/testimonials` -> `{ testimonials }`
- `GET /api/cms/settings` -> `{ settings }`

Admin CMS writes require `Authorization: Bearer $ADMIN_API_TOKEN`:

- `GET|POST /api/cms/admin/promotions`
- `PATCH|DELETE /api/cms/admin/promotions/:id`
- `GET|POST /api/cms/admin/gallery`
- `PATCH|DELETE /api/cms/admin/gallery/:id`
- `GET|POST /api/cms/admin/testimonials`
- `PATCH|DELETE /api/cms/admin/testimonials/:id`
- `GET /api/cms/admin/settings`
- `PUT /api/cms/admin/settings/:key`

Customer account:

- `POST /api/account/login`
  - Body: `{ name?, email?, phone?, channel? }`
  - Sends a one-time code by email or WhatsApp.
  - Public route is rate-limited.
- `POST /api/account/verify`
  - Body: `{ email?, phone?, code }`
  - Returns `{ token, account }`.
  - Public route is rate-limited.
- `GET /api/account/me`
  - Header: `Authorization: Bearer <token>`
  - Returns linked orders, bookings, and event enquiries.

## Admin UI

Admin route `/content` provides CRUD controls for:

- Promotions
- Gallery images
- Testimonials
- JSON site settings

All admin CMS mutations flow through the admin Next.js API proxy and then to the Fastify admin endpoints.

## Customer UI

Customer routes:

- `/gallery`: reads active gallery CMS content with static fallback.
- `/reviews`: reads active testimonials with static fallback.
- `/contact`: reads the `contact` site setting with static fallback.
- `/account`: passwordless login and account history view.

The homepage renders active `home` promotions above the main feature bands.

## Env Vars

Required for existing backend integration:

- `ADMIN_API_TOKEN`: protects admin CMS writes.
- `BACKEND_URL` or app-specific API base variables already used by the frontend/admin apps.
- `GOOGLE_CLIENT_ID`: backend Google ID-token audience.
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: customer web Google Identity Services client ID.

Account login delivery uses the existing notification adapter. Configure one or both provider paths already documented for notifications:

- Email provider keys, such as `BREVO_API_KEY`, `BREVO_FROM_EMAIL`, or the selected SMTP/Resend equivalent when that adapter is added.
- WhatsApp provider keys, such as Meta Cloud API variables already used by the notification service.

No customer password secret is required because sessions and OTPs are generated with Node `crypto` and stored as hashes.

## Audit and Security

- Every admin CMS create/update/delete records an `AuditLog` row through the shared audit service.
- Admin CMS endpoints reuse the shared admin bearer guard.
- CMS route inputs use JSON schemas with `additionalProperties: false`.
- Public account login and verify routes are rate-limited by IP.
- Account OTPs expire after 10 minutes and are consumed on successful verification.
- Account sessions expire after 30 days.
- Google checkout login is optional. It links a customer by Google's stable `sub` claim and uses the latest order address as the saved checkout address.

## Local Verification

- `pnpm lint`
- `pnpm --filter rc-backend test`
- `pnpm -r build`
