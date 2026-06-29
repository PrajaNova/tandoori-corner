# Product Requirements

## Product

Tandoori Corner is a restaurant web platform for customer discovery, table booking, private-event enquiry, online ordering, and staff operations.

## Users

- Guests: browse restaurant pages, menu, catering packages, private events, and submit bookings, enquiries, or orders.
- Restaurant staff: manage menu data, bookings, event enquiries, and orders from the admin app.
- Operators: configure database, payments, email, WhatsApp, SEO, and analytics through environment variables.

## Goals

- Present the Tandoori Corner brand and current menu on public web routes.
- Capture table bookings and private-event leads without requiring customer accounts.
- Let customers build an order from catalog-backed menu items and create a Stripe-backed payment intent.
- Give staff a simple admin dashboard for lifecycle management.
- Keep audit records for backend mutations and state changes.
- Keep SEO crawl files, route metadata, and JSON-LD current for public routes.

## Scope

In scope:

- Customer routes: `/`, `/menu`, `/order`, `/checkout`, `/catering`, `/catering/build`, `/catering/[package]`, `/private-events`, `/story`.
- Admin routes: `/menu`, `/bookings`, `/event-enquiries`, `/orders`, plus menu category/item create/edit pages.
- Backend APIs for catalog, menu, catering, bookings, event enquiries, orders, Stripe webhooks, and health.
- PostgreSQL persistence through Prisma.
- Brevo email and Meta WhatsApp Cloud API notification adapters.
- Stripe PaymentIntent creation and webhook status updates.

Out of scope for the current build:

- Customer accounts.
- Admin user management UI.
- Full card-entry UI with Stripe Elements.
- Delivery partner integration.
- Inventory management.

## Success Criteria

- Public pages render without the backend by using safe fallbacks where implemented.
- Backend mutations validate input, write audit logs, and enforce admin auth where required.
- Admin app can list and update bookings, event enquiries, orders, and menu records.
- Order totals are computed server-side from catalog data.
- SEO smoke tests prove rendered metadata, canonical links, JSON-LD, sitemap, robots, and manifest.

## Verification

- `pnpm lint`
- `pnpm -r --workspace-concurrency=1 build`
- `pnpm --filter rc-backend test`
- `pnpm test:e2e`
