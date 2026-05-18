# Code Quality & Design Principles: tc-web-app

A working playbook for keeping this codebase small, reusable, and consistent as it grows. Pairs with `react-nextjs-review.md` (perf/SSR) and `seo-review.md` (search). This doc is about **structure, naming, reuse, and stopping copy-paste**.

## Current State (Snapshot)

Audited the full app. Overall health is good — strong TypeScript discipline, no `any`, no dead code, `@/` aliases everywhere, shadcn primitives consistently reused. The largest client files have now been split; remaining gaps are mostly incremental reuse and tooling policy.

| Area | Status |
|---|---|
| Typing (`any`, `@ts-ignore`, untyped params) | **Clean** — zero occurrences in source |
| Domain types | **Centralized** in `data/types.ts` (single source of truth) |
| `@/` absolute imports | Consistent, no `../../../` |
| shadcn primitive reuse | Good — `Button`, `Card`, `Badge`, `Input` not re-implemented |
| Dead code | None detected |
| `"use client"` discipline | Clean — unnecessary `DailyOffersSection` directive removed |
| File-size limit | Clean for non-data client files — see §1 |
| Duplicated class strings | Improved — typography, motion, and icon button primitives added |
| Magic strings (contact info) | Clean — header/footer read from `lib/seo.ts` contact export |
| Folder organization | Improved — home-only components live under `components/home/` |

## Implementation Status

Completed:
- `MenuClient.tsx` split into menu filters, item details dialog, and cart summary parts.
- `CheckoutClient.tsx` split into checkout form, order summary, empty state, and success state parts.
- `DailyOffers` and `FloatingChatBot` moved under `components/home/`.
- `DailyOffersSection` now renders as a server component.
- Header/footer NAP, map, email, and social links now come from `lib/seo.ts`.
- Added `components/ui/typography.tsx`, `lib/motion.ts`, and the `iconCircle` button size.

Deferred:
- Broad `SectionShell` adoption remains a follow-up because it touches many visual sections.
- Stricter Biome rules and pre-commit tooling remain a separate tooling-policy change.

---

## The Rules (Hard Limits)

These are the conventions we should commit to. They're opinionated and conservative on purpose — the goal is that any contributor can scan a file in under a minute.

1. **No file over ~200 lines.** When you hit it, split. JSX-heavy section components can stretch to ~250 if it's mostly markup, but logic + JSX combined in a `"use client"` file caps hard at 200.
2. **One responsibility per file.** A file owns one component + its tightly coupled subcomponents/types. If you're tempted to add a second exported component, it belongs in its own file.
3. **No `any`, no `as unknown as`, no `@ts-ignore`.** If TypeScript can't express it, write a `lib/types.ts` helper. Today's score is zero — keep it.
4. **No magic strings for shared data.** Phone, address, email, social URLs, hours → `restaurantSeo` in `lib/seo.ts`. If you find yourself typing `"+65"` outside of `lib/seo.ts`, you're doing it wrong.
5. **No inline class string repeated 3+ times.** Lift to a primitive component or a CVA variant.
6. **No new `"use client"` without a reason.** Hooks, event handlers, browser APIs, or `Context`. If none of those, it's a server component.
7. **No raw `<a>` for internal navigation.** Use `next/link`.
8. **No raw `<img>`.** Use `next/image`.
9. **Component name = file name.** `MenuItemCard.tsx` exports `MenuItemCard`. PascalCase files for components, kebab-case for utility files.
10. **Default to server components.** Mark `"use client"` only on the smallest possible leaf.

---

## 1. File-Size Violations (Today)

Top files from current audit (run `find apps/tc-web-app/app apps/tc-web-app/components apps/tc-web-app/hooks apps/tc-web-app/lib apps/tc-web-app/data -type f \( -name '*.ts' -o -name '*.tsx' \) -print0 | xargs -0 wc -l | sort -nr` to refresh):

