import type { Prisma, PrismaClient } from "../generated/prisma/client.js";
import { slugify } from "./catalog-service.js";

export type CateringAccent = "dark" | "mid" | "light";

export interface CateringFeature {
  label: string;
  included: boolean;
}

export interface CateringPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: CateringAccent;
  priceCents: number;
  currency: "SGD";
  minGuests: number;
  badge?: string;
  features: CateringFeature[];
  status: "active" | "inactive";
  sortOrder: number;
}

export interface CreatePackageInput {
  slug?: string;
  name: string;
  tagline: string;
  description: string;
  accent?: CateringAccent;
  priceCents: number;
  currency?: "SGD";
  minGuests: number;
  badge?: string;
  features?: CateringFeature[];
  status?: "active" | "inactive";
  sortOrder?: number;
}

export type UpdatePackageInput = Partial<CreatePackageInput>;

export type CateringErrorCode = "NOT_FOUND" | "CONFLICT_SLUG";

export class CateringError extends Error {
  constructor(public code: CateringErrorCode) {
    super(code);
    this.name = "CateringError";
  }
}

export const cateringSeedPackages: CateringPackage[] = [
  {
    id: "pkg_silver",
    slug: "silver",
    name: "Silver",
    tagline: "Intimate gatherings",
    description:
      "A balanced North Indian spread for cosy parties and family dinners.",
    accent: "dark",
    priceCents: 2400,
    currency: "SGD",
    minGuests: 10,
    features: [
      { label: "1 Veg Appetizer", included: true },
      { label: "1 Non-Veg Appetizer", included: true },
      { label: "1 Veg Main", included: true },
      { label: "1 Non-Veg Main", included: true },
      { label: "1 Veg Rice & 1 Garlic / Naan", included: true },
      { label: "Dessert of the day", included: false },
      { label: "Party of 30+", included: false },
    ],
    status: "active",
    sortOrder: 10,
  },
  {
    id: "pkg_gold",
    slug: "gold",
    name: "Gold",
    tagline: "Our most loved spread",
    description:
      "Twice the mains and a sweet finish — our crowd-favourite celebration menu.",
    accent: "mid",
    priceCents: 3400,
    currency: "SGD",
    minGuests: 15,
    badge: "Most Popular",
    features: [
      { label: "1 Veg Appetizer", included: true },
      { label: "1 Non-Veg Appetizer", included: true },
      { label: "2 Veg Mains", included: true },
      { label: "2 Non-Veg Mains", included: true },
      { label: "1 Veg Rice & 1 Garlic / Naan", included: true },
      { label: "Dessert of the day", included: true },
      { label: "Party of 30+", included: false },
    ],
    status: "active",
    sortOrder: 20,
  },
  {
    id: "pkg_platinum",
    slug: "platinum",
    name: "Platinum",
    tagline: "The grand celebration",
    description:
      "The full feast with welcome drinks and dessert — built for big celebrations.",
    accent: "light",
    priceCents: 4600,
    currency: "SGD",
    minGuests: 30,
    features: [
      { label: "2 Veg Appetizers", included: true },
      { label: "2 Non-Veg Appetizers", included: true },
      { label: "2 Veg Mains", included: true },
      { label: "2 Non-Veg Mains", included: true },
      { label: "1 Non-Veg Rice, 1 Veg Rice & 1 Garlic / Naan", included: true },
      { label: "Dessert & welcome drink", included: true },
      { label: "Ideal for party of 30+", included: true },
    ],
    status: "active",
    sortOrder: 30,
  },
];

function idFromSlug(slug: string): string {
  return `pkg_${slug.replace(/-/g, "_")}`;
}

function sortByDisplayOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((first, second) => first.sortOrder - second.sortOrder);
}

export interface CateringService {
  listPackages: (includeInactive?: boolean) => Promise<CateringPackage[]>;
  getPackage: (id: string) => Promise<CateringPackage | undefined>;
  getPackageBySlug: (slug: string) => Promise<CateringPackage | undefined>;
  createPackage: (input: CreatePackageInput) => Promise<CateringPackage>;
  updatePackage: (
    id: string,
    input: UpdatePackageInput,
  ) => Promise<CateringPackage>;
  deletePackage: (id: string) => Promise<void>;
}

type PrismaCateringClient = Pick<PrismaClient, "cateringPackage">;

type PrismaCateringPackage = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  priceCents: number;
  currency: string;
  minGuests: number;
  badge: string | null;
  features: unknown;
  status: string;
  sortOrder: number;
};

function mapPackage(pkg: PrismaCateringPackage): CateringPackage {
  return {
    id: pkg.id,
    slug: pkg.slug,
    name: pkg.name,
    tagline: pkg.tagline,
    description: pkg.description,
    accent: pkg.accent as CateringAccent,
    priceCents: pkg.priceCents,
    currency: pkg.currency as CateringPackage["currency"],
    minGuests: pkg.minGuests,
    badge: pkg.badge ?? undefined,
    features: Array.isArray(pkg.features)
      ? (pkg.features as CateringFeature[])
      : [],
    status: pkg.status as CateringPackage["status"],
    sortOrder: pkg.sortOrder,
  };
}

function isErrorWithCode(error: unknown, code: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === code
  );
}

const isUniqueViolation = (error: unknown) => isErrorWithCode(error, "P2002");
const isNotFound = (error: unknown) => isErrorWithCode(error, "P2025");

