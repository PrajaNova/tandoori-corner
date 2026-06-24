import { Users } from "lucide-react";
import Image from "next/image";

import type { PastEvent } from "@/data/private-events";

export function PastEventsGallery({ events }: { events: PastEvent[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <article
          key={event.id}
          className="group flex flex-col overflow-hidden border border-border bg-white transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="relative h-56 w-full overflow-hidden">
            <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
            <Image
              fill
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className="absolute left-4 top-4 z-20 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {event.type}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              <span>{event.date}</span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                {event.guests} guests
              </span>
            </div>
            <h3 className="font-raleway text-xl font-bold leading-snug text-foreground">
              {event.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {event.blurb}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
