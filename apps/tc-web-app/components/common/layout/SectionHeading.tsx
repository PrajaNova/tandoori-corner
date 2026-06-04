import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  monogram = "TC",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  monogram?: string;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto mb-12 max-w-3xl text-center sm:mb-16 ${className}`}
    >
      {eyebrow ? (
        <p className="mb-2 font-script text-3xl text-brand-gold sm:text-4xl">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mb-4 font-space text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className="mb-6 flex items-center justify-center gap-2 text-brand-gold"
      >
        <span className="h-px w-7 bg-current" />
        <span className="font-script text-3xl leading-none">{monogram}</span>
        <span className="h-px w-7 bg-current" />
      </div>
      {description ? (
        <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
