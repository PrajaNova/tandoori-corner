import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import type { PrismaClient } from "../src/generated/prisma/client.js";

// Source of truth: the menu extracted from the restaurant PDF.
// Path is resolved relative to this file so the seed works from any cwd.
const MENU_JSON_PATH = fileURLToPath(
  new URL("../../tc-web-app/data/menu.json", import.meta.url),
);

type SpiceLevel = 0 | 1 | 2 | 3 | null;

interface SourceVariant {
  label: string;
  price: number;
}

interface SourceItem {
  name: string;
  description: string;
  category: string;
  price?: number;
  variants: SourceVariant[];
  dietary: {
    veg: boolean;
    vegan: boolean | null;
    glutenFree: boolean | null;
    spiceLevel: SpiceLevel;
    allergens: string[];
  };
  imageSlug: string;
}

interface SourceCategory {
  name: string;
  items: SourceItem[];
}

interface MenuFile {
  categories: SourceCategory[];
}

const SPICE_LEVELS = ["MILD", "MEDIUM", "HOT", "EXTRA"] as const;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCents(price: number): number {
  return Math.round(price * 100);
}

function spiceLevel(level: SpiceLevel): (typeof SPICE_LEVELS)[number] | null {
  return level === null ? null : SPICE_LEVELS[level];
}

export async function seedMenu(prisma: PrismaClient): Promise<void> {
  const menu = JSON.parse(readFileSync(MENU_JSON_PATH, "utf8")) as MenuFile;

  for (const [categoryIndex, category] of menu.categories.entries()) {
    const categorySlug = slugify(category.name);
    const categoryId = `menu_cat_${categorySlug}`;

    const categoryData = {
      slug: categorySlug,
      name: category.name,
      status: "active",
      sortOrder: categoryIndex,
    };

    await prisma.menuCategory.upsert({
      where: { id: categoryId },
      create: { id: categoryId, ...categoryData },
      update: categoryData,
    });

    for (const [itemIndex, item] of category.items.entries()) {
      // Natural key = category + item name; slug is unique across the menu
      // because the same product can appear under two sections (e.g. wines).
      const itemSlug = `${categorySlug}-${item.imageSlug}`;
      const itemId = `menu_item_${categorySlug}__${item.imageSlug}`;

      const itemData = {
        slug: itemSlug,
        categoryId,
        name: item.name,
        description: item.description,
        priceCents: typeof item.price === "number" ? toCents(item.price) : null,
        currency: "SGD",
        variants: item.variants.map((variant) => ({
          label: variant.label,
          priceCents: toCents(variant.price),
        })),
        imageSlug: item.imageSlug,
        veg: item.dietary.veg,
        vegan: item.dietary.vegan,
        glutenFree: item.dietary.glutenFree,
        spiceLevel: spiceLevel(item.dietary.spiceLevel),
        allergens: item.dietary.allergens,
        status: "active",
        sortOrder: itemIndex,
      };

      await prisma.menuItem.upsert({
        where: { id: itemId },
        create: { id: itemId, ...itemData },
        update: itemData,
      });
    }
  }
}
