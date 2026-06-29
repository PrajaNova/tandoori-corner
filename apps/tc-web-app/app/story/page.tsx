import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

import { StoryContent } from "./StoryContent";

export const metadata: Metadata = buildPageMetadata({
  path: "/story",
  title: "Our Story | Since 2008 at Balestier Plaza",
  description:
    "The Tandoori Corner story — North Indian cooking since 2008, the TCB Bar, alfresco dining, our team, and press from Balestier Plaza, Singapore.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/story" },
] as const;

export default function StoryPage() {
  return (
    <>
      <JsonLd
        id="story-breadcrumbs"
        data={buildBreadcrumbJsonLd(breadcrumbs)}
      />
      <StoryContent />
    </>
  );
}
