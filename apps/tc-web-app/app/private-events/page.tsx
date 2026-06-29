import type { Metadata } from "next";
import { EventBookingCTA } from "@/components/private-events/EventBookingCTA";
import { EventGallerySection } from "@/components/private-events/EventGallerySection";
import { EventHero } from "@/components/private-events/EventHero";
import { EventHighlights } from "@/components/private-events/EventHighlights";
import { EventTypes } from "@/components/private-events/EventTypes";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

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
      <JsonLd
        id="private-events-breadcrumbs"
        data={buildBreadcrumbJsonLd(breadcrumbs)}
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
