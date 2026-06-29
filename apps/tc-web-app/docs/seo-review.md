# SEO Review: tc-web-app

A complete SEO audit and best-practices document for the Tandoori Corner Next.js 16 site (single-location restaurant in Balestier, Singapore). This file is the single source of truth for everything SEO in this app — current state, gaps, and the prioritized work to close them.

## Quick Scorecard

| Area | Status | Where it lives |
|---|---|---|
| Page metadata (title / description / canonical / OG / Twitter) | Good | `app/**/page.tsx`, `lib/seo.ts` |
| Host canonicalization (www, vercel preview) | Good | `next.config.ts` |
| `robots.ts` / `sitemap.ts` / `manifest.ts` | Good (small gaps) | `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` |
| Icons & OG/Twitter images | Good | `app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, `twitter-image.tsx` |
| Structured data (JSON-LD) | Partial — only `Restaurant` + `WebSite` | `app/page.tsx`, `lib/seo.ts` (`buildRestaurantJsonLd`) |
| Image alt text & `next/image` use | Good | components/**, hero verified |
| External link `rel="noopener noreferrer"` | Good | header, footer |
| Heading hierarchy (one `<h1>` per page) | Good | per-page client/server components |
| Fonts (Core Web Vitals) | Needs migration to `next/font` | `app/globals.css` |
| `viewport` export (Next 16 separation) | Missing | `app/layout.tsx` |
| Analytics / Search Console verification | Missing | not present |
| Internationalization / hreflang | N/A by design (en_SG only) | — |

---

## 1. Metadata — What's Already Solid

- `lib/seo.ts` defines a single `restaurantSeo` constant (name, siteUrl, description, address, phone, geo, hours, sameAs socials, OG image path) and exposes `buildPageMetadata({ path, title, description, noIndex })` which every page uses. Keep this pattern — it prevents drift.
- Every `app/**/page.tsx` calls `buildPageMetadata` and gets: canonical (`alternates.canonical`), `openGraph` (with 1200×630 image and `locale: "en_SG"`), `twitter` (`summary_large_image`), and `robots`.
- `app/checkout/page.tsx` and `app/experience/page.tsx` correctly set `noIndex: true` for private flows.
- `app/layout.tsx` exports a `title` template (`"%s | Tandoori Corner"`) and `metadataBase` from `restaurantSeo.siteUrl`. Good.

### Tighten

- **`/journey` and `/checkout` are absent from `seoRoutes`** in `lib/seo.ts`. `/checkout` is intentional (noindex), but document this — and ensure `/journey` is either redirected (it is, server-side to `/story`) or removed entirely so it never leaks into sitemap.
- **`siteUrl` is hardcoded** in `lib/seo.ts:3`. Move to `process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tandooricorner.sg"` so preview deploys can self-canonicalize when needed (and so OG cards on preview links don't 301 to prod mid-render).
- **`legacySiteUrl`** is defined but unused. Either wire a 301 in `next.config.ts` for `www.tandooricorner.com.sg` and any old paths, or delete the constant.
- **Per-page keywords** — only the root layout sets `keywords`. That's fine (Google ignores them) but make it explicit in `buildPageMetadata` so we don't accidentally add per-page keyword fields later.

---

## 2. Host & URL Canonicalization

`next.config.ts` already 301s:
- `tandooricorner.sg` (non-www) → `https://www.tandooricorner.sg/*`
- `tandoori-corner.vercel.app` → `https://www.tandooricorner.sg/*`

Add:
- `www.tandooricorner.com.sg` → `https://www.tandooricorner.sg/*` (legacy host).
- Any future preview alias (`*.vercel.app` for this project) — handled by the existing rule already if the host matches.
- Optionally `trailingSlash: false` (current default) — keep explicit for clarity.

---

## 3. Robots, Sitemap, Manifest

### Robots (`app/robots.ts`)
Current: `Allow: /`, `Disallow: /checkout`, sitemap + host declared. Correct.

Add:
- `Disallow: /api/` once any API route exists.
- Consider blocking `/experience` from indexing if reservations become user-state-bearing (today it's noindex via metadata, which is enough; don't double-block).

### Sitemap (`app/sitemap.ts`)
Current: emits `/`, `/menu`, `/experience`, `/story` from the `seoRoutes` registry with `lastModified: new Date()`.

Improve:
- `lastModified: new Date()` regenerates on every request — Google then sees the timestamp churn and ignores it. Switch to a stable date per route (e.g. `new Date(process.env.VERCEL_GIT_COMMIT_DATE ?? Date.now())`), or per-route content hash.
- When `/menu/[slug]` dish pages exist (see Schema below), wire them in via `generateStaticParams` and append to the sitemap.
- Drop `/experience` from sitemap if the page stays noindex — sitemap and noindex shouldn't disagree.

### Manifest (`app/manifest.ts`)
Solid: name, short_name, start_url, scope, display, theme/background colors, icons. Verify `theme_color` matches the `<meta name="theme-color">` Next renders from `viewport` (see §6).

---

## 4. Structured Data (JSON-LD) — Biggest Win

