import { ActionFooter } from "@/component/ActionFooter";
import { AppHeader } from "@/component/AppHeader";
import { HeroSection } from "@/component/HeroSection";
import { SignatureDishShowcase } from "@/component/SignatureDishShowcase";
import { TrustBar } from "@/component/TrustBar";
import { VibeStudio } from "@/component/VibeStudio";

export default function Home() {
  return (
    <main className="min-h-screen bg-section text-foreground">
      <AppHeader />
      <HeroSection />
      <TrustBar />
      <SignatureDishShowcase />
      <VibeStudio />
      <ActionFooter />
    </main>
  );
}
