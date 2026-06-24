import { ButtonLink } from "@/components/ui/button";
import { MenuItem } from "@/components/ui/MenuItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { menuPreviewContent } from "@/content/menuPreview";

export function MenuPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          cursiveText={menuPreviewContent.cursiveText}
          mainText={menuPreviewContent.mainText}
        />

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed">
          {menuPreviewContent.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
          {menuPreviewContent.items.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonLink
            href="/menu"
            size="lg"
            className="bg-ink text-white hover:bg-primary rounded-none px-10 py-6 text-xs tracking-widest uppercase font-bold"
          >
            Discover Full Menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
