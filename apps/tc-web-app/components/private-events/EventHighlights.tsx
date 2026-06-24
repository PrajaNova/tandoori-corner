import { SectionHeading } from "@/components/ui/SectionHeading";
import { tcbHighlights } from "@/data/private-events";

export function EventHighlights() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading
          cursiveText="Why the TCB Bar"
          mainText="Crafted For Your Celebration"
        />
        <p className="mx-auto mb-14 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Pair our beer-fest specials and craft cocktails with a bespoke menu of
          tandoori grills and signature curries — plated, family-style, or as
          canapés for a standing reception.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tcbHighlights.map((highlight, index) => (
            <div
              key={highlight.label}
              className="border border-border p-8 text-center transition-shadow duration-300 hover:shadow-lg"
            >
              <span className="font-script text-4xl text-primary">
                0{index + 1}
              </span>
              <h3 className="font-raleway mt-3 text-base font-bold uppercase tracking-wide text-foreground">
                {highlight.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {highlight.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
