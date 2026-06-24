import { IconCard } from "@/components/ui/IconCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { amenitiesContent } from "@/content/amenities";

export function Amenities() {
  return (
    <section className="relative py-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${amenitiesContent.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/75" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <SectionHeading
          cursiveText={amenitiesContent.cursiveText}
          mainText={amenitiesContent.mainText}
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-center">
          {amenitiesContent.items.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.desc}
              dark
            />
          ))}
        </div>
      </div>
    </section>
  );
}
