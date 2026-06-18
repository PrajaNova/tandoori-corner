import Link from "next/link";
import { menuCategories, menuIntro } from "./menu-data";

export function MenuClassic() {
  return (
    <div className="bg-white">
      {/* Page title bar */}
      <section className="relative flex items-center justify-center min-h-[420px] pt-24">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/granny/granny_page-title_7.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <div className="font-script text-primary text-3xl md:text-4xl mb-1">
            Discover
          </div>
          <h1 className="font-kaushan text-5xl md:text-6xl text-white capitalize mb-6 leading-tight">
            Our Menu
          </h1>
          <ol className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-white/40">/</li>
            <li>
              <Link
                href="/menu"
                className="hover:text-primary transition-colors"
              >
                menu
              </Link>
            </li>
            <li className="text-white/40">/</li>
            <li className="text-primary">classic</li>
          </ol>
        </div>
      </section>

      {/* Intro heading */}
      <section className="bg-white pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <span className="font-script text-primary text-3xl md:text-4xl mb-1 block">
            {menuIntro.subtitle}
          </span>
          <h2 className="font-kaushan text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            {menuIntro.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {menuIntro.desc}
          </p>
        </div>
      </section>

      {/* Category sections */}
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
    </div>
  );
}
