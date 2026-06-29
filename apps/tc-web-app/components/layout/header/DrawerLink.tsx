"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface DrawerLinkProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export function DrawerLink({
  href,
  className = "",
  onClick,
  children,
}: DrawerLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block border-b border-white/5 px-4 py-4 font-raleway text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        isActive ? "text-primary" : "text-white"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
