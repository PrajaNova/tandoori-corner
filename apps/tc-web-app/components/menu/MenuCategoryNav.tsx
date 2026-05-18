import type { MenuCategory } from "@/data/types";

type MenuCategoryNavProps = {
  categories: MenuCategory[];
  activeTitle: string;
  onChange: (title: string) => void;
  onFilterClear: () => void;
};

export function MenuCategoryNav({
  categories,
  activeTitle,
  onChange,
  onFilterClear,
}: MenuCategoryNavProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-end">
      {categories.map((category) => {
        const isActive = category.title === activeTitle;

        return (
          <button
            key={category.title}
            type="button"
            onClick={() => {
              onChange(category.title);
              onFilterClear();
            }}
            className={`border-b-2 px-0.5 pb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors sm:text-xs ${isActive ? "border-brand-gold text-brand-gold" : "border-transparent text-ink/70 hover:text-brand-gold"}`}
          >
            {category.title.replace("The ", "").replace(" Corner", "")}
          </button>
        );
      })}
    </div>
  );
}
