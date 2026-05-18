import type { Metadata } from "next";

export const siteUrl = "https://www.tandooricorner.sg";

const defaultDescription =
  "Tandoori Corner is a North Indian curry house at Balestier Plaza serving alfresco dining, home delivery, catering, and table bookings.";

export const restaurantSeo = {
  name: "Tandoori Corner",
  legalName: "Tandoori Corner",
  siteUrl,
  legacySiteUrl: "https://www.tandooricorner.com.sg",
  description: defaultDescription,
  logoPath: "/tandoori-corner-header-logo.png",
  ogImagePath: "/opengraph-image",
  cuisine: ["North Indian", "Indian"],
  priceRange: "$$",
  phoneDisplay: "+65 9862 7334",
  phoneHref: "tel:+6598627334",
  telephone: "+6598627334",
  email: "tandooricorner@singnet.com.sg",
  address: {
    streetAddress: "400 Balestier Road #01-12 Balestier Plaza",
    addressLocality: "Singapore",
    postalCode: "329802",
    addressCountry: "SG",
  },
  mapUrl: "https://maps.app.goo.gl/jE9ppAZ8BDcoJHZY9",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3988.7503502617474!2d103.8480438!3d1.3257154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da179192b34053%3A0xf0d76653d50b435e!2sTandoori%20Corner!5e0!3m2!1sen!2ssg!4v1778663342121!5m2!1sen!2ssg",
  sameAs: [
    "https://www.instagram.com/tandooricornersingapore",
    "https://www.facebook.com/Tandoori-Corner-333078973565275",
    "https://www.tripadvisor.com/Restaurant_Review-g294265-d1580656-Reviews-Tandoori_Corner_Balestier_Road-Singapore.html",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "12:00",
      closes: "14:45",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "18:00",
      closes: "21:45",
    },
  ],
} as const;

export const contact = {
  phoneDisplay: restaurantSeo.phoneDisplay,
  phoneHref: restaurantSeo.phoneHref,
  telephone: restaurantSeo.telephone,
  email: restaurantSeo.email,
  emailHref: `mailto:${restaurantSeo.email}`,
  addressDisplay: `${restaurantSeo.address.streetAddress}, ${restaurantSeo.address.addressLocality} ${restaurantSeo.address.postalCode}`,
  mapUrl: restaurantSeo.mapUrl,
  mapEmbedUrl: restaurantSeo.mapEmbedUrl,
  social: {
    instagram: restaurantSeo.sameAs[0],
    facebook: restaurantSeo.sameAs[1],
    tripadvisor: restaurantSeo.sameAs[2],
    x: "https://x.com/TandooriCornerS",
  },
} as const;

export const seoRoutes = [
  {
    path: "/",
    title: "Tandoori Corner | North Indian Restaurant in Balestier",
    description: defaultDescription,
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/menu",
    title: "Menu",
    description:
      "Explore Tandoori Corner's North Indian menu, chef signatures, curries, tandoori dishes, rice, breads, drinks, and sweets.",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/experience",
    title: "Reservations, Takeaway & Private Events",
    description:
      "Book a table, reserve the TCB Bar, or order from Tandoori Corner's North Indian kitchen in Balestier Plaza.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/story",
    title: "Our Story",
    description:
      "Learn the Tandoori Corner story, team, gallery, and media highlights from Balestier Plaza.",
    priority: 0.7,
    changeFrequency: "monthly",
  },
] as const;

export type SeoPath = (typeof seoRoutes)[number]["path"];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return new URL(path, siteUrl).toString();
}

export function buildPageMetadata({
  path,
  title,
  description,
  noIndex = false,
}: {
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const images = [
    {
      url: absoluteUrl(restaurantSeo.ogImagePath),
      width: 1200,
      height: 630,
      alt: "Tandoori Corner North Indian restaurant in Balestier, Singapore",
    },
  ];

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: restaurantSeo.name,
      locale: "en_SG",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function buildRestaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: restaurantSeo.name,
    legalName: restaurantSeo.legalName,
    url: siteUrl,
    logo: absoluteUrl(restaurantSeo.logoPath),
    image: absoluteUrl(restaurantSeo.ogImagePath),
    description: restaurantSeo.description,
    servesCuisine: restaurantSeo.cuisine,
    priceRange: restaurantSeo.priceRange,
    telephone: restaurantSeo.telephone,
    email: restaurantSeo.email,
    address: {
      "@type": "PostalAddress",
      ...restaurantSeo.address,
    },
    hasMap: restaurantSeo.mapUrl,
    sameAs: restaurantSeo.sameAs,
    openingHoursSpecification: restaurantSeo.openingHoursSpecification,
  };
}

export function jsonLdScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
