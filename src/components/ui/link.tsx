import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, forwardRef } from 'react';

const linkVariants = cva('text-foreground/75 transition-colors', {
  variants: {
    variant: {
      default: '',
      underline: 'hover:underline underline-offset-1 focus-visible:underline',
      primary: 'text-primary/75 transition-colors',
    },
    button: {
      default: '',
      foreground:
        'border border-border bg-transparent text-foreground hover:bg-foreground hover:text-background',
    },
    highlight: {
      none: '',
      default: 'hover:text-foreground focus-visible:text-foreground',
      primary: 'hover:text-primary focus-visible:text-primary',
    },
    size: {
      normal: 'font-normal',
      bold: 'font-bold',
    },
    focus: {
      none: 'outline-none',
      ring: 'outline-none focus-visible:ring-2 focus-visible:ring-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'normal',
    focus: 'ring',
    button: 'default',
    highlight: 'default',
  },
});

export interface LinkProps
  extends NextLinkProps,
    VariantProps<typeof linkVariants> {}

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ variant, className, button, highlight, size, focus, ...props }, ref) => {
  if (!props.href.startsWith('/')) {
    return (
      <a
        ref={ref}
        className={cn(
          linkVariants({ highlight, variant, button, size, focus, className }),
        )}
        {...props}
      />
    );
  }

  return (
    <NextLink
      ref={ref}
      prefetch={false}
      className={cn(
        linkVariants({ highlight, variant, button, size, focus, className }),
      )}
      {...props}
    />
  );
});

Link.displayName = 'Link';

export { Link };
