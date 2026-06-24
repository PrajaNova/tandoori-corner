import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Great_Vibes, Kaushan_Script, Raleway } from "next/font/google";
import Script from "next/script.js";

// Self-hosted fonts (downloaded & served from our own origin at build time —
// no runtime request to Google Fonts, so they render reliably everywhere).
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-raleway",
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--ff-kaushan",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--ff-script",
});

import { LazyChatBot } from "@/components/home/LazyChatBot";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { HashScroll } from "@/components/layout/HashScroll";
import {
  absoluteUrl,
  buildOrganizationJsonLd,
  buildPageMetadata,
  buildRestaurantJsonLd,
  jsonLdScript,
  restaurantSeo,
} from "@/lib/seo";

const rootTitle = "Tandoori Corner | North Indian Restaurant & TCB Bar";

export const metadata: Metadata = {
  ...buildPageMetadata({
    path: "/",
    title: rootTitle,
    description: restaurantSeo.description,
  }),
  metadataBase: new URL(restaurantSeo.siteUrl),
  title: {
    default: rootTitle,
    template: "%s | Tandoori Corner",
  },
  applicationName: restaurantSeo.name,
  category: "restaurant",
  creator: restaurantSeo.name,
  publisher: restaurantSeo.name,
  keywords: [
    "Tandoori Corner",
    "TCB Bar",
    "North Indian restaurant Singapore",
    "Indian restaurant Balestier",
    "Balestier Plaza Indian food",
    "alfresco dining Singapore",
    "pet-friendly alfresco Singapore",
    "Indian catering Singapore",
    "Indian takeaway Singapore",
    "Tandoori grills Singapore",
  ],
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  manifest: absoluteUrl("/manifest.webmanifest"),
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${raleway.variable} ${kaushan.variable} ${greatVibes.variable}`}
    >
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
        <Script
          id="organization-schema"
          strategy="beforeInteractive"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(buildOrganizationJsonLd()),
          }}
        />
      </head>
      <body className="font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col pt-safe">
        <HashScroll />
        <AppHeader />
        <main className="flex-1 w-full">{children}</main>
        <AppFooter />
        <LazyChatBot />
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              id="ga4-loader"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: GA4 bootstrap snippet.
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{anonymize_ip:true});`,
              }}
            />
          </>
        ) : null}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID ? (
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Facebook Pixel bootstrap snippet.
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}
