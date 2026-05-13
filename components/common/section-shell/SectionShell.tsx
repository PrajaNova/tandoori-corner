import type { ReactNode } from "react";

export function SectionShell({
  children,
  id,
  className = "",
  containerClassName = "container mx-auto px-5 sm:px-6 lg:px-12",
  innerClassName = "",
  withContainer = true,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  innerClassName?: string;
  withContainer?: boolean;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {withContainer ? (
        <div className={containerClassName}>
          <div className={innerClassName}>{children}</div>
        </div>
      ) : (
        <div className={innerClassName}>{children}</div>
      )}
    </section>
  );
}