Currently emitted (in `app/page.tsx` via `next/script` with stable ids):
- `Restaurant` (name, address, hours, geo via `restaurantSeo`, `sameAs`, telephone, email, image, priceRange)
- `WebSite` (links publisher → Restaurant by `@id`)

Schemas this site should add — listed in priority order:

1. **`AggregateRating` + `Review`** — the hero badges advertise Google 4.5★ and TripAdvisor Excellence. Add `aggregateRating` to the existing Restaurant node, sourced from a constant (or eventually the Google Places API).
2. **`Menu` + `MenuSection` + `MenuItem`** — emit on `/menu`. Use the existing `data/menu.ts` (categories → items, prices, descriptions). This is the single largest schema win for a restaurant — Google can render menu carousels in SERPs.
3. **`BreadcrumbList`** — emit on every non-home page (`/menu`, `/story`, `/experience`). Trivial; gives Google breadcrumb display in results.
4. **`FAQPage`** — if/when an FAQ section is added (delivery? halal? parking? reservations?), wrap it.
5. **`Event`** — if private events / festive specials are listed on `/experience`.
6. **`Offer`** / `MenuItem.offers`** — for the daily offers in `DailyOffersSection`. Important for "today's deal" intent searches.
7. **`Organization`** — optional; the `Restaurant` type already inherits from `LocalBusiness` → `Organization`, so this is duplicative unless we have a separate brand entity.

Implementation pattern (keep using):
- Builder function in `lib/seo.ts` (e.g. `buildMenuJsonLd(menuData)`, `buildBreadcrumbJsonLd(crumbs)`).
- Escape via the existing `jsonLdScript()` helper.
- Render via `<Script id="..." type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: jsonLdScript(value) }} />` with **stable, unique `id`s** so streaming + HMR don't duplicate them.

Validate every schema with the Rich Results Test (`https://search.google.com/test/rich-results`) and Schema.org validator after changes.

---

## 5. Icons & Open Graph

All present, all `ImageResponse`-generated, all sized correctly:
- `app/icon.tsx` (32×32)
- `app/apple-icon.tsx` (180×180)
- `app/opengraph-image.tsx` (1200×630, alt text set)
- `app/twitter-image.tsx` (re-exports OG)

No changes needed. Just confirm `metadataBase` resolves to absolute URLs in production — `https://www.tandooricorner.sg/opengraph-image`, not a relative path — when previewing the source on a deployed page.

---

## 6. Core Web Vitals → Search Ranking

### Fonts
The app already self-hosts the committed brand fonts with `next/font/google` in `app/layout.tsx`:

```tsx
import { Great_Vibes, Kaushan_Script, Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], display: "swap", variable: "--ff-raleway" });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400", display: "swap", variable: "--ff-kaushan" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap", variable: "--ff-script" });
```

No migration needed. Keep `theme/typography.css` mapped to `Raleway`, `Kaushan Script`, and `Great Vibes`; do not switch to Open Sans / Merriweather unless the visual brand is intentionally redesigned.

### Viewport (Next 16 requirement)
Add to `app/layout.tsx`:

```tsx
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)",  color: "#2c2621" },
  ],
};
```

Remove any `themeColor` from `metadata` if present — Next 16 wants it on `viewport`, and the dev console warns otherwise.

### Hero asset
Already covered in `react-nextjs-review.md` — short version: re-encode the hero MP4, ship a poster image on mobile (already done), keep `priority` on the LCP image.

### Image lazy-loading
`next/image` defaults to lazy. Confirm only the single LCP image carries `priority`. Audit the remaining components flagged in §7 of `react-nextjs-review.md`.

---

## 7. Image SEO

- All renderers use `next/image` — no raw `<img>` regressions.
- Decorative imagery (Hero background poster, GoogleReviewsSection backdrop) uses `alt=""` + `aria-hidden="true"`. Correct.
- Add a one-line audit for these less-visited components: `HeritageSection`, `CulinaryCorners`, `TcbSpotlight`, `ImageTextCard`, `StoryArticleCard`, `StoryGalleryCard`, `StoryTeamCard` — confirm every `Image` has either descriptive alt **or** `alt=""` + `aria-hidden` (no empty alt on content images).
- Add `sizes` to every responsive `Image` to avoid serving the largest variant.

---

## 8. Link Hygiene

- All external anchors in `AppHeader.tsx` and `AppFooter.tsx` carry `rel="noopener noreferrer"` and `target="_blank"`. Good.
- Internal navigation uses `next/link` everywhere I checked. Don't introduce raw `<a href="/...">` for in-app routes — it kills client navigation and prefetch.
- Don't add `rel="nofollow"` to the social profiles in `sameAs` — Google uses them for entity disambiguation, nofollow is counterproductive here.

---

## 9. Headings

One `<h1>` per route — verified:
- `/` — `Hero.tsx` h1 (heroCopy.title)
- `/menu` — `MenuClient.tsx:72` "Discover Our Menu"
- `/experience` — `ExperienceClient.tsx:30`
- `/story` — `StoryContent.tsx`
- `/checkout` — `CheckoutClient.tsx:93` (noindex page, but still clean)
- `/not-found` and `/checkout/error` — h1 present

