import type { Offer } from "../DailyOffers";

export const offers: Offer[] = [
  {
    title: "Amex Special",
    value: "15% Off Total Bill",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80",
    badge: "Limited Time",
    badgeColor: "bg-brand-gold text-brand-dark",
    points: [
      "Valid for Dine-In",
      "Valid for TCB & Alfresco",
      "Not stacked with other offers",
      "Min. spend $50",
    ],
    actionLabel: "Reserve a Table",
    actionType: "experience",
  },
  {
    title: "Lunch Specials",
    value: "From $12.90",
    image:
      "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&q=80",
    badge: "Daily Deal",
    badgeColor: "bg-card text-brand-dark",
    points: [
      "Authentic Thali Sets",
      "Includes Drink & Dessert",
      "Available Mon-Fri",
      "11:30 AM to 2:30 PM",
    ],
    actionLabel: "View Lunch Menu",
    actionType: "menu",
  },
  {
    title: "Beer Fest @ TCB",
    value: "1-for-1 Pints",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80",
    badge: "Evenings Only",
    badgeColor: "bg-curry text-brand-dark",
    points: [
      "Premium Drafts & Crafts",
      "Valid strictly at TCB Bar",
      "After 8:00 PM daily",
      "Selected beers only",
    ],
    actionLabel: "Book TCB Bar",
    actionType: "experience",
  },
];

export const culinaryCorners = [
  {
    tag: "Tandoori Corner",
    title: "The Master's Tandoor",
    desc: "Marinades rested for 24 hours. Seekh Kebabs, Tandoori Chicken, and massive Seafood Platters.",
    img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80",
  },
  {
    tag: "Curry Corner",
    title: "Silken Gravies",
    desc: "Our legendary Butter Chicken and Saag Mutton. Deep, complex flavors meant to be mopped up with fresh Naan.",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
  },
  {
    tag: "Snack & Drink Corner",
    title: "Bites & Pints",
    desc: "Crispy Samosas and Pakoras paired perfectly with our daily Beer Fest offers inside the TCB Bar.",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
  },
];

export const socialImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
];
