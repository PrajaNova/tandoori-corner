import type { Metadata } from "next";
import Script from "next/script";
import { EventBookingCTA } from "@/components/private-events/EventBookingCTA";
import { EventGallerySection } from "@/components/private-events/EventGallerySection";
import { EventHero } from "@/components/private-events/EventHero";
import { EventHighlights } from "@/components/private-events/EventHighlights";
import { EventTypes } from "@/components/private-events/EventTypes";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

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
