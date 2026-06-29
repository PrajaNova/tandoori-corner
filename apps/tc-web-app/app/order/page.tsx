import type { Metadata } from "next";
import { OrderCatalog } from "@/components/order/OrderCatalog";
import { OrderFloatingCart } from "@/components/order/OrderFloatingCart";
import { OrderHero } from "@/components/order/OrderHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMenuCategories } from "@/lib/catalog";
import {
  buildBreadcrumbJsonLd,
  buildMenuJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/order",
  title: "Order Online | Tandoori Corner Singapore",
  description:
    "Order North Indian favourites from Tandoori Corner, Balestier Plaza. Browse the full menu, filter by category, and place your order for pickup or delivery.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Order Online", path: "/order" },
] as const;

export default async function OrderPage() {
  const categories = await getMenuCategories();
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
      <JsonLd
        id="order-menu-schema"
        data={buildMenuJsonLd(menuSchemaSections, "/order")}
      />
      <JsonLd
        id="order-breadcrumbs"
        data={buildBreadcrumbJsonLd(breadcrumbs)}
      />
      <div className="bg-white">
        <OrderHero />
        <OrderCatalog categories={categories} />
        <OrderFloatingCart />
      </div>
    </>
  );
}
