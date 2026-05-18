import { Search, X } from "lucide-react";
import { MenuCategoryNav } from "@/components/menu/MenuCategoryNav";
import type { MenuCategory } from "@/data/types";

type MenuFiltersProps = {
  activeCategoryTitle: string;
  categories: MenuCategory[];
  onCategoryChange: (title: string) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
};

export function MenuFilters({
  activeCategoryTitle,
  categories,
  onCategoryChange,
  onSearchChange,
  searchQuery,
}: MenuFiltersProps) {
  return (
    <div className="mt-8 flex flex-col gap-4 text-left lg:flex-row lg:items-end lg:justify-between">
      <div className="w-full lg:max-w-sm">
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-4 w-4 text-ink/35 transition-colors group-focus-within:text-brand-gold" />
          </div>
          <input
            type="text"
            className="block h-10 w-full border border-border bg-cream pl-10 pr-9 text-sm text-ink placeholder-muted-foreground/45 transition-colors focus:border-brand-gold focus:outline-none"
            placeholder="Search our menu..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-ink/40 transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <MenuCategoryNav
        categories={categories}
        activeTitle={activeCategoryTitle}
        onChange={onCategoryChange}
        onFilterClear={() => onSearchChange("")}
      />
    </div>
  );
}
