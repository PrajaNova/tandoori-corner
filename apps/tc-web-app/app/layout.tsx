import type { Metadata } from "next";
import "./globals.css";
import { Great_Vibes, Kaushan_Script, Raleway } from "next/font/google";

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
import { AnalyticsScripts } from "@/components/layout/providers/AnalyticsScripts";
import { SchemaScripts } from "@/components/layout/providers/SchemaScripts";
import { siteMetadata } from "@/content/metadata";
import { absoluteUrl, buildPageMetadata, restaurantSeo } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    path: "/",
    title: siteMetadata.rootTitle,
    description: restaurantSeo.description,
  }),
  metadataBase: new URL(restaurantSeo.siteUrl),
  title: {
    default: siteMetadata.rootTitle,
    template: siteMetadata.titleTemplate,
  },
  applicationName: restaurantSeo.name,
  category: "restaurant",
  creator: restaurantSeo.name,
  publisher: restaurantSeo.name,
  keywords: siteMetadata.keywords,
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
      <body className="font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col pt-safe">
        <SchemaScripts />
        <HashScroll />
        <AppHeader />
        <main className="flex-1 w-full">{children}</main>
        <AppFooter />
        <LazyChatBot />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