Keep this discipline. When adding sections, demote duplicate h1s to h2.

---

## 10. Analytics, Verification, and Tools

Today: **nothing instrumented**. Add, in this order:

1. **Google Search Console** — verify ownership via the `verification.google` field in the layout `metadata`:
   ```tsx
   verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
   ```
   Submit the sitemap (`https://www.tandooricorner.sg/sitemap.xml`) after verification.
2. **Bing Webmaster Tools** — same pattern, free, ~5% of SG traffic.
3. **Google Business Profile** — not on-site, but the single highest local-SEO lever for a restaurant. Make sure NAP (name/address/phone) on GBP matches `restaurantSeo` exactly, character for character.
4. **Analytics** — either Vercel Web Analytics (`@vercel/analytics` — one component in the root layout, no cookies, GDPR-friendly) or GA4. For restaurant conversion tracking (reservation form submits, menu PDF downloads, phone clicks), GA4 + `gtag('event', ...)` is the right call.
5. **Microsoft Clarity** — free heatmaps + session recording. Useful early on while iterating on the menu/checkout UX.

When you add tracking scripts, load them via `next/script` with `strategy="afterInteractive"` (analytics) or `lazyOnload` (Clarity).

---

## 11. Local SEO (off-site, but critical)

A restaurant lives or dies by local signals. None of this is in the codebase, but it belongs in this doc:

- **Google Business Profile** — claim, verify, complete every field (hours match site, menu link points to `/menu`, photos refreshed monthly).
- **Citation consistency** — Zomato, TripAdvisor, OpenRice, Foursquare, Yelp SG: NAP must match `restaurantSeo` exactly. Audit quarterly.
- **Reviews** — respond to every Google review (positive and negative) within 48 hours. Affects ranking and CTR.
- **Backlinks** — Singapore food bloggers (Miss Tam Chiak, Ladyironchef, SETHLUI), HungryGoWhere, time-out SG. Outreach is off-platform but worth 10× more than any on-page tweak.

---

## 12. Internationalization

Single locale (`en_SG`) is correct for the site's market. **Do not add hreflang** until there is a second locale to point to — empty/self-referencing hreflang loops cause GSC warnings.

If a future Mandarin version ships, add `i18n` routing via Next.js middleware or `[locale]` segments, then add `alternates.languages` to `buildPageMetadata`.

---

## 13. Content / On-Page Tactics (non-code)

- Each page's `description` should be 140–160 chars, action-oriented, and include the location ("Balestier", "Singapore"). Spot-check `lib/seo.ts` route descriptions.
- The home `<h1>` should include "North Indian Restaurant in Balestier" or similar high-intent keywords (currently driven by `heroCopy.title` in `data/home.ts` — review that copy).
- Menu category descriptions in `data/menu.ts` should be 1–2 sentences each — Google uses them when previewing the menu schema in SERPs.
- Add a `/blog` or `/stories` content surface long-term (recipes, festival specials, behind-the-scenes). It's the only way to win non-branded informational queries.

---

## Suggested Execution Order

1. **Quick wins (1 PR)**: `viewport` export, `next/font` migration, `siteUrl` env-driven, sitemap `lastModified` stable, legacy host redirect.
2. **Schema expansion (1 PR)**: `AggregateRating` on Restaurant, `BreadcrumbList` helper + use on subpages, `MenuItem`/`Menu` JSON-LD on `/menu`.
3. **Instrumentation (1 PR)**: GSC verification tag, Vercel Web Analytics, GA4 events on key CTAs.
4. **Content/data tightening (ongoing)**: menu descriptions, FAQ section + `FAQPage` schema, blog scaffolding.

## Critical Files

- `lib/seo.ts` — single point of truth; add `buildBreadcrumbJsonLd`, `buildMenuJsonLd`, env-driven `siteUrl`.
- `app/layout.tsx` — `viewport` export, `next/font`, GSC verification.
- `app/sitemap.ts` — stable `lastModified`, include dynamic menu paths when they exist.
- `app/page.tsx` — extend JSON-LD scripts.
- `app/menu/page.tsx` — emit `Menu` + `MenuItem` JSON-LD.
- `next.config.ts` — add legacy host redirect.
- `app/globals.css` — drop the `@import` once `next/font` lands.

## Verification

After any SEO change, run:

1. **Rich Results Test** — `https://search.google.com/test/rich-results` against the deployed URL for `/` and `/menu`.
2. **Schema validator** — `https://validator.schema.org/` for each emitted JSON-LD block.
3. **`view-source:` on the deployed page** — confirm canonical, OG, Twitter, and JSON-LD render server-side (not after hydration).
4. **Lighthouse SEO category** — should be 100; any drop is a regression.
5. **PageSpeed Insights (mobile)** — track LCP/CLS before/after font migration.
6. **GSC URL Inspection** — for any new schema, confirm Google parses it without errors a few days after deploy.
7. `curl -I https://www.tandooricorner.sg/sitemap.xml` — `200`, `text/xml`.
8. `curl -I https://www.tandooricorner.sg/robots.txt` — `200`, contains `Sitemap:` line.
