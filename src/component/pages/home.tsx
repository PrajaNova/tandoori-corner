import { ChevronRight } from "lucide-react";
import Link from "next/link";

const dishes = [
  {
    name: "Tandoori Chicken",
    desc: "Bone-in chicken marinated in yogurt and spices, roasted in the tandoor.",
    price: "$22.00",
  },
  {
    name: "Butter Chicken",
    desc: "Roasted chicken simmered in a creamy tomato gravy.",
    price: "$24.00",
  },
  {
    name: "Garlic Naan",
    desc: "Clay-oven flatbread finished with garlic and coriander.",
    price: "$5.50",
  },
];

export function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[88vh] items-center bg-ink px-4 pt-28 text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="mb-5 font-semibold text-brand text-sm uppercase tracking-[0.2em]">
              Tandoori Corner Singapore
            </p>
            <h1 className="max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
              The Essence of North Indian Cuisine
            </h1>
            <p className="mt-8 max-w-2xl text-cream/80 text-lg leading-relaxed">
              A warm dining experience for tandoori favorites, curries, breads,
              takeaway ordering, and table reservations.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                className="rounded-full bg-brand px-8 py-4 text-center font-semibold text-cream transition-colors hover:bg-tandoori-dark"
                href="/menu"
              >
                Explore Our Menu
              </Link>
              <Link
                className="rounded-full border border-cream/35 px-8 py-4 text-center font-semibold text-cream transition-colors hover:bg-cream hover:text-ink"
                href="/reservations"
              >
                Book a Table
              </Link>
            </div>
          </div>

          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-card shadow-card md:block">
            <img
              alt="North Indian dishes"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1400"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-semibold text-brand text-sm uppercase tracking-[0.2em]">
                Taste the Tradition
              </p>
              <h2 className="font-serif text-4xl text-ink md:text-5xl">
                Signature Dishes
              </h2>
            </div>
            <Link
              className="group inline-flex items-center gap-2 font-semibold text-brand"
              href="/menu"
            >
              View Full Menu
              <ChevronRight
                className="transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {dishes.map((dish) => (
              <article
                className="rounded-card border border-ink/5 bg-white p-6 shadow-card"
                key={dish.name}
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl text-ink">{dish.name}</h3>
                  <span className="font-semibold text-brand">{dish.price}</span>
                </div>
                <p className="text-ink/70 leading-relaxed">{dish.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
