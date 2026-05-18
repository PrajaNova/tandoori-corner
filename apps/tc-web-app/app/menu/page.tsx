import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

import { MenuClient } from "./MenuClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/menu",
  title: "Menu",
  description:
    "Explore Tandoori Corner's North Indian menu, chef signatures, curries, tandoori dishes, rice, breads, drinks, and sweets.",
});

export default function MenuPage() {
  return <MenuClient />;
}
