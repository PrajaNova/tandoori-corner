import Link from "next/link";
import { getPromotions } from "@/lib/cms";

export async function Promotions() {
  const promotions = await getPromotions();
  if (promotions.length === 0) return null;

  return (
    <section className="bg-brand-dark py-12 text-cream">
      <div className="container mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-2">
        {promotions.map((promotion) => (
          <article key={promotion.id} className="border border-cream/15 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">
              {promotion.placement}
            </p>
            <h2 className="mt-2 font-kaushan text-3xl">{promotion.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              {promotion.description}
            </p>
            {promotion.ctaHref && promotion.ctaLabel ? (
              <Link
                href={promotion.ctaHref}
                className="mt-5 inline-block text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-cream"
              >
                {promotion.ctaLabel}
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
