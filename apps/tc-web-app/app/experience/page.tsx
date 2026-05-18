import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

import { ExperienceClient } from "./ExperienceClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/experience",
  title: "Reservations, Takeaway & Private Events",
  description:
    "Book a table, reserve the TCB Bar, or order from Tandoori Corner's North Indian kitchen in Balestier Plaza.",
});

export default function ExperiencePage() {
  return <ExperienceClient />;
}
