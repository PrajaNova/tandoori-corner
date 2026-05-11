import { AppHeader } from "@/component/AppHeader";
import { BookingWidget } from "@/component/BookingWidget";
import { MobileActionStrip } from "@/component/MobileActionStrip";
import { restaurant } from "@/component/site-data";
import { Button } from "@/component/ui/button";

export const metadata = {
  title: "Reserve a Table | Tandoori Corner",
  description:
    "Reserve a table at Tandoori Corner for alfresco North Indian dining or request a TCB Bar private event quote.",
};

export default function ReserveRoute() {
  return (
    <main className="min-h-screen bg-madison px-4 pb-24 pt-44 text-white sm:px-8 lg:px-12">
      <AppHeader />
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand">
            Guest checkout booking
          </p>
          <h1 className="mt-4 font-serif text-[2.6rem] leading-[1.02] text-white md:text-[4rem]">
            Book the table in under four taps.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Choose a date, time, guest count, and contact. For fastest same-day
            help, use WhatsApp after submitting your request.
          </p>
          <div className="mt-7 grid gap-3 rounded-card border border-white/10 bg-white/7 p-5">
            <p className="font-serif text-2xl text-white">
              {restaurant.shortAddress}
            </p>
            <p className="text-sm leading-6 text-muted">
              {restaurant.hours}. {restaurant.closedNote}.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline">
                <a href={restaurant.phoneHref}>Call {restaurant.phone}</a>
              </Button>
              <Button asChild variant="gold">
                <a
                  href={restaurant.whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp one-tap
                </a>
              </Button>
            </div>
          </div>
        </div>
        <BookingWidget />
      </section>
      <MobileActionStrip />
    </main>
  );
}
