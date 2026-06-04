import type { CateringFeature, CateringPackage } from "@/data/catering";

type CateringApiPackage = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: "dark" | "mid" | "light";
  priceCents: number;
  currency: "SGD";
  minGuests: number;
  badge?: string;
  features: CateringFeature[];
  status: "active" | "inactive";
  sortOrder: number;
};

type CateringPackagesResponse = { packages: CateringApiPackage[] };
type CateringPackageResponse = { package: CateringApiPackage };

function apiBaseUrl(): string {
  // Use `||` (not `??`) so an empty env value falls through to the default.
  return (
    process.env.RC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:4000"
  );
}

function formatPrice(priceCents: number): string {
  const value = priceCents / 100;
  return `$${Number.isInteger(value) ? value : value.toFixed(2)}`;
}

function normalizePackage(pkg: CateringApiPackage): CateringPackage {
  return {
    // Use the slug as the public id so routes resolve to /catering/<slug>.
    id: pkg.slug,
    name: pkg.name,
    tagline: pkg.tagline,
    description: pkg.description,
    accent: pkg.accent,
    pricePerHead: formatPrice(pkg.priceCents),
    minGuests: pkg.minGuests,
    badge: pkg.badge,
    features: pkg.features,
  };
}

// Bundled fallback so the page still renders if the backend is unreachable.
const fallbackPackages: CateringPackage[] = [
  {
    id: "silver",
    name: "Silver",
    tagline: "Intimate gatherings",
    accent: "dark",
    pricePerHead: "$24",
    minGuests: 10,
    description:
      "A balanced North Indian spread for cosy parties and family dinners.",
    features: [
      { label: "1 Veg Appetizer", included: true },
      { label: "1 Non-Veg Appetizer", included: true },
      { label: "1 Veg Main", included: true },
      { label: "1 Non-Veg Main", included: true },
      { label: "1 Veg Rice & 1 Garlic / Naan", included: true },
      { label: "Dessert of the day", included: false },
      { label: "Party of 30+", included: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Our most loved spread",
    accent: "mid",
    pricePerHead: "$34",
    minGuests: 15,
    badge: "Most Popular",
    description:
      "Twice the mains and a sweet finish — our crowd-favourite celebration menu.",
    features: [
      { label: "1 Veg Appetizer", included: true },
      { label: "1 Non-Veg Appetizer", included: true },
      { label: "2 Veg Mains", included: true },
      { label: "2 Non-Veg Mains", included: true },
      { label: "1 Veg Rice & 1 Garlic / Naan", included: true },
      { label: "Dessert of the day", included: true },
      { label: "Party of 30+", included: false },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    tagline: "The grand celebration",
    accent: "light",
    pricePerHead: "$46",
    minGuests: 30,
    description:
      "The full feast with welcome drinks and dessert — built for big celebrations.",
    features: [
      { label: "2 Veg Appetizers", included: true },
      { label: "2 Non-Veg Appetizers", included: true },
      { label: "2 Veg Mains", included: true },
      { label: "2 Non-Veg Mains", included: true },
      { label: "1 Non-Veg Rice, 1 Veg Rice & 1 Garlic / Naan", included: true },
      { label: "Dessert & welcome drink", included: true },
      { label: "Ideal for party of 30+", included: true },
    ],
  },
];

export async function getCateringPackages(): Promise<CateringPackage[]> {
  try {
    const response = await fetch(`${apiBaseUrl()}/api/catering/packages`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return fallbackPackages;
    }

    const data = (await response.json()) as CateringPackagesResponse;
    if (!data.packages?.length) {
      return fallbackPackages;
    }

    return data.packages.map(normalizePackage);
  } catch {
    return fallbackPackages;
  }
}

export async function getCateringPackageBySlug(
  slug: string,
): Promise<CateringPackage | undefined> {
  try {
    const response = await fetch(
      `${apiBaseUrl()}/api/catering/packages/${slug}`,
      { cache: "no-store" },
    );

    if (response.ok) {
      const data = (await response.json()) as CateringPackageResponse;
      return normalizePackage(data.package);
    }

    if (response.status === 404) {
      return undefined;
    }
  } catch {
    // fall through to fallback below
  }

  return fallbackPackages.find((pkg) => pkg.id === slug);
}