| File | Lines | Action |
|---|---|---|
| `lib/seo.ts` | 221 | Declarative config — acceptable, keep mostly data/builders |
| `data/menu.ts` | 210 | Data file — fine; not logic |
| `app/menu/MenuClient.tsx` | 185 | Clean — composition/state only |
| `components/home/DailyOffers.tsx` | 184 | Watch; split modal later if touched again |
| `components/home/FloatingChatBot.tsx` | 181 | Watch; extract message-list subcomponent later |
| `app/menu/parts/MenuItemDetailsDialog.tsx` | 169 | Clean |
| `components/layout/AppFooter.tsx` | 142 | Clean |
| `components/layout/HeaderNav.tsx` | 149 | Watch; mobile menu can be its own file |
| `components/ui/button.tsx` | 144 | shadcn-generated — fine |
| `components/common/cards/MenuItemCard.tsx` | 144 | Fine |
| `app/checkout/parts/CheckoutForm.tsx` | 127 | Clean |
| `app/checkout/CheckoutClient.tsx` | 64 | Clean — composition/state only |

Anything else > 200: split before merging the next change to it.

---

## 2. Concrete Refactor: `MenuClient.tsx` (Completed)

This was the single largest cleanup. Current split:

```
app/menu/
  page.tsx                       # server (today)
  MenuClient.tsx                 # composition + state plumbing only
  parts/
    MenuFilters.tsx              # search input + category tabs
    MenuItemDetailsDialog.tsx    # modal, lazy-loaded via next/dynamic
    CartSummary.tsx              # sticky cart pill + drawer (client)
```

Cart state stays in the existing `useCart` hook. Search/filter state stays in `MenuClient` because filtering and category state affect multiple children. The dialog is a `next/dynamic` import so it doesn't ship until first open.

The same split has been applied to `CheckoutClient.tsx`: `CheckoutForm.tsx`, `OrderSummary.tsx`, `CheckoutEmptyState.tsx`, `CheckoutSuccessState.tsx`, and a small composition/state client.

---

## 3. Stop Writing the Same Code Twice

### 3a. Section wrapper (19+ occurrences)

`container mx-auto px-5 sm:px-6 lg:px-12` (and a near-identical `max-w-7xl` variant) is repeated across home sections, menu, checkout, story.

**Action:** `SectionShell` already exists at [components/common/section-shell/SectionShell.tsx](apps/tc-web-app/components/common/section-shell/SectionShell.tsx) — it's just underused. Audit its API, make it the single way to render a page section, and grep-replace existing call sites. Allow variants via a `tone` prop (`"light" | "dark" | "cream"`) instead of letting callers pass their own background classes.

```tsx
// Target call site:
<SectionShell as="section" id="heritage" tone="ink" padded="lg">
  ...content...
</SectionShell>
```

### 3b. SmallCaps / label heading (6+ occurrences)

`text-[10px] uppercase tracking-widest font-bold` repeats in Hero, Heritage, AppFooter, FormField label, Badge base. Build:

```tsx
// components/ui/typography.tsx
export function Eyebrow({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <span className={cn("text-[10px] font-bold uppercase tracking-widest", className)}>{children}</span>;
}
```

Same idea for any other recurring text combo: `<Eyebrow>`, `<DisplayHeading>`, `<SectionHeading>`, `<Lead>`. Co-locate them all in one `typography.tsx` so the system is discoverable.

### 3c. IconButton (5+ occurrences)

`w-10 h-10 rounded-full border border-border flex items-center justify-center hover:...` repeats across header and footer socials.

**Status:** `iconCircle` now exists in `components/ui/button.tsx`, and header/footer social links use the shared button classes.

```tsx
<Button asChild variant="outline" size="icon-circle" aria-label="Instagram">
  <a href={restaurantSeo.sameAs.instagram} target="_blank" rel="noopener noreferrer">
    <Instagram className="h-3.5 w-3.5" />
  </a>
</Button>
```

### 3d. Motion configs (4+ duplicated)

`initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: ... }}` appears in `DailyOffers`, `GoogleReviewsSection`, `FloatingChatBot`.

**Status:** Basic shared motion presets now live in `lib/motion.ts`:

```ts
export const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
export const slideUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
export const transitionSoft = { duration: 0.3, ease: "easeOut" };
```

Better still: per the `react-nextjs-review.md`, replace simple fades with Tailwind transitions and reserve `motion/react` for genuinely complex sequences.

