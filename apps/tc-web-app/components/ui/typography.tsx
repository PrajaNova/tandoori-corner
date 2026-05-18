import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "text-[10px] font-bold uppercase tracking-widest",
        className,
      )}
    >
      {children}
    </span>
  );
}
