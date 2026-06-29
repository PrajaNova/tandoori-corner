import { Amenities } from "@/components/home/Amenities";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { MenuPreview } from "@/components/home/MenuPreview";
import { ParallaxQuote } from "@/components/home/ParallaxQuote";
import { Reservation } from "@/components/home/Reservation";
import { RestaurantFaq } from "@/components/home/RestaurantFaq";
import { Specials } from "@/components/home/Specials";
import { Testimonial } from "@/components/home/Testimonial";
import { Welcome } from "@/components/home/Welcome";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd id="home-faq-schema" data={buildFaqJsonLd()} />
      <Hero />
      <Welcome />
      <Specials />
      <Highlights />
      <ParallaxQuote />
      <MenuPreview />
      <Amenities />
      <Reservation />
      <RestaurantFaq />
      <Testimonial />
    </>
  );
}
