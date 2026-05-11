import { Card, CardContent, CardHeader } from "@/components/ui/card";

const features = [
  {
    description:
      "Outdoor dining with vibrant views over the Balestier heritage trail. Perfect for brunch or sunset dinners.",
    title: "Pet-Friendly Alfresco",
  },
  {
    description:
      "A stylish indoor sanctuary designed for romantic dates, small groups, and exclusive private event nights.",
    title: "The TCB Bar",
  },
  {
    description:
      "Stress-free arrival with ample, easily accessible parking available directly at Balestier Plaza.",
    title: "Plenty of Parking",
  },
];

export function ExperienceFeatures() {
  return (
    <section className="bg-cream border-b border-border relative z-20">
      <div className="container mx-auto grid grid-cols-1 gap-4 px-6 py-12 md:grid-cols-3">
        {features.map((feature) => (
          <Card
            className="border-border bg-card text-center shadow-none"
            key={feature.title}
          >
            <CardHeader className="pb-3">
              <h3 className="font-space text-xl text-ink">{feature.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
