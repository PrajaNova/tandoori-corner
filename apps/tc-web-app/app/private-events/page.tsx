import { ArrowRight, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { SectionHeading } from "@/components/ui/SectionHeading";
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
        {/* 1. Hero — parallax */}
        <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden pt-24">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/granny/granny_background_2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="absolute inset-0 z-0 bg-black/65" />
          <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <span className="font-script text-primary text-3xl md:text-4xl">
              The TCB Bar
            </span>
            <h1 className="font-kaushan mt-2 text-4xl leading-tight text-white sm:text-6xl md:text-7xl">
              Your Private Night,
              <br />
              In Our Secret Room
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-raleway text-base leading-relaxed text-white/85 md:text-lg">
              Tucked away from the bustling Balestier pavement, the TCB Bar is
              an intimate, high-style space for celebrations, corporate evenings
              and milestone dinners. Book it out — for the night, it&apos;s
              entirely yours.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <EventEnquiryButton label="Enquire to Book" variant="light" />
              <a
                href={contact.phoneHref}
                className="group inline-flex items-center gap-2 font-raleway text-xs font-bold uppercase tracking-widest text-white/90 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                Call {contact.phoneDisplay}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <ol className="mt-12 flex items-center justify-center gap-2 font-raleway text-xs font-bold uppercase tracking-widest text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="text-white/40">/</li>
              <li className="text-primary">Event Space</li>
            </ol>
          </div>
        </section>

        {/* 2. Highlights strip */}
        <section className="bg-white py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeading
              cursiveText="Why the TCB Bar"
              mainText="Crafted For Your Celebration"
            />
            <p className="mx-auto mb-14 max-w-2xl text-center leading-relaxed text-muted-foreground">
              Pair our beer-fest specials and craft cocktails with a bespoke
              menu of tandoori grills and signature curries — plated,
              family-style, or as canapés for a standing reception.
            </p>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {tcbHighlights.map((highlight, index) => (
                <div
                  key={highlight.label}
                  className="border border-border p-8 text-center transition-shadow duration-300 hover:shadow-lg"
                >
                  <span className="font-script text-4xl text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="font-raleway mt-3 text-base font-bold uppercase tracking-wide text-foreground">
                    {highlight.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {highlight.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. What we host */}
        <section className="relative py-24">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/granny/granny_background_8.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="absolute inset-0 z-0 bg-black/75" />

          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <SectionHeading
              cursiveText="What we host"
              mainText="Made For Every Gathering"
              dark
            />
            <p className="mx-auto mb-14 max-w-2xl text-center leading-relaxed text-white/70">
              From boardroom celebrations to milestone birthdays, we tailor the
              space, the menu and the bar to your occasion.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {eventTypes.map((type) => (
                <div
                  key={type.title}
                  className="border border-white/15 bg-white/5 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-primary/60 hover:bg-white/10"
                >
                  <h3 className="font-kaushan text-3xl text-primary">
                    {type.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/75">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Past events */}
        <section className="bg-white py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeading
              cursiveText="Past events"
              mainText="Nights We've Hosted"
            />
            <p className="mx-auto mb-14 max-w-2xl text-center leading-relaxed text-muted-foreground">
              A look at some of the celebrations and gatherings we&apos;ve
              welcomed into the TCB Bar.
            </p>
            <PastEventsGallery events={pastEvents} />
          </div>
        </section>

        {/* 5. Booking CTA — parallax */}
        <section className="relative py-28">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/granny/granny_background_7.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="absolute inset-0 z-0 bg-black/75" />

          <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
            <span className="font-script text-3xl text-primary md:text-4xl">
              Let&apos;s plan it
            </span>
            <h2 className="font-kaushan mt-2 text-4xl leading-tight text-white md:text-5xl">
              Book The TCB Bar For Your Event
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/75">
              Tell us about your occasion and our events team will reply within
              one business day with availability and a tailored proposal.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <EventEnquiryButton label="Enquire to Book" />
              <a
                href={contact.phoneHref}
                className="group inline-flex items-center gap-2 font-raleway text-xs font-bold uppercase tracking-widest text-white/85 transition-colors hover:text-primary"
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
