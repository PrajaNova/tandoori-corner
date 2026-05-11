# Tandoori Corner Split-Persona Dual-Path Redesign

## Product Direction

The new website is a single conversion-first experience that routes visitors into two clear intents within the first viewport:

- **DINE**: heritage North Indian dining, alfresco meals, menu browsing, delivery, reservations.
- **VIBE**: TCB Bar, private dining, social energy, event packages, date nights, corporate bookings.

The site should feel warm, dark, premium, and human. It must reduce the current site noise, remove PDF-menu friction, make TCB visible as a second revenue path, and keep all high-intent actions reachable on mobile.

## Visual System

### Tokens

| Token | Value | Usage |
| --- | --- | --- |
| Charcoal | `#111214` | Site base, header, hero, dark surfaces |
| Saffron | `#D98B1F` | Primary CTA, active nav, key highlights |
| Deep Amber | `#8B4B1F` | VIBE/TCB accents, gradients, cards |
| Warm Ivory | `#F6EFE6` | Primary text on dark backgrounds |
| Muted Ivory | `#B8AEA2` | Secondary text on dark backgrounds |
| Line Dark | `rgba(246, 239, 230, 0.14)` | Borders on dark surfaces |

Typography:

- H1/H2: `Playfair Display`
- Body/UI: `Inter`
- H1: 36px mobile, 56px desktop
- H2: 24px mobile, 36px desktop
- Body: 16px

Spacing:

- 8px baseline grid
- 16px mobile gutters
- 24px tablet gutters
- 48px desktop section gutters

Motion:

- Hero image/video parallax: subtle, max 8-12px translation.
- Button/card micro-interactions: 200-300ms.
- Modal/lightbox transitions: 400ms.
- Respect `prefers-reduced-motion`.

## Information Architecture

### Primary Routes

- `/` Split-Persona homepage
- `/menu` Native filterable menu
- `/about` Heritage & Makers
- `/gallery` Vibe & Social Studio
- `/contact` Find Us & Connect
- `/tcb` TCB Bar microsite
- `/reserve` Booking flow

### Header

Desktop:

```text
[Logo]    Our Story | Menu | Vibe & Gallery | Promos | TCB Bar    Veg/Vegan [Order Online] [Reserve a Table]
```

Mobile:

```text
[Logo]                                      [Menu]
```

Sticky bottom action strip:

```text
[Reserve Table] [Order Online] [WhatsApp]
```

Footer:

- Contact
- Hours
- FAQ
- Login/Loyalty
- Social links
- Legal/copyright

## Homepage Wireframes

### Mobile

```text
┌────────────────────────────┐
│ Sticky header              │
├────────────────────────────┤
│ Split Hero                 │
│ ┌────────────────────────┐ │
│ │ DINE                   │ │
│ │ Heritage North Indian  │ │
│ │ [Reserve Table]        │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ VIBE                   │ │
│ │ TCB Bar + events       │ │
│ │ [Explore TCB]          │ │
│ └────────────────────────┘ │
├────────────────────────────┤
│ Promo banner + countdown   │
├────────────────────────────┤
│ Signature dish carousel    │
├────────────────────────────┤
│ Interactive menu preview   │
├────────────────────────────┤
│ Heritage & Makers          │
├────────────────────────────┤
│ Private dining CTA         │
├────────────────────────────┤
│ Reviews + UGC              │
├────────────────────────────┤
│ Hidden Gem guide           │
├────────────────────────────┤
│ Footer                     │
├────────────────────────────┤
│ Sticky action strip        │
└────────────────────────────┘
```

### Tablet

```text
┌──────────────────────────────────────┐
│ Header                               │
├──────────────────────────────────────┤
│ Split Hero: DINE | VIBE              │
├──────────────────────────────────────┤
│ Promo banner                         │
├──────────────────────────────────────┤
│ Dish carousel 2-up                   │
├──────────────────────────────────────┤
│ Menu filters + cards                 │
├──────────────────────────────────────┤
│ Makers split + awards                │
├──────────────────────────────────────┤
│ TCB package card + quote form        │
└──────────────────────────────────────┘
```

### Desktop

```text
┌────────────────────────────────────────────────────────┐
│ Header                                                 │
├────────────────────────────────────────────────────────┤
│ Split Hero                                             │
│ ┌──────────────────────────┬─────────────────────────┐ │
│ │ DINE tile                │ VIBE tile               │ │
│ │ Heritage, menu, booking  │ TCB, events, socials    │ │
│ └──────────────────────────┴─────────────────────────┘ │
├────────────────────────────────────────────────────────┤
│ Promo banner                                           │
├────────────────────────────────────────────────────────┤
│ DINE path content                                      │
├────────────────────────────────────────────────────────┤
│ Social proof + urgency                                 │
├────────────────────────────────────────────────────────┤
│ Logistics + trust                                      │
└────────────────────────────────────────────────────────┘
```

