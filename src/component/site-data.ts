export type DietTag = "Vegetarian" | "Vegan" | "Gluten-free" | "Nut-free";

export type MenuCategory =
  | "snacks"
  | "tandoor"
  | "curries"
  | "sabzi"
  | "rice-breads"
  | "drinks"
  | "sweets";

export type MenuItem = {
  allergens: string[];
  category: MenuCategory;
  description: string;
  diets: DietTag[];
  id: string;
  image: string;
  isSignature?: boolean;
  name: string;
  pairing: string;
  portion: "Single" | "Serves 1-2" | "Serves 2" | "Serves 2-3";
  price: number;
  spice: 1 | 2 | 3 | 4 | 5;
};

export const restaurant = {
  name: "Tandoori Corner",
  legalName: "Tandoori Corner Restaurant",
  address: "400 Balestier Road #01-12 Balestier Plaza, Singapore 329802",
  shortAddress: "400 Balestier Road, Balestier Plaza",
  phone: "+65 6250 0200",
  phoneHref: "tel:+6562500200",
  whatsapp: "+65 9862 7334",
  whatsappHref:
    "https://wa.me/6598627334?text=Hi%20Tandoori%20Corner%2C%20I%20would%20like%20to%20make%20a%20booking.",
  email: "tandooricorner@singnet.com.sg",
  emailHref: "mailto:tandooricorner@singnet.com.sg",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=400+Balestier+Road+%2301-12+Balestier+Plaza+Singapore+329802",
  mapEmbed:
    "https://www.google.com/maps?q=400%20Balestier%20Road%20%2301-12%20Balestier%20Plaza%2C%20Singapore%20329802&output=embed",
  hours: "Daily 12:00 PM to 2:45 PM, 6:00 PM to 9:45 PM",
  closedNote: "Closed between 2:45 PM and 6:00 PM",
};

export const menuCategories: {
  id: MenuCategory;
  label: string;
  purpose: string;
}[] = [
  {
    id: "snacks",
    label: "Snacks",
    purpose: "Bright first bites that open appetite without slowing the table.",
  },
  {
    id: "tandoor",
    label: "Tandoor",
    purpose: "Clay-oven smoke, char, and high-value sharing plates.",
  },
  {
    id: "curries",
    label: "Curries",
    purpose: "Velvety gravies built to pull naan and rice onto the order.",
  },
  {
    id: "sabzi",
    label: "Sabzi",
    purpose: "Vegetarian depth with North Indian comfort.",
  },
  {
    id: "rice-breads",
    label: "Rice & Breads",
    purpose: "Natural pairings that lift the whole meal.",
  },
  {
    id: "drinks",
    label: "Drinks",
    purpose: "Cooling lassi, beer, and bar-friendly sips.",
  },
  {
    id: "sweets",
    label: "Sweets",
    purpose: "A warm finish after the fire.",
  },
];

