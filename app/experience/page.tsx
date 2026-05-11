import type { Metadata } from "next";

import { AppShell } from "@/components/layout/AppShell";
import { ExperienceClient } from "./ExperienceClient";

export const metadata: Metadata = {
  description:
    "Book a table, reserve the TCB Bar, or order from Tandoori Corner's North Indian kitchen in Balestier Plaza.",
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <AppShell>
      <ExperienceClient />
    </AppShell>
  );
}