## Component Library Specs

### Sticky Header

Purpose: Keep reservation/order paths visible without blocking content.

Props:

- `dietMode: "all" | "veg" | "vegan"`
- `onDietModeChange(mode)`
- `isScrolled`
- `activePath`

States:

- Top: transparent dark overlay.
- Scrolled: solid charcoal.
- Mobile open: full-height sheet.

Accessibility:

- Semantic `nav`.
- Keyboard reachable menu.
- Visible focus ring.

### Split Hero

Purpose: Route every visitor into either DINE or VIBE immediately.

Content:

- DINE value line: `Heritage North Indian`
- DINE CTA: `Reserve Table`
- VIBE value line: `TCB Bar + Events`
- VIBE CTA: `Explore TCB`

Behavior:

- Mobile: stacked large tiles.
- Desktop: 50/50 split.
- One CTA per tile.
- ARIA labels: `Choose dine path`, `Choose vibe path`.

### Promo Banner

Purpose: Bring urgency above the fold.

Fields:

- `title`
- `description`
- `expiresAt`
- `ctaLabel`
- `ctaHref`
- `source: "cms" | "fallback"`

Rules:

- Show countdown only when `expiresAt` exists.
- Rotate daily offers.
- One CTA: `Book Now`.

### Signature Dish Carousel

Purpose: Trigger appetite before menu depth.

Items:

- Butter Chicken
- Tandoori Chicken
- Palak Paneer
- Veg Biryani

Behavior:

- Mobile swipe.
- Tap plays 3-5s sizzle clip if available.
- Fallback: subtle image zoom and steam overlay.

### Menu Component

Purpose: Replace PDFs with searchable, filterable HTML.

Filters:

- Veg
- Vegan
- Gluten-free
- Price
- Portion size

Dish fields:

- Photo
- Name
- Sensory copy
- Tags
- Price
- Spice level
- Portion
- Allergens
- `Add to Order`

Performance:

- Lazy-load images below first viewport.
- Keep menu searchable/indexable.

### Booking Widget

Purpose: Complete booking in under 4 taps on mobile.

Steps:

1. Date
2. Time slot
3. Guest count
4. Confirm

Fields:

- Date
- Time
- Guests
- Name
- Phone/email
- Occasion optional

Integrations:

- Existing reservation provider or calendar API.
- Optional Apple Pay / Google Pay deposit.
- Guest checkout only; no forced login.

### WhatsApp Deep Link

Purpose: One-tap contact for Singapore mobile behavior.

URL:

```text
https://wa.me/6598627334?text=Hi%20Tandoori%20Corner%2C%20I%20would%20like%20to%20book%20a%20table.
```

### Social Wall

Purpose: Prove the restaurant is active now.

Priority:

1. Instagram Basic Display / Graph API.
2. TikTok API.
3. CMS fallback posts.

Fields:

- Media URL
- Caption
- Source
- Posted date
- Permalink
- Moderation status

## Page Specs

### `/` Homepage

Sections:

1. Split hero: DINE and VIBE.
2. Today’s offer banner.
3. Signature dish carousel.
4. Interactive menu preview.
5. Heritage & Makers.
6. Private dining CTA.
7. Reviews + social wall.
8. Hidden Gem guide.
9. Footer.

Primary conversion:

- Mobile: sticky bottom strip.
- Desktop: reserve/order buttons in header and section CTAs.

### `/tcb` VIBE Microsite

Tone:

- Darker amber highlights.
- Cocktail and bar photography.
- More social, evening, event-led.

Sections:

1. TCB hero.
2. Live availability calendar.
3. Capacity and package selector.
4. Estimated quote.
5. Instant booking or enquiry.
6. Events gallery.
7. Weekly schedule: live music, happy hour, private booking windows.
8. Social wall for bar content.

Primary CTA:

- `Reserve TCB`

### `/menu`

Rules:

- No PDFs.
- Searchable/filterable on mobile.
- Dish pages/anchors should be indexable for long-tail SEO.
- One add-to-order action per dish.

### `/contact`

Sections:

1. Big info: address, phone, WhatsApp.
2. Hours table with break warning.
3. Hidden Gem guide.
4. Embedded Google Map.
5. Inquiry form.
6. WhatsApp CTA.

Primary CTA:

- `Message us on WhatsApp`

## Content Deliverables

### Hero Copy

DINE tile:

- Title: `DINE`
- Value line: `Heritage North Indian`
- Supporting line: `Balestier alfresco dining since 2008.`
- CTA: `Reserve Table`

VIBE tile:

- Title: `VIBE`
- Value line: `TCB Bar + Events`
- Supporting line: `Cocktails, private dining, and social nights.`
- CTA: `Explore TCB`

### Signature Dish Copy

