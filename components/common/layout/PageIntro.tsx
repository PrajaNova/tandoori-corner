import type { ReactNode } from "react";

type Alignment = "left" | "center";

export function PageIntro({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  descriptionClassName = "",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: Alignment;
  className?: string;
  descriptionClassName?: string;
  children?: ReactNode;
}) {
  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`mb-14 sm:mb-16 ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="text-brand-gold font-sans tracking-[0.3em] uppercase text-xs mb-4 block font-bold">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="font-space text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p
          className={`mx-auto max-w-2xl text-sm sm:text-base text-ink/60 font-light leading-7 ${align === "center" ? "mx-auto" : ""} ${descriptionClassName}`}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
