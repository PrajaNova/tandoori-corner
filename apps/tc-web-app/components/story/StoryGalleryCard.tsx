import Image from "next/image";

import type { GalleryItem } from "@/data/types";

export function StoryGalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="border border-gray-200 bg-card p-4 text-center">
      <div className="relative aspect-[4/3] overflow-hidden mb-4 rounded-sm">
        <Image
          fill
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-all duration-500"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <h4 className="font-bold text-[#d48c37] text-lg">{item.title}</h4>
    </div>
  );
}
