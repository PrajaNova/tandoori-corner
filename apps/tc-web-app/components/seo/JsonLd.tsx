import { jsonLdScript } from "@/lib/seo";

export function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is escaped before rendering.
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
