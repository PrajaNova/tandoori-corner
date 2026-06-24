import type { MenuCategory, MenuItem } from "@/data/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

type MenuCategoryGridProps = {
  activeCategory: MenuCategory;
  itemQtyByName: Record<string, number>;
  onOpenItem: (item: MenuItem) => void;
  onAddToCart: (name: string, price: string) => void;
  onIncrementItem: (name: string) => void;
  onDecrementItem: (name: string) => void;
  index: number;
};

const defaultImages = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80"
];

export function MenuItemList({
  activeCategory,
  itemQtyByName,
  onOpenItem,
  index,
}: MenuCategoryGridProps) {
  const bgImage = defaultImages[index % defaultImages.length];

  return (
    <div className="w-full">
      {/* Category Header Parallax */}
      <div className="relative py-32 flex items-center justify-center min-h-[400px]">
        <div
          className="absolute inset-0 z-0 opacity-80 mix-blend-overlay bg-ink"
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        />
        <div className="absolute inset-0 bg-ink/60 z-0" />
        
        <div className="container relative z-10 px-4 text-center">
          <SectionHeading 
            cursiveText="Starts at 11:00 am" // Can be customized per category if we want
            mainText={`${activeCategory.title} Menu`}
            dark
          />
        </div>
      </div>

      {/* Category Items */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {activeCategory.items.map((item) => (
              <div 
                key={item.name} 
                className="flex flex-col cursor-pointer group hover:opacity-80 transition-opacity"
                onClick={() => onOpenItem(item)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-bold text-lg text-ink group-hover:text-primary transition-colors">{item.name}</h4>
                  <div className="flex-1 mx-4 border-b border-dotted border-border/60" />
                  <span className="text-primary font-script text-xl">{item.price}</span>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
