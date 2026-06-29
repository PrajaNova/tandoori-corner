<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Tandoori Corner Project Instructions

## Stack

- Pnpm workspace with app packages under `apps/`.
- `apps/tc-web-app` is the Next.js 16 App Router web app with TypeScript.
- `apps/rc-backend` is the Fastify TypeScript backend for restaurant services.
- Admin backend write routes use `ADMIN_API_TOKEN` bearer auth.
- Backend mutations must write `AuditLog` rows via the shared audit service.
- Notification providers must sit behind the shared email/WhatsApp adapter boundary.
- Tailwind CSS 4 uses theme tokens in `apps/tc-web-app/app/globals.css` and `apps/tc-web-app/theme/`.
- Biome is the formatter/linter. Tailwind directives are enabled in `biome.json`.
- Package manager is `pnpm`.

## Work Scope

- Active web product work lives in App Router routes under `apps/tc-web-app/app/`, with `/` as the home route and real pages such as `/menu`, `/experience`, `/checkout`, and `/story`.
- Put reusable web components in `apps/tc-web-app/components/`.
- Keep shared shadcn-style primitives in `apps/tc-web-app/components/ui/`.
- Put backend API routes, services, and adapters in `apps/rc-backend/src/`.
- Do not create `src/` or version folders such as `app/v1` or `components/v1`; use Git branches for alternate versions.
- Treat `skills/` as local project guidance created by the user. Before work that matches a skill folder, read the relevant `skills/<name>/skill.md` file and follow it.
- The current local skill source includes `skills/schadcn/skill.md`.

## Design Direction

- Use https://www.tandooricorner.com.sg/ as the canonical source for brand identity, colors, logo treatment, imagery, copy/content, restaurant details, menu language, and booking/order wording.
- When adding or changing brand/content details, verify against the live site instead of guessing from memory or inventing new restaurant facts.
- Follow the extracted Tandoori Corner theme:
  - Body/UI font: `Raleway`.
  - Display heading font: `Kaushan Script`.
  - Script accent font: `Great Vibes`.
  - Primary Tailwind tokens: `tandoori`, `tandoori-dark`, `cream`, `ink`, `sage`.
  - Semantic shadcn tokens: `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`.
- Prefer theme tokens such as `bg-primary`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-brand-dark`, `text-brand-gold`, and `text-leaf`.
- Build actual usable app sections/components, not placeholder marketing copy, unless the task is explicitly a preview.
- Keep restaurant navigation simple and action-focused.

## Component Rules

- Use TypeScript React components.
- Client components must include `"use client"` only when they need browser state, effects, or event handling.
- Use accessible buttons for actions and anchors for navigation.
- Keep desktop and mobile states complete when building navigation or booking flows.

## Verification

- Run `pnpm lint` after code changes.
- Run `pnpm build` after page, routing, Tailwind theme, component, or backend service changes.
- Run `pnpm test:e2e` after adding or changing Playwright-covered flows.
- If the dev server is already running, smoke-check changed routes such as `/`.
- Booking writes live under `apps/rc-backend/src/routes/bookings.ts`; keep public booking creates rate-limited, admin status changes auth-guarded, and notifications behind `NotificationService`.
- Online order writes live under `apps/rc-backend/src/routes/orders.ts`; keep customer creates rate-limited, Stripe webhook handling behind `PaymentService`, admin status changes auth-guarded, and order notifications behind `NotificationService`.
- Event enquiry writes live under `apps/rc-backend/src/routes/event-enquiries.ts`; keep webhook intake token-guarded and lifecycle changes audit-logged.
- Web SEO metadata and JSON-LD live in `apps/tc-web-app/lib/seo.ts`; use `buildPageMetadata()` and `JsonLd` instead of hand-writing route meta tags.



"Set up GA4 tracking for signups"
→ Uses analytics skill

"Create a 5-email welcome sequence"
→ Uses emails skill
You can also invoke skills directly:

/cro
/emails
/seo-audit
Skill Categories
Conversion Optimization
cro - Pages and forms
signup - Registration flows
onboarding - Post-signup activation
popups - Modals and overlays
paywalls - In-app upgrade moments
Content & Copy
copywriting - Marketing page copy
copy-editing - Edit and polish existing copy
cold-email - B2B cold outreach emails and sequences
emails - Automated email flows
social - Social media content
image - AI image generation, design tools, and optimization
SEO & Discovery
seo-audit - Technical and on-page SEO
ai-seo - AI search optimization (AEO, GEO, LLMO)
programmatic-seo - Scaled page generation
site-architecture - Page hierarchy, navigation, URL structure
competitors - Comparison and alternative pages
schema - Structured data
Paid & Distribution
ads - Google, Meta, LinkedIn ad campaigns
ad-creative - Bulk ad creative generation and iteration
social - Social media scheduling and strategy
Measurement & Testing
analytics - Event tracking setup
ab-testing - Experiment design
Retention
churn-prevention - Cancel flows, save offers, dunning, payment recovery
Growth Engineering
co-marketing - Partner identification and joint campaigns
free-tools - Marketing tools and calculators
referrals - Referral and affiliate programs
Strategy & Monetization
marketing-ideas - 140 SaaS marketing ideas
marketing-psychology - Mental models and psychology
launch - Product launches and announcements
pricing - Pricing, packaging, and monetization
Sales & RevOps
revops - Lead lifecycle, scoring, routing, pipeline management
sales-enablement - Sales decks, one-pagers, objection docs, demo scripts
