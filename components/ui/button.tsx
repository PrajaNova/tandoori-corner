import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-[0.16em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-12 px-7 py-3",
        icon: "h-10 w-10 p-0 tracking-normal",
        lg: "h-14 px-10 py-5",
        sm: "h-9 px-4 py-2 text-[10px]",
      },
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        light:
          "bg-brand-light text-brand-dark hover:bg-primary hover:text-primary-foreground",
        link: "h-auto p-0 text-primary underline-offset-4 hover:underline",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/85",
      },
    },
  },
);

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export function buttonVariantsFor({
  className,
  size = "default",
  variant = "default",
}: {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
} = {}) {
  return cn(buttonVariants({ size, variant }), className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariantsFor({ className, size, variant })}
      data-slot="button"
      type={type}
      {...props}
    />
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

export function ButtonLink({
  className,
  href,
  size,
  variant,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonVariantsFor({ className, size, variant })}
      data-slot="button-link"
      href={href}
      {...props}
    />
  );
}
