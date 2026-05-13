import {
  CalendarDays,
  GlassWater,
  ShoppingBag,
  SquareParking,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import type { ExperienceCardItem } from "@/data/experience";
import type { IconKey } from "@/data/types";

type ExperienceChoiceCardProps = {
  card: ExperienceCardItem;
  index: number;
  onAction: (card: ExperienceCardItem) => void;
};

const iconMap: Record<IconKey, typeof ShoppingBag> = {
  chefHat: ShoppingBag,
  flame: ShoppingBag,
  leaf: ShoppingBag,
  sparkles: ShoppingBag,
  pawPrint: Utensils,
  shoppingBag: ShoppingBag,
  squareParking: SquareParking,
  bike: ShoppingBag,
  utensils: Utensils,
  calendarDays: CalendarDays,
  glassWater: GlassWater,
  utensilsFill: Utensils,
};

export function ExperienceChoiceCard({
  card,
  index,
  onAction,
}: ExperienceChoiceCardProps) {
  const CardIcon = iconMap[card.icon] ?? Utensils;

  return (
    <div
      key={card.id}
      onClick={() => onAction(card)}
      className={`group border border-border bg-cream hover:border-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer flex flex-col relative overflow-hidden min-h-[420px] ${index === 1 ? "border-brand-gold/30 bg-cream" : ""}`}
    >
      <div className="absolute inset-0">
        <Image
          fill
          src={card.image}
          alt={card.title}
          className="object-cover opacity-30 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent"></div>
      <div className="relative z-10 p-10 flex flex-col h-full">
        <div className="w-16 h-16 bg-brand-gold/10 backdrop-blur-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
          <CardIcon className="w-8 h-8 text-brand-gold" />
        </div>
        <h3 className="font-space text-3xl font-bold mb-4 text-ink group-hover:text-primary-foreground transition-colors">
          {card.title}
        </h3>
        <p className="text-ink/60 mb-8 font-light leading-relaxed flex-1 transition-colors group-hover:text-primary-foreground/80">
          {card.description}
        </p>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-ink border-b border-border pb-1 w-max group-hover:border-primary-foreground group-hover:text-primary-foreground mt-auto transition-colors">
          {card.actionText}
        </div>
      </div>
    </div>
  );
}
