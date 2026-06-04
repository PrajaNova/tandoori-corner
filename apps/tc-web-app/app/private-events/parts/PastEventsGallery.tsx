import { Users } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import type { PastEvent } from "@/data/private-events";

export function PastEventsGallery({ events }: { events: PastEvent[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <article
          key={event.id}
          className="group flex flex-col overflow-hidden rounded-card border border-border bg-card"
        >
          <div className="relative h-56 w-full overflow-hidden">
            <div className="absolute inset-0 z-10 bg-brand-gold opacity-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-20" />
            <Image
              fill
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <Badge className="absolute left-4 top-4 z-20 border-0 bg-brand-dark/85 text-cream">
              {event.type}
            </Badge>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-ink/45">
              <span>{event.date}</span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-brand-gold" />
                {event.guests} guests
              </span>
            </div>
            <h3 className="font-space text-xl font-bold leading-snug text-ink">
              {event.title}
            </h3>
            <p className="text-sm font-light leading-relaxed text-ink/60">
              {event.blurb}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