- Butter Chicken: `Tandoor-charred chicken folded through velvety tomato butter gravy.`
- Tandoori Chicken: `Yoghurt-marinated chicken roasted smoky and bright in the clay oven.`
- Palak Paneer: `Soft paneer in deep-green spinach gravy with ginger warmth.`
- Veg Biryani: `Fragrant basmati layered with vegetables and warm North Indian spice.`

### Chef Bio

Chef Ramesh Kumar anchors the Tandoori Corner kitchen with the discipline of India’s hotel kitchens and the patience of a cook who understands that flavour cannot be rushed. Since joining the restaurant in its early years, he has shaped the food around long marinades, hand-balanced spice, slow gravies, and the direct heat of the tandoor. His work is visible in the char on the kebabs, the softness of fresh naan, and the comfort of the curries regulars return for. For him, the kitchen is not about complicated presentation; it is about consistency, warmth, and making North Indian dishes feel generous every time they reach the table.

### Promo Templates

1. Lunch Special:
   - Title: `Lunch Special Until 2:45 PM`
   - CTA: `Book Lunch`
   - Timer: lunch service cutoff.

2. Amex Exclusive:
   - Title: `Amex Exclusive Promotion`
   - CTA: `Claim Offer`
   - Timer: promotion end date.

3. TCB Beer Fest:
   - Title: `Beer Fest at TCB Bar`
   - CTA: `Reserve TCB`
   - Timer: event day/time.

### Event Packages

Starter Gathering:

- Capacity: 8-15 guests
- Starting price: `From S$388`
- Copy: `A compact private dining setup for birthdays, small team dinners, and casual celebrations.`

TCB Celebration:

- Capacity: 16-35 guests
- Starting price: `From S$888`
- Copy: `Bar-led private event with North Indian sharing plates, drinks, and hosted service.`

Corporate Night:

- Capacity: 36-60 guests
- Starting price: `Custom quote`
- Copy: `Structured dining, drinks, and private room planning for company dinners and client hosting.`

### Photo And Video List

Required production assets:

- 1 full-bleed hero video, 10-15s, split DINE/VIBE energy.
- 5 dish sizzle clips, 3-5s each.
- 1 chef portrait.
- 1 chef/tandoor action video, 60-90s.
- 8 lifestyle images: pets, alfresco, couples, families, bar.
- 1 TCB cocktail/reel clip.
- 1 15s parking/entrance POV.
- 6-9 UGC/social fallback images.

## Integrations

### Booking

Options:

- Existing reservation provider embed/API.
- Calendar API with server-side availability endpoint.
- Deposit support through Stripe Payment Request for Apple Pay / Google Pay.

### Reviews

- Google Places API for snippets.
- TripAdvisor embed or curated CMS fallback if API access is blocked.
- Update freshness target: within 24 hours.

### CMS

Recommended:

- Sanity for fast editorial updates.

Content models:

- Promo
- MenuItem
- Event
- EventPackage
- UGCPost
- ReviewFallback
- SiteSettings

### Analytics

GTM event names:

- `cta_split_dine_click`
- `cta_split_vibe_click`
- `booking_start`
- `booking_complete`
- `order_online_click`
- `promo_click`
- `menu_filter_used`
- `menu_add_to_order`
- `whatsapp_click`
- `tcb_quote_start`
- `tcb_quote_submit`
- `social_post_click`

## SEO And Structured Data

Required schema:

- `Restaurant`
- `LocalBusiness`
- `Menu`
- `MenuSection`
- `MenuItem`
- `Event`
- `Offer`
- `FAQPage`

Metadata:

- Unique title and description per route.
- Open Graph image per route.
- Local keywords naturally included: Balestier, North Indian, Indian restaurant Singapore, alfresco dining, TCB Bar.

## Accessibility

Requirements:

- WCAG AA contrast.
- Keyboard reachable nav, filters, lightboxes, booking widgets.
- Visible focus rings.
- Alt text on every image.
- No hover-only content.
- Form labels and error states.
- Reduced motion support.

## QA Acceptance Criteria

- Mobile load time under 3s.
- LCP under 2.5s.
- No PDFs for menu.
- Menu searchable and filterable on mobile.
- All primary CTAs visible within first mobile viewport.
- Booking completes in under 4 taps.
- Live review feed updates within 24 hours.
- WCAG AA pass on homepage, menu, booking, TCB, contact.
- GTM events visible in preview/debug mode.

## Rollout Plan

Phase A: Core conversion path, 2 weeks.

- Split homepage.
- Menu.
- Booking widget.
- Basic analytics.

Phase B: VIBE/TCB expansion, 1 week.

- TCB microsite.
- Event packages.
- Social wall.
- Events schedule.

Phase C: Trust and performance, 1 week.

- SEO/schema.
- Accessibility audit.
- Performance tuning.
- Review feed.
- A/B setup.

Soft launch:

- Current Vercel vs Split-Persona for 2 weeks.
- Measure booking conversion, bounce rate, mobile LCP, CTA split between DINE and VIBE.
