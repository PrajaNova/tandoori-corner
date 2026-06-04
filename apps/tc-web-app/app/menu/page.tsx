import type { Metadata } from "next";
import Script from "next/script.js";
import { getMenuCategories, MENU_REVALIDATE_SECONDS } from "@/lib/catalog";
import {
  buildBreadcrumbJsonLd,
  buildMenuJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

import { MenuClient } from "./MenuClient";

// Render on the server and serve one shared, cached page to every visitor.
// Revalidated at most once every 24 hours (ISR).
export const revalidate = 86400;

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
  // Keep MENU_REVALIDATE_SECONDS and the route `revalidate` aligned.
  void MENU_REVALIDATE_SECONDS;
  const menuCategories = await getMenuCategories();

  const menuSchemaSections = menuCategories.map((category) => ({
    title: category.title,
    items: category.items.map((item) => ({
      name: item.name,
      description: item.desc,
      priceText: item.price,
      image: item.img,
    })),
  }));

  return (
    <>
      <Script
        id="menu-schema"
        strategy="beforeInteractive"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(buildMenuJsonLd(menuSchemaSections)),
        }}
      />
      <Script
        id="menu-breadcrumbs"
        strategy="beforeInteractive"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <MenuClient menuCategories={menuCategories} />
    </>
  );
}
