import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  desktop?: boolean;
  className?: string;
}

export function BrandLogo({ desktop = false, className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Tandoori Corner — home"
      className={`flex items-center ${className}`}
    >
      <Image
        src="/homepage/tc-logo.png"
        alt="Tandoori Corner — North Indian Curry House"
        width={600}
        height={183}
        priority
        className={
          desktop
            ? "h-12 w-auto rounded bg-white px-3 py-1.5 shadow-md"
            : "h-10 w-auto rounded bg-white px-2 py-1 shadow-md"
        }
      />
    </Link>
  );
}