### 3e. Contact info (NAP) magic strings

`components/layout/AppHeader.tsx` and `components/layout/AppFooter.tsx` now import the shared `contact` export from `lib/seo.ts`.

**Rule:** Keep NAP, map, email, and social URLs sourced from `lib/seo.ts`. If a value becomes environment-dependent later, add it to the shared config layer once, not directly in header/footer.

---

## 4. Atomic / Folder Organization

Today `components/` is feature-based, not Atomic Design strict (atoms/molecules/organisms). That's fine and conventional in Next.js apps — don't force a rename.

Adopt this lightly-structured convention and stick to it:

```
components/
  ui/              # shadcn primitives + typography + icon-button (no business logic)
  common/          # cross-feature reusables (cards, forms, section-shell, page-intro, back-link)
  layout/          # app shell (header, nav, footer)
  home/
    sections/      # one file per home page section
  menu/
    parts/         # one file per sub-piece of MenuClient
  experience/
  story/
  checkout/
hooks/             # one hook per file, "use-x.ts" naming
lib/               # framework-agnostic utilities (seo, cart, motion, utils)
data/              # plain data + types
```

### Misplaced files
- `components/DailyOffers.tsx` → `components/home/DailyOffers.tsx` — completed.
- `components/FloatingChatBot.tsx` → `components/home/FloatingChatBot.tsx` — completed.

### Unnecessary `"use client"`
- `components/home/sections/DailyOffersSection.tsx` — completed; it now renders on the server.

---

## 5. Types & Domain Modeling

**Today:** [`data/types.ts`](apps/tc-web-app/data/types.ts) (71 lines) is the canonical home for `MenuItem`, `MenuCategory`, `TeamMember`, `GalleryItem`, `ArticleItem`, `OfferCardItem`, `GoogleReview`, `SectionItem`, `IconKey`. No inline redefinitions found. Keep it that way.

**Rules going forward:**
- Any entity that crosses ≥ 2 files lives in `data/types.ts`.
- Per-component prop types stay inline (`type Props = { ... }`) — don't over-export.
- Discriminated unions for variant data: `type Offer = ComboOffer | FlashOffer | LoyaltyOffer` with a `kind` field, not optional fields everywhere.
- `as const` on every constant array meant for narrowing (`ICON_KEYS = ["leaf","fire","star"] as const`).
- Prefer `type` aliases over `interface` for consistency — pick one. The codebase already uses `type`; stick with it.

---

## 6. Hooks We Should Extract

Today there's only `useCart`. These are candidates the audit flagged:

| Repeated logic | Files | New hook |
|---|---|---|
| `setInterval` carousel rotation | `GoogleReviewsSection` (and any future testimonial carousel) | `useCarousel(items, intervalMs)` returning `{ current, next, prev, pause }` |
| Modal open/close state | `DailyOffers`, future menu item dialog | `useDisclosure()` returning `{ isOpen, open, close, toggle }` |
| Scroll position / scrolled-past-threshold | `HeaderNav` scroll listener | `useScrolledPast(threshold)` |
| Media query / breakpoint | none yet but Hero mobile-vs-desktop logic could use it | `useMediaQuery(query)` |
| Outside-click / Escape-to-close | future dialogs | `useDismissable(ref, onDismiss)` |

Each one is 10-30 lines; put each in its own `hooks/use-*.ts` file. They're the highest-ROI form of reuse — they collapse 4 similar `useEffect` blocks into one tested primitive.

---

## 7. Coding Conventions Checklist

- **Naming:** components PascalCase (`MenuItemCard.tsx`), hooks kebab-case prefixed `use-` (`use-cart.ts`), utilities kebab-case (`seo.ts`, `motion.ts`).
- **Exports:** named exports only — no `export default` outside of `app/**/page.tsx` and `layout.tsx` (Next requires default there).
- **Props shape:** `type Props = { ... }` per component, then `export function Foo({ ... }: Props)`. No `React.FC`.
- **Boolean props:** prefix with `is`/`has`/`should` (`isOpen`, `hasError`).
- **Event handlers:** prefix with `on` for props, `handle` for internal (`onSubmit`, `handleSubmit`).
- **Comments:** default to none; explain only the *why* of non-obvious code (constraint, workaround, surprising decision). Don't restate what JSX does.
- **TODOs:** only with an owner + issue reference (`// TODO(mahendra, #42): switch to GraphQL once API lands`). Otherwise delete it or do it.
- **Imports:** Biome handles ordering — don't fight it.
- **Conditionals in JSX:** ternaries OK for one decision; for two+ branches, extract a variable or a tiny component. No deeply nested `{a && b && c ? ... : ...}`.

