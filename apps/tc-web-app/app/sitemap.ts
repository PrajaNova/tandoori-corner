import type { MetadataRoute } from "next";

import { getCateringPackages } from "@/lib/catering";
import { absoluteUrl, seoRoutes } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const cateringPackages = await getCateringPackages();

  return [
    ...seoRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...cateringPackages.map((pkg) => ({
      url: absoluteUrl(`/catering/${pkg.id}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ];
}
