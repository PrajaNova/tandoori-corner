import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface HighlightSectionProps {
  cursive: string;
  heading: string;
  description: string;
  price: string;
  ctaHref: string;
  ctaLabel?: string;
  images: { src: string; alt: string }[];
  imagePosition?: "left" | "right";
  className?: string;
}

export function HighlightSection({
  cursive,
  heading,
  description,
  price,
  ctaHref,
  ctaLabel = "Order Now",
  images,
  imagePosition = "right",
  className,
}: HighlightSectionProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className={cn("bg-background", className)}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div
          className={cn(
            "flex flex-col-reverse md:flex-row items-center gap-16",
            isImageLeft && "md:flex-row-reverse",
          )}
        >
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left motion-reveal">
            <SectionHeading
              cursiveText={cursive}
              mainText={heading}
              className="items-center md:items-start text-center md:text-left mb-6"
            />
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-8">
              <span className="h-px w-12 bg-primary/40 block" />
              <span className="text-primary text-sm">✦ ✦</span>
              <span className="h-px w-12 bg-primary/40 block" />
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {description}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-8">
              <span className="font-script text-primary text-3xl">{price}</span>
              <ButtonLink
                href={ctaHref}
                size="lg"
                className="bg-ink text-white hover:bg-primary rounded-none px-8 py-6 text-xs tracking-widest uppercase font-bold"
              >
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>

          {/* Grid of Images */}
          <div className="flex-1 w-full max-w-xs md:max-w-none mx-auto grid grid-cols-2 gap-4 motion-reveal motion-reveal-late">
            {images.map((img, idx) => (
              <div
                key={img.src}
                className={cn(
                  "relative aspect-[3/4] w-full",
                  idx === 1 && "mt-6 md:mt-12",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="h-full w-full object-cover motion-image-hover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
