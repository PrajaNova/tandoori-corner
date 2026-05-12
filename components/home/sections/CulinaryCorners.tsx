import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";

import { culinaryCorners } from "../home-content";

export function CulinaryCorners() {
  return (
    <section
      id="culinary-corners"
      className="bg-background py-16 sm:py-24 md:py-32 border-b border-border bg-cream"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="mb-2 font-script text-3xl text-brand-gold sm:text-4xl">
            Hello dear
          </p>
          <h2 className="mb-4 font-space text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Our Culinary Corners
          </h2>
          <div
            aria-hidden="true"
            className="mb-6 flex items-center justify-center gap-2 text-brand-gold"
          >
            <span className="h-px w-7 bg-current" />
            <span className="font-script text-3xl leading-none">TC</span>
            <span className="h-px w-7 bg-current" />
          </div>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            From the sizzling heat of the Tandoor to the rich depths of our
            signature Curries. Real food, tailored for alfresco evenings and
            stylish nights out.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {culinaryCorners.map((item) => (
            <article key={item.title} className="group text-center">
              <div className="relative mb-7 aspect-[3/2] overflow-hidden bg-muted">
                <Image
                  fill
                  src={item.img}
                  alt={item.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <p className="absolute inset-x-4 bottom-4 font-script text-3xl leading-none text-white drop-shadow-sm sm:text-4xl">
                  {item.tag}
                </p>
              </div>
              <h3 className="mb-4 font-space text-3xl leading-tight text-ink sm:text-4xl">
                {item.title}
              </h3>
              <p className="mx-auto mb-7 max-w-sm text-sm leading-7 text-muted-foreground">
                {item.desc}
              </p>
              <ButtonLink
                className="h-12 min-w-36 border-ink px-8 text-[11px] text-ink hover:border-primary hover:bg-primary hover:text-primary-foreground"
                href="/menu"
                size="default"
                variant="outline"
              >
                Read more
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
