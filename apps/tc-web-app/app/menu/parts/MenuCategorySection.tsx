import { menuCategories } from "../menu-data";

export function MenuCategorySection() {
  return (
    <>
      {menuCategories.map((category) => (
        <div key={category.title}>
          {/* Divider bar */}
          <section className="relative flex items-center justify-center min-h-[260px]">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('${category.bg}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            />
            <div className="absolute inset-0 z-0 bg-black/70" />
            <div className="relative z-10 text-center px-4">
              <span className="font-script text-primary text-3xl mb-1 block">
                {category.subtitle}
              </span>
              <h2 className="font-kaushan text-4xl md:text-5xl text-white leading-tight">
                {category.title}
              </h2>
            </div>
          </section>

          {/* Dish grid */}
          <section className="bg-white py-20">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-10">
                {category.items.map((dish, idx) => (
                  <div key={`${dish.name}-${idx}`}>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-raleway font-bold text-base text-foreground whitespace-nowrap">
                        {dish.name}
                      </h3>
                      <span className="flex-1 border-b border-dotted border-border translate-y-[-3px]" />
                      <span className="font-raleway font-bold text-primary whitespace-nowrap">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      {dish.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      ))}
    </>
  );
}
