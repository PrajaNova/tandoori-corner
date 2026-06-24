import Script from "next/script";
import {
  buildOrganizationJsonLd,
  buildRestaurantJsonLd,
  jsonLdScript,
  restaurantSeo,
} from "@/lib/seo";

export function SchemaScripts() {
  return (
    <>
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
    </>
  );
}
