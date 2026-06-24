import type { Metadata } from "next";
import Script from "next/script";
import { CateringHero } from "@/components/catering/CateringHero";
import { CateringPackages } from "@/components/catering/CateringPackages";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

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

      <div className="bg-white">
        <CateringHero />
        <CateringPackages />
      </div>
    </>
  );
}
