import type { Metadata } from "next";

export const siteUrl = "https://www.tandooricorner.sg";

const defaultDescription =
  "Tandoori Corner is a North Indian restaurant and TCB Bar at Balestier Plaza — tandoori grills, alfresco dining, home delivery and catering. Est. 2008.";

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
  phoneLandlineDisplay: "+65 6250 0200",
  phoneLandlineHref: "tel:+6562500200",
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
    "https://x.com/TandooriCornerS",
  ],
  aggregateRating: {
    ratingValue: 4.5,
    reviewCount: 380,
    bestRating: 5,
    worstRating: 1,
  },
  foundingDate: "2008",
  slogan: "15 years of North Indian cooking at Balestier Plaza.",
  areaServed: ["Singapore", "Balestier", "Novena"],
  knowsAbout: [
    "North Indian cuisine",
    "Tandoori cooking",
    "Indian catering Singapore",
    "Alfresco dining Singapore",
    "Cocktail bar",
  ],
  knowsLanguage: ["en", "en-SG"],
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
  phoneLandlineDisplay: restaurantSeo.phoneLandlineDisplay,
  phoneLandlineHref: restaurantSeo.phoneLandlineHref,
  telephone: restaurantSeo.telephone,
  whatsappDisplay: "+65 9862 7334",
  whatsappHref: "https://wa.me/6598627334",
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
    title: "Tandoori Corner | North Indian Restaurant & TCB Bar in Balestier",
    description: defaultDescription,
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/menu",
    title: "Menu | Tandoori Grills, Curries & TCB Bar Cocktails",
    description:
      "Explore Tandoori Corner's North Indian menu at Balestier Plaza — chef signatures, tandoori grills, silken curries, biryanis, breads, and TCB Bar cocktails.",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/catering",
    title: "Catering & Party Menu | Tandoori Corner Singapore",
    description:
      "North Indian catering at Balestier Plaza — Silver, Gold & Platinum party packages or build your own feast. Tandoori grills, curries & biryani for parties of 30+.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/private-events",
    title: "Private Events at the TCB Bar | Tandoori Corner Singapore",
    description:
      "Host your private event at the TCB Bar in Balestier — corporate gatherings, birthdays & celebrations. Browse past events, see the space, and enquire to book.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/story",
    title: "Our Story | 15 Years at Balestier Plaza",
    description:
      "The Tandoori Corner story — 15 years of North Indian cooking, the TCB Bar, alfresco dining, our team, and press from Balestier Plaza, Singapore.",
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
    title: { absolute: title },
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
    "@type": ["Restaurant", "LocalBusiness"],
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 1.3257154,
      longitude: 103.8480438,
    },
    sameAs: restaurantSeo.sameAs,
    openingHoursSpecification: restaurantSeo.openingHoursSpecification,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: restaurantSeo.aggregateRating.ratingValue,
      reviewCount: restaurantSeo.aggregateRating.reviewCount,
      bestRating: restaurantSeo.aggregateRating.bestRating,
      worstRating: restaurantSeo.aggregateRating.worstRating,
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: restaurantSeo.name,
    legalName: restaurantSeo.legalName,
    url: siteUrl,
    mainEntityOfPage: siteUrl,
    description: restaurantSeo.description,
    slogan: restaurantSeo.slogan,
    foundingDate: restaurantSeo.foundingDate,
    image: absoluteUrl(restaurantSeo.ogImagePath),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(restaurantSeo.logoPath),
    },
    telephone: restaurantSeo.telephone,
    email: restaurantSeo.email,
    address: {
      "@type": "PostalAddress",
      ...restaurantSeo.address,
    },
    areaServed: restaurantSeo.areaServed,
    knowsAbout: restaurantSeo.knowsAbout,
    knowsLanguage: restaurantSeo.knowsLanguage,
    sameAs: restaurantSeo.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: restaurantSeo.telephone,
        contactType: "customer service",
        areaServed: "SG",
        availableLanguage: ["English"],
        email: restaurantSeo.email,
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface MenuSchemaItem {
  name: string;
  description?: string;
  priceText?: string;
  image?: string;
}

interface MenuSchemaSection {
  title: string;
  items: ReadonlyArray<MenuSchemaItem>;
}

export function buildMenuJsonLd(
  sections: ReadonlyArray<MenuSchemaSection>,
  menuPath = "/menu",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${absoluteUrl(menuPath)}#menu`,
    name: `${restaurantSeo.name} Menu`,
    url: absoluteUrl(menuPath),
    inLanguage: "en-SG",
    hasMenuSection: sections.map((section) => ({
      "@type": "MenuSection",
      name: section.title,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        image: item.image,
        offers: item.priceText
          ? {
              "@type": "Offer",
              price: item.priceText.replace(/[^\d.]/g, ""),
              priceCurrency: "SGD",
              availability: "https://schema.org/InStock",
            }
          : undefined,
      })),
    })),
  };
}

export function jsonLdScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
