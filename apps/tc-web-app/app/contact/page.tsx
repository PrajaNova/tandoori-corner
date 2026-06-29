import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { operationalHours } from "@/content/hours";
import { getContactSetting } from "@/lib/cms";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  type contact as fallbackContact,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact & Find Us | Tandoori Corner Balestier",
  description:
    "Find Tandoori Corner at Balestier Plaza, Singapore. Call, WhatsApp, view opening hours, get directions, or reserve a table.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
] as const;

export default async function ContactPage() {
  const cmsContact = await getContactSetting();
  const restaurantContact = cmsContact as typeof fallbackContact;

  return (
    <>
      <JsonLd
        id="contact-breadcrumbs"
        data={buildBreadcrumbJsonLd(breadcrumbs)}
      />
      <main className="bg-cream">
        <section className="container mx-auto max-w-6xl px-6 py-20">
          <p className="font-script text-3xl text-brand-gold">Find us</p>
          <h1 className="mt-2 font-kaushan text-5xl text-ink">
            Contact Tandoori Corner
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink/65">
            Visit us at Balestier Plaza for North Indian dining, TCB Bar
            evenings, catering conversations, and private event walkthroughs.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6">
              <Info title="Address">{restaurantContact.addressDisplay}</Info>
              <Info title="Phone">
                <a
                  href={restaurantContact.phoneHref}
                  className="hover:underline"
                >
                  {restaurantContact.phoneDisplay}
                </a>{" "}
                /{" "}
                <a
                  href={restaurantContact.phoneLandlineHref}
                  className="hover:underline"
                >
                  {restaurantContact.phoneLandlineDisplay}
                </a>
              </Info>
              <Info title="Email">
                <a
                  href={restaurantContact.emailHref}
                  className="hover:underline"
                >
                  {restaurantContact.email}
                </a>
              </Info>
              <Info title="Opening hours">
                {operationalHours.map((row) => (
                  <span key={row.day} className="block">
                    {row.day}: {row.time}
                  </span>
                ))}
              </Info>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/#reservation"
                  className="bg-ink px-5 py-3 text-sm font-bold uppercase tracking-widest text-white"
                >
                  Reserve Table
                </Link>
                <a
                  href={restaurantContact.whatsappHref}
                  className="border border-ink px-5 py-3 text-sm font-bold uppercase tracking-widest text-ink"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <iframe
              title="Tandoori Corner map"
              src={restaurantContact.mapEmbedUrl}
              className="min-h-96 w-full border border-border"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
    </>
  );
}

function Info({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-widest text-ink/40">
        {title}
      </h2>
      <div className="mt-2 text-lg leading-relaxed text-ink">{children}</div>
    </section>
  );
}
