import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
  imageAspectRatio?: string;
  className?: string;
}

export function FeatureCard({
  image,
  title,
  subtitle,
  description,
  linkHref,
  linkLabel = "Read More",
  imageAspectRatio = "aspect-[4/3]",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn("flex flex-col items-center text-center h-full", className)}
    >
      <div
        className={cn(
          "w-full relative mb-7 overflow-hidden shrink-0",
          imageAspectRatio,
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover motion-image-hover"
        />
      </div>
      {subtitle && (
        <span className="font-script text-primary text-2xl mb-1">
          {subtitle}
        </span>
      )}
      <h3 className="font-raleway text-lg font-bold uppercase tracking-wide mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground px-4 mb-6 text-sm leading-relaxed">
        {description}
      </p>
      {linkHref && (
        <Link
          href={linkHref}
          className="font-raleway text-xs font-bold tracking-widest uppercase text-foreground hover:text-primary transition-colors mt-auto"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
