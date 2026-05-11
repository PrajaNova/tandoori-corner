import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { culinaryCorners } from "../home-content";

export function CulinaryCorners() {
  return (
    <section
      id="culinary-corners"
      className="py-14 sm:py-20 md:py-32 bg-brand-surface relative overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10 text-center mb-8 sm:mb-12 md:mb-16">
        <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Our Culinary Corners
        </h2>
        <p className="text-ink/60 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
          From the sizzling heat of the Tandoor to the rich depths of our
          signature Curries. Real food, tailored for alfresco evenings and
          stylish nights out.
        </p>
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 relative z-10">
        {culinaryCorners.map((item) => (
          <Card
            key={item.title}
            className="group overflow-hidden border-border bg-card p-4 shadow-none transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground sm:p-6 md:p-8"
          >
            <div className="mb-4 sm:mb-6 md:mb-8 overflow-hidden relative h-28 sm:h-40 md:h-48 border border-border transition-colors group-hover:border-primary-foreground/30">
              <Image
                fill
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-0">
              <Badge
                className="mb-2 transition-colors group-hover:border-primary-foreground/40 group-hover:text-primary-foreground sm:mb-3"
                variant="outline"
              >
                {item.tag}
              </Badge>
              <h3 className="font-space text-xl sm:text-2xl mb-2 sm:mb-4">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/80 sm:text-sm line-clamp-2 sm:line-clamp-none">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8 sm:mt-12">
        <ButtonLink
          href="/menu"
          className="group text-sm"
          size="lg"
          variant="outline"
        >
          View Full Digital Menu
          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
        </ButtonLink>
      </div>
    </section>
  );
}
