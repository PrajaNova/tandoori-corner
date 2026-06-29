import type { Metadata } from "next";
import { CateringHero } from "@/components/catering/CateringHero";
import { CateringPackages } from "@/components/catering/CateringPackages";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCateringPackages } from "@/lib/catering";
import {
  buildBreadcrumbJsonLd,
  buildCateringOfferCatalogJsonLd,
  buildPageMetadata,
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
  const cateringPackages = await getCateringPackages();

  return (
    <>
      <JsonLd
        id="catering-offer-catalog"
        data={buildCateringOfferCatalogJsonLd(cateringPackages)}
      />
      <JsonLd
        id="catering-breadcrumbs"
        data={buildBreadcrumbJsonLd(breadcrumbs)}
      />

      <div className="bg-white">
        <CateringHero />
        <CateringPackages packages={cateringPackages} />
      </div>
    </>
  );
}
