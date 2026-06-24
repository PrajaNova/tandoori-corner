import { Testimonial } from "@/components/home/Testimonial";
import { StoryAwards } from "./parts/StoryAwards";
import { StoryCounters } from "./parts/StoryCounters";
import { StoryFeatures } from "./parts/StoryFeatures";
import { StoryHero } from "./parts/StoryHero";
import { StoryTeam } from "./parts/StoryTeam";
import { StoryWelcome } from "./parts/StoryWelcome";

export function StoryContent() {
  return (
    <div className="bg-white">
      <StoryHero />
      <StoryWelcome />
      <Testimonial />
      <StoryFeatures />
      <StoryCounters />
      <StoryTeam />
      <StoryAwards />
    </div>
  );
}
