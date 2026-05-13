import Image from "next/image";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";

export function ImageTextCard({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  children,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  children?: ReactNode;
}) {
  return (
    <article className="group text-center">
      <div className="relative mb-7 aspect-[3/2] overflow-hidden bg-muted">
        <Image
          fill
          src={image}
          alt={imageAlt}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <p className="absolute inset-x-4 bottom-4 font-script text-3xl leading-none text-white drop-shadow-sm sm:text-4xl">
          {eyebrow}
        </p>
      </div>
      <h3 className="mb-4 font-space text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h3>
      <p className="mx-auto mb-7 max-w-sm text-sm leading-7 text-muted-foreground">
        {description}
      </p>
      <ButtonLink
        className="h-12 min-w-36 border-ink px-8 text-[11px] text-ink hover:border-primary hover:bg-primary hover:text-primary-foreground"
        href={ctaHref}
        size="default"
        variant="outline"
      >
        {ctaLabel}
      </ButtonLink>
      {children}
    </article>
  );
}
