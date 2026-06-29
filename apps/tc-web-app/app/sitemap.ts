import type { MetadataRoute } from "next";

import { getCateringPackages } from "@/lib/catering";
import { absoluteUrl, seoRoutes } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cateringPackages = await getCateringPackages();

  return [
    ...seoRoutes.map((route) => ({
      url: absoluteUrl(route.path),
    })),
    ...cateringPackages.map((pkg) => ({
      url: absoluteUrl(`/catering/${pkg.id}`),
    })),
  ];
}
