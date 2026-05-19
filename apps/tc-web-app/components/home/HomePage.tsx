import { AboutBalestier } from "./sections/AboutBalestier";
import { CulinaryCorners } from "./sections/CulinaryCorners";
import { DailyOffersSection } from "./sections/DailyOffersSection";
import { ExperienceFeatures } from "./sections/ExperienceFeatures";
import { GoogleReviewsSection } from "./sections/GoogleReviewsSection";
import { HeritageSection } from "./sections/HeritageSection";
import { Hero } from "./sections/Hero";
import { SocialFootprint } from "./sections/SocialFootprint";
import { TcbSpotlight } from "./sections/TcbSpotlight";

export function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceFeatures />
      <HeritageSection />
      <CulinaryCorners />
      <GoogleReviewsSection />
      <TcbSpotlight />
      <DailyOffersSection />
      <AboutBalestier />
      <SocialFootprint />
    </>
  );
}
