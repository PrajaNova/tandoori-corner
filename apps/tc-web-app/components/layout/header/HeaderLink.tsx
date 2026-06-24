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
      className={`font-raleway text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary whitespace-nowrap ${
        isActive ? "text-primary" : "text-white"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
