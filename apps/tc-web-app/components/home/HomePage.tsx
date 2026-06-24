import { GrannyAmenities } from "./sections/GrannyAmenities";
import { GrannyHero } from "./sections/GrannyHero";
import { GrannyHighlightLeft } from "./sections/GrannyHighlightLeft";
import { GrannyHighlightRight } from "./sections/GrannyHighlightRight";
import { GrannyMenuPreview } from "./sections/GrannyMenuPreview";
import { GrannyParallaxQuote } from "./sections/GrannyParallaxQuote";
import { GrannyReservation } from "./sections/GrannyReservation";
import { GrannySpecials } from "./sections/GrannySpecials";
import { GrannyTestimonial } from "./sections/GrannyTestimonial";
import { GrannyWelcome } from "./sections/GrannyWelcome";

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
      <GrannyAmenities />
      <GrannyReservation />
      <GrannyTestimonial />
    </>
  );
}
