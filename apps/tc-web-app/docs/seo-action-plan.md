# SEO Action Plan — Get to A+ Across the Board

Operational follow-up to `seo-review.md`, driven by the SEOptimer audit of `tandooricorner.sg` (19 May 2026). This is the doc to track for "what to ship next to lift each grade."

## Baseline (SEOptimer, 19 May 2026)

| Category | Grade | Headline issue |
|---|---|---|
| Overall | **C** | 21 recommendations |
| On-Page SEO | **A-** | Keywords `tcb`, `bar`, `balestier plaza`, `alfresco` not in `<title>` / meta; word count 490 |
| GEO (LLM/AI) | **F** | No Organization/Person schema, no `llms.txt`, 0% rendered content |
| Links | **F** | 0 backlinks, 0 referring domains |
| Usability | **C** | Mobile PSI 57 (LCP 9.8 s); iframe present (already lazy) |
| Performance | **D+** | 14.82 MB page weight (13.27 MB = hero video); JS error reported |

## Target

Every category at **A** or **A+** after PR-A + PR-B + PR-C + PR-D ship, plus the listed off-platform DNS / Google Business Profile / outreach work.

---

## PR-A — Content & Metadata (lifts On-Page SEO to A+)

| Action | File | Notes |
|---|---|---|
| Weave `TCB Bar`, `Balestier Plaza`, `alfresco` into root title | `app/layout.tsx`, `lib/seo.ts` | Both `title.default` and the root `description` |
| Update per-route descriptions with keyword variants | `lib/seo.ts` `seoRoutes` | Hit `tcb`, `bar`, `alfresco`, `balestier` consistently |
| Expand on-page text past 700 words | new `components/home/sections/AboutBalestier.tsx` rendered from `HomePage` | Two evergreen paragraphs: about Balestier Plaza location and the North Indian / TCB Bar approach |
| Confirm every `<Image>` has `alt` or `alt="" + aria-hidden` | grep `components/**` | Audit closes the "2 of 15 missing alt" finding |
| Add `youtube` / `linkedin` to `restaurantSeo.sameAs` (optional now, wired-up later) | `lib/seo.ts` | Only render in footer when set |

## PR-B — Identity Schema, Breadcrumbs, llms.txt (lifts GEO from F to A-)

| Action | File | Notes |
|---|---|---|
| Add `buildOrganizationJsonLd()` and emit on every page | `lib/seo.ts`, `app/layout.tsx` | Adds `@id`, `logo`, `sameAs`, `contactPoint` |
| Add `buildBreadcrumbJsonLd()` and emit on `/menu`, `/story`, `/experience` | `lib/seo.ts`, each page | One-line per page |
| Add `buildMenuJsonLd()` from `data/menu.ts` | `lib/seo.ts`, `app/menu/page.tsx` | Emit `Menu` → `MenuSection` → `MenuItem` |
| Add `public/llms.txt` | new file | Brand summary, key pages, NAP, links to menu / hours |
| Add `AggregateRating` to Restaurant schema | `lib/seo.ts` `buildRestaurantJsonLd` | Source from Google rating shown in hero badge (`4.5★`) until live API |

### PR-B follow-up — Identity Schema enrichment (closes SEOptimer "Identity Schema" finding)

The initial `buildOrganizationJsonLd()` shipped with `@id`, `name`, `logo`, `sameAs`, and a `contactPoint`. SEOptimer's AI-search guidance asks for richer entity-disambiguation signals so LLMs answer brand queries with confidence. Enriched in-place (no new Person schema, no new pages):

| Field | Source |
|---|---|
| `description`, `slogan`, `foundingDate` | New constants in `restaurantSeo` |
| `address` (`PostalAddress`), `telephone`, `email` | Promoted to root of Organization (still inside `contactPoint` too) |
| `areaServed` | `["Singapore", "Balestier", "Novena"]` |
| `knowsAbout` | North Indian cuisine, Tandoori cooking, Indian catering Singapore, Alfresco dining Singapore, Cocktail bar |
| `knowsLanguage` | `["en", "en-SG"]` |
| `image`, `mainEntityOfPage` | Mirror Restaurant for Organization-only crawls |

`Restaurant` schema continues to own `aggregateRating` and `openingHoursSpecification`; the two entities cross-link by `@id` so LLMs see one coherent graph.

## PR-C — Performance (lifts Performance / Usability)

| Action | File | Notes |
|---|---|---|
| Re-encode hero video to AV1/WebM + smaller MP4, host on Vercel Blob | `components/home/sections/Hero.tsx`, asset pipeline | Single biggest win; mobile already serves poster — desktop will drop from 13 MB to ~1-2 MB |
| Migrate Google Fonts from `@import` to `next/font/google` | `app/layout.tsx`, `app/globals.css` | Removes render-blocking stylesheet round-trip |
| Audit `next.config.ts` redirect chain (SEOptimer flagged 0.63 s mobile / 0.19 s desktop redirect cost) | `next.config.ts` | Confirm only one 301 hop from any entrypoint to canonical |
| Reproduce and fix the reported `SyntaxError: Unexpected token '{'` | DevTools on prod | Likely a stale chunk or a third-party script; will not regress because we'll add CI Lighthouse |
| Iframe is already `loading="lazy"` with `title` | `components/layout/AppFooter.tsx:69-77` | **Already mitigated** — call this out so the next audit doesn't re-flag it |

## PR-D — Analytics & Verification (closes the analytics-missing finding)

