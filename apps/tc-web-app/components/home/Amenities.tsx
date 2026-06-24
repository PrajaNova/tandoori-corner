import { IconCard } from "@/components/ui/IconCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { amenitiesContent } from "@/content/amenities";

export function Amenities() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          cursiveText={amenitiesContent.cursiveText}
          mainText={amenitiesContent.mainText}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14 mt-14 text-center">
          {amenitiesContent.items.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