export const menuItems: MenuItem[] = [
  {
    allergens: ["Dairy", "Gluten"],
    category: "snacks",
    description:
      "Crisp wafers, cooling yoghurt, tamarind, potatoes, chickpeas, and spice for a sweet-tangy crunch.",
    diets: ["Vegetarian"],
    id: "papri-chaat",
    image: "/dish-papri-chaat.jpg",
    isSignature: true,
    name: "Papri Chaat Crackle",
    pairing: "Start here with mango lassi nearby.",
    portion: "Serves 1-2",
    price: 10,
    spice: 2,
  },
  {
    allergens: ["Shellfish", "Dairy"],
    category: "tandoor",
    description:
      "Tiger prawns and fish tikka cooked in the clay oven with charred edges and warm spice.",
    diets: ["Gluten-free"],
    id: "mixed-seafood-platter",
    image: "/tandoori-hero.jpg",
    isSignature: true,
    name: "Tandoori Mixed Seafood Platter",
    pairing: "Share first, then move into butter chicken and garlic naan.",
    portion: "Serves 2-3",
    price: 42,
    spice: 3,
  },
  {
    allergens: ["Dairy"],
    category: "tandoor",
    description:
      "Half chicken marinated in yoghurt and spices, roasted until smoky, blistered, and deeply coloured.",
    diets: ["Gluten-free", "Nut-free"],
    id: "tandoori-chicken",
    image: "/tandoori-hero.jpg",
    isSignature: true,
    name: "Fire-Roasted Tandoori Chicken",
    pairing: "Order with mint chutney, biryani, and a cold beer at TCB.",
    portion: "Serves 1-2",
    price: 20,
    spice: 3,
  },
  {
    allergens: ["Dairy"],
    category: "tandoor",
    description:
      "Cottage cheese marinated with herbs and grilled until the edges blister and the centre stays soft.",
    diets: ["Vegetarian", "Gluten-free", "Nut-free"],
    id: "paneer-tikka",
    image: "/dish-palak-paneer.jpg",
    name: "Tandoori Paneer Tikka",
    pairing: "Pair with dal, garlic naan, and mango lassi.",
    portion: "Serves 1-2",
    price: 19,
    spice: 2,
  },
  {
    allergens: ["Dairy"],
    category: "curries",
    description:
      "Tandoor-charred chicken folded through velvety tomato butter sauce, slow and rich.",
    diets: ["Gluten-free", "Nut-free"],
    id: "butter-chicken",
    image: "/dish-butter-chicken.jpg",
    isSignature: true,
    name: "The OG Butter Chicken",
    pairing: "Built to be mopped up with garlic naan.",
    portion: "Serves 2",
    price: 17,
    spice: 2,
  },
  {
    allergens: [],
    category: "curries",
    description:
      "Boneless chicken cubes in a delicately spiced vindaloo sauce with clean, rising heat.",
    diets: ["Gluten-free", "Nut-free"],
    id: "chicken-vindaloo",
    image: "/dish-butter-chicken.jpg",
    name: "Chicken Vindaloo",
    pairing: "Keep lassi close and add plain basmati rice.",
    portion: "Serves 2",
    price: 17,
    spice: 5,
  },
  {
    allergens: ["Dairy"],
    category: "curries",
    description:
      "Tender mutton, deep-green spinach gravy, ginger, and garlic that hit before the heat does.",
    diets: ["Gluten-free", "Nut-free"],
    id: "saag-mutton",
    image: "/dish-palak-paneer.jpg",
    name: "Chef Ramesh's Saag Mutton",
    pairing: "Excellent with tandoori paratha.",
    portion: "Serves 2",
    price: 18,
    spice: 3,
  },
  {
    allergens: ["Dairy"],
    category: "sabzi",
    description:
      "Soft paneer in deep-green spinach gravy lifted with ginger, garlic, and gentle North Indian heat.",
    diets: ["Vegetarian", "Gluten-free", "Nut-free"],
    id: "palak-paneer",
    image: "/dish-palak-paneer.jpg",
    isSignature: true,
    name: "Palak Paneer Silk",
    pairing: "Scoop it with butter naan or layer it over rice.",
    portion: "Serves 2",
    price: 16,
    spice: 2,
  },
  {
    allergens: ["Dairy"],
    category: "sabzi",
    description:
      "Black lentils slow-cooked into a smoky, buttery dal with a plush finish.",
    diets: ["Vegetarian", "Gluten-free"],
    id: "dal-makhani",
    image: "/dish-butter-chicken.jpg",
    name: "24-Hour Dal Makhani",
    pairing: "Add jeera rice for comfort-food balance.",
    portion: "Serves 2",
    price: 15,
    spice: 2,
  },
  {
    allergens: [],
    category: "rice-breads",
    description:
      "Fragrant basmati layered with vegetables and warm spice for aroma first, comfort second.",
    diets: ["Vegetarian", "Vegan", "Nut-free"],
    id: "veg-biryani",
    image: "/dish-veg-biryani.jpg",
    isSignature: true,
    name: "Veg Biryani Bloom",
    pairing: "Order with raita and a grilled tandoori starter.",
    portion: "Serves 1-2",
    price: 14,
    spice: 3,
  },
  {
    allergens: ["Gluten", "Dairy"],
    category: "rice-breads",
    description:
      "Tandoor-baked bread rubbed with fresh garlic and finished hot for tearing and dipping.",
    diets: ["Vegetarian", "Nut-free"],
    id: "garlic-naan",
    image: "/tandoori-hero.jpg",
    name: "Garlic Naan",
    pairing: "Essential with butter chicken, dal makhani, or saag.",
    portion: "Single",
    price: 6,
    spice: 1,
  },
  {
    allergens: ["Dairy"],
    category: "drinks",
    description:
      "Thick mango, chilled yoghurt, and a smooth finish that resets the palate between bites.",
    diets: ["Vegetarian", "Gluten-free", "Nut-free"],
    id: "mango-lassi",
    image: "/dish-mango-lassi.jpg",
    isSignature: true,
    name: "Mango Lassi Cooldown",
    pairing: "Best with vindaloo, kebabs, or anything fiery.",
    portion: "Single",
    price: 7,
    spice: 1,
  },
  {
    allergens: ["Dairy", "Gluten"],
    category: "sweets",
    description:
      "Warm syrup-soaked dumplings with a soft centre and enough sweetness to close the meal.",
    diets: ["Vegetarian"],
    id: "gulab-jamun",
    image: "/dish-gulab-jamun.jpg",
    isSignature: true,
    name: "Gulab Jamun Glow",
    pairing: "Share after a spicy curry round.",
    portion: "Serves 1-2",
    price: 8,
    spice: 1,
  },
];

