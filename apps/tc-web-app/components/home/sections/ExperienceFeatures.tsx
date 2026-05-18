import {
  Bike,
  ChefHat,
  type LucideProps,
  PawPrint,
  ShoppingBag,
  SquareParking,
  Utensils,
} from "lucide-react";
import type { ComponentType } from "react";
import { IconFeatureCard } from "@/components/common/cards/IconFeatureCard";
import { SectionShell } from "@/components/common/section-shell/SectionShell";
import { experienceFeatureItems } from "@/data/home";
import type { IconKey } from "@/data/types";

type FeatureIcon = ComponentType<LucideProps>;

const iconMap: Record<IconKey, FeatureIcon> = {
  chefHat: ChefHat,
  flame: ChefHat,
  leaf: ChefHat,
  sparkles: ChefHat,
  pawPrint: PawPrint,
  shoppingBag: ShoppingBag,
  bike: Bike,
  utensils: Utensils,
  squareParking: SquareParking,
  calendarDays: ChefHat,
  glassWater: ChefHat,
  utensilsFill: Utensils,
};

export function ExperienceFeatures() {
  return (
    <SectionShell
      className="relative z-20 border-b border-border bg-cream"
      innerClassName="py-8"
    >
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {experienceFeatureItems.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <IconFeatureCard
              key={item.label}
              icon={<Icon className="h-8 w-8" />}
              label={item.label}
            />
          );
        })}
      </div>
    </SectionShell>
  );
}
