import type { Metadata } from "next";
import Script from "next/script";

import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

import { StoryContent } from "./StoryContent";

export const metadata: Metadata = buildPageMetadata({
  path: "/story",
  title: "Our Story | 15 Years at Balestier Plaza",
  description:
    "The Tandoori Corner story — 15 years of North Indian cooking, the TCB Bar, alfresco dining, our team, and press from Balestier Plaza, Singapore.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Our Story", path: "/story" },
] as const;

export default function StoryPage() {
  return (
    <>
      <Script
        id="story-breadcrumbs"
        strategy="beforeInteractive"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <StoryContent />
    </>
  );
}
