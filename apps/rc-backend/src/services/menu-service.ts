import type { Prisma, PrismaClient } from "../generated/prisma/client.js";
import type { DietarySpiceLevel } from "../generated/prisma/enums.js";
import { isNotFound, isUniqueViolation } from "../lib/prisma-errors.js";
import { slugify } from "./catalog-service.js";

export interface MenuVariant {
  label: string;
  priceCents: number;
}

export interface MenuItem {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  priceCents: number;
  currency: "SGD";
  variants: MenuVariant[];
  imageSlug: string;
  veg: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  spiceLevel?: DietarySpiceLevel;
  allergens: string[];
  tags: string[];
  ingredients: string[];
  status: "active" | "inactive";
  sortOrder: number;
}

export interface MenuCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  status: "active" | "inactive";
  sortOrder: number;
  items: MenuItem[];
}

export interface CreateMenuCategoryInput {
  name?: string;
  title?: string;
  slug?: string;
  status?: "active" | "inactive";
  sortOrder?: number;
}

export type UpdateMenuCategoryInput = Partial<CreateMenuCategoryInput>;

export interface CreateMenuItemInput {
  slug?: string;
  categoryId: string;
  name: string;
  description: string;
  priceCents?: number;
  currency?: "SGD";
  variants?: MenuVariant[];
  imageSlug?: string;
  imageUrl?: string;
  veg?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  spiceLevel?: DietarySpiceLevel;
  allergens?: string[];
  tags?: string[];
  ingredients?: string[];
  status?: "active" | "inactive";
  sortOrder?: number;
}

export type UpdateMenuItemInput = Partial<CreateMenuItemInput>;

export type MenuErrorCode =
  | "NOT_FOUND"
  | "CONFLICT_SLUG"
  | "CONFLICT_CATEGORY_MISSING"
  | "CONFLICT_HAS_REFERENCES";

export class MenuError extends Error {
  constructor(public code: MenuErrorCode) {
    super(code);
    this.name = "MenuError";
  }
}

export interface MenuService {
  listCategories: () => Promise<MenuCategory[]>;
  getCategory: (slug: string) => Promise<MenuCategory | undefined>;
  getCategoryById: (id: string) => Promise<MenuCategory | undefined>;
  getItem: (id: string) => Promise<MenuItem | undefined>;
  createCategory: (input: CreateMenuCategoryInput) => Promise<MenuCategory>;
  updateCategory: (
    id: string,
    input: UpdateMenuCategoryInput,
  ) => Promise<MenuCategory>;
  deleteCategory: (id: string) => Promise<void>;
  createItem: (input: CreateMenuItemInput) => Promise<MenuItem>;
  updateItem: (id: string, input: UpdateMenuItemInput) => Promise<MenuItem>;
  deleteItem: (id: string) => Promise<void>;
}

type PrismaMenuClient = Pick<PrismaClient, "menuCategory" | "menuItem">;

type PrismaMenuItem = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  priceCents: number | null;
  currency: string;
  variants: unknown;
  imageSlug: string;
  veg: boolean;
  vegan: boolean | null;
  glutenFree: boolean | null;
  spiceLevel: DietarySpiceLevel | null;
  allergens: string[];
  status: string;
  sortOrder: number;
};

type PrismaMenuCategory = {
  id: string;
  slug: string;
  name: string;
  status: string;
  sortOrder: number;
  items: PrismaMenuItem[];
};

function idFromSlug(prefix: "menu_cat" | "menu_item", slug: string): string {
  return `${prefix}_${slug.replace(/-/g, "_")}`;
}

function sortByDisplayOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((first, second) => first.sortOrder - second.sortOrder);
}

function parseVariants(value: unknown): MenuVariant[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((variant) => {
      if (typeof variant !== "object" || variant === null) return undefined;
      const candidate = variant as { label?: unknown; priceCents?: unknown };
      if (
        typeof candidate.label !== "string" ||
        typeof candidate.priceCents !== "number"
      ) {
        return undefined;
      }
      return { label: candidate.label, priceCents: candidate.priceCents };
    })
    .filter((variant): variant is MenuVariant => Boolean(variant));
}

function toPrismaJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function mapMenuItem(item: PrismaMenuItem): MenuItem {
  const variants = parseVariants(item.variants);
  const tags = [
    item.veg ? "Vegetarian" : undefined,
    item.vegan ? "Vegan" : undefined,
    item.glutenFree ? "Gluten-free" : undefined,
    item.spiceLevel,
  ].filter((tag): tag is string => Boolean(tag));
  return {
    id: item.id,
    slug: item.slug,
    categoryId: item.categoryId,
    name: item.name,
    description: item.description,
    priceCents: item.priceCents ?? variants[0]?.priceCents ?? 0,
    currency: item.currency as MenuItem["currency"],
    variants,
    imageSlug: item.imageSlug,
    veg: item.veg,
    vegan: item.vegan ?? undefined,
    glutenFree: item.glutenFree ?? undefined,
    spiceLevel: item.spiceLevel ?? undefined,
    allergens: item.allergens,
    tags,
    ingredients: item.allergens,
    status: item.status as MenuItem["status"],
    sortOrder: item.sortOrder,
  };
}

function mapMenuCategory(category: PrismaMenuCategory): MenuCategory {
  return {
    id: category.id,
    slug: category.slug,
    title: category.name,
    subtitle: "Tandoori Corner menu",
    icon: "utensils",
    status: category.status as MenuCategory["status"],
    sortOrder: category.sortOrder,
    items: category.items.map(mapMenuItem),
  };
}

function categoryName(input: CreateMenuCategoryInput): string {
  return (input.name ?? input.title ?? "").trim();
}

export function createMemoryMenuService(
  seed: MenuCategory[] = [],
): MenuService {
  const categories = seed.map((category) => ({
    ...category,
    items: category.items.map((item) => ({ ...item })),
  }));
  const allItems = () => categories.flatMap((category) => category.items);
  const findCategory = (id: string) =>
    categories.find((category) => category.id === id);
  const findItem = (id: string) => {
    for (const category of categories) {
      const item = category.items.find((candidate) => candidate.id === id);
      if (item) return { item, category };
    }
    return undefined;
  };

  return {
    listCategories: async () =>
      sortByDisplayOrder(categories).map((category) => ({
        ...category,
        items: sortByDisplayOrder(category.items),
      })),
    getCategory: async (slug) =>
      categories.find((category) => category.slug === slug),
    getCategoryById: async (id) => findCategory(id),
    getItem: async (id) => findItem(id)?.item,
    createCategory: async (input) => {
      const name = categoryName(input);
      const slug = slugify(input.slug ?? name);
      if (categories.some((category) => category.slug === slug)) {
        throw new MenuError("CONFLICT_SLUG");
      }
      const category: MenuCategory = {
        id: idFromSlug("menu_cat", slug),
        slug,
        title: name,
        subtitle: "Tandoori Corner menu",
        icon: "utensils",
        status: input.status ?? "active",
        sortOrder:
          input.sortOrder ??
          Math.max(0, ...categories.map((c) => c.sortOrder)) + 10,
        items: [],
      };
      categories.push(category);
      return category;
    },
    updateCategory: async (id, input) => {
      const category = findCategory(id);
      if (!category) throw new MenuError("NOT_FOUND");
      const nextSlug = input.slug ? slugify(input.slug) : category.slug;
      if (
        nextSlug !== category.slug &&
        categories.some(
          (candidate) => candidate.id !== id && candidate.slug === nextSlug,
        )
      ) {
        throw new MenuError("CONFLICT_SLUG");
      }
      category.slug = nextSlug;
      category.title = categoryName(input) || category.title;
      category.status = input.status ?? category.status;
      category.sortOrder = input.sortOrder ?? category.sortOrder;
      return category;
    },
    deleteCategory: async (id) => {
      const index = categories.findIndex((category) => category.id === id);
      if (index === -1) throw new MenuError("NOT_FOUND");
      if (categories[index].items.length > 0) {
        throw new MenuError("CONFLICT_HAS_REFERENCES");
      }
      categories.splice(index, 1);
    },
    createItem: async (input) => {
      const category = findCategory(input.categoryId);
      if (!category) throw new MenuError("CONFLICT_CATEGORY_MISSING");
      const slug = slugify(input.slug ?? input.name);
      if (allItems().some((item) => item.slug === slug)) {
        throw new MenuError("CONFLICT_SLUG");
      }
      const item: MenuItem = {
        id: idFromSlug("menu_item", slug),
        slug,
        categoryId: input.categoryId,
        name: input.name,
        description: input.description,
        priceCents: input.priceCents ?? input.variants?.[0]?.priceCents ?? 0,
        currency: input.currency ?? "SGD",
        variants: input.variants ?? [],
        imageSlug: input.imageSlug ?? slug,
        veg: input.veg ?? false,
        vegan: input.vegan,
        glutenFree: input.glutenFree,
        spiceLevel: input.spiceLevel,
        allergens: input.allergens ?? input.ingredients ?? input.tags ?? [],
        tags: input.tags ?? [],
        ingredients: input.ingredients ?? [],
        status: input.status ?? "active",
        sortOrder:
          input.sortOrder ??
          Math.max(0, ...category.items.map((i) => i.sortOrder)) + 10,
      };
      category.items.push(item);
      return item;
    },
    updateItem: async (id, input) => {
      const found = findItem(id);
      if (!found) throw new MenuError("NOT_FOUND");
      if (input.categoryId && input.categoryId !== found.item.categoryId) {
        const target = findCategory(input.categoryId);
        if (!target) throw new MenuError("CONFLICT_CATEGORY_MISSING");
        found.category.items = found.category.items.filter(
          (candidate) => candidate.id !== id,
        );
        found.item.categoryId = input.categoryId;
        target.items.push(found.item);
      }
      const nextSlug = input.slug ? slugify(input.slug) : found.item.slug;
      if (
        nextSlug !== found.item.slug &&
        allItems().some(
          (candidate) => candidate.id !== id && candidate.slug === nextSlug,
        )
      ) {
        throw new MenuError("CONFLICT_SLUG");
      }
      found.item.slug = nextSlug;
      found.item.name = input.name ?? found.item.name;
      found.item.description = input.description ?? found.item.description;
      found.item.priceCents = input.priceCents ?? found.item.priceCents;
      found.item.currency = input.currency ?? found.item.currency;
      found.item.variants = input.variants ?? found.item.variants;
      found.item.imageSlug = input.imageSlug ?? found.item.imageSlug;
      found.item.veg = input.veg ?? found.item.veg;
      found.item.vegan = input.vegan ?? found.item.vegan;
      found.item.glutenFree = input.glutenFree ?? found.item.glutenFree;
      found.item.spiceLevel = input.spiceLevel ?? found.item.spiceLevel;
      found.item.allergens =
        input.allergens ??
        input.ingredients ??
        input.tags ??
        found.item.allergens;
      found.item.tags = input.tags ?? found.item.tags;
      found.item.ingredients = input.ingredients ?? found.item.ingredients;
      found.item.status = input.status ?? found.item.status;
      found.item.sortOrder = input.sortOrder ?? found.item.sortOrder;
      return found.item;
    },
    deleteItem: async (id) => {
      const found = findItem(id);
      if (!found) throw new MenuError("NOT_FOUND");
      found.category.items = found.category.items.filter(
        (candidate) => candidate.id !== id,
      );
    },
  };
}

