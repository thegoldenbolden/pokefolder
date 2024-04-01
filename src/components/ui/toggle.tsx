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
    rounded-sm border border-border p-2 hover:bg-fg hover:text-canvas
    data-[state='on']:bg-fg data-[state='on']:text-canvas data-[state='on']:hover:bg-fg/90`,
      className,
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