| Action | File | Notes |
|---|---|---|
| Add `<Analytics />` from `@vercel/analytics/next` | `app/layout.tsx` | Cookie-less, GDPR-friendly |
| Add `<SpeedInsights />` from `@vercel/speed-insights/next` | `app/layout.tsx` | Real-user CWV |
| Add GA4 via `next/script strategy="afterInteractive"`, gated on `NEXT_PUBLIC_GA_ID` | `app/layout.tsx` | Only renders if env var set |
| Add Facebook Pixel via `next/script`, gated on `NEXT_PUBLIC_FB_PIXEL_ID` | `app/layout.tsx` | Optional, off by default |
| Add `verification.google` from `NEXT_PUBLIC_GSC_VERIFICATION` | `lib/seo.ts` / `app/layout.tsx` | Lets owner verify GSC without redeploy |

---

## Off-Platform (Non-Code) — Required for All-A+

These cannot be solved in the repo. Owner / ops action items:

### DNS

- **DMARC** — add TXT record at `_dmarc.tandooricorner.sg`:
  ```
  v=DMARC1; p=quarantine; rua=mailto:dmarc@tandooricorner.sg; fo=1
  ```
- **SPF** — add TXT record at `tandooricorner.sg` (adjust for actual mail provider):
  ```
  v=spf1 include:_spf.google.com -all
  ```
- Confirm both with `dig +short TXT _dmarc.tandooricorner.sg` and `dig +short TXT tandooricorner.sg`.

### Google Business Profile

1. Claim/verify the GBP for `Tandoori Corner` at `400 Balestier Road #01-12 Balestier Plaza`.
2. NAP must be byte-identical to `restaurantSeo` in `lib/seo.ts`. **Any drift here is the largest local-SEO penalty.**
3. Set the website URL on GBP to `https://www.tandooricorner.sg/`.
4. Add the GBP profile URL to `restaurantSeo.sameAs`.
5. Add menu link, primary category ("Indian restaurant"), secondary categories, attributes (alfresco seating, pet-friendly, etc.), full photo set, weekly hours.
6. Respond to every Google review within 48 hours.

### Citations (NAP must match)

Zomato, TripAdvisor (already linked), Foursquare, OpenRice, HungryGoWhere, Burpple, Yelp SG, Wongnai. Audit quarterly.

### Backlinks

Outreach list:
- HungryGoWhere — restaurant directory submission + paid feature
- SETHLUI, Ladyironchef, Miss Tam Chiak — Singapore food bloggers
- Burpple — restaurant page + curated lists
- Time Out SG — pitch a feature on Balestier dining
- OpenRice SG
- Local hotel concierge listings (within walking distance of Balestier Plaza)

### Social Profiles

- Create YouTube channel → add `restaurantSeo.sameAs.youtube` and surface in footer.
- Create LinkedIn page → same.
- Existing X profile (`https://x.com/TandooriCornerS`) — already wired into the footer via `contact.social.x`. Add to `sameAs` so Organization schema picks it up.

---

## SEOptimer Findings — False Positives / Already Mitigated

Skip these in re-audit responses:

- **Inline styles** — Every `position:absolute;height:100%;...` flagged is `next/image`'s internal wrapper `<span>`. Not editable in app code. The single `opacity:0;transform:translateY(18px)` is a `motion/react` initial that will disappear when `motion/react` is dropped from the affected component.
- **iFrames present** — The only iframe is the Google Maps embed in `components/layout/AppFooter.tsx`, already `loading="lazy"` with a `title=`. Acceptable use.
- **HTTP/2 "outdated"** — Vercel serves HTTP/2 and HTTP/3. SEOptimer's probe likely connected to the non-www host before the 301 — verify with `curl -I --http2 https://www.tandooricorner.sg/`. If the response shows `HTTP/2`, no action.
- **Schema.org "not detected"** (general) while LocalBusiness shows ✓ — SEOptimer reads `Restaurant` (which extends `LocalBusiness`) but doesn't classify it as generic Schema.org. Adding `Organization` (PR-B) makes both rows green.
- **Hreflang missing** — Intentional. Single locale `en_SG`. Do not add hreflang on a single-language site (creates GSC warnings).
- **AMP missing** — Intentional. AMP is deprecated by Google.

---

## Re-Audit Checklist (After Each PR Ships)

1. Re-run **SEOptimer** at `https://seoptimer.com/tandooricorner.sg`.
2. Run **PageSpeed Insights** on mobile and desktop.
3. Run **Google Rich Results Test** on `/` and `/menu`.
4. Run `curl -sI https://tandooricorner.sg/` — confirm exactly **one** 301 hop.
5. Run `curl -s https://www.tandooricorner.sg/llms.txt` — must return 200.
6. View source on `/` — confirm all JSON-LD blocks render server-side.
7. GSC URL Inspection on `/` and `/menu` — confirm schema parsing.
8. `dig` checks for DMARC + SPF after DNS propagation.

## Expected Trajectory

| Category | Before | After PR-A | After PR-B | After PR-C | After PR-D + DNS + GBP |
|---|---|---|---|---|---|
| On-Page SEO | A- | **A+** | A+ | A+ | A+ |
| GEO | F | F | **A-** | A | A |
| Links | F | F | F | F | **C → A** (gated on outreach) |
| Usability | C | C | C | **A-** | A |
| Performance | D+ | D+ | D+ | **A-** | A |
| Overall | C | B- | B+ | A | **A+** |

Links category cannot reach A from code alone — it requires sustained backlink acquisition (PR-A footer content + the outreach list above).
