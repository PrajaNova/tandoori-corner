import { Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MenuItem } from "@/data/types";

type QuantityControlsProps = {
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

type MenuItemCardBase = {
  item: MenuItem;
  onOpen: () => void;
  controls?: QuantityControlsProps;
};

type MenuItemCardProps = MenuItemCardBase &
  Omit<ComponentPropsWithoutRef<"article">, "children"> & {
    controlsRenderer?: (item: MenuItem) => ReactNode;
  };

export function MenuItemCard({
  item,
  onOpen,
  controls,
  controlsRenderer,
  className,
  ...articleProps
}: MenuItemCardProps) {
  const content = controlsRenderer?.(item) ?? (
    <DefaultMenuControls
      quantity={controls?.quantity ?? 0}
      itemName={item.name}
      onAdd={controls?.onAdd}
      onIncrement={controls?.onIncrement}
      onDecrement={controls?.onDecrement}
    />
  );

  return (
    <article
      onClick={onOpen}
      className={`group flex min-h-32 cursor-pointer overflow-hidden border border-border bg-card transition-colors hover:border-primary ${className ?? ""}`}
      {...articleProps}
    >
      {item.img && (
        <div className="relative w-28 shrink-0 overflow-hidden sm:w-32">
          <Image
            fill
            src={item.img}
            alt={item.name}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 112px, 128px"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col p-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-snug text-ink sm:text-base">
            {item.name}
          </h3>
          <span className="shrink-0 text-xs font-bold text-brand-gold">
            {item.price}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-ink/55">
          {(item.ingredients?.slice(0, 5) ?? item.tags).join(", ")}
        </p>

        <div className="relative z-10 mt-auto flex items-center justify-end pt-3">
          {content}
        </div>
      </div>
    </article>
  );
}

function DefaultMenuControls({
  quantity,
  itemName,
  onAdd,
  onDecrement,
  onIncrement,
}: {
  quantity: number;
  itemName: string;
  onAdd?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}) {
  if (quantity > 0) {
    return (
      <div className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-2 py-1">
        <button
          type="button"
          aria-label="Remove one item"
          onClick={(e) => {
            e.stopPropagation();
            onDecrement?.();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-card hover:text-brand-gold"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center text-sm font-bold text-ink">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Add one item"
          onClick={(e) => {
            e.stopPropagation();
            onIncrement?.();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-card hover:text-brand-gold"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  if (!onAdd) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={`Add ${itemName}`}
      className="h-9 w-9 shrink-0 rounded-full bg-brand-gold text-brand-dark transition-colors hover:bg-ink hover:text-cream"
      onClick={(e) => {
        e.stopPropagation();
        onAdd();
      }}
    >
      <ShoppingBag className="h-4 w-4" />
    </button>
  );
}
