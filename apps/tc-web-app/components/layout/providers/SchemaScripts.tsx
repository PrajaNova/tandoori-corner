import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildOrganizationJsonLd,
  buildRestaurantJsonLd,
  restaurantSeo,
} from "@/lib/seo";

export function SchemaScripts() {
  return (
    <>
      <JsonLd id="restaurant-schema" data={buildRestaurantJsonLd()} />
      <JsonLd
        id="website-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${restaurantSeo.siteUrl}/#website`,
          name: restaurantSeo.name,
          url: restaurantSeo.siteUrl,
          publisher: {
            "@id": `${restaurantSeo.siteUrl}/#restaurant`,
          },
        }}
      />
      <JsonLd id="organization-schema" data={buildOrganizationJsonLd()} />
    </>
  );
}