---

## 8. Reuse Without Over-Abstracting

Easy to overcorrect. Heuristics:

- **Rule of three.** Don't abstract until the third copy. Two copies are coincidence; three is a pattern.
- **Don't build a primitive for a hypothetical future use case.** YAGNI — we don't ship hypothetical code.
- **A primitive is only useful if it's *easier* to use than re-typing the markup.** If the API has 8 props and 3 children slots, you've made the problem worse.
- **Compose, don't configure.** Prefer `<Card><CardHeader><CardTitle>...` over `<Card title="..." headerVariant="...">`.
- **`cn()` is fine.** The Tailwind + `cn(...)` pattern is the right level of escape hatch — don't replace it with `styled-components` or a wrapper layer.

---

## 9. Lint / Format / Tooling

- Biome 2.4 is already in use (`biome.json` at workspace root, scripts in `package.json`). Make `pnpm lint` a CI gate — failures block merges.
- Consider enabling Biome's `noExplicitAny`, `noNonNullAssertion`, `noUselessFragments`, `useExhaustiveDependencies` rules at `error` severity.
- Add `lefthook` (the monorepo already references it in sbsod-ctv; pattern is familiar) for a pre-commit `biome check --staged`.
- Add a 200-line ESLint/Biome rule (`max-lines` style) at the editor level if available — at minimum, mention it in `AGENTS.md` so reviewers enforce it.
- Drop `@next/bundle-analyzer` as a dev dep; run it occasionally to catch creep.

---

## 10. Reviewer's Checklist (paste into PR template)

Use this on every PR that touches `apps/tc-web-app`:

- [ ] No file in this diff exceeds 200 lines.
- [ ] No `any`, `as any`, `as unknown as`, `@ts-ignore`, `@ts-expect-error`.
- [ ] No new `"use client"` unless a hook, event handler, or browser API justifies it.
- [ ] No duplicated class string (3+ copies) — extracted to a primitive or CVA variant.
- [ ] No hardcoded NAP / social URLs — sourced from `restaurantSeo` in `lib/seo.ts`.
- [ ] All new external links carry `rel="noopener noreferrer"`.
- [ ] All new images use `next/image` with `alt` (or `alt=""` + `aria-hidden` for decoration) and `sizes`.
- [ ] One `<h1>` per page; heading hierarchy is sequential.
- [ ] Domain types live in `data/types.ts`; only per-component `Props` are inline.
- [ ] New components are named PascalCase, file = export name, named export only.
- [ ] `pnpm lint` is green.

---

## Suggested Execution Order

1. **Completed:** day-one cleanup, shared contact config, `MenuClient` split, `CheckoutClient` split, `Eyebrow`, `iconCircle`, and `lib/motion.ts`.
2. **Next cleanup:** apply `SectionShell` more broadly when touching home/story/menu sections.
3. **Hook extractions (opportunistic):** `useDisclosure`, `useCarousel`, `useScrolledPast` — only when a second consumer needs them.
4. **Tooling (separate PR):** turn on stricter Biome rules, add the PR-template checklist, set up the pre-commit hook.

## Verification

After any cleanup PR:

1. `pnpm --filter tc-web-app lint` — must be green.
2. `pnpm --filter tc-web-app build` — must succeed.
3. `git diff --stat` — no file in the diff should be > 200 lines after the change.
4. Manual smoke: load `/`, `/menu`, `/checkout`, `/experience`, `/story` — confirm visuals unchanged.
5. `grep -rn "use client" components app | wc -l` — number should be **flat or lower** after each refactor PR.
6. `rg -t tsx -t ts "any|@ts-ignore|@ts-expect-error" src` — must return zero.
