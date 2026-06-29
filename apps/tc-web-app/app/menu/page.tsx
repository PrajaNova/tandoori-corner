import type { Metadata } from "next";
import { MenuHero } from "@/components/menu/MenuHero";
import { OrderCatalog } from "@/components/order/OrderCatalog";
import { OrderFloatingCart } from "@/components/order/OrderFloatingCart";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMenuCategories } from "@/lib/menu";
import {
  buildBreadcrumbJsonLd,
  buildMenuJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/menu",
  title: "Menu | Tandoori Grills, Curries & TCB Bar Cocktails",
  description:
    "Explore Tandoori Corner's North Indian menu at Balestier Plaza — chef signatures, tandoori grills, silken curries, biryanis, breads, and TCB Bar cocktails.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
] as const;

export default async function MenuPage() {
  const { categories, error } = await getMenuCategories();
  const menuSchemaSections = categories.map((category) => ({
    title: category.title,
    items: category.items.map((item) => ({
      name: item.name,
      description: item.desc,
      priceText: item.price,
    })),
  }));

  return (
    <>
      <JsonLd id="menu-schema" data={buildMenuJsonLd(menuSchemaSections)} />
      <JsonLd id="menu-breadcrumbs" data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <div className="bg-white">
        <MenuHero />
        {error ? (
          <div className="border-b border-primary/20 bg-primary/10 px-4 py-3 text-center text-sm text-foreground">
            {error}
          </div>
        ) : null}
        {categories.length === 0 ? (
          <div className="container mx-auto max-w-4xl px-4 py-24 text-center">
            <h2 className="font-kaushan text-4xl text-foreground">
              Menu coming soon
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Please check back shortly.
            </p>
          </div>
        ) : (
          <OrderCatalog categories={categories} />
        )}
        <OrderFloatingCart />
      </div>
    </>
  );
}
