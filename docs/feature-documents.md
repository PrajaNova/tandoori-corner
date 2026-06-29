# Feature Documents

This file is the feature index. Detailed notes remain in the focused docs next to it.

## Foundations

Detailed doc: `docs/foundations.md`

- Admin bearer auth.
- Audit log service.
- Shared notification adapter.
- Error normalization.
- Playwright e2e harness.

## Menu and Catalog

Detailed doc: `docs/menu.md`

- Public menu API and customer menu route.
- Admin category and item CRUD.
- Prisma-backed menu categories and items.
- Static fallback for customer menu when backend fetch fails.

## Table Bookings

Detailed doc: `docs/bookings.md`

- Guest booking request form on the homepage.
- Public booking create endpoint.
- Admin booking list and status update.
- Audit logging and customer/restaurant notifications.

## Private Event Enquiries

Detailed doc: `docs/event-enquiries.md`

- Guest private-events enquiry form.
- Token-protected webhook intake.
- Admin enquiry list and status update.
- Audit logging and email notification.

## Online Orders

Detailed doc: `docs/orders.md`

- Customer menu/cart/order flow.
- Checkout posts catalog-backed item IDs.
- Backend snapshots item names and prices, computes totals, and creates a Stripe PaymentIntent.
- Stripe webhook updates payment status.
- Admin order list and lifecycle status update.

## Catering

- Customer routes: `/catering`, `/catering/build`, `/catering/[package]`.
- Backend route: `/api/catering`.
- Data model: `CateringPackage`.
- SEO includes package sitemap entries and offer catalog JSON-LD.

## CMS and Customer Accounts

Detailed doc: `docs/cms-and-accounts.md`

- Admin content editor for promotions, gallery images, testimonials, and JSON settings.
- Public CMS-backed gallery, reviews, contact, and homepage promotion content with static fallbacks.
- Passwordless customer account login by email or WhatsApp.
- Account history links orders, bookings, and event enquiries through `Customer`.

## SEO

Detailed doc: `docs/seo.md`

- Metadata helper and route metadata.
- JSON-LD for restaurant, website, menu, offers, breadcrumbs, and FAQ.
- Sitemap, robots, manifest, Open Graph, and Twitter image routes.
- Rendered Playwright smoke coverage.

## Local Operations

- Migrate DB: `pnpm --filter rc-backend prisma:deploy`
- Seed DB: `pnpm --filter rc-backend prisma:seed`
- Backend: `PORT=4000 pnpm --filter rc-backend dev`
- Customer web: `pnpm --filter tc-web-app dev`
- Admin: `pnpm --filter tc-admin-app dev`
