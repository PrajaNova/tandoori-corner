import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script.js";
import { LazyChatBot } from "@/components/home/LazyChatBot";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import {
  absoluteUrl,
  buildPageMetadata,
  buildRestaurantJsonLd,
  jsonLdScript,
  restaurantSeo,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    path: "/",
    title: "Tandoori Corner | North Indian Restaurant in Balestier",
    description: restaurantSeo.description,
  }),
  metadataBase: new URL(restaurantSeo.siteUrl),
  title: {
    default: "Tandoori Corner | North Indian Restaurant in Balestier",
    template: "%s | Tandoori Corner",
  },
  applicationName: restaurantSeo.name,
  category: "restaurant",
  creator: restaurantSeo.name,
  publisher: restaurantSeo.name,
  keywords: [
    "Tandoori Corner",
    "North Indian restaurant Singapore",
    "Indian restaurant Balestier",
    "Balestier Plaza Indian food",
    "alfresco dining Singapore",
    "Indian catering Singapore",
    "Indian takeaway Singapore",
  ],
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  manifest: absoluteUrl("/manifest.webmanifest"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <head>
        <Script
          id="restaurant-schema"
          strategy="beforeInteractive"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(buildRestaurantJsonLd()),
          }}
        />
        <Script
          id="website-schema"
          strategy="beforeInteractive"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
          dangerouslySetInnerHTML={{
            __html: jsonLdScript({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${restaurantSeo.siteUrl}/#website`,
              name: restaurantSeo.name,
              url: restaurantSeo.siteUrl,
              publisher: {
                "@id": `${restaurantSeo.siteUrl}/#restaurant`,
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col pt-safe">
        <AppHeader />
        <main className="flex-1 w-full">{children}</main>
        <AppFooter />
        <LazyChatBot />
      </body>
    </html>
  );
}
