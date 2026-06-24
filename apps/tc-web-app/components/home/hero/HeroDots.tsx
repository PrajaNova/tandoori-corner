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
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
      {Array.from({ length: totalSlides }).map((_, idx) => (
        <Button
          key={idx}
          onClick={() => onChange(idx)}
          variant="ghost"
          className={`h-2.5 w-2.5 p-0 rounded-full min-w-0 min-h-0 border-none outline-none focus-visible:ring-0 shadow-none cursor-pointer transition-colors ${
            idx === currentSlide
              ? "bg-primary hover:bg-primary"
              : "bg-white/40 hover:bg-primary"
          }`}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );
}
