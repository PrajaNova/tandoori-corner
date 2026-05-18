# Review: tc-web-app — React 19 / Next.js 16 Improvements

## Context

`tc-web-app` is a Next.js 16 App Router site for Tandoori Corner, a restaurant in Singapore. The codebase is small, well-organized, and SEO-aware — but several Next.js 16 / React 19 capabilities are underused, the hero ships a 13 MB video, and the app had no `loading.tsx` / `error.tsx` boundaries when this review was written. This review catalogs concrete improvements to push more work to the server, reduce client JS, and improve perceived performance, accessibility, and resilience.

## Implementation Update

Implemented:
- Mobile no longer loads the hero MP4 source; the hero uses a priority poster image on mobile and keeps the MP4 for desktop only.
- The decorative hero video is marked `aria-hidden` and removed from keyboard navigation.
- The floating chatbot now loads through a lazy client island instead of being imported directly by the root layout.
- The header was split so the static contact strip renders as a server component while the interactive nav is isolated in a smaller client component.
- The mobile header menu no longer imports `motion/react`.
- Added `loading.tsx` for `/menu`, `/checkout`, and `/experience`.
- Added `checkout/error.tsx` and a branded `not-found.tsx`.
- Moved JSON-LD rendering to `next/script` with stable script ids.
- Removed the unused `data.ts` design-variant file and its unused `VariantDetail` component.

Deferred:
- Re-encoding the hero video into AV1/WebM and smaller MP4 outputs still needs a media pipeline such as `ffmpeg`.
- Full PPR / Cache Components adoption is intentionally deferred until menu/content data moves behind real async accessors or the backend API.
- The header can be split further if needed, but the current change already removes static contact-strip work and `motion/react` from the always-loaded header path.

## Overall Verdict

Strengths: server-first page files, proper `Metadata` on every route, JSON-LD restaurant schema, sensible client/server split, hooks confined to interactive surfaces.
Main gaps: hero asset weight, animation library in root layout path, hardcoded data with no caching primitives, missing route-level UX boundaries, no PPR / Cache Components opt-in.

---

## High-Impact Recommendations

### 1. Fix the 13 MB hero video (`public/hero_intro.mp4`)
- File: `components/home/sections/Hero.tsx:12-21`
- It's `autoPlay` + `preload="metadata"` on a 13 MB MP4 — first paint pays for it on every device.
- Status: partially implemented. Mobile now renders a poster image and skips the MP4 source; desktop still uses the original MP4 until a proper media encode step exists.
- Actions:
  - Re-encode to two outputs: AV1/WebM (~1–2 MB) + H.264 MP4 fallback. Provide both via `<source>`.
  - Add a static `poster` JPG/WebP so first paint isn't black.
  - Move the file off `/public` to a CDN or Vercel Blob; `/public` ships with every deploy.
  - On mobile (`md:` breakpoint matters here), skip the video entirely and render the poster — saves bandwidth where autoplay is least useful.

### 2. Replace the static logo with `next/image`
- 196 KB PNG used in `components/layout/AppHeader.tsx` — convert to WebP/SVG and serve via `next/image` for automatic responsive sizes.

### 3. Eliminate the avoidable `"use client"` wrapper
- `components/home/HomeChatBot.tsx` is a 1-line wrapper marked `"use client"` only to import a client component. The root layout imports it, which forces the chatbot bundle into every page's initial graph.
- Action: delete the wrapper, import `FloatingChatBot` directly in `app/layout.tsx:50`, and lazy-load it with `next/dynamic({ ssr: false })` so it loads after hydration.
- Status: implemented through `components/home/LazyChatBot.tsx`, a small client island using `next/dynamic({ ssr: false })`.

### 4. Add `loading.tsx` and `error.tsx` for interactive routes
- Missing entirely. Add at minimum:
  - `app/menu/loading.tsx` — skeleton cards matching `MenuItemCard`.
  - `app/checkout/loading.tsx` and `app/checkout/error.tsx` — checkout failure UX matters.
  - `app/experience/loading.tsx`.
  - `app/not-found.tsx` for a branded 404.
- These are streamable Suspense boundaries — they cost almost nothing and meaningfully improve perceived performance once any of these routes start fetching real data.
- Status: implemented for `/menu`, `/checkout`, `/experience`, checkout errors, and global not-found.

### 5. Lift `AppHeader` work to the server
- `components/layout/AppHeader.tsx:1` is a single client component containing: static top-strip, nav links, scroll-detector, mobile menu, and `motion/react` animations. The top contact strip and nav markup are static and don't need to ship as JS.
- Refactor into three components:
  - `AppHeader.tsx` (server) — renders the contact strip + nav scaffold.
  - `HeaderScrollSurface.tsx` (client) — only the `useEffect` scroll listener + transparent/solid class toggle, wraps children.
  - `MobileMenu.tsx` (client, dynamic-imported) — the `AnimatePresence` panel.
- Effect: removes `motion/react` and `usePathname` from the always-loaded chunk; ~30–80 KB of JS off every page.
- Also: replace the scroll `useEffect` with a CSS `IntersectionObserver` sentinel or `scroll-timeline` where supported — avoids JS for the visual effect entirely.
- Status: partially implemented. `AppHeader.tsx` now renders the static contact strip on the server and delegates interactive navigation to `HeaderNav.tsx`. A deeper CSS-only scroll treatment remains deferred.

### 6. Move env-derived config server-side
- `AppHeader.tsx:26-43` reads `NEXT_PUBLIC_*` env vars inside a client component, so the values are baked into the client bundle. They're fine to expose, but reading them on the server (once the header is server-split per #5) lets you drop the `NEXT_PUBLIC_` prefix and avoid leaking the convention.

