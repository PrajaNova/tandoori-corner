"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface HeaderLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function HeaderLink({
  href,
  className = "",
  children,
}: HeaderLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`whitespace-nowrap font-raleway text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        isActive ? "text-primary" : "text-white"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
