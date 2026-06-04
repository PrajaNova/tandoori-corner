import type { MenuCategory } from "@/data/types";

// Sentinel value meaning "no category filter — show the whole menu".
export const ALL_CATEGORIES_VALUE = "all";

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
  const options = [
    { key: ALL_CATEGORIES_VALUE, label: "All" },
    ...categories.map((category) => ({
      key: category.title,
      label: category.title.replace("The ", "").replace(" Corner", ""),
    })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-end">
      {options.map((option) => {
        const isActive = option.key === activeTitle;

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => {
              onChange(option.key);
              onFilterClear();
            }}
            className={`border-b-2 px-0.5 pb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors sm:text-xs ${isActive ? "border-brand-gold text-brand-gold" : "border-transparent text-ink/70 hover:text-brand-gold"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
