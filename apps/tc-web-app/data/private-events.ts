// Content for the Private Events page — about the TCB Bar, what it can host,
// and a showcase of past private events. Static for now; swap the past-events
// array for an API fetch later if these need to be editable from the backend.

export interface TcbHighlight {
  /** Short stat or label, e.g. "Up to 60 guests". */
  label: string;
  /** One-line supporting detail. */
  detail: string;
}

export const tcbHighlights: TcbHighlight[] = [
  {
    label: "Up to 60 guests",
    detail:
      "Exclusive use of the bar for seated dinners or standing receptions.",
  },
  {
    label: "Bespoke menus",
    detail:
      "Tandoori grills, curries & canapés paired with our beer-fest specials.",
  },
  {
    label: "Full bar service",
    detail:
      "Craft cocktails, curated beers and a dedicated team for your night.",
  },
  {
    label: "Heart of Balestier",
    detail: "A hidden room just off the Balestier pavement, easy to reach.",
  },
];

export interface EventType {
  title: string;
  description: string;
}

export const eventTypes: EventType[] = [
  {
    title: "Corporate Gatherings",
    description:
      "After-work mixers, team dinners and client celebrations in a private, high-style setting.",
  },
  {
    title: "Birthdays & Milestones",
    description:
      "Mark the moment with a tailored feast, a full bar and a room that's entirely yours.",
  },
  {
    title: "Intimate Celebrations",
    description:
      "Engagements, anniversaries and reunions — warm lighting, great food, no crowds.",
  },
];

export interface PastEvent {
  id: string;
  title: string;
  /** e.g. "Corporate Dinner", "Birthday". */
  type: string;
  /** Human-readable month/year, e.g. "March 2026". */
  date: string;
  guests: number;
  blurb: string;
  image: string;
}

export const pastEvents: PastEvent[] = [
  {
    id: "tech-launch-2026",
    title: "Riverside Tech — Product Launch",
    type: "Corporate",
    date: "March 2026",
    guests: 55,
    blurb:
      "A standing reception with live tandoor counters, signature cocktails and a custom canapé menu for the team's biggest launch yet.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
  },
  {
    id: "ananya-40th",
    title: "Ananya's 40th Birthday",
    type: "Birthday",
    date: "January 2026",
    guests: 38,
    blurb:
      "A seated dinner for close friends and family, with a feast of grills and curries finished off with warm gulab jamun.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80",
  },
  {
    id: "year-end-soiree",
    title: "Balestier Co. Year-End Soirée",
    type: "Corporate",
    date: "December 2025",
    guests: 60,
    blurb:
      "The bar booked out end-to-end for a festive year-end party — beer-fest specials, a buffet spread and music until late.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
  },
  {
    id: "engagement-celebration",
    title: "Rahul & Meera's Engagement",
    type: "Celebration",
    date: "November 2025",
    guests: 30,
    blurb:
      "An intimate evening of cocktails and a curated tasting menu to mark the couple's engagement in our hidden room.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
  },
  {
    id: "team-offsite-dinner",
    title: "Northbridge Team Offsite",
    type: "Corporate",
    date: "October 2025",
    guests: 42,
    blurb:
      "A relaxed team dinner to close out an offsite, with family-style platters and a free-flow drinks package.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
  },
  {
    id: "diwali-gathering",
    title: "A Private Diwali Gathering",
    type: "Celebration",
    date: "October 2025",
    guests: 48,
    blurb:
      "Friends and family came together for a festive Diwali dinner — a full North Indian spread and the bar lit up for the night.",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80",
  },
];
