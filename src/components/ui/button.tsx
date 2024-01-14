import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn, cva, type VariantProps } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        border:
          'bg-transparent border border-border hover:bg-foreground/5 hover:text-foreground',
        foreground: 'bg-foreground text-background hover:bg-foreground/75',
        ghost: 'hover:bg-foreground/10',
        link: 'text-muted-foreground hover:text-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-sm px-3 text-xs',
        lg: 'h-10 rounded-sm px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'border',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
export { Button, buttonVariants };
