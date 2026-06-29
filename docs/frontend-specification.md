# Frontend Specification

## Apps

- Customer app: `apps/tc-web-app`
- Admin app: `apps/tc-admin-app`

Both apps use Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4.

## Customer Routes

- `/`: homepage with hero, menu preview, booking form, amenities, specials, testimonials, FAQ, and footer.
- `/menu`: browsable menu with cart entry.
- `/order`: ordering catalog and floating cart.
- `/checkout`: customer contact, fulfillment details, order summary, and order submission.
- `/catering`: catering package overview.
- `/catering/build`: build-your-own catering package flow.
- `/catering/[package]`: package detail page.
- `/private-events`: event venue content and enquiry form.
- `/story`: restaurant story content.

## Admin Routes

- `/menu`: category and item management.
- `/categories/new`, `/categories/[id]/edit`
- `/items/new`, `/items/[id]/edit`
- `/bookings`: booking list and status update.
- `/event-enquiries`: enquiry list and status update.
- `/orders`: order list and status update.

## Design System

Use the existing theme and tokens:

- Body/UI font: `Raleway`
- Display heading font: `Kaushan Script`
- Script accent font: `Great Vibes`
- Tokens: `tandoori`, `tandoori-dark`, `cream`, `ink`, `sage`
- Semantic tokens: `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`

Reusable customer components live in `apps/tc-web-app/components/`. Shared UI primitives live in `apps/tc-web-app/components/ui/`.

## Data Access

Customer server-side data fetchers:

- `apps/tc-web-app/lib/menu.ts`
- `apps/tc-web-app/lib/catalog.ts`
- `apps/tc-web-app/lib/catering.ts`

Customer write forms call `NEXT_PUBLIC_API_BASE_URL`, defaulting to `http://localhost:4000`.

Admin data access is centralized in `apps/tc-admin-app/lib/api.ts`.

## SEO

Route metadata and JSON-LD use `apps/tc-web-app/lib/seo.ts` and `apps/tc-web-app/components/seo/JsonLd.tsx`.

Public SEO routes must have:

- title
- description
- canonical URL
- Open Graph metadata
- Twitter card metadata
- one rendered `h1`
- relevant JSON-LD

Transactional `/checkout` is noindex and excluded from the sitemap.

## Accessibility

- Use anchors for navigation and buttons for actions.
- Keep form labels associated with controls.
- Keep mobile and desktop navigation complete.
- Preserve one page-level heading per route.
