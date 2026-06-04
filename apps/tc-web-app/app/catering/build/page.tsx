import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

import { BuildClient } from "./BuildClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/catering/build",
  title: "Build Your Own Catering Menu | Tandoori Corner",
  description:
    "Hand-pick dishes course by course — appetizers, mains, rice, breads and desserts — filter by veg or non-veg, and request a tailored catering quote.",
});

export default function CateringBuildPage() {
  return <BuildClient />;
}
