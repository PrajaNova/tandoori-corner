import { GrannyHero } from "./sections/GrannyHero";
import { GrannyWelcome } from "./sections/GrannyWelcome";
import { GrannySpecials } from "./sections/GrannySpecials";
import { GrannyHighlightLeft } from "./sections/GrannyHighlightLeft";
import { GrannyHighlightRight } from "./sections/GrannyHighlightRight";
import { GrannyParallaxQuote } from "./sections/GrannyParallaxQuote";
import { GrannyMenuPreview } from "./sections/GrannyMenuPreview";
import { GrannyReservation } from "./sections/GrannyReservation";
import { GrannyTestimonial } from "./sections/GrannyTestimonial";

export function HomePage() {
  return (
    <>
      <GrannyHero />
      <GrannyWelcome />
      <GrannySpecials />
      <GrannyHighlightLeft />
      <GrannyHighlightRight />
      <GrannyParallaxQuote />
      <GrannyMenuPreview />
      <GrannyReservation />
      <GrannyTestimonial />
    </>
  );
}
