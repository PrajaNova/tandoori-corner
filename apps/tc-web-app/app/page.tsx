import { Amenities } from "@/components/home/Amenities";
import { Hero } from "@/components/home/Hero";
import { HighlightLeft } from "@/components/home/HighlightLeft";
import { HighlightRight } from "@/components/home/HighlightRight";
import { MenuPreview } from "@/components/home/MenuPreview";
import { ParallaxQuote } from "@/components/home/ParallaxQuote";
import { Reservation } from "@/components/home/Reservation";
import { Specials } from "@/components/home/Specials";
import { Testimonial } from "@/components/home/Testimonial";
import { Welcome } from "@/components/home/Welcome";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <Specials />
      <HighlightLeft />
      <HighlightRight />
      <ParallaxQuote />
      <MenuPreview />
      <Amenities />
      <Reservation />
      <Testimonial />
    </>
  );
}