export function createMemoryCateringService(
  seed: CateringPackage[] = cateringSeedPackages,
): CateringService {
  const packages: CateringPackage[] = seed.map((pkg) => ({
    ...pkg,
    features: pkg.features.map((feature) => ({ ...feature })),
  }));

  const find = (id: string) => packages.find((pkg) => pkg.id === id);

  return {
    listPackages: async (includeInactive = false) =>
      sortByDisplayOrder(
        includeInactive
          ? packages
          : packages.filter((pkg) => pkg.status === "active"),
      ),
    getPackage: async (id) => find(id),
    getPackageBySlug: async (slug) => packages.find((pkg) => pkg.slug === slug),
    createPackage: async (input) => {
      const slug = slugify(input.slug ?? input.name);
      if (packages.some((pkg) => pkg.slug === slug)) {
        throw new CateringError("CONFLICT_SLUG");
      }
      const pkg: CateringPackage = {
        id: idFromSlug(slug),
        slug,
        name: input.name,
        tagline: input.tagline,
        description: input.description,
        accent: input.accent ?? "dark",
        priceCents: input.priceCents,
        currency: input.currency ?? "SGD",
        minGuests: input.minGuests,
        badge: input.badge,
        features: input.features ?? [],
        status: input.status ?? "active",
        sortOrder:
          input.sortOrder ??
          Math.max(0, ...packages.map((p) => p.sortOrder)) + 10,
      };
      packages.push(pkg);
      return pkg;
    },
    updatePackage: async (id, input) => {
      const existing = find(id);
      if (!existing) throw new CateringError("NOT_FOUND");
      const nextSlug = input.slug ? slugify(input.slug) : existing.slug;
      if (
        nextSlug !== existing.slug &&
        packages.some((pkg) => pkg.id !== id && pkg.slug === nextSlug)
      ) {
        throw new CateringError("CONFLICT_SLUG");
      }
      existing.slug = nextSlug;
      existing.name = input.name ?? existing.name;
      existing.tagline = input.tagline ?? existing.tagline;
      existing.description = input.description ?? existing.description;
      existing.accent = input.accent ?? existing.accent;
      existing.priceCents = input.priceCents ?? existing.priceCents;
      existing.currency = input.currency ?? existing.currency;
      existing.minGuests = input.minGuests ?? existing.minGuests;
      existing.badge = input.badge ?? existing.badge;
      existing.features = input.features ?? existing.features;
      existing.status = input.status ?? existing.status;
      existing.sortOrder = input.sortOrder ?? existing.sortOrder;
      return existing;
    },
    deletePackage: async (id) => {
      const index = packages.findIndex((pkg) => pkg.id === id);
      if (index === -1) throw new CateringError("NOT_FOUND");
      packages.splice(index, 1);
    },
  };
}

export function createPrismaCateringService(
  prisma: PrismaCateringClient,
): CateringService {
  const nextSortOrder = async () => {
    const last = await prisma.cateringPackage.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    return (last?.sortOrder ?? 0) + 10;
  };

  return {
    listPackages: async (includeInactive = false) => {
      const rows = await prisma.cateringPackage.findMany({
        where: includeInactive ? undefined : { status: "active" },
        orderBy: { sortOrder: "asc" },
      });
      return rows.map(mapPackage);
    },
    getPackage: async (id) => {
      const row = await prisma.cateringPackage.findUnique({ where: { id } });
      return row ? mapPackage(row) : undefined;
    },
    getPackageBySlug: async (slug) => {
      const row = await prisma.cateringPackage.findUnique({ where: { slug } });
      return row ? mapPackage(row) : undefined;
    },
    createPackage: async (input) => {
      const slug = slugify(input.slug ?? input.name);
      try {
        const created = await prisma.cateringPackage.create({
          data: {
            id: idFromSlug(slug),
            slug,
            name: input.name,
            tagline: input.tagline,
            description: input.description,
            accent: input.accent ?? "dark",
            priceCents: input.priceCents,
            currency: input.currency ?? "SGD",
            minGuests: input.minGuests,
            badge: input.badge,
            features: (input.features ??
              []) as unknown as Prisma.InputJsonValue,
            status: input.status ?? "active",
            sortOrder: input.sortOrder ?? (await nextSortOrder()),
          },
        });
        return mapPackage(created);
      } catch (error) {
        if (isUniqueViolation(error)) throw new CateringError("CONFLICT_SLUG");
        throw error;
      }
    },
    updatePackage: async (id, input) => {
      try {
        const updated = await prisma.cateringPackage.update({
          where: { id },
          data: {
            slug: input.slug ? slugify(input.slug) : undefined,
            name: input.name,
            tagline: input.tagline,
            description: input.description,
            accent: input.accent,
            priceCents: input.priceCents,
            currency: input.currency,
            minGuests: input.minGuests,
            badge: input.badge,
            features: input.features as unknown as
              | Prisma.InputJsonValue
              | undefined,
            status: input.status,
            sortOrder: input.sortOrder,
          },
        });
        return mapPackage(updated);
      } catch (error) {
        if (isNotFound(error)) throw new CateringError("NOT_FOUND");
        if (isUniqueViolation(error)) throw new CateringError("CONFLICT_SLUG");
        throw error;
      }
    },
    deletePackage: async (id) => {
      try {
        await prisma.cateringPackage.delete({ where: { id } });
      } catch (error) {
        if (isNotFound(error)) throw new CateringError("NOT_FOUND");
        throw error;
      }
    },
  };
}
