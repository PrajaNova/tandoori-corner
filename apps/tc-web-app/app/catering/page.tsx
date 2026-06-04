import type { Metadata } from "next";
import Script from "next/script.js";
import { SectionHeading } from "@/components/common/layout/SectionHeading";
import { getCateringPackages } from "@/lib/catering";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

import { BuildYourOwnCard } from "./parts/BuildYourOwnCard";
import { OptionCard } from "./parts/OptionCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  path: "/catering",
  title: "Catering & Party Menu | Tandoori Corner Singapore",
  description:
    "North Indian catering at Balestier Plaza — Silver, Gold & Platinum party packages or build your own feast. Tandoori grills, curries & biryani for parties of 30+. Request a quote.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Catering", path: "/catering" },
] as const;

export default async function CateringPage() {
  const cateringPackages = await getCateringPackages();

  return (
    <>
      <Script
        id="catering-breadcrumbs"
        strategy="beforeInteractive"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(buildBreadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-5 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-12">
          <SectionHeading
            eyebrow="Let's celebrate"
            title="Pick a Package or Build Your Own"
            description="From the sizzling heat of the Tandoor to the rich depths of our signature Curries — tap any card to see the dishes, then request a quote in a few clicks."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cateringPackages.map((pkg) => (
              <OptionCard key={pkg.id} pkg={pkg} />
            ))}
            <BuildYourOwnCard />
          </div>
        </div>
      </div>
    </>
  );
}
