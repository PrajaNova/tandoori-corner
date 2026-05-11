import {
  CalendarDays,
  Camera,
  GlassWater,
  MessageCircle,
  Music,
  Users,
} from "lucide-react";
import Image from "next/image";
import { AppHeader } from "@/component/AppHeader";
import { BookingWidget } from "@/component/BookingWidget";
import { MobileActionStrip } from "@/component/MobileActionStrip";
import { PromoBanner } from "@/component/PromoBanner";
import { Button } from "@/component/ui/button";
import { eventPackages, restaurant, reviews, weeklyEvents } from "./site-data";

const occasions = [
  {
    copy: "Quiet table, cocktails, North Indian plates, and a room that feels more intimate than the main balcony.",
    title: "Date Night",
  },
  {
    copy: "A private bar base for birthdays, anniversaries, and family celebrations without losing the food story.",
    title: "Celebration",
  },
  {
    copy: "Corporate dinners with easy parking, set menus, and a clear enquiry route for planning.",
    title: "Corporate Dinner",
  },
  {
    copy: "Reserve the room, shape the menu, and keep the evening contained around your group.",
    title: "Private Gathering",
  },
];

const gallery = [
  "/tandoori-tcb.png",
  "/dish-butter-chicken.jpg",
  "/dish-papri-chaat.jpg",
  "/dish-mango-lassi.jpg",
  "/tandoori-hero.jpg",
  "/dish-veg-biryani.jpg",
];

export function TcbPage() {
  return (
    <main className="min-h-screen bg-[#100d0b] pb-20 text-white">
      <AppHeader />

      <section className="relative isolate min-h-[88svh] overflow-hidden px-4 pb-12 pt-44 sm:px-8 lg:px-12">
        <Image
          alt="TCB Bar private dining at Tandoori Corner"
          className="-z-20 object-cover opacity-68"
          fill
          priority
          sizes="100vw"
          src="/tandoori-tcb.png"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_20%,rgba(217,139,31,0.32),transparent_34%),linear-gradient(90deg,#100d0b_0%,rgba(16,13,11,0.90)_42%,rgba(16,13,11,0.42)_100%)]" />
        <div className="mx-auto flex min-h-[calc(88svh-11rem)] max-w-7xl flex-col justify-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand">
              TCB Bar inside Tandoori Corner
            </p>
            <h1 className="mt-4 font-serif text-[2.7rem] leading-[1.02] text-white md:text-[4.5rem]">
              A private bar for the nights dinner alone cannot carry.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              TCB is the amber-lit indoor room for cocktails, private dining,
              corporate meals, and celebration tables on Balestier Road.
            </p>
            <Button asChild className="mt-7" variant="gold">
              <a data-gtm-event="tcb_quote_start" href="#tcb-booking">
                Check TCB Date
              </a>
            </Button>
          </div>
        </div>
      </section>

      <PromoBanner />

      <section className="px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
              Choose the occasion
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              The page should sell the use case first.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {occasions.map((occasion) => (
              <article
                className="rounded-card border border-white/10 bg-white/7 p-5"
                key={occasion.title}
              >
                <GlassWater aria-hidden="true" className="size-6 text-brand" />
                <h3 className="mt-5 font-serif text-2xl text-white">
                  {occasion.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {occasion.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-madison px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
              Packages with enough detail to act
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              Pick a starting point, then request the quote.
            </h2>
            <div className="mt-6 grid gap-3">
              {eventPackages.map((eventPackage) => (
                <article
                  className="rounded-card border border-white/10 bg-white/7 p-5"
                  key={eventPackage.id}
                >
                  <div className="flex items-start gap-3">
                    <Users
                      aria-hidden="true"
                      className="mt-1 size-5 text-brand"
                    />
                    <div>
                      <h3 className="font-serif text-2xl text-white">
                        {eventPackage.name}
                      </h3>
                      <p className="mt-2 text-sm font-black text-brand">
                        {eventPackage.capacity} · {eventPackage.price}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {eventPackage.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <BookingWidget mode="tcb" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
              Weekly rhythm
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
              Give the bar a reason to be visited this week.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
          <div className="rounded-card border border-white/10 bg-white/7 p-5">
            <CalendarDays aria-hidden="true" className="size-6 text-brand" />
            <h3 className="mt-5 font-serif text-3xl text-white">
              Live calendar slot
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              This area is intentionally designed for a booking/calendar API:
              available event windows, deposits, and instant confirmation can
              replace this static shell without changing the page layout.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-madison px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
                Bar gallery
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white md:text-5xl">
                Show mood, plates, and proof of life.
              </h2>
            </div>
            <Button asChild variant="outline">
              <a data-gtm-event="social_post_click" href="/gallery">
                <Camera aria-hidden="true" />
                View Gallery
              </a>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((image) => (
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-card border border-white/10 bg-white/7"
                key={image}
              >
                <Image
                  alt="TCB event and Tandoori Corner gallery"
                  className="object-cover transition duration-500 hover:scale-110"
                  fill
                  sizes="(min-width: 768px) 30vw, 50vw"
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              className="rounded-card border border-white/10 bg-white/7 p-5"
              key={review.name}
            >
              <p className="text-sm leading-6 text-muted">{review.quote}</p>
              <p className="mt-5 text-sm font-bold text-white">
                {review.name} · {review.source}
              </p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 sm:flex-row">
          <Button asChild variant="gold">
            <a href="#tcb-booking">Request TCB Quote</a>
          </Button>
          <Button asChild variant="outline">
            <a href={restaurant.whatsappHref} rel="noreferrer" target="_blank">
              <MessageCircle aria-hidden="true" />
              WhatsApp TCB
            </a>
          </Button>
        </div>
      </section>

      <MobileActionStrip />
    </main>
  );
}
