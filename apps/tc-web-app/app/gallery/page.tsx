import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGalleryImages } from "@/lib/cms";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/gallery",
  title: "Food & Event Gallery | Tandoori Corner Singapore",
  description:
    "Browse Tandoori Corner food, restaurant, TCB Bar, catering, and private event photos from Balestier Plaza.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
] as const;

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return (
    <>
      <JsonLd
        id="gallery-breadcrumbs"
        data={buildBreadcrumbJsonLd(breadcrumbs)}
      />
      <main className="bg-cream">
        <section className="container mx-auto max-w-6xl px-6 py-20">
          <p className="font-script text-3xl text-brand-gold">Gallery</p>
          <h1 className="mt-2 font-kaushan text-5xl text-ink">
            Food, events, and TCB Bar
          </h1>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <figure key={image.id} className="border border-border bg-white">
                <img
                  src={image.imageUrl}
                  alt={image.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="p-4">
                  <h2 className="font-semibold text-ink">{image.title}</h2>
                  <p className="mt-1 text-sm uppercase tracking-widest text-ink/40">
                    {image.category}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
