import {
  type ClassicCategory,
  menuCategories as fallbackMenuCategories,
} from "@/app/menu/menu-data";

type MenuApiItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  variants?: Array<{ label: string; priceCents: number }>;
  status: "active" | "inactive";
};

type MenuApiCategory = {
  id: string;
  title: string;
  subtitle: string;
  status: "active" | "inactive";
  items: MenuApiItem[];
};

type MenuApiResponse = {
  categories: MenuApiCategory[];
};

export type MenuLoadResult = {
  categories: ClassicCategory[];
  error?: string;
};

function formatPrice(priceCents: number): string {
  return `$${(priceCents / 100).toFixed(2)}`;
}

function itemPrice(item: MenuApiItem): string {
  const priceCents = item.priceCents || item.variants?.[0]?.priceCents || 0;
  return formatPrice(priceCents);
}

function normalizeCategory(category: MenuApiCategory): ClassicCategory {
  return {
    title: category.title,
    subtitle: category.subtitle,
    bg: "/granny/granny_background_6.jpg",
    items: category.items
      .filter((item) => item.status !== "inactive")
      .map((item) => ({
        name: item.name,
        desc: item.description,
        price: itemPrice(item),
      })),
  };
}

export async function getMenuCategories(): Promise<MenuLoadResult> {
  const apiBaseUrl =
    process.env.RC_BACKEND_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000";

  try {
    const response = await fetch(`${apiBaseUrl}/api/menu`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return {
        categories: fallbackMenuCategories,
        error: `Menu API returned ${response.status}. Showing the bundled menu.`,
      };
    }

    const data = (await response.json()) as MenuApiResponse;
    const categories = data.categories
      ?.filter((category) => category.status !== "inactive")
      .map(normalizeCategory);

    if (!categories?.length) {
      return { categories: [], error: "The menu is currently empty." };
    }

    return { categories };
  } catch {
    return {
      categories: fallbackMenuCategories,
      error: "Could not reach the menu API. Showing the bundled menu.",
    };
  }
}
