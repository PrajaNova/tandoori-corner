import {
  Award,
  Clock,
  Flame,
  MapPin,
  MessageCircle,
  Music,
  Navigation,
  Quote,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { MobileActionStrip } from "@/component/MobileActionStrip";
import { PromoBanner } from "@/component/PromoBanner";
import { Button } from "@/component/ui/button";
import {
  eventPackages,
  menuItems,
  restaurant,
  reviews,
  weeklyEvents,
} from "./site-data";

const nightPaths = [
  {
    alt: "Butter chicken and North Indian table at Tandoori Corner",
    copy: "Balcony dining, tandoor smoke, slow curries, and a table that feels familiar.",
    cta: "Reserve Alfresco",
    eyebrow: "DINE",
    href: "/reserve",
    image: "/dish-butter-chicken.jpg",
    meta: "Since 2008 · Balestier",
    title: "North Indian comfort tonight",
  },
  {
    alt: "TCB Bar private dining room at Tandoori Corner",
    copy: "Cocktails, private dining, celebrations, and a darker room for nights that need a mood.",
    cta: "Explore TCB",
    eyebrow: "VIBE",
    href: "/tcb",
    image: "/tandoori-tcb.png",
    meta: "Bar · Events · Private",
    title: "TCB for the occasion",
  },
];

const cravingGroups = [
  {
    icon: Sparkles,
    items: ["The OG Butter Chicken", "24-Hour Dal Makhani"],
    title: "Creamy Comfort",
  },
  {
    icon: Flame,
    items: ["Fire-Roasted Tandoori Chicken", "Tandoori Paneer Tikka"],
    title: "Clay Oven Smoke",
  },
  {
    icon: Utensils,
    items: ["Palak Paneer Silk", "Veg Biryani Bloom"],
    title: "Vegetarian Depth",
  },
];

const trustItems = [
  "Since 2008",
  "Alfresco balcony dining",
  "TripAdvisor Excellence",
  "Premium Economy feature",
  "Pet-friendly outdoor tables",
  "Parking at Balestier Plaza",
];

const socialImages = [
  "/dish-butter-chicken.jpg",
  "/dish-papri-chaat.jpg",
  "/tandoori-tcb.png",
  "/dish-palak-paneer.jpg",
  "/tandoori-hero.jpg",
  "/dish-mango-lassi.jpg",
];

function ChooseYourNight() {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-madison px-4 pb-6 pt-36 text-white sm:px-8 lg:px-12">
      <Image
        alt="Tandoori Corner warm dining backdrop"
        className="-z-20 object-cover opacity-30"
        fill
        priority
        sizes="100vw"
        src="/tandoori-hero.jpg"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,18,20,0.72),#111214_82%),radial-gradient(circle_at_18%_18%,rgba(217,139,31,0.30),transparent_34%)]" />

      <div className="mx-auto flex min-h-[calc(92svh-9rem)] max-w-7xl flex-col justify-end">
        <div className="max-w-3xl pb-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-brand">
            Tandoori Corner · North Indian Curry House · TCB Bar inside
          </p>
          <h1 className="mt-4 font-serif text-[2.35rem] leading-[1.02] text-white md:text-[4.4rem]">
            What kind of night are you planning?
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
            Choose food-first comfort on the alfresco side, or turn the evening
            into a TCB bar moment.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {nightPaths.map((path) => (
            <a
              aria-label={`${path.eyebrow}: ${path.title}`}
              className="group relative min-h-[22rem] overflow-hidden rounded-card border border-white/12 bg-white/7 p-5 shadow-lifted transition duration-300 hover:-translate-y-1 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:min-h-[28rem]"
              data-gtm-event={
                path.eyebrow === "DINE" ? "hero_dine_click" : "hero_vibe_click"
              }
              href={path.href}
              key={path.eyebrow}
            >
              <Image
                alt={path.alt}
                className="-z-10 object-cover opacity-72 transition duration-700 group-hover:scale-105"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src={path.image}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-madison via-madison/55 to-madison/10" />
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-black uppercase tracking-[0.24em] text-brand">
                    {path.eyebrow}
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-bold text-white/75">
                    {path.meta}
                  </span>
                </div>
                <div>
                  <h2 className="max-w-md font-serif text-4xl leading-tight text-white md:text-5xl">
                    {path.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/76 md:text-base">
                    {path.copy}
                  </p>
                  <span className="mt-6 inline-flex rounded-card bg-brand px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-madison">
                    {path.cta}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CravingSelector() {
  return (
    <section className="bg-madison px-4 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
            DINE path
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
            Pick by craving, not category.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            The fastest way to sell food is to match the mood: creamy, smoky,
            vegetarian, cooling, or sweet. The full menu still exists, but the
            first decision should feel easy.
          </p>
          <Button asChild className="mt-6" variant="gold">
            <a data-gtm-event="menu_view_click" href="/menu">
              Open Menu
            </a>
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {cravingGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article
                className="rounded-card border border-white/10 bg-white/7 p-5"
                key={group.title}
              >
                <Icon aria-hidden="true" className="size-6 text-brand" />
                <h3 className="mt-5 font-serif text-2xl text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WaiterMenuPreview() {
  const preview = menuItems.slice(0, 4);

  return (
    <section className="bg-[#171411] px-4 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
            Menu that behaves like a waiter
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
            Every dish answers the next question.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            What is it, how spicy is it, who is it good for, and what should it
            be paired with? That is the menu experience.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {preview.map((item) => (
            <article
              className="overflow-hidden rounded-card border border-white/10 bg-white/7"
              key={item.id}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  alt={item.name}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  src={item.image}
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">
                  {item.portion} · Spice {item.spice}/5
                </p>
                <h3 className="mt-2 font-serif text-xl text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.pairing}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeritageProof() {
  return (
    <section
      className="bg-madison px-4 py-16 text-white sm:px-8 lg:px-12"
      id="our-story"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="relative min-h-[30rem] overflow-hidden rounded-card border border-white/10">
          <Image
            alt="Tandoori Corner alfresco balcony dining"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/tandoori-hero.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-madison via-madison/20 to-transparent" />
          <div className="absolute bottom-5 left-5 rounded-card border border-white/12 bg-madison/82 p-4 backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">
              Balestier Road
            </p>
            <p className="mt-2 max-w-xs font-serif text-2xl text-white">
              Balcony dining above the heritage trail.
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
            Why trust the table
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
            The credibility is already real. Make it easier to see.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div
                className="flex items-center gap-3 rounded-card border border-white/10 bg-white/7 p-4"
                key={item}
              >
                <Award aria-hidden="true" className="size-5 text-brand" />
                <p className="text-sm font-bold text-white">{item}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-6" variant="outline">
            <a href="/about">Read Our Story</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function TcbVenuePath() {
  return (
    <section className="bg-[#100d0b] px-4 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
            VIBE path
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
            TCB should feel like a venue, not a footnote.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            A separate decision journey for dates, celebrations, corporate
            dinners, and private gatherings. The action is simple: choose an
            occasion, then request a quote.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {eventPackages.map((eventPackage) => (
              <div
                className="rounded-card border border-white/10 bg-white/7 p-4"
                key={eventPackage.id}
              >
                <p className="font-serif text-xl text-white">
                  {eventPackage.name}
                </p>
                <p className="mt-2 text-sm text-brand">{eventPackage.price}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-6" variant="gold">
            <a data-gtm-event="tcb_quote_start" href="/tcb">
              Plan TCB
            </a>
          </Button>
        </div>
        <div className="relative min-h-[34rem] overflow-hidden rounded-card border border-white/10">
          <Image
            alt="TCB Bar and private dining"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/tandoori-tcb.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-madison via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function ReviewsAndSocial() {
  return (
    <section className="bg-madison px-4 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
            Proof before commitment
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
            Reviews for trust. Social for recency.
          </h2>
          <div className="mt-6 grid gap-3">
            {reviews.map((review) => (
              <article
                className="rounded-card border border-white/10 bg-white/7 p-4"
                key={review.name}
              >
                <div className="flex gap-1 text-brand">
                  {["one", "two", "three", "four", "five"].map((key) => (
                    <Star
                      aria-hidden="true"
                      className="size-4 fill-current"
                      key={key}
                    />
                  ))}
                </div>
                <Quote aria-hidden="true" className="mt-4 size-5 text-brand" />
                <p className="mt-2 text-sm leading-6 text-muted">
                  {review.quote}
                </p>
                <p className="mt-4 text-sm font-bold text-white">
                  {review.name} · {review.source}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {socialImages.map((image) => (
            <a
              aria-label="Open vibe gallery"
              className="group relative aspect-square overflow-hidden rounded-card border border-white/10 bg-white/7"
              data-gtm-event="social_post_click"
              href="/gallery"
              key={image}
            >
              <Image
                alt="Tandoori Corner food and vibe gallery"
                className="object-cover transition duration-500 group-hover:scale-110"
                fill
                sizes="(min-width: 1024px) 16vw, 50vw"
                src={image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-madison/70 to-transparent opacity-0 transition group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitConfidence() {
  return (
    <section className="bg-section px-4 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
            Easy to find. Easy to park. Easy to enjoy.
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
            Remove the arrival anxiety.
          </h2>
          <div className="mt-6 grid gap-3">
            {[
              ["Address", restaurant.address, MapPin],
              [
                "Hours",
                `${restaurant.hours}. ${restaurant.closedNote}.`,
                Clock,
              ],
              ["Fast contact", restaurant.whatsapp, MessageCircle],
              [
                "Parking",
                "Balestier Plaza parking for dine-in and events.",
                Navigation,
              ],
            ].map(([label, copy, Icon]) => (
              <div
                className="flex gap-3 rounded-card border border-white/10 bg-white/7 p-4"
                key={label as string}
              >
                <Icon aria-hidden="true" className="mt-1 size-5 text-brand" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-brand">
                    {label as string}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {copy as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button asChild className="mt-6" variant="outline">
            <a href="/contact">Plan Your Visit</a>
          </Button>
        </div>
        <div className="overflow-hidden rounded-card border border-white/10 bg-white/7">
          <iframe
            aria-label="Map to Tandoori Corner at Balestier Plaza"
            className="h-[30rem] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={restaurant.mapEmbed}
            title="Tandoori Corner map"
          />
        </div>
      </div>
    </section>
  );
}

function WeeklyRhythm() {
  return (
    <section className="bg-[#171411] px-4 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
              This week
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              Give visitors a reason to act today.
            </h2>
          </div>
          <Button asChild variant="outline">
            <a href="/tcb">See TCB Schedule</a>
          </Button>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {weeklyEvents.map((event) => (
            <article
              className="rounded-card border border-white/10 bg-white/7 p-4"
              key={`${event.day}-${event.name}`}
            >
              <Music aria-hidden="true" className="size-5 text-brand" />
              <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-brand">
                {event.day} · {event.time}
              </p>
              <h3 className="mt-2 font-serif text-xl text-white">
                {event.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SplitPersonaHome() {
  return (
    <main className="min-h-screen bg-madison text-white">
      <ChooseYourNight />
      <PromoBanner />
      <CravingSelector />
      <WaiterMenuPreview />
      <HeritageProof />
      <TcbVenuePath />
      <WeeklyRhythm />
      <ReviewsAndSocial />
      <VisitConfidence />
      <MobileActionStrip />
    </main>
  );
}
