export interface ColorInfo {
  name: string;
  hex: string;
  bgClass: string;
  textClass: string;
}

export interface TypographyInfo {
  role: string;
  font: string;
  description: string;
}

export interface PageSection {
  page: string;
  purpose: string;
  sections: string[];
}

export interface HeroMockup {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  bgStyle: string;
  overlayClass: string;
  textClass: string;
  heroFontClass: string;
}

export interface Variant {
  id: string;
  name: string;
  tagline: string;
  focus: string;
  businessImpact: string;
  userJourney: string[];
  colors: ColorInfo[];
  typography: TypographyInfo[];
  pageStructure: PageSection[];
  heroMockup: HeroMockup;
}

export const variants: Variant[] = [
  {
    id: "v1",
    name: "Variant 1: Heritage & Lifestyle",
    tagline: "Balancing authentic legacy with modern alfresco vibes.",
    focus:
      "This variant embraces the rich 15-year history of Tandoori Corner while leveraging its unique alfresco and pet-friendly dining experiences to attract a younger, lifestyle-driven demographic.",
    businessImpact:
      'Captures the affluent "pet parent" and weekend brunch/dinner crowd. By highlighting the alfresco vibe and 2008 legacy, it builds immense trust and increases dine-in footfall. The TCB bar is positioned as a natural, seamless extension of the dining experience.',
    userJourney: [
      "LAND: See a high-impact video of sizzling food and alfresco dining at sunset.",
      "WANT: Discover the 15-year heritage and read real 5-star TripAdvisor/Google reviews.",
      "EXPLORE: Browse a highly visual, masonry-style menu highlighting signature dishes.",
      'ACT: Click the sticky "Book Now" to reserve an alfresco table or order takeout.',
    ],
    colors: [
      {
        name: "Charcoal Black",
        hex: "#1C1C1C",
        bgClass: "bg-[#1C1C1C]",
        textClass: "text-[#1C1C1C]",
      },
      {
        name: "Rich Saffron",
        hex: "#E67E22",
        bgClass: "bg-[#E67E22]",
        textClass: "text-[#E67E22]",
      },
      {
        name: "Warm Cream",
        hex: "#FDFBF7",
        bgClass: "bg-[#FDFBF7]",
        textClass: "text-[#FDFBF7]",
      },
    ],
    typography: [
      {
        role: "Headlines",
        font: "Playfair Display (Serif)",
        description: "Conveys premium quality, authenticity, and heritage.",
      },
      {
        role: "Body Copy",
        font: "Inter (Sans-Serif)",
        description: "Ensures lightning-fast readability on mobile devices.",
      },
    ],
    heroMockup: {
      headline: "Authentic North Indian. Balestier. Since 2008.",
      subheadline:
        "Casual alfresco dining — pet friendly — with a bar next door.",
      primaryCta: "Reserve a Table",
      secondaryCta: "🥂 Planning an event? Book TCB →",
      bgStyle: "bg-gradient-to-br from-neutral-900 to-neutral-800", // Mocking a dark image
      overlayClass: "bg-black/40",
      textClass: "text-white",
      heroFontClass: "font-serif",
    },
    pageStructure: [
      {
        page: "Home",
        purpose: "Establish trust instantly and trigger appetite.",
        sections: [
          "Hero (Video/Image)",
          "Trust Bar (Awards/Reviews)",
          "Signature Dish Showcase",
          "Heritage & Makers Teaser",
          "Alfresco/TCB Split",
          "Footer",
        ],
      },
      {
        page: "Menu (The Visual Grid)",
        purpose: "Maximize check size using menu psychology.",
        sections: [
          "Sticky Category Nav",
          "Dietary Toggles",
          "Decoy Premium Dish",
          "Sizzle Video Grid",
        ],
      },
      {
        page: "About Us (Editorial Journey)",
        purpose: "Build an emotional connection.",
        sections: [
          "The Roots (Owner)",
          "The Craft (Chef & Tandoor)",
          "The Modern Era (TCB)",
        ],
      },
      {
        page: "TCB & Private Events",
        purpose: "Sell the venue for high-ticket bookings.",
        sections: [
          "Event Gallery",
          "Corporate Packages",
          "Private Booking Form",
        ],
      },
    ],
  },
  {
    id: "v2",
    name: "Variant 2: The TCB Premium Evening",
    tagline:
      "Positioning Tandoori Corner as a sophisticated nightlife and dining destination.",
    focus:
      'This variant completely elevates the premium feel. It puts the TCB Bar front and center, targeting romantic dinners, corporate events, and high-ticket private gatherings, moving away from a traditional "curry house" perception.',
    businessImpact:
      'Massively unlocks the undersold TCB bar. Drives high-margin alcohol sales and secures lucrative private party/corporate event bookings. Re-anchors the brand from "cheap eats" to a premium, sought-after evening destination.',
    userJourney: [
      "LAND: Greeted by moody, warm-lit shots of cocktails and elegant dining.",
      "WANT: See the exclusive TCB interior and read about private event capabilities.",
      "EXPLORE: Browse Chef's tasting menus and wine pairings.",
      "ACT: Inquire for a private event or book a table for a romantic dinner.",
    ],
    colors: [
      {
        name: "Midnight Slate",
        hex: "#0F172A",
        bgClass: "bg-[#0F172A]",
        textClass: "text-[#0F172A]",
      },
      {
        name: "Antique Gold",
        hex: "#D4AF37",
        bgClass: "bg-[#D4AF37]",
        textClass: "text-[#D4AF37]",
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        bgClass: "bg-[#FFFFFF]",
        textClass: "text-[#FFFFFF]",
      },
    ],
    typography: [
      {
        role: "Headlines",
        font: "Space Grotesk (Sans-Serif)",
        description: "Modern, architectural, and sophisticated.",
      },
      {
        role: "Body Copy",
        font: "Inter (Sans-Serif)",
        description: "Clean and minimal for a premium aesthetic.",
      },
    ],
    heroMockup: {
      headline: "Elevated Indian Dining & Evening Cocktails.",
      subheadline:
        "Experience the acclaimed flavors of Tandoori Corner, inside the exclusive TCB Bar.",
      primaryCta: "Book the TCB Bar",
      secondaryCta: "View Chef's Tasting Menu →",
      bgStyle: "bg-slate-900",
      overlayClass: "bg-black/50",
      textClass: "text-white",
      heroFontClass: "font-space tracking-tight",
    },
    pageStructure: [
      {
        page: "Home",
        purpose: "Showcase the premium nightlife and event space.",
        sections: [
          "Hero (Moody Bar/Dining)",
          "Vibe Studio (Glamour Gallery)",
          "Chef's Highlights",
          "Private Events Teaser",
          "Footer",
        ],
      },
      {
        page: "Menu (The Chef's Tasting)",
        purpose: "Highlight pairings and premium items.",
        sections: [
          "Wine & Cocktail List First",
          "Tasting Menus",
          "Curated A La Carte (Minimalist)",
        ],
      },
      {
        page: "Events & Catering",
        purpose: "Capture high-ticket leads.",
        sections: [
          "Venue Specs",
          "Event Packages",
          "Inquiry Form (No CAPTCHA)",
        ],
      },
      {
        page: "About Us (Meet the Makers)",
        purpose: "Humanize the premium experience.",
        sections: ["The Mixologist", "The Master Chef", "The Vision"],
      },
    ],
  },
  {
    id: "v3",
    name: "Variant 3: Frictionless Commerce",
    tagline: "Built for speed, volume, delivery, and immediate action.",
    focus:
      "A highly functional, mobile-first design that ruthlessly eliminates steps between landing and ordering. Perfect for capturing lunch crowds, delivery orders, and highlighting daily offers (Amex, Lunch Specials, Beer Fest).",
    businessImpact:
      "Maximizes volume and delivery/takeaway revenue. Catches high-intent users on their phones instantly. Pushes daily promotions hard to convert price-conscious diners and drive immediate midday and evening footfall.",
    userJourney: [
      'LAND: Instantly see high-res macro food shots with a live "Lunch Special" banner.',
      "WANT: Use simple dietary toggles to find meals fast.",
      "EXPLORE: Browse a thumb-friendly mobile swipe list with a sticky cart.",
      "ACT: One-tap checkout or WhatsApp table booking.",
    ],
    colors: [
      {
        name: "Chili Red",
        hex: "#DC2626",
        bgClass: "bg-[#DC2626]",
        textClass: "text-[#DC2626]",
      },
      {
        name: "Warm Sand",
        hex: "#F5F5F4",
        bgClass: "bg-[#F5F5F4]",
        textClass: "text-[#F5F5F4]",
      },
      {
        name: "Deep Charcoal",
        hex: "#27272A",
        bgClass: "bg-[#27272A]",
        textClass: "text-[#27272A]",
      },
    ],
    typography: [
      {
        role: "Headlines",
        font: "Outfit (Sans-Serif)",
        description: "Friendly, bold, and highly impactful.",
      },
      {
        role: "Body Copy",
        font: "Inter (Sans-Serif)",
        description: "Functional and clear.",
      },
    ],
    heroMockup: {
      headline: "Singapore's Favorite North Indian. Delivered.",
      subheadline:
        "🔥 Today's Offer: 20% Off Lunch Specials & Amex Exclusives.",
      primaryCta: "Order Delivery / Pickup",
      secondaryCta: "Book a Table on WhatsApp →",
      bgStyle: "bg-stone-100",
      overlayClass: "bg-transparent",
      textClass: "text-stone-900",
      heroFontClass: "font-outfit font-bold",
    },
    pageStructure: [
      {
        page: "Home (The Storefront)",
        purpose: "Drive immediate transactions.",
        sections: [
          "Live Promo Banner",
          "Hero (Macro Food)",
          "Quick Categories (Icons)",
          "Trending Orders",
          "Trust Strip",
        ],
      },
      {
        page: "Menu (The Mobile Swipe List)",
        purpose: "Frictionless ordering flow.",
        sections: [
          "Sticky Cart",
          "Dietary Toggles",
          "List View with Thumbnails",
          "1-Click Add to Cart",
        ],
      },
      {
        page: "Promotions Hub",
        purpose: "Consolidate all deals to force urgency.",
        sections: ["Lunch Specials", "Amex Exclusive", "Beer Fest at TCB"],
      },
      {
        page: "Contact (The Logistics Hub)",
        purpose: "Remove all travel anxiety for dine-in.",
        sections: [
          "Interactive Map",
          "Parking Guide POV Video",
          "WhatsApp Button",
        ],
      },
    ],
  },
];
