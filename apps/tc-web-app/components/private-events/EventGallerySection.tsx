import { SectionHeading } from "@/components/ui/SectionHeading";
import { pastEvents } from "@/data/private-events";
import { PastEventsGallery } from "./PastEventsGallery";

export function EventGallerySection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading
          cursiveText="Past events"
          mainText="Nights We've Hosted"
        />
        <p className="mx-auto mb-14 max-w-2xl text-center leading-relaxed text-muted-foreground">
          A look at some of the celebrations and gatherings we&apos;ve welcomed
          into the TCB Bar.
        </p>
        <PastEventsGallery events={pastEvents} />
      </div>
    </section>
  );
}
