import type { MetadataRoute } from "next";

import { absoluteUrl, restaurantSeo } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${restaurantSeo.name} | North Indian Restaurant`,
    short_name: restaurantSeo.name,
    description: restaurantSeo.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#c97228",
    icons: [
      {
        src: absoluteUrl("/icon"),
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: absoluteUrl("/apple-icon"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
