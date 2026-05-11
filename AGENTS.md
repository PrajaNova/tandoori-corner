<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Tandoori Corner Project Instructions

## Stack

- Next.js 16 App Router with TypeScript.
- Tailwind CSS 4 uses theme tokens in `app/globals.css` and `app/theme/`.
- Biome is the formatter/linter. Tailwind directives are enabled in `biome.json`.
- Package manager is `pnpm`.

## Work Scope

- Active product work lives in App Router routes under `app/`, with `/` as the home route and real pages such as `/menu`, `/experience`, `/checkout`, and `/story`.
- Put reusable app components in `components/`.
- Keep shared shadcn-style primitives in `components/ui/`.
- Do not create `src/` or version folders such as `app/v1` or `components/v1`; use Git branches for alternate versions.
- Treat `agent/skills/` as local project guidance created by the user. Before work that matches a skill folder, read the relevant `agent/skills/<name>/skill.md` file and follow it.
- The current local skill source includes `agent/skills/schadcn/skill.md`.

## Design Direction

- Use https://www.tandooricorner.com.sg/ as the canonical source for brand identity, colors, logo treatment, imagery, copy/content, restaurant details, menu language, and booking/order wording.
- When adding or changing brand/content details, verify against the live site instead of guessing from memory or inventing new restaurant facts.
- Follow the extracted Tandoori Corner theme:
  - Body font: `Open Sans`.
  - Heading font: `Merriweather`.
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
- Run `pnpm build` after page, routing, Tailwind theme, or component changes.
- If the dev server is already running, smoke-check changed routes such as `/`.
