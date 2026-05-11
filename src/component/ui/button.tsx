import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-card text-sm font-bold uppercase tracking-[0.08em] transition disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand text-white shadow-lifted hover:bg-brand-hover hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-madison",
        secondary:
          "bg-leaf text-white shadow-lifted hover:bg-leaf-light hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-madison",
        gold: "bg-curry text-madison shadow-lifted hover:bg-gold hover:text-madison focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-madison",
        outline:
          "border border-white/25 bg-transparent text-white hover:border-curry hover:text-curry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-curry focus-visible:ring-offset-2 focus-visible:ring-offset-madison",
        heroOutline:
          "border border-white bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-madison focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-curry focus-visible:ring-offset-2 focus-visible:ring-offset-madison",
        ghost:
          "bg-transparent text-white hover:bg-white/10 hover:text-curry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-curry focus-visible:ring-offset-2 focus-visible:ring-offset-madison",
      },
      size: {
        default: "h-12 px-6",
        icon: "size-11",
        xl: "min-h-24 px-4 py-5 text-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
