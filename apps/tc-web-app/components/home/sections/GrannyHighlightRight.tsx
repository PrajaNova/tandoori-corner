import React from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

export function GrannyHighlightRight() {
  return (
    <section className="pt-24 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <span className="font-script text-primary text-3xl mb-1 block">
              From the clay oven
            </span>
            <h2 className="font-kaushan text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              Tandoori Chicken
            </h2>
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-8">
              <span className="h-px w-12 bg-primary/40 block" />
              <span className="text-primary text-sm">✦ ✦</span>
              <span className="h-px w-12 bg-primary/40 block" />
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Whole chicken marinated for 24 hours in yoghurt, fresh ginger,
              garlic and our signature spice blend, then fired at high heat in
              our traditional clay tandoor. Gloriously smoky, juicy and deeply
              flavoured — a dish that has defined Tandoori Corner since day one.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-8">
              <span className="font-script text-primary text-3xl">
                S$22.00 per portion
              </span>
              <ButtonLink
                href="/checkout"
                size="lg"
                className="bg-ink text-white hover:bg-primary rounded-none px-8 py-6 text-xs tracking-widest uppercase font-bold"
              >
                Order Now
              </ButtonLink>
            </div>
          </div>

          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/granny/granny_banners_6.jpg"
                alt="Tandoori Chicken"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] w-full mt-12">
              <Image
                src="/granny/granny_banners_7.jpg"
                alt="Tandoori Chicken from the clay oven"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