### 7. Move hardcoded data to the `data` layer the right way
- Today `data/menu.ts`, `data/home.ts`, etc. are imported directly into server components — fine, but you lose any path to caching, CMS, or per-request variation.
- Wrap each in an async accessor (`getMenu()`, `getHomeContent()`) that is `"use cache"` (Next 16 Cache Components) or `unstable_cache`-wrapped. Even though the source is static today, this is the seam you'll want when menu data moves to a CMS — and it's free.
- Pair with `export const revalidate = 3600;` on the relevant pages or use `cacheLife`/`cacheTag` from the new Cache Components API for tag-based invalidation later.

### 8. Opt into Partial Prerendering (PPR) / Cache Components
- Next.js 16 supports `experimental.ppr = "incremental"`. The home and `/story` pages are static shells with a couple of dynamic islands (chatbot, possibly reviews). PPR streams the static shell instantly while the dynamic islands resolve under Suspense.
- Steps: enable in `next.config.ts`, mark the islands (`GoogleReviewsSection`, `FloatingChatBot`) as Suspense boundaries with skeleton fallbacks, export `experimental_ppr = true` per route.

### 9. Avoid `motion/react` for one-shot mounts
- The mobile menu enter/exit can be done with Tailwind + CSS transitions (`data-state="open"` pattern) and shaves the framer/motion runtime off the critical path. Reserve `motion/react` for genuinely complex sequences.
- Status: implemented for the header mobile menu.

### 10. JSON-LD via `next/script` strategy="beforeInteractive"
- `app/page.tsx:7-32` injects JSON-LD with `dangerouslySetInnerHTML`. Works, but moving it to `next/script id="restaurant-schema" type="application/ld+json"` is cleaner and ensures it survives streaming correctly.
- Status: implemented with stable `restaurant-schema` and `website-schema` script ids.

---

## Smaller / Hygiene Items

- **Cart hook hydration** — `hooks/use-cart.ts` uses the localStorage-on-effect pattern, which is correct but causes a flash of empty cart. If the cart shows badge counts in the header, render `null` until hydrated (suppress hydration mismatch) or move count to a portal-driven client island.
- **`MenuClient` / `CheckoutClient` size** — code-split modals, filter panels, and any item-detail overlays via `next/dynamic`. The top-level page Suspense boundary then progressively reveals.
- **Images everywhere** — audit all `<img>` usage; switch decorative backgrounds to CSS `background-image` where possible (no layout shift, no priority eviction), use `next/image` with `priority` only on the LCP image.
- **`viewport` + `themeColor`** — Next 16 wants these in a separate `export const viewport: Viewport` (not in `metadata`). Verify `app/layout.tsx:8` and `lib/seo.ts` aren't bundling them into `metadata`.
- **`generateStaticParams` for future dynamic routes** — when menu items become individual pages (`/menu/[slug]`), wire `generateStaticParams` so they SSG at build time.
- **`react-server-dom-webpack` boundary check** — completed. The unused `data.ts` design-variants file and unused `VariantDetail` component were removed.
- **`biome` lint pass** — run `pnpm lint` after refactors; the project uses Biome 2.4.
- **Accessibility** — `Hero.tsx` has no `aria-label` on the decorative video; add `aria-hidden="true"` to the `<video>` since it's purely background.
- **`robots.ts` / `sitemap.ts`** — verify they're emitting absolute URLs based on `restaurantSeo.siteUrl`, not the preview/redirect host.
- **Bundle analyzer** — add `@next/bundle-analyzer` as a one-time dev dependency to confirm where weight is going before/after the changes above.

---

## Suggested Execution Order

1. Quick wins (low risk, high signal): items **1, 2, 3, 4, 10, 9** — pure asset and config work.
2. Structural: items **5, 6** — refactor header into server/client split.
3. Architectural: items **7, 8** — introduce cached data accessors and enable PPR.
4. Polish: hygiene list above.

## Critical Files to Modify

- `next.config.ts` — PPR opt-in, image domains review.
- `app/layout.tsx` — dynamic chatbot import.
- `components/layout/AppHeader.tsx` — server/client split.
- `components/home/sections/Hero.tsx` — video sources, poster, mobile fallback.
- `components/home/HomeChatBot.tsx` — delete.
- `app/menu/loading.tsx`, `app/checkout/loading.tsx`, `app/checkout/error.tsx`, `app/not-found.tsx` — new.
- `data/*.ts` — wrap exports in async cached accessors.
- `app/page.tsx` — JSON-LD via `next/script`; consider `experimental_ppr = true`.

## Verification

After implementing any subset:

1. `pnpm --filter tc-web-app build` — confirm build succeeds; inspect the route-by-route output for `(Static)` vs `(Dynamic)` markers.
2. `pnpm --filter tc-web-app dev` — load `/`, `/menu`, `/checkout`, `/experience`, `/story` and confirm visuals unchanged.
3. Lighthouse run on `/` (mobile) — expect LCP improvement primarily from hero-video changes; TBT improvement from header split + chatbot lazy-load.
4. `next build` with `@next/bundle-analyzer` enabled — compare `app/page` initial JS before and after.
5. Throttle to "Slow 4G" in DevTools and confirm `loading.tsx` skeletons appear on `/menu` and `/checkout`.
6. View page source on `/` — confirm JSON-LD, OG tags, and canonical URLs render server-side.
7. `curl -I https://<preview-url>/` — confirm correct `Cache-Control` headers once PPR/Cache Components are enabled.
