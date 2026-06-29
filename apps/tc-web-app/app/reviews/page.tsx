import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTestimonials } from "@/lib/cms";
import { buildBreadcrumbJsonLd, buildPageMetadata, contact } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/reviews",
  title: "Guest Reviews | Tandoori Corner Singapore",
  description:
    "Read guest reviews for Tandoori Corner, a North Indian restaurant and TCB Bar at Balestier Plaza, Singapore.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Reviews", path: "/reviews" },
] as const;

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <JsonLd
        id="reviews-breadcrumbs"
        data={buildBreadcrumbJsonLd(breadcrumbs)}
      />
      <main className="bg-cream">
        <section className="container mx-auto max-w-6xl px-6 py-20">
          <p className="font-script text-3xl text-brand-gold">Reviews</p>
          <h1 className="mt-2 font-kaushan text-5xl text-ink">
            Guests keep coming back
          </h1>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="border border-border bg-white p-6"
              >
                <p className="text-lg leading-relaxed text-ink">
                  “{item.quote}”
                </p>
                <p className="mt-5 text-sm font-bold uppercase tracking-widest text-brand-gold">
                  {item.author}
                </p>
                <p className="mt-1 text-sm text-ink/45">
                  {item.source ?? "Guest review"}{" "}
                  {item.rating ? `· ${item.rating}/5` : ""}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={contact.social.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink px-5 py-3 text-sm font-bold uppercase tracking-widest text-white"
            >
              TripAdvisor
            </a>
            <Link
              href="/#reservation"
              className="border border-ink px-5 py-3 text-sm font-bold uppercase tracking-widest text-ink"
            >
              Reserve Table
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
