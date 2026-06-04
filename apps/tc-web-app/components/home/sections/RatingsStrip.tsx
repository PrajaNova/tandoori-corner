import { SectionShell } from "@/components/common/section-shell/SectionShell";
import RatingStar from "@/components/ui/ratingStart";

export function RatingsStrip() {
  return (
    <SectionShell
      className="relative z-20 bg-ink text-cream"
      innerClassName="py-4 sm:py-5"
    >
      <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6">
        <span className="font-space text-sm font-medium tracking-wide text-cream/90">
          Elevated Indian Dining
        </span>

        <span className="hidden h-4 w-px bg-cream/25 sm:block" />

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <span className="inline-flex items-center gap-2">
            <RatingStar rating={4.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-cream/80">
              on Google
            </span>
          </span>

          <span className="hidden h-3.5 w-px bg-cream/20 sm:block" />

          <span className="text-[10px] font-bold uppercase tracking-widest text-cream/80">
            TripAdvisor Excellence
          </span>
        </div>
      </div>
    </SectionShell>
  );
}
