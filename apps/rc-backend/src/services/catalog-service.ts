import type { PrismaClient } from "../generated/prisma/client.js";
import { isNotFound, isUniqueViolation } from "../lib/prisma-errors.js";

export interface CatalogItem {
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
}

export interface CatalogCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  status: "active" | "inactive";
  sortOrder: number;
  items: CatalogItem[];
}

export interface CatalogItemFilters {
  categorySlug?: string;
  query?: string;
}

export interface CreateCategoryInput {
  slug?: string;
  title: string;
  subtitle: string;
  icon: string;
  status?: "active" | "inactive";
  sortOrder?: number;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export interface CreateItemInput {
  slug?: string;
  categoryId: string;
  name: string;
  description: string;
  story?: string;
  imageUrl?: string;
  priceCents: number;
  currency?: "SGD";
  tags?: string[];
  ingredients?: string[];
  status?: "active" | "inactive";
  sortOrder?: number;
}

export type UpdateItemInput = Partial<CreateItemInput>;

export type CatalogErrorCode =
  | "NOT_FOUND"
  | "CONFLICT_SLUG"
  | "CONFLICT_CATEGORY_MISSING"
  | "CONFLICT_HAS_REFERENCES";

export class CatalogError extends Error {
  constructor(public code: CatalogErrorCode) {
    super(code);
    this.name = "CatalogError";
  }
}

export const catalogSeedCategories: CatalogCategory[] = [
  {
    id: "cat_chefs_signatures",
    slug: "chefs-signatures",
    title: "Chef's Signatures",
    subtitle: "The Master's Touch",
    icon: "chefHat",
    status: "active",
    sortOrder: 10,
    items: [
      {
        id: "item_tandoori_mixed_seafood_platter",
        slug: "tandoori-mixed-seafood-platter",
        categoryId: "cat_chefs_signatures",
        name: "The Tandoori Mixed Seafood Platter",
        description:
          "Our most lavish offering. Jumbo prawns, tender chunks of fish, and calamari marinated for 24 hours in handcrafted spice blends. Fired inside a traditional clay oven to smoky perfection.",
        story:
          "Inspired by the coastal bounties of India, this platter represents our Chef's dedication to mastering the delicate art of tandoor-cooking seafood without losing its natural sweetness.",
        imageUrl:
          "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80",
        priceCents: 4800,
        currency: "SGD",
        tags: ["Signature", "Sharing"],
        ingredients: [
          "Tiger Prawns",
          "Kingfish",
          "Calamari",
          "Kashmiri Chili",
          "Yogurt",
          "Ajwain (Carom Seeds)",
        ],
        status: "active",
        sortOrder: 10,
      },
      {
        id: "item_reshmi_tandoori_chicken",
        slug: "reshmi-tandoori-chicken",
        categoryId: "cat_chefs_signatures",
        name: "Reshmi Tandoori Chicken",
        description:
          "Fall-apart tender chicken on the bone. The 24-hour yogurt and kashmiri chili marinade produces a vibrant color and a deep, velvety crust.",
        story:
          "A recipe passed down through three generations. The secret lies in double-marination, ensuring the spices penetrate right to the bone.",
        imageUrl:
          "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80",
        priceCents: 2800,
        currency: "SGD",
        tags: ["Signature"],
        ingredients: [
          "Free-range Chicken",
          "Hung Curd",
          "Deggi Mirch",
          "Garam Masala",
          "Mustard Oil",
        ],
        status: "active",
        sortOrder: 20,
      },
    ],
  },
  {
    id: "cat_curry_corner",
    slug: "curry-corner",
    title: "The Curry Corner",
    subtitle: "Silken & Robust Gravies",
    icon: "flame",
    status: "active",
    sortOrder: 20,
    items: [
      {
        id: "item_og_butter_chicken",
        slug: "og-butter-chicken",
        categoryId: "cat_curry_corner",
        name: "OG Butter Chicken",
        description:
          "Tandoor-charred chicken pieces submerged in a rich, 4-hour slow-cooked tomato gravy. Finished with cold butter and a swirl of cream. Mild and velvety.",
        story:
          "Our tribute to the original 1950s Delhi recipe. We never add sugar; the sweetness comes purely from slow-roasted tomatoes.",
        imageUrl:
          "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80",
        priceCents: 2200,
        currency: "SGD",
        tags: ["Bestseller"],
        ingredients: [
          "Chicken Tikka",
          "San Marzano Tomatoes",
          "White Butter",
          "Fenugreek Leaves",
          "Cashew Paste",
        ],
        status: "active",
        sortOrder: 10,
      },
      {
        id: "item_saag_mutton",
        slug: "saag-mutton",
        categoryId: "cat_curry_corner",
        name: "Saag Mutton",
        description:
          "Tender chunks of mutton in a deep-green spinach gravy. Ginger and garlic hit the palate before the gentle heat. The dish Chef learned from his mother.",
        story:
          "A winter staple in Punjab, elevated for our dining room. The spinach is blanched for exactly 60 seconds to retain its vibrant emerald hue.",
        imageUrl:
          "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80",
        priceCents: 2400,
        currency: "SGD",
        tags: ["Heritage"],
        ingredients: [
          "New Zealand Mutton",
          "Fresh Pureed Spinach",
          "Garlic",
          "Ginger",
          "Green Chili",
        ],
        status: "active",
        sortOrder: 20,
      },
      {
        id: "item_rogan_josh",
        slug: "rogan-josh",
        categoryId: "cat_curry_corner",
        name: "Rogan Josh",
        description:
          "A fiery, aromatic Kashmiri lamb curry. Slow-cooked until the meat yields to a spoon, swimming in a vibrant red gravy.",
        story:
          "Authentic Kashmiri Rogan Josh never uses tomatoes or onions. We stay true to this ancient method, relying on fennel and ginger for body.",
        imageUrl:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80",
        priceCents: 2500,
        currency: "SGD",
        tags: ["Spicy"],
        ingredients: [
          "Lamb Braise",
          "Kashmiri Red Chilies",
          "Fennel Powder",
          "Dry Ginger",
          "Yogurt",
        ],
        status: "active",
        sortOrder: 30,
      },
    ],
  },
  {
    id: "cat_sabzi_corner",
    slug: "sabzi-corner",
    title: "The Sabzi Corner",
    subtitle: "From The Fields",
    icon: "leaf",
    status: "active",
    sortOrder: 30,
    items: [
      {
        id: "item_palak_paneer",
        slug: "palak-paneer",
        categoryId: "cat_sabzi_corner",
        name: "Palak Paneer",
        description:
          "Soft cottage cheese cubes enveloped in a vibrant, spiced spinach puree. A North Indian classic.",
        story:
          "We make our cottage cheese fresh every morning, ensuring it literally melts in your mouth against the robust spinach.",
        imageUrl:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
        priceCents: 1800,
        currency: "SGD",
        tags: ["Vegetarian"],
        ingredients: [
          "Homemade Paneer",
          "Fresh Spinach",
          "Fenugreek",
          "Garlic",
          "Heavy Cream",
        ],
        status: "active",
        sortOrder: 10,
      },
      {
        id: "item_aloo_gobi",
        slug: "aloo-gobi",
        categoryId: "cat_sabzi_corner",
        name: "Aloo Gobi",
        description:
          "Cauliflower and potatoes wok-tossed with turmeric, cumin, and fresh coriander. Homestyle and comforting.",
        story:
          "A dry curry that relies entirely on the precise timing of spices hitting the hot oil to release their essential oils.",
        imageUrl:
          "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80",
        priceCents: 1500,
        currency: "SGD",
        tags: ["Vegan", "Vegetarian"],
        ingredients: [
          "Cauliflower Florets",
          "Potatoes",
          "Cumin Seeds",
          "Turmeric",
          "Fresh Coriander",
        ],
        status: "active",
        sortOrder: 20,
      },
      {
        id: "item_dal_makhani",
        slug: "dal-makhani",
        categoryId: "cat_sabzi_corner",
        name: "Dal Makhani",
        description:
          "Black lentils slow-cooked overnight with tomatoes, butter, and cream. The ultimate comfort food.",
        story:
          "Cooked for a minimum of 18 hours on the residual heat of the cooling tandoor oven, developing a matchless smoky depth.",
        imageUrl:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80",
        priceCents: 1600,
        currency: "SGD",
        tags: ["Vegetarian", "Signature"],
        ingredients: [
          "Whole Black Lentils",
          "Kidney Beans",
          "Butter",
          "Tomato Puree",
          "Cream",
        ],
        status: "active",
        sortOrder: 30,
      },
    ],
  },
  {
    id: "cat_breads_rice",
    slug: "breads-rice",
    title: "Breads & Rice",
    subtitle: "The Perfect Pairings",
    icon: "sparkles",
    status: "active",
    sortOrder: 40,
    items: [
      {
        id: "item_garlic_naan",
        slug: "garlic-naan",
        categoryId: "cat_breads_rice",
        name: "Garlic Naan",
        description:
          "Crispy edges, fluffy center. Slathered with aromatic garlic butter straight from the Tandoor.",
        story:
          "Slapped against the 400-degree walls of our clay oven and baked in under two minutes for the perfect char.",
        imageUrl:
          "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80",
        priceCents: 600,
        currency: "SGD",
        tags: ["Vegetarian"],
        ingredients: [
          "Refined Flour",
          "Yogurt",
          "Garlic",
          "Butter",
          "Fresh Coriander",
        ],
        status: "active",
        sortOrder: 10,
      },
      {
        id: "item_mutton_biryani",
        slug: "mutton-biryani",
        categoryId: "cat_breads_rice",
        name: "Mutton Biryani",
        description:
          "Slow-steamed, fall-apart tender mutton buried in a mountain of saffron-scented, long-grain basmati. Perfectly charred, zero fluff.",
        story:
          "Prepared in the traditional 'Dum' style, sealed with dough to lock in the steam and aromas of 15 different whole spices.",
        imageUrl:
          "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80",
        priceCents: 2400,
        currency: "SGD",
        tags: [],
        ingredients: [
          "Basmati Rice",
          "Marinated Mutton",
          "Saffron",
          "Rose Water",
          "Fried Onions",
          "Whole Spices",
        ],
        status: "active",
        sortOrder: 20,
      },
      {
        id: "item_saffron_basmati_pulao",
        slug: "saffron-basmati-pulao",
        categoryId: "cat_breads_rice",
        name: "Saffron Basmati Pulao",
        description:
          "Fragrant, long-grain basmati rice cooked with whole spices and saffron threads.",
        story:
          "We only use rice that has been aged for at least two years to ensure every grain remains distinct and fluffy.",
        imageUrl:
          "https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80",
        priceCents: 900,
        currency: "SGD",
        tags: ["Vegetarian"],
        ingredients: [
          "Aged Basmati",
          "Kashmiri Saffron",
          "Cardamom",
          "Cloves",
          "Ghee",
        ],
        status: "active",
        sortOrder: 30,
      },
    ],
  },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function idFromSlug(prefix: "cat" | "item", slug: string): string {
  return `${prefix}_${slug.replace(/-/g, "_")}`;
}

function sortByDisplayOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((first, second) => first.sortOrder - second.sortOrder);
}

function matchesQuery(item: CatalogItem, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return (
    item.name.toLowerCase().includes(normalizedQuery) ||
    item.description.toLowerCase().includes(normalizedQuery) ||
    item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
    item.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(normalizedQuery),
    )
  );
}

