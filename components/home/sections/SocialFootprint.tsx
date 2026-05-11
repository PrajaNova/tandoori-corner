import { ArrowRight, Instagram } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

import { socialImages } from "../home-content";

export function SocialFootprint() {
  return (
    <section className="bg-cream py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-center md:text-left">
            <Badge
              className="mb-4 border-brand-gold/30 text-brand-gold"
              variant="outline"
            >
              <Instagram className="w-4 h-4" />
              @tandooricorner
            </Badge>
            <h2 className="font-space text-4xl font-bold text-ink mb-4">
              Join Our Community
            </h2>
            <p className="text-ink/60 font-light max-w-lg">
              Tag us in your moments and experience the sizzle beyond the
              screen. Follow us for behind-the-scenes, specials, and the love of
              Indian cuisine.
            </p>
          </div>
          <ButtonLink href="#top" className="group shrink-0" variant="light">
            Follow Us{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </ButtonLink>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {socialImages.map((img) => (
            <a
              key={img}
              href="#top"
              className="relative aspect-square overflow-hidden group block"
            >
              <Image
                fill
                src={img}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-cream/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-ink scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
