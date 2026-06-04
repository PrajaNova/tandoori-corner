import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script.js";

import { SectionHeading } from "@/components/common/layout/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { eventTypes, pastEvents, tcbHighlights } from "@/data/private-events";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  contact,
  jsonLdScript,
} from "@/lib/seo";

import { EventEnquiryButton } from "./parts/EventEnquiryButton";
import { PastEventsGallery } from "./parts/PastEventsGallery";

export const metadata: Metadata = buildPageMetadata({
  path: "/private-events",
  title: "Private Events at the TCB Bar | Tandoori Corner Singapore",
  description:
    "Host your private event at the TCB Bar in Balestier — corporate gatherings, birthdays & celebrations. Browse past events, see the space, and enquire to book.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Private Events", path: "/private-events" },
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

      <div className="min-h-screen bg-background">
        {/* About the TCB Bar */}
        <section className="bg-cream pb-16 pt-28 sm:pt-32">
          <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
            <div className="order-2 space-y-6 lg:order-1">
              <Badge className="w-max border-border" variant="outline">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                The TCB Bar
              </Badge>
              <h1 className="font-space text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
                Your private night,
                <br />
                in our secret room.
              </h1>
              <p className="text-sm font-light leading-relaxed text-ink/60 sm:text-lg">
                Tucked away from the bustling Balestier pavement, the TCB Bar is
                an intimate, high-style space designed for romantic dinners,
                after-work craft cocktails and exclusive celebrations. Book it
                out for the evening and it's entirely yours.
              </p>
              <p className="text-sm font-light leading-relaxed text-ink/60 sm:text-lg">
                Pair our curated <strong>Beer Fest specials</strong> and craft
                cocktails with a bespoke menu of tandoori grills and signature
                curries — plated, family-style, or as canapés for a standing
                reception.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <EventEnquiryButton />
                <a
                  href={contact.phoneHref}
                  className="text-xs font-bold uppercase tracking-widest text-ink/60 transition-colors hover:text-brand-gold"
                >
                  Or call {contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative h-64 w-full overflow-hidden rounded-tr-[56px] rounded-bl-[56px] sm:h-[460px] sm:rounded-tr-[80px] sm:rounded-bl-[80px] md:h-[560px]">
                <div className="absolute inset-0 z-10 bg-brand-gold opacity-20 mix-blend-color" />
                <Image
                  fill
                  priority
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
                  alt="The TCB Bar interior at Tandoori Corner"
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="container mx-auto mt-14 px-5 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {tcbHighlights.map((highlight) => (
                <div key={highlight.label} className="bg-cream p-6">
                  <p className="font-space text-lg font-bold text-ink">
                    {highlight.label}
                  </p>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-ink/55">
                    {highlight.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we host */}
        <section className="border-y border-border bg-background py-16 sm:py-20">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <SectionHeading
              eyebrow="What we host"
              title="Made for every kind of gathering"
              description="From boardroom celebrations to milestone birthdays, we tailor the space, the menu and the bar to the occasion."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {eventTypes.map((type) => (
                <div
                  key={type.title}
                  className="rounded-card border border-border bg-card p-7"
                >
                  <h3 className="font-space text-xl font-bold text-ink">
                    {type.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-ink/60">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past events showcase */}
        <section className="bg-cream py-16 sm:py-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            <SectionHeading
              eyebrow="Past events"
              title="Nights we've hosted"
              description="A look at some of the celebrations and gatherings we've welcomed into the TCB Bar."
            />
            <PastEventsGallery events={pastEvents} />
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-brand-dark py-20 text-cream sm:py-28">
          <div className="container mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-12">
            <p className="font-script text-3xl text-brand-gold sm:text-4xl">
              Let's plan it
            </p>
            <h2 className="mt-2 font-space text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Book the TCB Bar for your event
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-cream/70 sm:text-base">
              Tell us about your occasion and our events team will reply within
              one business day with availability and a tailored proposal.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <EventEnquiryButton label="Enquire to Book" />
              <a
                href={contact.phoneHref}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream/80 transition-colors hover:text-brand-gold"
              >
                Call {contact.phoneDisplay}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