export interface CatalogService {
  listCategories: (includeInactive?: boolean) => Promise<CatalogCategory[]>;
  listItems: (
    filters?: CatalogItemFilters,
    includeInactive?: boolean,
  ) => Promise<CatalogItem[]>;
  getCategory: (
    slug: string,
    includeInactive?: boolean,
  ) => Promise<CatalogCategory | undefined>;
  getItem: (id: string) => Promise<CatalogItem | undefined>;
  getItemBySlug: (
    slug: string,
    includeInactive?: boolean,
  ) => Promise<CatalogItem | undefined>;
  createCategory: (input: CreateCategoryInput) => Promise<CatalogCategory>;
  updateCategory: (
    id: string,
    input: UpdateCategoryInput,
  ) => Promise<CatalogCategory>;
  deleteCategory: (id: string) => Promise<void>;
  createItem: (input: CreateItemInput) => Promise<CatalogItem>;
  updateItem: (id: string, input: UpdateItemInput) => Promise<CatalogItem>;
  deleteItem: (id: string) => Promise<void>;
}

type PrismaCatalogClient = Pick<
  PrismaClient,
  "catalogCategory" | "catalogItem"
>;

type PrismaCatalogItem = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  story: string | null;
  imageUrl: string | null;
  priceCents: number;
  currency: string;
  tags: string[];
  ingredients: string[];
  status: string;
  sortOrder: number;
};

