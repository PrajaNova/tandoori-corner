import { SectionHeading } from "@/components/ui/SectionHeading";

const welcomeParagraphs = [
  "Tandoori Corner was established in 2008 by Surendar Singh, a hotel management graduate who trained at Hyatt International's La Piazza in New Delhi before bringing his passion for authentic North Indian cuisine to Singapore's vibrant Balestier Road.",
  "What started as a cosy alfresco corner spot has grown into one of Singapore's most celebrated Indian restaurants, earning a TripAdvisor Certificate of Excellence and recognition as 'Best Food Delivery' by Restaurant Guru in 2020.",
  "Tandoori Corner is more than a restaurant — it is a community gathering place where flavours, stories and cultures come together. Our latest TCB expansion introduces a stylish indoor bar and dining room, inviting you to celebrate every occasion with us.",
];

export function StoryWelcome() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          cursiveText="Hello dear"
          mainText="Welcome To Tandoori Corner"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 text-center">
          {welcomeParagraphs.map((p) => (
            <p key={p} className="text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
