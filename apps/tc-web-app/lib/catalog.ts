import { menuCategories as fallbackMenuCategories } from "@/data/menu";
import type { IconKey, MenuCategory, MenuItem } from "@/data/types";

// One shared cached render for all users, refreshed every 24 hours.
export const MENU_REVALIDATE_SECONDS = 60 * 60 * 24;

type CatalogApiItem = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  story?: string;
  imageUrl?: string;
  priceCents: number;
  currency: "SGD";
  tags: string[];
  ingredients: string[];
  status: "active" | "inactive";
  sortOrder: number;
};

type CatalogApiCategory = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  status: "active" | "inactive";
  sortOrder: number;
  items: CatalogApiItem[];
};

type CatalogCategoriesResponse = {
  categories: CatalogApiCategory[];
};

function formatPrice(priceCents: number): string {
  return `$${(priceCents / 100).toFixed(2)}`;
}

function normalizeItem(item: CatalogApiItem): MenuItem {
  return {
    name: item.name,
    desc: item.description,
    price: formatPrice(item.priceCents),
    tags: item.tags ?? [],
    img: item.imageUrl,
    ingredients: item.ingredients,
    story: item.story,
  };
}

function normalizeCategory(category: CatalogApiCategory): MenuCategory {
  return {
    title: category.title,
    subtitle: category.subtitle,
    icon: category.icon as IconKey,
    items: category.items
      .filter((item) => item.status !== "inactive")
      .map(normalizeItem),
  };
}

/**
 * Fetches the full menu from the backend catalog API.
 *
 * - Server-side only (uses RC_BACKEND_URL, not a public env var).
 * - Cached for 24h via Next.js ISR so every visitor is served the same
 *   pre-rendered page; the cache is refreshed at most once per day.
 * - Falls back to the bundled static menu if the backend is unreachable so
 *   the page (and its SEO content) always renders.
 */
export async function getMenuCategories(): Promise<MenuCategory[]> {
  const apiBaseUrl =
    process.env.RC_BACKEND_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000";

  try {
    const response = await fetch(`${apiBaseUrl}/api/catalog/categories`, {
      next: { revalidate: MENU_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return fallbackMenuCategories;
    }

    const data = (await response.json()) as CatalogCategoriesResponse;
    if (!data.categories?.length) {
      return fallbackMenuCategories;
    }

    return data.categories
      .filter((category) => category.status !== "inactive")
      .map(normalizeCategory);
  } catch {
    return fallbackMenuCategories;
  }
}