type PrismaCatalogCategory = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  status: string;
  sortOrder: number;
  items: PrismaCatalogItem[];
};

function mapCatalogItem(item: PrismaCatalogItem): CatalogItem {
  return {
    id: item.id,
    slug: item.slug,
    categoryId: item.categoryId,
    name: item.name,
    description: item.description,
    story: item.story ?? undefined,
    imageUrl: item.imageUrl ?? undefined,
    priceCents: item.priceCents,
    currency: item.currency as CatalogItem["currency"],
    tags: item.tags,
    ingredients: item.ingredients,
    status: item.status as CatalogItem["status"],
    sortOrder: item.sortOrder,
  };
}

function mapCatalogCategory(category: PrismaCatalogCategory): CatalogCategory {
  return {
    id: category.id,
    slug: category.slug,
    title: category.title,
    subtitle: category.subtitle,
    icon: category.icon,
    status: category.status as CatalogCategory["status"],
    sortOrder: category.sortOrder,
    items: category.items.map(mapCatalogItem),
  };
}

function publicCatalogCategory(
  category: CatalogCategory,
): CatalogCategory | undefined {
  if (category.status !== "active") return undefined;
  return {
    ...category,
    items: category.items.filter((item) => item.status === "active"),
  };
}

export function createMemoryCatalogService(
  seed: CatalogCategory[] = catalogSeedCategories,
): CatalogService {
  const categories: CatalogCategory[] = seed.map((category) => ({
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
  const orderedCategories = () =>
    sortByDisplayOrder(categories).map((category) => ({
      ...category,
      items: sortByDisplayOrder(category.items),
    }));

  return {
    listCategories: async (includeInactive = false) =>
      orderedCategories()
        .map((category) =>
          includeInactive ? category : publicCatalogCategory(category),
        )
        .filter((category): category is CatalogCategory => Boolean(category)),
    listItems: async (filters = {}, includeInactive = false) => {
      const sourceCategories = includeInactive
        ? categories
        : categories.filter((category) => category.status === "active");
      const base = filters.categorySlug
        ? (sourceCategories.find(
            (category) => category.slug === filters.categorySlug,
          )?.items ?? [])
        : sourceCategories.flatMap((category) => category.items);
      const ordered = sortByDisplayOrder(
        includeInactive
          ? base
          : base.filter((item) => item.status === "active"),
      );
      return filters.query
        ? ordered.filter((item) => matchesQuery(item, filters.query as string))
        : ordered;
    },
    getCategory: async (slug, includeInactive = false) => {
      const category = categories.find((candidate) => candidate.slug === slug);
      if (!category) return undefined;
      const ordered = {
        ...category,
        items: sortByDisplayOrder(category.items),
      };
      if (includeInactive) return ordered;
      return publicCatalogCategory(ordered);
    },
    getItem: async (id) => findItem(id)?.item,
    getItemBySlug: async (slug, includeInactive = false) => {
      const category = categories.find((candidate) =>
        candidate.items.some((item) => item.slug === slug),
      );
      const item = category?.items.find((candidate) => candidate.slug === slug);
      if (!item || (!includeInactive && item.status !== "active")) {
        return undefined;
      }
      if (!includeInactive && category?.status !== "active") return undefined;
      return item;
    },
    createCategory: async (input) => {
      const slug = slugify(input.slug ?? input.title);
      if (categories.some((category) => category.slug === slug)) {
        throw new CatalogError("CONFLICT_SLUG");
      }
      const category: CatalogCategory = {
        id: idFromSlug("cat", slug),
        slug,
        title: input.title,
        subtitle: input.subtitle,
        icon: input.icon,
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
      const existing = findCategory(id);
      if (!existing) throw new CatalogError("NOT_FOUND");
      const nextSlug = input.slug ? slugify(input.slug) : existing.slug;
      if (
        nextSlug !== existing.slug &&
        categories.some(
          (category) => category.id !== id && category.slug === nextSlug,
        )
      ) {
        throw new CatalogError("CONFLICT_SLUG");
      }
      existing.slug = nextSlug;
      existing.title = input.title ?? existing.title;
      existing.subtitle = input.subtitle ?? existing.subtitle;
      existing.icon = input.icon ?? existing.icon;
      existing.status = input.status ?? existing.status;
      existing.sortOrder = input.sortOrder ?? existing.sortOrder;
      return existing;
    },
    deleteCategory: async (id) => {
      const index = categories.findIndex((category) => category.id === id);
      if (index === -1) throw new CatalogError("NOT_FOUND");
      if (categories[index].items.length > 0) {
        throw new CatalogError("CONFLICT_HAS_REFERENCES");
      }
      categories.splice(index, 1);
    },
    createItem: async (input) => {
      const category = findCategory(input.categoryId);
      if (!category) throw new CatalogError("CONFLICT_CATEGORY_MISSING");
      const slug = slugify(input.slug ?? input.name);
      if (allItems().some((item) => item.slug === slug)) {
        throw new CatalogError("CONFLICT_SLUG");
      }
      const item: CatalogItem = {
        id: idFromSlug("item", slug),
        slug,
        categoryId: input.categoryId,
        name: input.name,
        description: input.description,
        story: input.story,
        imageUrl: input.imageUrl,
        priceCents: input.priceCents,
        currency: input.currency ?? "SGD",
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
      if (!found) throw new CatalogError("NOT_FOUND");
      const { item } = found;
      if (input.categoryId && input.categoryId !== item.categoryId) {
        const target = findCategory(input.categoryId);
        if (!target) throw new CatalogError("CONFLICT_CATEGORY_MISSING");
        found.category.items = found.category.items.filter(
          (candidate) => candidate.id !== id,
        );
        item.categoryId = input.categoryId;
        target.items.push(item);
      }
      const nextSlug = input.slug ? slugify(input.slug) : item.slug;
      if (
        nextSlug !== item.slug &&
        allItems().some(
          (candidate) => candidate.id !== id && candidate.slug === nextSlug,
        )
      ) {
        throw new CatalogError("CONFLICT_SLUG");
      }
      item.slug = nextSlug;
      item.name = input.name ?? item.name;
      item.description = input.description ?? item.description;
      item.story = input.story ?? item.story;
      item.imageUrl = input.imageUrl ?? item.imageUrl;
      item.priceCents = input.priceCents ?? item.priceCents;
      item.currency = input.currency ?? item.currency;
      item.tags = input.tags ?? item.tags;
      item.ingredients = input.ingredients ?? item.ingredients;
      item.status = input.status ?? item.status;
      item.sortOrder = input.sortOrder ?? item.sortOrder;
      return item;
    },
    deleteItem: async (id) => {
      const found = findItem(id);
      if (!found) throw new CatalogError("NOT_FOUND");
      found.category.items = found.category.items.filter(
        (candidate) => candidate.id !== id,
      );
    },
  };
}

export function createPrismaCatalogService(
  prisma: PrismaCatalogClient,
): CatalogService {
  const nextCategorySortOrder = async () => {
    const last = await prisma.catalogCategory.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    return (last?.sortOrder ?? 0) + 10;
  };
  const nextItemSortOrder = async (categoryId: string) => {
    const last = await prisma.catalogItem.findFirst({
      where: { categoryId },
      orderBy: { sortOrder: "desc" },
    });
    return (last?.sortOrder ?? 0) + 10;
  };

  return {
    listCategories: async (includeInactive = false) => {
      const categories = await prisma.catalogCategory.findMany({
        where: includeInactive ? undefined : { status: "active" },
        orderBy: { sortOrder: "asc" },
        include: {
          items: {
            where: includeInactive ? undefined : { status: "active" },
            orderBy: { sortOrder: "asc" },
          },
        },
      });
      return categories.map(mapCatalogCategory);
    },
    listItems: async (filters = {}, includeInactive = false) => {
      const items = await prisma.catalogItem.findMany({
        where: {
          ...(includeInactive ? {} : { status: "active" }),
          ...(filters.categorySlug
            ? {
                category: {
                  slug: filters.categorySlug,
                  ...(includeInactive ? {} : { status: "active" }),
                },
              }
            : includeInactive
              ? {}
              : { category: { status: "active" } }),
        },
        orderBy: { sortOrder: "asc" },
      });
      const mapped = items.map(mapCatalogItem);
      return filters.query
        ? mapped.filter((item) => matchesQuery(item, filters.query as string))
        : mapped;
    },
    getCategory: async (slug, includeInactive = false) => {
      const category = await prisma.catalogCategory.findFirst({
        where: { slug, ...(includeInactive ? {} : { status: "active" }) },
        include: {
          items: {
            where: includeInactive ? undefined : { status: "active" },
            orderBy: { sortOrder: "asc" },
          },
        },
      });
      return category ? mapCatalogCategory(category) : undefined;
    },
    getItem: async (id) => {
      const item = await prisma.catalogItem.findUnique({ where: { id } });
      return item ? mapCatalogItem(item) : undefined;
    },
    getItemBySlug: async (slug, includeInactive = false) => {
      const item = await prisma.catalogItem.findFirst({
        where: {
          slug,
          ...(includeInactive
            ? {}
            : { status: "active", category: { status: "active" } }),
        },
      });
      return item ? mapCatalogItem(item) : undefined;
    },
    createCategory: async (input) => {
      const slug = slugify(input.slug ?? input.title);
      try {
        const created = await prisma.catalogCategory.create({
          data: {
            id: idFromSlug("cat", slug),
            slug,
            title: input.title,
            subtitle: input.subtitle,
            icon: input.icon,
            status: input.status ?? "active",
            sortOrder: input.sortOrder ?? (await nextCategorySortOrder()),
          },
          include: { items: { orderBy: { sortOrder: "asc" } } },
        });
        return mapCatalogCategory(created);
      } catch (error) {
        if (isUniqueViolation(error)) throw new CatalogError("CONFLICT_SLUG");
        throw error;
      }
    },
    updateCategory: async (id, input) => {
      try {
        const updated = await prisma.catalogCategory.update({
          where: { id },
          data: {
            slug: input.slug ? slugify(input.slug) : undefined,
            title: input.title,
            subtitle: input.subtitle,
            icon: input.icon,
            status: input.status,
            sortOrder: input.sortOrder,
          },
          include: { items: { orderBy: { sortOrder: "asc" } } },
        });
        return mapCatalogCategory(updated);
      } catch (error) {
        if (isNotFound(error)) throw new CatalogError("NOT_FOUND");
        if (isUniqueViolation(error)) throw new CatalogError("CONFLICT_SLUG");
        throw error;
      }
    },
    deleteCategory: async (id) => {
      const childCount = await prisma.catalogItem.count({
        where: { categoryId: id },
      });
      if (childCount > 0) throw new CatalogError("CONFLICT_HAS_REFERENCES");
      try {
        await prisma.catalogCategory.delete({ where: { id } });
      } catch (error) {
        if (isNotFound(error)) throw new CatalogError("NOT_FOUND");
        throw error;
      }
    },
    createItem: async (input) => {
      const category = await prisma.catalogCategory.findUnique({
        where: { id: input.categoryId },
      });
      if (!category) throw new CatalogError("CONFLICT_CATEGORY_MISSING");
      const slug = slugify(input.slug ?? input.name);
      try {
        const created = await prisma.catalogItem.create({
          data: {
            id: idFromSlug("item", slug),
            slug,
            categoryId: input.categoryId,
            name: input.name,
            description: input.description,
            story: input.story,
            imageUrl: input.imageUrl,
            priceCents: input.priceCents,
            currency: input.currency ?? "SGD",
            tags: input.tags ?? [],
            ingredients: input.ingredients ?? [],
            status: input.status ?? "active",
            sortOrder:
              input.sortOrder ?? (await nextItemSortOrder(input.categoryId)),
          },
        });
        return mapCatalogItem(created);
      } catch (error) {
        if (isUniqueViolation(error)) throw new CatalogError("CONFLICT_SLUG");
        throw error;
      }
    },
    updateItem: async (id, input) => {
      if (input.categoryId) {
        const category = await prisma.catalogCategory.findUnique({
          where: { id: input.categoryId },
        });
        if (!category) throw new CatalogError("CONFLICT_CATEGORY_MISSING");
      }
      try {
        const updated = await prisma.catalogItem.update({
          where: { id },
          data: {
            slug: input.slug ? slugify(input.slug) : undefined,
            categoryId: input.categoryId,
            name: input.name,
            description: input.description,
            story: input.story,
            imageUrl: input.imageUrl,
            priceCents: input.priceCents,
            currency: input.currency,
            tags: input.tags,
            ingredients: input.ingredients,
            status: input.status,
            sortOrder: input.sortOrder,
          },
        });
        return mapCatalogItem(updated);
      } catch (error) {
        if (isNotFound(error)) throw new CatalogError("NOT_FOUND");
        if (isUniqueViolation(error)) throw new CatalogError("CONFLICT_SLUG");
        throw error;
      }
    },
    deleteItem: async (id) => {
      try {
        await prisma.catalogItem.delete({ where: { id } });
      } catch (error) {
        if (isNotFound(error)) throw new CatalogError("NOT_FOUND");
        throw error;
      }
    },
  };
}
