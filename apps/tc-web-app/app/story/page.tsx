import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

import { StoryContent } from "./StoryContent";

export const metadata: Metadata = buildPageMetadata({
  path: "/story",
  title: "Our Story",
  description:
    "Learn the Tandoori Corner story, team, gallery, and media highlights from Balestier Plaza.",
});

export default function StoryPage() {
  return <StoryContent />;
}
