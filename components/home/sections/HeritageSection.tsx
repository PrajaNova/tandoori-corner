import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export function HeritageSection() {
  return (
    <section
      id="heritage"
      className="py-32 bg-brand-light text-brand-dark relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1 relative z-10">
            <Badge
              className="mb-8 border-brand-dark/20 text-brand-dark"
              variant="outline"
            >
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
              Since 2008
            </Badge>

            <h2 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] text-brand-dark">
              The Authentic <br />{" "}
              <span className="text-brand-gold italic">North Indian</span>{" "}
              <br /> Curry House.
            </h2>

            <div className="space-y-6 text-brand-dark/70 font-light text-lg leading-relaxed">
              <p>
                Established at the iconic Balestier Plaza, Tandoori Corner has
                spent over a decade perfecting the art of North Indian
                hospitality in Singapore.
              </p>
              <p>
                We believe in uncompromising authenticity. From hand-blended
                spices to slow-cooked gravies and meats fired in our traditional
                clay ovens, every dish reflects the true essence of India's
                robust culinary heritage.
              </p>
              <p>
                Whether you're enjoying our pet-friendly alfresco dining or
                relaxing inside the TCB Bar, you are experiencing renowned
                recipes that have stood the test of time.
              </p>
            </div>

            <div className="mt-12">
              <ButtonLink href="/story" variant="link">
                Discover Our Story
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6 relative order-1 lg:order-2 h-[500px] md:h-[600px] w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/10 rounded-full blur-3xl -z-10" />

            <div className="absolute top-0 right-0 w-4/5 h-[75%] overflow-hidden rounded-bl-[80px] shadow-2xl">
              <Image
                fill
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
                alt="Restaurant Interior"
                className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-[65%] h-[60%] border-[12px] border-brand-light overflow-hidden shadow-2xl">
              <Image
                fill
                src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80"
                alt="Authentic Spices"
                className="w-full h-full object-cover transition-all duration-1000"
                sizes="(max-width: 1024px) 65vw, 32vw"
              />
            </div>

            <div className="absolute top-8 left-0 w-28 h-28 md:w-32 md:h-32 bg-cream text-brand-gold rounded-full flex flex-col items-center justify-center p-4 text-center transform -rotate-12 shadow-xl border border-brand-gold/30 hover:rotate-0 transition-transform duration-500">
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold leading-none mb-1">
                Authentic
              </span>
              <span className="font-space text-lg md:text-xl font-bold leading-none mb-1">
                100%
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold leading-none">
                Spices
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
