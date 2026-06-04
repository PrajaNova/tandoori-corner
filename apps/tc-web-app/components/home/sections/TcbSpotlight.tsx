import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export function TcbSpotlight() {
  return (
    <section
      id="tcb"
      className="py-14 sm:py-20 md:py-32 bg-cream relative overflow-hidden border-y border-border"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center relative z-10">
        <div className="space-y-5 sm:space-y-8 order-2 lg:order-1">
          <Badge className="relative w-max border-border" variant="outline">
            <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
            The Secret Room
          </Badge>
          <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            An Intimate Nightlife <br />
            Destination.
          </h2>
          <p className="text-sm sm:text-lg text-ink/60 leading-relaxed font-light">
            Step away from the bustling Balestier pavement and into the TCB Bar.
            Designed for romantic dinners, after-work craft cocktails, and
            high-style corporate gatherings.
          </p>
          <p className="text-sm sm:text-lg text-ink/60 leading-relaxed font-light">
            Featuring our curated <strong>Beer Fest specials</strong> daily,
            paired with exclusive a la carte bites unavailable in our standard
            alfresco dining.
          </p>
          <div className="pt-6 border-t border-border">
            <ButtonLink href="/private-events" className="group" variant="link">
              Inquire for Private Events{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </ButtonLink>
          </div>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="relative h-64 sm:h-[420px] md:h-[600px] w-full rounded-tr-[56px] rounded-bl-[56px] sm:rounded-tr-[80px] sm:rounded-bl-[80px] md:rounded-tr-[100px] md:rounded-bl-[100px] overflow-hidden">
            <div className="absolute inset-0 bg-brand-gold mix-blend-color opacity-20 z-10" />
            <Image
              fill
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
              alt="TCB Bar Interior"
              className="w-full h-full object-cover object-center transition-all duration-1000"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
