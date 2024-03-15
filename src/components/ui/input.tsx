import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-9 w-full rounded-lg border border-border bg-background px-4 py-4 text-sm file:border-0 file:bg-transparent file:text-sm placeholder:text-foreground/75 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
