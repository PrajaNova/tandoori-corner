export type IconKey =
  | "chefHat"
  | "flame"
  | "leaf"
  | "sparkles"
  | "pawPrint"
  | "squareParking"
  | "shoppingBag"
  | "bike"
  | "utensils"
  | "calendarDays"
  | "glassWater"
  | "utensilsFill";

export interface SectionItem {
  icon: IconKey;
  label: string;
}

export interface OfferCardItem {
  title: string;
  value: string;
  image: string;
  badge: string;
  badgeColor: string;
  points: string[];
  actionLabel: string;
  actionType: "experience" | "menu";
}

export interface MenuItem {
  id?: string;
  name: string;
  desc: string;
  price: string;
  tags: string[];
  img?: string;
  ingredients?: string[];
  story?: string;
}

export interface MenuCategory {
  title: string;
  subtitle: string;
  icon: IconKey;
  items: MenuItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
  bio: string;
}

export interface GalleryItem {
  title: string;
  img: string;
}

export interface ArticleItem {
  title: string;
  preview: string;
  date?: string;
  img: string;
}

export interface GoogleReview {
  author: string;
  excerpt: string;
  source: string;
}
