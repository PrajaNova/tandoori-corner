import type { ReactNode } from "react";

export function BackLink({
  href,
  children,
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 text-ink/50 hover:text-brand-gold text-xs uppercase tracking-widest font-bold transition-colors ${className}`}
    >
      {icon}
      {children}
    </a>
  );
}
