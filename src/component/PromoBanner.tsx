"use client";

import { CalendarClock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/component/ui/button";
import { promos } from "./site-data";

function getSecondsUntil(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  const target = new Date(now);

  target.setHours(hours ?? 23, minutes ?? 59, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
}

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export function PromoBanner() {
  const activePromo = useMemo(() => {
    const index = new Date().getDay() % promos.length;

    return promos[index];
  }, []);

  const [secondsLeft, setSecondsLeft] = useState(() =>
    getSecondsUntil(activePromo.endsAt),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft(getSecondsUntil(activePromo.endsAt));
    }, 30_000);

    return () => window.clearInterval(timer);
  }, [activePromo.endsAt]);

  return (
    <section
      aria-label="Today's offer"
      className="border-y border-line bg-gradient-to-r from-brand-hover via-brand to-gold text-madison"
      id="promos"
    >
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-8 md:grid-cols-[auto_1fr_auto] md:items-center lg:px-12">
        <div className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.12em]">
          <CalendarClock aria-hidden="true" className="size-5" />
          {activePromo.title}
        </div>
        <p className="text-sm font-semibold md:text-base">
          {activePromo.description} Ends in{" "}
          <span className="font-black">{formatCountdown(secondsLeft)}</span>.
        </p>
        <Button
          asChild
          variant="heroOutline"
          className="border-madison text-madison hover:bg-madison hover:text-white"
        >
          <a
            data-gtm-event="promo_click"
            data-promo-id={activePromo.id}
            href="/reserve"
          >
            {activePromo.cta}
          </a>
        </Button>
      </div>
    </section>
  );
}
