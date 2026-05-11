import { AppShell } from "../layout/AppShell";
import { CulinaryCorners } from "./sections/CulinaryCorners";
import { DailyOffersSection } from "./sections/DailyOffersSection";
import { ExperienceFeatures } from "./sections/ExperienceFeatures";
import { HeritageSection } from "./sections/HeritageSection";
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { SocialFootprint } from "./sections/SocialFootprint";
import { TcbSpotlight } from "./sections/TcbSpotlight";

export function HomePage() {
  return (
    <AppShell>
      <HeroSection />
      <ExperienceFeatures />
      <HeritageSection />
      <CulinaryCorners />
      <ServicesSection />
      <TcbSpotlight />
      <DailyOffersSection />
      <SocialFootprint />
    </AppShell>
  );
}
