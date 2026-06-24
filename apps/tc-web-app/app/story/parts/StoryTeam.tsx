import { StoryTeamCard } from "@/components/story/StoryTeamCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { storyTeam } from "@/data/story";

export function StoryTeam() {
  return (
    <section className="bg-white py-24 border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          cursiveText="Meet the family"
          mainText="The Team Behind the Taste"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
          {storyTeam.map((member) => (
            <StoryTeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
