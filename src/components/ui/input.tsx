import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export function Input({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"input">) {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-border bg-input px-4 py-4 file:border-0 file:bg-transparent file:text-sm placeholder:text-fg/75 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
