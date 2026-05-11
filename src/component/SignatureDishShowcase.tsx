import Image from "next/image";
import { Button } from "@/component/ui/button";

const dishes = [
  {
    name: "The OG Butter Chicken",
    image: "/dish-butter-chicken.jpg",
    tag: "House Icon",
    copy: "Tandoor-charred chicken folded through a slow tomato gravy, finished with cold butter. Mild, velvety, and built for naan.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Papri Chaat Crackle",
    image: "/dish-papri-chaat.jpg",
    tag: "Street Snack",
    copy: "Crisp wafers, cooling yoghurt, chutney, and spice. Sweet, tangy, crunchy, then gone too fast.",
    className: "",
  },
  {
    name: "Palak Paneer Silk",
    image: "/dish-palak-paneer.jpg",
    tag: "Vegetarian",
    copy: "Soft paneer in deep-green spinach gravy, lifted with ginger, garlic, and a gentle North Indian heat.",
    className: "",
  },
  {
    name: "Veg Biryani Bloom",
    image: "/dish-veg-biryani.jpg",
    tag: "Rice & Spice",
    copy: "Fragrant basmati, warm spice, and vegetables layered for aroma first, comfort second, appetite always.",
    className: "",
  },
  {
    name: "Mango Lassi Cooldown",
    image: "/dish-mango-lassi.jpg",
    tag: "Signature Sip",
    copy: "Thick mango, chilled yoghurt, and a smooth finish that resets the palate between bites.",
    className: "",
  },
  {
    name: "Gulab Jamun Glow",
    image: "/dish-gulab-jamun.jpg",
    tag: "Sweet Finish",
    copy: "Warm syrup-soaked dumplings with a soft centre and just enough sweetness to close the meal.",
    className: "",
  },
];

export function SignatureDishShowcase() {
  return (
    <section id="menu" className="bg-white text-madison">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
              Signature dishes
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
              Skip the PDF. Eat with your eyes first.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              A focused look at the dishes guests come back for: char, spice,
              steam, cool lassi, and the sweet finish.
            </p>
          </div>
          <Button asChild variant="gold" className="md:self-end">
            <a href="/menu">Add to Online Order</a>
          </Button>
        </div>

        <div className="mt-10 grid auto-rows-[22rem] gap-4 md:grid-cols-4">
          {dishes.map((dish) => (
            <a
              aria-label={`Add ${dish.name} to online order`}
              className={`group relative block overflow-hidden rounded-card bg-madison shadow-card outline-none ring-brand/30 transition focus-visible:ring-4 ${dish.className}`}
              href="/menu"
              key={dish.name}
            >
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-110 group-focus-within:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-curry/45 blur-2xl" />
                <div className="absolute bottom-20 right-8 h-20 w-20 rounded-full bg-brand/40 blur-xl" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="mb-2 inline-flex rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
                  {dish.tag}
                </p>
                <h3 className="font-serif text-2xl text-white">{dish.name}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/78">
                  {dish.copy}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
