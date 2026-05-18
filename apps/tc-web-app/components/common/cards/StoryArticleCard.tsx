import Image from "next/image";
import type { ArticleItem } from "@/data/types";

export function StoryArticleCard({ article }: { article: ArticleItem }) {
  return (
    <article className="flex flex-col group cursor-pointer border border-transparent bg-card hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors">
      <div className="aspect-[4/5] overflow-hidden mb-6 relative">
        <Image
          fill
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="px-4 pb-6 flex-1 flex flex-col">
        <h4 className="font-space font-bold text-xl text-[#d48c37] mb-4 leading-tight">
          {article.title}
        </h4>
        <p className="text-gray-600 font-light text-sm mb-6 flex-1">
          {article.preview}
        </p>
        {article.date && (
          <div className="text-brand-dark/70 text-sm font-bold flex items-center gap-2 mt-auto">
            <span>📅</span> {article.date}
          </div>
        )}
      </div>
    </article>
  );
}
