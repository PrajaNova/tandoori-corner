export type Diet = "veg" | "nonveg";

export interface CateringCourse {
  id: string;
  label: string;
}

export const cateringCourses: CateringCourse[] = [
  { id: "appetizer", label: "Appetizers" },
  { id: "main", label: "Main Course" },
  { id: "rice-bread", label: "Rice & Breads" },
  { id: "dessert", label: "Desserts & Drinks" },
];

export interface CateringDish {
  id: string;
  name: string;
  desc: string;
  course: string;
  diet: Diet;
  img?: string;
  tag?: string;
}

export const cateringMenu: CateringDish[] = [
  // Appetizers — Veg
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    desc: "Char-grilled cottage cheese in a smoky yogurt & kashmiri chili marinade.",
    course: "appetizer",
    diet: "veg",
    tag: "Signature",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
  },
  {
    id: "hara-bhara-kebab",
    name: "Hara Bhara Kebab",
    desc: "Spinach, peas and potato patties with fresh herbs, pan-seared crisp.",
    course: "appetizer",
    diet: "veg",
  },
  {
    id: "tandoori-mushroom",
    name: "Tandoori Mushroom",
    desc: "Button mushrooms marinated in spiced hung curd, fired in the clay oven.",
    course: "appetizer",
    diet: "veg",
  },
  // Appetizers — Non-Veg
  {
    id: "reshmi-tikka",
    name: "Reshmi Chicken Tikka",
    desc: "Silky chicken in a double-marinade with a deep, velvety crust.",
    course: "appetizer",
    diet: "nonveg",
    tag: "Signature",
    img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80",
  },
  {
    id: "mutton-seekh",
    name: "Mutton Seekh Kebab",
    desc: "Minced mutton, ginger and whole spices skewered and tandoor-grilled.",
    course: "appetizer",
    diet: "nonveg",
  },
  {
    id: "tandoori-wings",
    name: "Tandoori Wings",
    desc: "Smoky chicken wings glazed in deggi mirch and mustard oil.",
    course: "appetizer",
    diet: "nonveg",
    tag: "Spicy",
  },
  // Main — Veg
  {
    id: "palak-paneer",
    name: "Palak Paneer",
    desc: "Soft paneer in a vibrant, spiced spinach puree.",
    course: "main",
    diet: "veg",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    desc: "Black lentils slow-cooked overnight with butter and cream.",
    course: "main",
    diet: "veg",
    tag: "Signature",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80",
  },
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    desc: "Cottage cheese in a rich, mildly sweet tomato-cashew gravy.",
    course: "main",
    diet: "veg",
  },
  {
    id: "aloo-gobi",
    name: "Aloo Gobi",
    desc: "Cauliflower and potato wok-tossed with turmeric and cumin.",
    course: "main",
    diet: "veg",
  },
  // Main — Non-Veg
  {
    id: "butter-chicken",
    name: "OG Butter Chicken",
    desc: "Tandoor-charred chicken in a 4-hour slow-cooked tomato gravy.",
    course: "main",
    diet: "nonveg",
    tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80",
  },
  {
    id: "rogan-josh",
    name: "Rogan Josh",
    desc: "Fiery, aromatic Kashmiri lamb curry slow-cooked till spoon-tender.",
    course: "main",
    diet: "nonveg",
    tag: "Spicy",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
  },
  {
    id: "saag-mutton",
    name: "Saag Mutton",
    desc: "Tender mutton in a deep-green spinach and ginger gravy.",
    course: "main",
    diet: "nonveg",
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80",
  },
  // Rice & Breads
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    desc: "Crisp-edged, fluffy naan slathered with garlic butter.",
    course: "rice-bread",
    diet: "veg",
    img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80",
  },
  {
    id: "saffron-pulao",
    name: "Saffron Basmati Pulao",
    desc: "Fragrant long-grain basmati with whole spices and saffron.",
    course: "rice-bread",
    diet: "veg",
  },
  {
    id: "veg-biryani",
    name: "Vegetable Dum Biryani",
    desc: "Aged basmati layered with seasonal vegetables and saffron.",
    course: "rice-bread",
    diet: "veg",
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    desc: "Dum-cooked mutton buried in saffron-scented basmati.",
    course: "rice-bread",
    diet: "nonveg",
    tag: "Signature",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80",
  },
  // Desserts & Drinks
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    desc: "Warm milk dumplings soaked in cardamom-rose syrup.",
    course: "dessert",
    diet: "veg",
  },
  {
    id: "rasmalai",
    name: "Rasmalai",
    desc: "Soft chenna discs in saffron-pistachio thickened milk.",
    course: "dessert",
    diet: "veg",
  },
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    desc: "Thick, chilled yogurt smoothie with alphonso mango.",
    course: "dessert",
    diet: "veg",
  },
];

export interface CateringFeature {
  label: string;
  included: boolean;
}

export interface CateringPackage {
  id: string;
  name: string;
  tagline: string;
  /** Header band accent — maps to a theme colour in the card component. */
  accent: "dark" | "mid" | "light";
  pricePerHead: string;
  minGuests: number;
  description: string;
  features: CateringFeature[];
  badge?: string;
}

// NOTE: catering packages now live in the backend (rc-backend) so they can be
// added / edited / removed via the API. Fetch them with the helpers in
// `@/lib/catering` (getCateringPackages / getCateringPackageBySlug). The
// CateringPackage type above is the shape those helpers return.

export function dishesForCourse(courseId: string): CateringDish[] {
  return cateringMenu.filter((dish) => dish.course === courseId);
}
