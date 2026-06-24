import { StoryAwards } from "./parts/StoryAwards";
import { StoryCounters } from "./parts/StoryCounters";
import { StoryFeatures } from "./parts/StoryFeatures";
import { StoryGuestbook } from "./parts/StoryGuestbook";
import { StoryHero } from "./parts/StoryHero";
import { StoryWelcome } from "./parts/StoryWelcome";

export function StoryContent() {
  return (
    <div className="bg-white">
      <StoryHero />
      <StoryWelcome />
      <StoryGuestbook />
      <StoryFeatures />
      <StoryCounters />
      <StoryAwards />
    </div>
  );
}
