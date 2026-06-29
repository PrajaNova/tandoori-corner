import "dotenv/config";

import { createPrismaClient } from "../src/lib/prisma.js";
import { catalogSeedCategories } from "../src/services/catalog-service.js";
import { cateringSeedPackages } from "../src/services/catering-service.js";
import { seedMenu } from "./menu-seed.js";

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

  await seedMenu(prisma);

  await prisma.promotion.upsert({
    where: { id: "promo_family_feast" },
    create: {
      id: "promo_family_feast",
      title: "Family feast nights",
      description:
        "Gather around tandoori grills, biryanis, curries, and breads made for sharing at Balestier Plaza.",
      ctaLabel: "Order Online",
      ctaHref: "/order",
      placement: "home",
      status: "active",
      sortOrder: 10,
    },
    update: {
      title: "Family feast nights",
      description:
        "Gather around tandoori grills, biryanis, curries, and breads made for sharing at Balestier Plaza.",
      ctaLabel: "Order Online",
      ctaHref: "/order",
      placement: "home",
      status: "active",
      sortOrder: 10,
    },
  });

  const gallery = [
    {
      id: "gallery_tandoori_grills",
      title: "Tandoori grills",
      alt: "Tandoori Corner grilled North Indian dishes",
      imageUrl: "/granny/granny_specials_1.jpg",
      category: "food",
      sortOrder: 10,
    },
    {
      id: "gallery_balestier_dining",
      title: "Balestier dining",
      alt: "Tandoori Corner dining room at Balestier Plaza",
      imageUrl: "/granny/granny_background_11.jpg",
      category: "restaurant",
      sortOrder: 20,
    },
    {
      id: "gallery_tcb_events",
      title: "TCB Bar events",
      alt: "Private event setup at Tandoori Corner TCB Bar",
      imageUrl: "/granny/granny_banners_11.jpg",
      category: "events",
      sortOrder: 30,
    },
  ];

  for (const image of gallery) {
    await prisma.galleryImage.upsert({
      where: { id: image.id },
      create: { ...image, status: "active" },
      update: { ...image, status: "active" },
    });
  }

  const testimonials = [
    {
      id: "testimonial_tandoori_chicken",
      author: "Pravesh Gupta",
      quote:
        "The Tandoori Chicken here is succulent, perfectly spiced and smoky from the clay oven.",
      source: "Guest review",
      rating: 5,
      sortOrder: 10,
    },
    {
      id: "testimonial_family_regular",
      author: "John Arax",
      quote:
        "We have been regulars for years. The Dal Makhani and Lamb Rogan Josh are consistently incredible.",
      source: "Guest review",
      rating: 5,
      sortOrder: 20,
    },
    {
      id: "testimonial_catering",
      author: "Sanjay Krishnan",
      quote:
        "Used their catering service for a birthday celebration. The food arrived hot and all our guests praised the dishes.",
      source: "Guest review",
      rating: 5,
      sortOrder: 30,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      create: { ...testimonial, status: "active" },
      update: { ...testimonial, status: "active" },
    });
  }

  await prisma.siteSetting.upsert({
    where: { key: "contact" },
    create: {
      key: "contact",
      value: {
        phoneDisplay: "+65 9862 7334",
        phoneHref: "tel:+6598627334",
        whatsappDisplay: "+65 9862 7334",
        whatsappHref: "https://wa.me/6598627334",
      },
    },
    update: {
      value: {
        phoneDisplay: "+65 9862 7334",
        phoneHref: "tel:+6598627334",
        whatsappDisplay: "+65 9862 7334",
        whatsappHref: "https://wa.me/6598627334",
      },
    },
  });

  await prisma.$disconnect();
  console.log("Catalog + catering + menu + CMS seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
