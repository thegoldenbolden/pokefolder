import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const inputVariants = cva(
  'flex w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/75 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-background',
        outline: 'bg-transparent border-border border-2 border-solid',
      },
      variantSize: {
        default: 'h-9 px-3 py-1',
        sm: 'py-1.5 px-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      variantSize: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, variantSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, variantSize, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
