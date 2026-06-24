import type { PastEvent } from "@/data/private-events";
import { EventGalleryCard } from "./EventGalleryCard";

export function PastEventsGallery({ events }: { events: PastEvent[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventGalleryCard key={event.id} event={event} />
      ))}
    </div>
  );
}
