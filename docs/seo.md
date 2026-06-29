# SEO Pass

Phase 6 covers the customer web app routes:

- `/`
- `/menu`
- `/catering`
- `/catering/build`
- `/catering/[package]`
- `/order`
- `/checkout`
- `/private-events`
- `/story`

## Shared SEO

- Metadata helper: `apps/tc-web-app/lib/seo.ts`
- Root schema: `Restaurant`, `LocalBusiness`, `Organization`, and `WebSite`
- Route schema: `Menu`, `OfferCatalog`, `BreadcrumbList`, and `FAQPage`
- Crawl files: `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`

## Route Report

- `/` -> missing route FAQ structured data and carousel rendered multiple page headings -> added `FAQPage` JSON-LD and changed carousel slides so only the first slide is the page `h1`.
- `/menu` -> needed route-level canonical/Open Graph/Twitter metadata and menu structured data -> added `buildPageMetadata()`, `Menu` JSON-LD, and breadcrumbs.
- `/catering` -> needed package catalog structured data and sitemap coverage -> added `OfferCatalog` JSON-LD and included route in `seoRoutes`.
- `/catering/build` -> needed canonical metadata and breadcrumbs -> added `buildPageMetadata()` and `BreadcrumbList` JSON-LD.
- `/catering/[package]` -> needed dynamic canonical metadata and package schema -> added `generateMetadata()` and package `OfferCatalog` JSON-LD.
- `/order` -> needed order-page metadata and menu schema separate from `/menu` -> added `buildPageMetadata()`, route canonical, `Menu` JSON-LD, and breadcrumbs.
- `/checkout` -> transactional page should not be indexed -> added noindex metadata and excluded it from sitemap/robots crawl.
- `/private-events` -> needed route metadata and breadcrumbs -> added `buildPageMetadata()` and `BreadcrumbList` JSON-LD.
- `/story` -> needed route metadata and breadcrumbs -> added `buildPageMetadata()` and `BreadcrumbList` JSON-LD.

## Verification

- Rendered SEO smoke test: `tests/e2e/seo.spec.ts`
- Checks one `h1` per public SEO route.
- Checks title, description, canonical, Open Graph, Twitter card, JSON-LD, robots, sitemap, and manifest.
- Source check found all `next/image` / `img` usages have `alt`.
- Source check found no broken static internal links; dynamic links are generated from known package/contact data.
