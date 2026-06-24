"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface DrawerLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function DrawerLink({ href, className = "", children }: DrawerLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <a
      href={href}
      className={`border-b border-white/5 px-4 py-4 font-raleway text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary block ${
        isActive ? "text-primary" : "text-white"
      } ${className}`}
    >
      {children}
    </a>
  );
}
