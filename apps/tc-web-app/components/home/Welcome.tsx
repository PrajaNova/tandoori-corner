import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { welcomeContent } from "@/content/welcome";

export function Welcome() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          cursiveText={welcomeContent.cursiveText}
          mainText={welcomeContent.mainText}
        />

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
          {welcomeContent.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {welcomeContent.cards.map((card) => (
            <FeatureCard
              key={card.title}
              image={card.image}
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              linkHref={card.linkHref}
              linkLabel={card.linkLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
