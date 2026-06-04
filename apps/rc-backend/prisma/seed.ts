import "dotenv/config";

import { createPrismaClient } from "../src/lib/prisma.js";
import { catalogSeedCategories } from "../src/services/catalog-service.js";
import { cateringSeedPackages } from "../src/services/catering-service.js";

async function main() {
  const prisma = createPrismaClient(process.env.DATABASE_URL);

  for (const category of catalogSeedCategories) {
    await prisma.catalogCategory.upsert({
      where: { id: category.id },
      create: {
        id: category.id,
        slug: category.slug,
        title: category.title,
        subtitle: category.subtitle,
        icon: category.icon,
        status: category.status,
        sortOrder: category.sortOrder,
      },
      update: {
        slug: category.slug,
        title: category.title,
        subtitle: category.subtitle,
        icon: category.icon,
        status: category.status,
        sortOrder: category.sortOrder,
      },
    });

    for (const item of category.items) {
      await prisma.catalogItem.upsert({
        where: { id: item.id },
        create: {
          id: item.id,
          slug: item.slug,
          categoryId: item.categoryId,
          name: item.name,
          description: item.description,
          story: item.story,
          imageUrl: item.imageUrl,
          priceCents: item.priceCents,
          currency: item.currency,
          tags: item.tags,
          ingredients: item.ingredients,
          status: item.status,
          sortOrder: item.sortOrder,
        },
        update: {
          slug: item.slug,
          categoryId: item.categoryId,
          name: item.name,
          description: item.description,
          story: item.story,
          imageUrl: item.imageUrl,
          priceCents: item.priceCents,
          currency: item.currency,
          tags: item.tags,
          ingredients: item.ingredients,
          status: item.status,
          sortOrder: item.sortOrder,
        },
      });
    }
  }

  for (const pkg of cateringSeedPackages) {
    const data = {
      slug: pkg.slug,
      name: pkg.name,
      tagline: pkg.tagline,
      description: pkg.description,
      accent: pkg.accent,
      priceCents: pkg.priceCents,
      currency: pkg.currency,
      minGuests: pkg.minGuests,
      badge: pkg.badge ?? null,
      features: pkg.features,
      status: pkg.status,
      sortOrder: pkg.sortOrder,
    };

    await prisma.cateringPackage.upsert({
      where: { id: pkg.id },
      create: { id: pkg.id, ...data },
      update: data,
    });
  }

  await prisma.$disconnect();
  console.log("Catalog + catering seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
