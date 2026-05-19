import type { Metadata } from "next";
import Script from "next/script.js";

import { menuCategories } from "@/data/menu";
import {
  buildBreadcrumbJsonLd,
  buildMenuJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

import { MenuClient } from "./MenuClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/menu",
  title: "Menu | Tandoori Grills, Curries & TCB Bar Cocktails",
  description:
    "Explore Tandoori Corner's North Indian menu at Balestier Plaza — chef signatures, tandoori grills, silken curries, biryanis, breads, and TCB Bar cocktails.",
});

const menuSchemaSections = menuCategories.map((category) => ({
  title: category.title,
  items: category.items.map((item) => ({
    name: item.name,
    description: item.desc,
    priceText: item.price,
    image: item.img,
  })),
}));

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
] as const;

export default function MenuPage() {
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
      <MenuClient />
    </>
  );
}
