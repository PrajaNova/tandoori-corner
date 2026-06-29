import Image from "next/image";
import type { CSSProperties } from "react";
import { MenuItem } from "@/components/ui/MenuItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { specialsContent } from "@/content/specials";

export function Specials() {
  return (
    <section className="relative py-24">
      <Image
        src={specialsContent.backgroundImage}
        alt=""
        width={1920}
        height={1080}
        aria-hidden="true"
        sizes="100vw"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-black/70" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          cursiveText={specialsContent.cursiveText}
          mainText={specialsContent.mainText}
          dark
        />

        <div className="bg-white p-8 md:p-14 max-w-5xl mx-auto shadow-2xl mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {specialsContent.items.map((item, idx) => (
              <div
                key={item.name}
                className="motion-list-item"
                style={{ "--motion-index": idx } as CSSProperties}
              >
                <MenuItem
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
