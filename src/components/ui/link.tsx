import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { type AnchorHTMLAttributes, forwardRef } from 'react';
import { cn, type VariantProps } from '@/lib/utils';
import { buttonVariants } from './button';

export interface LinkProps
  extends NextLinkProps,
    VariantProps<typeof buttonVariants> {}

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ variant = 'link', className, size, ...props }, ref) => {
  if (!props.href.startsWith('/')) {
    return (
      <a
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }

  return (
    <NextLink
      ref={ref}
      prefetch={false}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Link.displayName = 'Link';

export { Link };
