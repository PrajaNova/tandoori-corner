import type { Metadata } from "next";
import { menuItems, restaurant, weeklyEvents } from "@/component/site-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tandooricorner.com.sg"),
  title: {
    default: "Tandoori Corner | North Indian Dining & TCB Bar",
    template: "%s | Tandoori Corner",
  },
  description:
    "Tandoori Corner serves North Indian food, alfresco dining, delivery, and TCB Bar private events at Balestier Plaza, Singapore.",
  openGraph: {
    description:
      "North Indian dining, pet-friendly alfresco tables, and TCB Bar private events at Balestier Plaza.",
    images: ["/tandoori-hero.jpg"],
    title: "Tandoori Corner",
    type: "website",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
      postalCode: "329802",
      streetAddress: "400 Balestier Road #01-12 Balestier Plaza",
    },
    email: restaurant.email,
    image: ["/tandoori-hero.jpg", "/tandoori-tcb.png"],
    name: restaurant.name,
    priceRange: "$$",
    servesCuisine: "North Indian",
    telephone: restaurant.phone,
    url: "https://www.tandooricorner.com.sg/",
  },
  {
    "@context": "https://schema.org",
    "@type": "Menu",
    hasMenuItem: menuItems.map((item) => ({
      "@type": "MenuItem",
      description: item.description,
      name: item.name,
      offers: {
        "@type": "Offer",
        price: item.price,
        priceCurrency: "SGD",
      },
    })),
    name: "Tandoori Corner Menu",
  },
  ...weeklyEvents.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      address: restaurant.address,
      name: "TCB Bar at Tandoori Corner",
    },
    name: event.name,
    organizer: {
      "@type": "Organization",
      name: restaurant.name,
    },
  })),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData).replace(/</g, "\\u003c")}
        </script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
