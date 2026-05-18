import { ChefHat, Flame, Leaf, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import { MenuItemCard } from "@/components/common/cards/MenuItemCard";
import type { IconKey, MenuCategory, MenuItem } from "@/data/types";

type MenuCategoryGridProps = {
  activeCategory: MenuCategory;
  itemQtyByName: Record<string, number>;
  onOpenItem: (item: MenuItem) => void;
  onAddToCart: (name: string, price: string) => void;
  onIncrementItem: (name: string) => void;
  onDecrementItem: (name: string) => void;
};

const iconMap: Record<IconKey, ComponentType> = {
  chefHat: ChefHat,
  flame: Flame,
  leaf: Leaf,
  sparkles: Sparkles,
  pawPrint: ChefHat,
  squareParking: ChefHat,
  shoppingBag: Sparkles,
  bike: Flame,
  utensils: Flame,
  calendarDays: Flame,
  glassWater: Flame,
  utensilsFill: Flame,
};

export function MenuItemList({
  activeCategory,
  itemQtyByName,
  onOpenItem,
  onAddToCart,
  onIncrementItem,
  onDecrementItem,
}: MenuCategoryGridProps) {
  const categoryIcon = iconMap[activeCategory.icon] ?? Flame;
  const Icon = categoryIcon;

  return (
    <div>
      <div className="mb-5 flex items-center gap-3 border-b border-border pb-4 sm:mb-6">
        <div className="[&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-6 sm:[&_svg]:w-6">
          <Icon />
        </div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-left">
          <h2 className="font-space text-2xl text-ink sm:text-3xl">
            {activeCategory.title}
          </h2>
          <p className="text-[10px] font-medium uppercase tracking-widest text-brand-gold/80 sm:text-xs">
            {activeCategory.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activeCategory.items.map((item) => (
          <MenuItemCard
            key={item.name}
            item={item}
            onOpen={() => onOpenItem(item)}
            controls={{
              quantity: itemQtyByName[item.name] ?? 0,
              onAdd: () => onAddToCart(item.name, item.price),
              onIncrement: () => onIncrementItem(item.name),
              onDecrement: () => onDecrementItem(item.name),
            }}
          />
        ))}
      </div>
    </div>
  );
}
