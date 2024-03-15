"use client";

import { cn } from "@/lib/utils";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { forwardRef } from "react";

const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      `
    rounded-sm border border-border p-2 hover:bg-foreground hover:text-background
    data-[state='on']:bg-foreground data-[state='on']:text-background data-[state='on']:hover:bg-foreground/90`,
      className,
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
