import type { ElementType } from "react";
import { cn } from "@/lib/utils";

interface IconCardProps {
  icon: ElementType;
  title: string;
  description: string;
  className?: string;
}

export function IconCard({
  icon: Icon,
  title,
  description,
  className,
}: IconCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="mb-6 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="font-raleway text-base font-bold uppercase tracking-wide mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed px-2">
        {description}
      </p>
    </div>
  );
}
