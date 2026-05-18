import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type FormFieldProps = {
  htmlFor?: string;
  label: string;
  required?: boolean;
  className?: string;
  fieldClassName?: string;
  prefix?: ReactNode;
  children: ReactNode;
};

export function FormField({
  htmlFor,
  label,
  required,
  className,
  fieldClassName,
  prefix,
  children,
}: FormFieldProps) {
  return (
    <label
      className={cn(
        "block text-[10px] uppercase tracking-widest text-ink/50 mb-2 font-bold",
        className,
      )}
      htmlFor={htmlFor}
    >
      {label} {required ? "*" : null}
      <div className={cn("relative mt-2", fieldClassName)}>
        {prefix ? <div className="text-ink/50">{prefix}</div> : null}
        {children}
      </div>
    </label>
  );
}
