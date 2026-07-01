import type { CSSProperties } from "react";
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

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          {welcomeContent.description}
        </p>

        <div className="mx-auto mb-12 max-w-4xl border-y border-border py-6">
          <p className="text-center text-sm leading-7 text-muted-foreground">
            {welcomeContent.answerBlock}
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            {welcomeContent.highlights.map((item) => (
              <li key={item.label} className="leading-6 text-muted-foreground">
                <span className="font-bold text-foreground">{item.label}:</span>{" "}
                {item.value}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mx-auto mb-16 grid max-w-4xl grid-cols-1 border-y border-border text-center sm:grid-cols-3">
          {welcomeContent.facts.map((fact) => (
            <div
              key={fact.label}
              className="px-4 py-5 sm:border-l sm:first:border-l-0 sm:border-border"
            >
              <dt className="font-raleway text-[10px] font-bold uppercase tracking-widest text-primary">
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {welcomeContent.cards.map((card, idx) => (
            <div
              key={card.title}
              className="motion-list-item h-full"
              style={{ "--motion-index": idx } as CSSProperties}
            >
              <FeatureCard
                image={card.image}
                imageAlt={card.imageAlt}
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                linkHref={card.linkHref}
                linkLabel={card.linkLabel}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
