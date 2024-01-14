'use client';

import { forwardRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cn } from '@/lib/utils';

const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      `
    border border-border hover:bg-foreground hover:text-background rounded-sm p-2
    data-[state='on']:bg-foreground data-[state='on']:text-background data-[state='on']:hover:bg-foreground/90`,
      className,
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
