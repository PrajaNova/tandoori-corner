import Image from "next/image";
import type { CSSProperties } from "react";
import { IconCard } from "@/components/ui/IconCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { amenitiesContent } from "@/content/amenities";

export function Amenities() {
  return (
    <section className="relative py-24">
      <Image
        src={amenitiesContent.backgroundImage}
        alt=""
        width={1920}
        height={1080}
        aria-hidden="true"
        sizes="100vw"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-black/75" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <SectionHeading
          cursiveText={amenitiesContent.cursiveText}
          mainText={amenitiesContent.mainText}
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-center">
          {amenitiesContent.items.map((item, idx) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.desc}
              className="motion-list-item"
              style={{ "--motion-index": idx } as CSSProperties}
              dark
            />
          ))}
        </div>
      </div>
    </section>
  );
}