export const signatureDishes = menuItems
  .filter((item) => item.isSignature)
  .slice(0, 4);

export const promos = [
  {
    cta: "Book Now",
    description: "Lunch set, alfresco tables, and same-day takeaway reminders.",
    endsAt: "23:59",
    id: "today-special",
    title: "Today's Special",
  },
  {
    cta: "Reserve TCB",
    description:
      "Beer Fest pairings for tandoori plates and private bar nights.",
    endsAt: "21:45",
    id: "beer-fest",
    title: "TCB Beer Fest",
  },
  {
    cta: "Claim Offer",
    description: "Ask the team about the current Amex exclusive promotion.",
    endsAt: "20:00",
    id: "amex",
    title: "Amex Exclusive",
  },
];

export const reviews = [
  {
    name: "Elaine Lin",
    quote:
      "Our favourite place for hearty North Indian food. Unpretentious, wholesome, and consistent every time.",
    source: "Google",
  },
  {
    name: "Pravesh Gupta",
    quote:
      "Butter chicken, kebabs, tandoori chicken and naan are just amazing. Very friendly people.",
    source: "TripAdvisor",
  },
  {
    name: "Sarah Chen",
    quote:
      "A gem on Balestier Road. The biryani and warm service make it a regular dinner spot.",
    source: "Google",
  },
];

export const eventPackages = [
  {
    capacity: "Up to 12 guests",
    description:
      "A focused table package for dates, birthdays, and intimate dinners.",
    id: "intimate",
    name: "Intimate Table",
    price: "From S$48 per guest",
  },
  {
    capacity: "Up to 28 guests",
    description:
      "Indoor TCB bar seating with sharing plates, drinks, and flexible timing.",
    id: "celebration",
    name: "Celebration Bar",
    price: "From S$68 per guest",
  },
  {
    capacity: "Custom group size",
    description:
      "Corporate meals, private buyouts, and catered North Indian menus.",
    id: "corporate",
    name: "Corporate Feast",
    price: "Quote on request",
  },
];

export const weeklyEvents = [
  { day: "Tue", name: "Curry & Cocktails", time: "6:30 PM" },
  { day: "Thu", name: "Happy Hour at TCB", time: "5:30 PM" },
  { day: "Fri", name: "Private Events Priority", time: "7:00 PM" },
  { day: "Sun", name: "Alfresco Family Dinner", time: "6:00 PM" },
];

export function formatPrice(price: number) {
  return `S$${price.toFixed(2)}`;
}
