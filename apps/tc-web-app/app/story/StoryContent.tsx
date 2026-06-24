import { Testimonial } from "@/components/home/Testimonial";
import { StoryAwards } from "@/components/story/StoryAwards";
import { StoryCounters } from "@/components/story/StoryCounters";
import { StoryFeatures } from "@/components/story/StoryFeatures";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryTeam } from "@/components/story/StoryTeam";
import { StoryWelcome } from "@/components/story/StoryWelcome";

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
