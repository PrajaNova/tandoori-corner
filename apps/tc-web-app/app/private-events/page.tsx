import type { Metadata } from "next";
import Script from "next/script";

import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";
import { EventBookingCTA } from "./parts/EventBookingCTA";
import { EventGallerySection } from "./parts/EventGallerySection";
import { EventHero } from "./parts/EventHero";
import { EventHighlights } from "./parts/EventHighlights";
import { EventTypes } from "./parts/EventTypes";

export const metadata: Metadata = buildPageMetadata({
  path: "/private-events",
  title: "Private Events at the TCB Bar | Tandoori Corner Singapore",
  description:
    "Host your private event at TCB Bar in Balestier — corporate gatherings, birthdays & celebrations for up to 60 guests. Bespoke menus and full bar service.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Event Space", path: "/private-events" },
] as const;

export default function PrivateEventsPage() {
  return (
    <>
      <Script
        id="private-events-breadcrumbs"
        strategy="beforeInteractive"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <div className="bg-white">
        <EventHero />
        <EventHighlights />
        <EventTypes />
        <EventGallerySection />
        <EventBookingCTA />
      </div>
    </>
  );
}
