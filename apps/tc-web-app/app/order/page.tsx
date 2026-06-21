import type { Metadata } from "next";
import Script from "next/script.js";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

import { OrderOnline } from "./OrderOnline";

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

export default function OrderPage() {
  return (
    <>
      <Script
        id="order-breadcrumbs"
        strategy="beforeInteractive"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <OrderOnline />
    </>
  );
}
