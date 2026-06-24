import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export function HeroArrows({ onPrev, onNext }: HeroArrowsProps) {
  return (
    <>
      <Button
        variant="ghost"
        onClick={onPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full p-0 bg-black/25 text-white hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 border-none outline-none focus-visible:ring-0 shadow-none"
      >
        <ChevronLeft className="w-8 h-8" strokeWidth={1} />
      </Button>
      <Button
        variant="ghost"
        onClick={onNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full p-0 bg-black/25 text-white hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 border-none outline-none focus-visible:ring-0 shadow-none"
      >
        <ChevronRight className="w-8 h-8" strokeWidth={1} />
      </Button>
    </>
  );
}
