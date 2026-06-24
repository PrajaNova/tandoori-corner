import { menuIntro } from "../menu-data";

export function MenuIntro() {
  return (
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
  );
}
