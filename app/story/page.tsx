import type { Metadata } from "next";

import { AppShell } from "@/components/layout/AppShell";
import { StoryContent } from "./StoryContent";

export const metadata: Metadata = {
  description:
    "Learn the Tandoori Corner story, team, gallery, and media highlights from Balestier Plaza.",
  title: "Our Story",
};

export default function StoryPage() {
  return (
    <AppShell>
      <StoryContent />
    </AppShell>
  );
}
