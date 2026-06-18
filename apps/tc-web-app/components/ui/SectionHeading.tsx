import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  cursiveText?: string;
  mainText: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  cursiveText,
  mainText,
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center mb-10",
        className,
      )}
    >
      {cursiveText && (
        <span className="font-script text-primary text-3xl md:text-4xl mb-1">
          {cursiveText}
        </span>
      )}
      <h2
        className={cn(
          "font-kaushan text-4xl md:text-5xl leading-tight",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {mainText}
      </h2>
    </div>
  );
}
