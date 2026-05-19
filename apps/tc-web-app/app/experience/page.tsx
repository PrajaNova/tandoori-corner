import type { Metadata } from "next";
import Script from "next/script.js";

import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

import { ExperienceClient } from "./ExperienceClient";

export const metadata: Metadata = buildPageMetadata({
  path: "/experience",
  title: "Reservations, TCB Bar & Alfresco Dining",
  description:
    "Reserve a table on the pet-friendly alfresco balcony, book the TCB Bar, arrange private events, or order takeaway and catering from Tandoori Corner in Balestier Plaza.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Experience", path: "/experience" },
] as const;

export default function ExperiencePage() {
  return (
    <>
      <Script
        id="experience-breadcrumbs"
        strategy="beforeInteractive"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <ExperienceClient />
    </>
  );
}
