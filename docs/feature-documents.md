# Feature Documents

This file is the feature index. Detailed notes remain in the focused docs next to it.

## Current Feature Snapshot

Updated: 2026-07-01

### Done

- Public restaurant website with routes for home, menu, order, checkout, catering, private events, gallery, reviews, contact, story, and customer account lookup.
- Branded homepage with hero, welcome content, signature dishes, promotions, menu preview, amenities, booking form, FAQ, testimonials, and footer contact details.
- Backend-backed menu and catalog system with public reads, admin CRUD, active/inactive filtering, static fallback on the public menu, and seeded restaurant data.
- Table booking flow with homepage form, public create API, admin booking list, admin status updates, rate limiting, audit logs, and notification adapter hooks.
- Private event and catering enquiry flows with public forms, backend create APIs, admin list/status updates, token-protected webhook intake, audit logs, and email notification hooks.
- Catering package pages, build-your-own catering route, catering backend model, package SEO, and sitemap coverage.
- Online ordering flow with cart, checkout, backend order creation, server-side totals, Stripe PaymentIntent creation, Stripe webhook handling, admin order list, and lifecycle status updates.
- Admin app with token-protected login, menu/category/item management, bookings, event enquiries, orders, CMS content, gallery, testimonials, promotions, settings, and bulk menu image update tools.
- CMS-backed public content for promotions, gallery, reviews, contact settings, with static fallbacks when the backend is unavailable.
- Passwordless customer account APIs and `/account` page for email/WhatsApp login, Google login hooks, saved customer profile, and linked orders/bookings/enquiries.
- SEO foundation with shared metadata helper, canonical routes, sitemap, robots, manifest, Open Graph/Twitter images, `llms.txt`, JSON-LD, FAQ schema, menu schema, offer catalog schema, breadcrumbs, and AI-search answer content.
- Image/content SEO improvements on the homepage: stronger alt text, WebP homepage background assets, native lazy loading for below-fold images, and a 134-word self-contained answer block.
- Analytics hooks for Vercel Analytics, Speed Insights, GA4, and Facebook Pixel behind environment variables.
- Backend test coverage for menu, catalog, bookings, event enquiries, orders, CMS, account security, payment, and notification services.
- Playwright coverage for public menu, booking, catering enquiry, private event enquiry, checkout, and rendered SEO basics.

### Not Live-Ready Yet

- Runtime env is not fully wired locally. Production needs `ADMIN_API_TOKEN`, backend URL, Stripe keys, Brevo/WhatsApp keys, restaurant notification recipients, webhook token, Google client IDs, and analytics IDs where used.
- Backend port config is inconsistent in docs/env examples: backend defaults to `3002`, while web/admin examples use `localhost:4000`. Pick one before launch.
- Checkout does not collect or confirm Stripe card payment in the browser yet. It creates a PaymentIntent only. The displayed "pay at counter" option is not handled by the backend path.
- Footer newsletter form is only UI; there is no subscribe handler or backend route.
- Floating chatbot is a simple mock and is disabled unless `NEXT_PUBLIC_ENABLE_CHATBOT=true`.
- Full Playwright run currently fails on public write flows until web, backend, and API base URL are run together correctly. Backend tests and production build pass.

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
