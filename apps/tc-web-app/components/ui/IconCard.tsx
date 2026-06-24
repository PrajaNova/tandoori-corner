import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface IconCardProps {
  icon: ElementType;
  title: string;
  description: string;
  className?: string;
  dark?: boolean;
}

export function IconCard({
  icon: Icon,
  title,
  description,
  className,
  dark = false,
}: IconCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center transition-all duration-300",
        dark
          ? "bg-white/90 backdrop-blur-md border border-white/20 p-8 hover:bg-white/95 shadow-xl"
          : "p-4",
        className,
      )}
    >
      <div
        className={cn(
          "mb-6 w-16 h-16 rounded-full flex items-center justify-center bg-primary/10",
        )}
      >
        <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="font-raleway text-base font-bold uppercase tracking-wide mb-3 text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed px-2 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
