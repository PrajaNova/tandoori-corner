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
        className="absolute left-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full border-none bg-black/25 p-0 text-white opacity-0 shadow-none transition-[opacity,background-color,color,transform] duration-200 hover:bg-primary hover:text-white focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary group-hover:opacity-100"
      >
        <ChevronLeft className="w-8 h-8" strokeWidth={1} />
      </Button>
      <Button
        variant="ghost"
        onClick={onNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full border-none bg-black/25 p-0 text-white opacity-0 shadow-none transition-[opacity,background-color,color,transform] duration-200 hover:bg-primary hover:text-white focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary group-hover:opacity-100"
      >
        <ChevronRight className="w-8 h-8" strokeWidth={1} />
      </Button>
    </>
  );
}
