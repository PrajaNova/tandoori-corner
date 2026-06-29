import { Button } from "@/components/ui/button";

interface HeroDotsProps {
  currentSlide: number;
  totalSlides: number;
  onChange: (index: number) => void;
}

export function HeroDots({
  currentSlide,
  totalSlides,
  onChange,
}: HeroDotsProps) {
  return (
    <div className="absolute bottom-[clamp(2rem,5vh,3rem)] left-1/2 -translate-x-1/2 flex space-x-2 z-20">
      {Array.from({ length: totalSlides }).map((_, idx) => (
        <Button
          key={idx}
          onClick={() => onChange(idx)}
          variant="ghost"
          className="group h-11 w-11 cursor-pointer rounded-full border-none bg-transparent p-0 shadow-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Go to slide ${idx + 1}`}
        >
          <span
            className={`block h-2.5 w-2.5 rounded-full transition-colors ${
              idx === currentSlide
                ? "bg-primary"
                : "bg-white/40 group-hover:bg-primary"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}
