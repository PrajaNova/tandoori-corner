# Split-Persona Dual-Path Dev Tickets

## P0 - Phase A

### A1. Add Visual Tokens

Implement the dark warm token set in Tailwind/CSS variables.

Acceptance criteria:

- Tokens match `tokens.css`.
- Theme supports charcoal base, saffron CTA, amber accent, warm ivory text.
- Contrast passes WCAG AA for primary buttons and text.

### A2. Build Sticky Header

Create responsive header with logo, center nav, dietary toggle, order button, reserve button.

Acceptance criteria:

- Desktop nav: Our Story, Menu, Vibe & Gallery, Promos, TCB Bar.
- Right actions: Veg/Vegan toggle, Order Online outline, Reserve Table saffron.
- Mobile nav uses sheet/drawer.
- Keyboard navigation passes.

### A3. Build Split Hero

Build DINE/VIBE hero with two CTA tiles.

Acceptance criteria:

- DINE and VIBE visible in first mobile viewport.
- One CTA per tile.
- ARIA labels present.
- Hero images/video optimized and LCP under 2.5s target.

### A4. Promo Banner With Countdown

Create promo banner from CMS-ready data.

Acceptance criteria:

- Supports daily rotation.
- Optional countdown.
- Single `Book Now` CTA.
- Tracks `promo_click`.

### A5. Native Menu Upgrade

Convert current menu experience into the final filterable menu component.

Acceptance criteria:

- No PDF links as primary menu experience.
- Filters: Veg, Vegan, Gluten-free, price, portion.
- Add-to-order events fire.
- Images lazy-load below first viewport.

### A6. Booking Widget MVP

Build guest checkout reservation flow.

Acceptance criteria:

- Date, time, guest count, contact details.
- Under 4 taps to booking start.
- Tracks `booking_start` and `booking_complete`.
- Provider integration isolated behind adapter.

## P1 - Phase B

### B1. TCB Microsite

Build `/tcb` route with distinct VIBE tone.

Acceptance criteria:

- Cocktail/bar visual tone.
- Capacity/package selector.
- Quote estimate.
- Instant booking or enquiry path.

### B2. Events Calendar

Add TCB weekly schedule and availability.

Acceptance criteria:

- Supports live music, happy hour, private booking windows.
- Structured event data ready for schema.
- Tracks `tcb_quote_start`.

### B3. Social Wall

Add Instagram/TikTok wall with CMS fallback.

Acceptance criteria:

- API-ready adapter.
- Manual CMS fallback.
- UGC posts moderated before display.
- Tracks `social_post_click`.

### B4. Reviews Feed

Add Google/TripAdvisor snippets.

Acceptance criteria:

- Google Places adapter or fallback.
- Updates within 24 hours when live integration is enabled.
- Five-star snippets visible.

## P2 - Phase C

### C1. Schema And Metadata

Add local, menu, event, offer, and FAQ structured data.

Acceptance criteria:

- Rich Results test passes for supported schema.
- Unique metadata per route.
- Open Graph images configured.

### C2. Accessibility Audit

Run audit and fix blockers.

Acceptance criteria:

- WCAG AA pass on homepage, menu, booking, TCB, contact.
- Keyboard-only pass.
- Reduced motion honored.

### C3. Performance Pass

Tune LCP, images, JavaScript, and fonts.

Acceptance criteria:

- Mobile load under 3s.
- LCP under 2.5s.
- No oversized unoptimized images in first viewport.

### C4. A/B Launch Setup

Configure current Vercel vs Split-Persona test.

Acceptance criteria:

- Test runs 2 weeks.
- Measures booking conversion, bounce rate, mobile LCP, DINE/VIBE split.
- GTM debug confirms events.
