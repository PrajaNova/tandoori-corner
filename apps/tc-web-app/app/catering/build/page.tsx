import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

import { BuildClient } from "./BuildClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/catering/build",
  title: "Build Your Own Catering Menu | Tandoori Corner",
  description:
    "Hand-pick dishes course by course — appetizers, mains, rice, breads and desserts — filter by veg or non-veg, and request a tailored catering quote.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Catering", path: "/catering" },
  { name: "Build Your Own", path: "/catering/build" },
] as const;

export default function CateringBuildPage() {
  return (
    <>
      <JsonLd
        id="catering-build-breadcrumbs"
        data={buildBreadcrumbJsonLd(breadcrumbs)}
      />
      <BuildClient />
    </>
  );
}
