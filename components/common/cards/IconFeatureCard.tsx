import type { ReactNode } from "react";

export function IconFeatureCard({
  icon,
  label,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <article
      className={`group flex flex-col items-center text-center ${className}`}
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center text-leaf transition-transform duration-500 group-hover:scale-110">
        <span className="h-8 w-8 [&_svg]:h-8 [&_svg]:w-8">{icon}</span>
      </div>
      <h3 className="font-space text-lg leading-tight text-brand-dark">
        {label}
      </h3>
    </article>
  );
}
