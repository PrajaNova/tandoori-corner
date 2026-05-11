"use client";

import { Camera, Heart, Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AppHeader } from "@/component/AppHeader";
import { Button } from "@/component/ui/button";
import { cn } from "@/lib/utils";

type GalleryItem = {
  category: string;
  copy: string;
  image: string;
  span?: string;
  title: string;
  type: "photo" | "reel";
};

const galleryItems: GalleryItem[] = [
  {
    category: "The Food & The Craft",
    copy: "Butter chicken texture, smoke, and cold butter richness.",
    image: "/dish-butter-chicken.jpg",
    span: "md:col-span-2 md:row-span-2",
    title: "Velvety Butter Chicken",
    type: "photo",
  },
  {
    category: "The Food & The Craft",
    copy: "Naan and kebab heat from the clay tandoor.",
    image: "/tandoori-hero.jpg",
    title: "Tandoor Fire",
    type: "reel",
  },
  {
    category: "The Alfresco & Pet-Friendly Vibe",
    copy: "Balcony-style dining over Balestier Road.",
    image: "/tandoori-hero.jpg",
    span: "md:row-span-2",
    title: "Golden Hour Alfresco",
    type: "photo",
  },
  {
    category: "The Food & The Craft",
    copy: "Crisp, cool, tangy, and built for sharing first.",
    image: "/dish-papri-chaat.jpg",
    title: "Papri Chaat Crackle",
    type: "photo",
  },
  {
    category: "The VIPs",
    copy: "A trust-signal space reserved for curated celebrity and press moments.",
    image: "/tandoori-corner-logo.png",
    title: "Bollywood Wall",
    type: "photo",
  },
  {
    category: "TCB Bar",
    copy: "Private dinners, cocktails, wine pairings, and celebrations.",
    image: "/tandoori-tcb.png",
    span: "md:col-span-2",
    title: "TCB Night Energy",
    type: "reel",
  },
  {
    category: "The Food & The Craft",
    copy: "Spinach gravy, paneer softness, ginger, and slow comfort.",
    image: "/dish-palak-paneer.jpg",
    title: "Palak Paneer Silk",
    type: "photo",
  },
  {
    category: "The Food & The Craft",
    copy: "Fragrant basmati, warm spice, and a copper-pot finish.",
    image: "/dish-veg-biryani.jpg",
    title: "Biryani Bloom",
    type: "photo",
  },
  {
    category: "The Alfresco & Pet-Friendly Vibe",
    copy: "The cool-down drink guests reach for after the tandoor.",
    image: "/dish-mango-lassi.jpg",
    title: "Lassi Pause",
    type: "photo",
  },
  {
    category: "The Food & The Craft",
    copy: "Warm syrup, soft centres, and the final sweet close.",
    image: "/dish-gulab-jamun.jpg",
    title: "Gulab Jamun Glow",
    type: "photo",
  },
];

const storyCategories = [
  "The Food & The Craft",
  "The Alfresco & Pet-Friendly Vibe",
  "TCB Bar",
  "The VIPs",
];

const socialTiles = [
  { id: "butter-chicken-reel", image: "/dish-butter-chicken.jpg" },
  { id: "alfresco-photo", image: "/tandoori-hero.jpg" },
  { id: "papri-chaat-reel", image: "/dish-papri-chaat.jpg" },
  { id: "tcb-photo", image: "/tandoori-tcb.png" },
  { id: "palak-paneer-reel", image: "/dish-palak-paneer.jpg" },
  { id: "biryani-photo", image: "/dish-veg-biryani.jpg" },
];

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

export function GalleryPage() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <main className="min-h-screen bg-madison text-white">
      <AppHeader />

      <section className="relative isolate overflow-hidden px-6 pb-16 pt-48 sm:px-10 lg:px-12">
        <Image
          alt="Tandoori Corner gallery hero"
          className="-z-20 object-cover opacity-45"
          fill
          priority
          src="/tandoori-hero.jpg"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-madison via-madison/90 to-madison/40" />
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-curry">
            Vibe & Social Studio
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-tight text-white md:text-7xl">
            The food, the fire, the alfresco nights, and the people who make it
            matter.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            Visual proof before the visit: food craft, pet-friendly alfresco
            energy, TCB nights, and social-ready moments.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 py-4 sm:px-10 lg:px-12">
          {storyCategories.map((category) => (
            <a
              className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/75 transition hover:border-curry hover:text-curry"
              href={`#${slug(category)}`}
              key={category}
            >
              {category}
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 py-14 sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl auto-rows-[16rem] gap-4 md:grid-cols-4">
          {galleryItems.map((item) => (
            <button
              className={cn(
                "group relative overflow-hidden rounded-card bg-black text-left shadow-card outline-none transition hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-curry",
                item.span,
              )}
              id={slug(item.category)}
              key={`${item.category}-${item.title}`}
              onClick={() => setSelected(item)}
              type="button"
            >
              <Image
                alt={item.title}
                className="object-cover transition duration-700 group-hover:scale-110"
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] backdrop-blur">
                {item.type === "reel" ? (
                  <Play aria-hidden="true" className="size-3 fill-current" />
                ) : (
                  <Camera aria-hidden="true" className="size-3" />
                )}
                {item.type}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-curry">
                  {item.category}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-white">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/70">
                  {item.copy}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-cream px-6 py-16 text-madison sm:px-10 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              Social proof feed
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Built for live Instagram and TikTok.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              This section is structured for an auto-updating social embed.
              Until the live account/API is connected, it uses curated food,
              alfresco, and TCB assets as the fallback feed.
            </p>
            <Button asChild className="mt-7" variant="gold">
              <a href="/reserve">Book after browsing</a>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {socialTiles.map((tile, index) => (
              <div
                className="relative aspect-square overflow-hidden rounded-card bg-madison"
                key={tile.id}
              >
                <Image
                  alt="Tandoori Corner social tile"
                  className="object-cover transition duration-500 hover:scale-110"
                  fill
                  sizes="(min-width: 1024px) 12vw, 30vw"
                  src={tile.image}
                />
                {index % 2 === 0 ? (
                  <div className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white">
                    <Play aria-hidden="true" className="size-3 fill-current" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4">
          <button
            aria-label="Close image preview"
            className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:text-curry"
            onClick={() => setSelected(null)}
            type="button"
          >
            <X aria-hidden="true" />
          </button>
          <div className="grid w-full max-w-5xl overflow-hidden rounded-card bg-madison shadow-lifted md:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[60vh]">
              <Image
                alt={selected.title}
                className="object-cover"
                fill
                sizes="80vw"
                src={selected.image}
              />
            </div>
            <div className="flex flex-col justify-center p-7">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-curry">
                {selected.category}
              </p>
              <h2 className="mt-4 font-serif text-4xl text-white">
                {selected.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/72">
                {selected.copy}
              </p>
              <div className="mt-7 flex items-center gap-2 text-sm text-white/60">
                <Heart aria-hidden="true" className="size-4 text-brand" />
                Save this mood for your next Tandoori Corner visit.
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
