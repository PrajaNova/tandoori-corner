# SEO and AI Search Review

Date: 2026-06-29

Scope: `apps/tc-web-app`, targeted to `https://www.tandooricorner.sg/`, compared against the live Tandoori Corner content, the local `seo-audit` and `ai-seo` skills, and the installed Next.js 16 metadata / JSON-LD docs.

## Current state

The app already has the important SEO base:

- `lib/seo.ts` centralizes canonical URL, NAP, titles, descriptions, OG/Twitter metadata, Restaurant schema, Organization schema, Menu schema, FAQ schema, breadcrumbs, and JSON-LD escaping.
- `app/robots.ts` allows public crawl access, disallows checkout, includes the sitemap, and explicitly allows major AI/search crawlers.
- `app/sitemap.ts` lists public SEO routes for home, menu, online ordering, catering, event-space booking, contact, gallery, reviews, story, and dynamic catering package URLs.
- `public/llms.txt` gives AI assistants a plain-text summary of location, contact details, key pages, and conversion actions: book a table, order online, book event space, and request catering.
- `components/layout/providers/AnalyticsScripts.tsx` already supports Vercel Analytics, Speed Insights, GA4, and Facebook Pixel behind environment variables.

## Changes made

1. Added `viewport.themeColor` in `app/layout.tsx`.
   Why: Next.js 16 documents viewport color through the `viewport` export. This gives browsers a brand-consistent tab/status-bar color without adding scripts or custom head tags.

2. Replaced stale "15 years" SEO copy with "since 2008".
   Why: The live site says Tandoori Corner was established in 2008. Fixed-year copy is less likely to go stale than anniversary math in page metadata, Organization schema, and `llms.txt`.

3. Corrected canonical, sitemap, and AI-readable URLs to `https://www.tandooricorner.sg`.
   Why: This is the target public domain. Search result URLs, JSON-LD entity IDs, sitemap entries, and `llms.txt` should point to the same canonical host.

4. Tightened conversion-intent page metadata and `llms.txt`.
   Why: The target outcomes are table bookings, online orders, event-space enquiries, and catering requests. The sitemap already exposes those pages; the AI-readable file now names them directly.

## Recommendations not implemented

- No new keyword pages. The site is a single-location restaurant; thin programmatic pages would add maintenance and risk without enough evidence.
- No hreflang. The site is English-only for Singapore, so hreflang has no useful alternate URL cluster.
- No new AI-only content. The existing `llms.txt`, schema, and visible FAQ/menu content cover AI extraction without writing separate content for crawlers.
- No off-site SEO changes in code. Google Business Profile, directory citations, reviews, and backlinks matter for local SEO, but they are owner/ops work.

## Next useful work

1. Submit `https://www.tandooricorner.sg/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
2. Align DNS/hosting so `https://www.tandooricorner.sg/` resolves as the preferred host or redirects in the intended direction.
3. Keep Google Business Profile NAP byte-identical to `restaurantSeo`.
4. Re-run Rich Results Test on `/`, `/menu`, `/order`, `/private-events`, and `/catering`.
5. Measure mobile LCP; if it is still high, optimize the hero media before adding any more page content.