export function createPrismaMenuService(prisma: PrismaMenuClient): MenuService {
  const nextCategorySortOrder = async () => {
    const last = await prisma.menuCategory.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    return (last?.sortOrder ?? 0) + 10;
  };
  const nextItemSortOrder = async (categoryId: string) => {
    const last = await prisma.menuItem.findFirst({
      where: { categoryId },
      orderBy: { sortOrder: "desc" },
    });
    return (last?.sortOrder ?? 0) + 10;
  };

  return {
    listCategories: async () => {
      const categories = await prisma.menuCategory.findMany({
        orderBy: { sortOrder: "asc" },
        include: { items: { orderBy: { sortOrder: "asc" } } },
      });
      return categories.map(mapMenuCategory);
    },
    getCategory: async (slug) => {
      const category = await prisma.menuCategory.findUnique({
        where: { slug },
        include: { items: { orderBy: { sortOrder: "asc" } } },
      });
      return category ? mapMenuCategory(category) : undefined;
    },
    getCategoryById: async (id) => {
      const category = await prisma.menuCategory.findUnique({
        where: { id },
        include: { items: { orderBy: { sortOrder: "asc" } } },
      });
      return category ? mapMenuCategory(category) : undefined;
    },
    getItem: async (id) => {
      const item = await prisma.menuItem.findUnique({ where: { id } });
      return item ? mapMenuItem(item) : undefined;
    },
    createCategory: async (input) => {
      const name = categoryName(input);
      const slug = slugify(input.slug ?? name);
      try {
        const created = await prisma.menuCategory.create({
          data: {
            id: idFromSlug("menu_cat", slug),
            slug,
            name,
            status: input.status ?? "active",
            sortOrder: input.sortOrder ?? (await nextCategorySortOrder()),
          },
          include: { items: { orderBy: { sortOrder: "asc" } } },
        });
        return mapMenuCategory(created);
      } catch (error) {
        if (isUniqueViolation(error)) throw new MenuError("CONFLICT_SLUG");
        throw error;
      }
    },
    updateCategory: async (id, input) => {
      try {
        const updated = await prisma.menuCategory.update({
          where: { id },
          data: {
            slug: input.slug ? slugify(input.slug) : undefined,
            name: categoryName(input) || undefined,
            status: input.status,
            sortOrder: input.sortOrder,
          },
          include: { items: { orderBy: { sortOrder: "asc" } } },
        });
        return mapMenuCategory(updated);
      } catch (error) {
        if (isNotFound(error)) throw new MenuError("NOT_FOUND");
        if (isUniqueViolation(error)) throw new MenuError("CONFLICT_SLUG");
        throw error;
      }
    },
    deleteCategory: async (id) => {
      const childCount = await prisma.menuItem.count({
        where: { categoryId: id },
      });
      if (childCount > 0) throw new MenuError("CONFLICT_HAS_REFERENCES");
      try {
        await prisma.menuCategory.delete({ where: { id } });
      } catch (error) {
        if (isNotFound(error)) throw new MenuError("NOT_FOUND");
        throw error;
      }
    },
    createItem: async (input) => {
      const category = await prisma.menuCategory.findUnique({
        where: { id: input.categoryId },
      });
      if (!category) throw new MenuError("CONFLICT_CATEGORY_MISSING");
      const slug = slugify(input.slug ?? input.name);
      try {
        const created = await prisma.menuItem.create({
          data: {
            id: idFromSlug("menu_item", slug),
            slug,
            categoryId: input.categoryId,
            name: input.name,
            description: input.description,
            priceCents: input.priceCents ?? input.variants?.[0]?.priceCents,
            currency: input.currency ?? "SGD",
            variants: toPrismaJson(input.variants ?? []),
            imageSlug: input.imageSlug ?? slugify(input.imageUrl ?? input.name),
            veg: input.veg ?? false,
            vegan: input.vegan,
            glutenFree: input.glutenFree,
            spiceLevel: input.spiceLevel,
            allergens: input.allergens ?? input.ingredients ?? input.tags ?? [],
            status: input.status ?? "active",
            sortOrder:
              input.sortOrder ?? (await nextItemSortOrder(input.categoryId)),
          },
        });
        return mapMenuItem(created);
      } catch (error) {
        if (isUniqueViolation(error)) throw new MenuError("CONFLICT_SLUG");
        throw error;
      }
    },
    updateItem: async (id, input) => {
      if (input.categoryId) {
        const category = await prisma.menuCategory.findUnique({
          where: { id: input.categoryId },
        });
        if (!category) throw new MenuError("CONFLICT_CATEGORY_MISSING");
      }
      try {
        const updated = await prisma.menuItem.update({
          where: { id },
          data: {
            slug: input.slug ? slugify(input.slug) : undefined,
            categoryId: input.categoryId,
            name: input.name,
            description: input.description,
            priceCents: input.priceCents,
            currency: input.currency,
            variants:
              input.variants === undefined
                ? undefined
                : toPrismaJson(input.variants),
            imageSlug: input.imageSlug,
            veg: input.veg,
            vegan: input.vegan,
            glutenFree: input.glutenFree,
            spiceLevel: input.spiceLevel,
            allergens: input.allergens ?? input.ingredients ?? input.tags,
            status: input.status,
            sortOrder: input.sortOrder,
          },
        });
        return mapMenuItem(updated);
      } catch (error) {
        if (isNotFound(error)) throw new MenuError("NOT_FOUND");
        if (isUniqueViolation(error)) throw new MenuError("CONFLICT_SLUG");
        throw error;
      }
    },
    deleteItem: async (id) => {
      try {
        await prisma.menuItem.delete({ where: { id } });
      } catch (error) {
        if (isNotFound(error)) throw new MenuError("NOT_FOUND");
        throw error;
      }
    },
  };
}
