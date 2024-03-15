import { cn } from "@/lib/utils";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { ButtonVariants, buttonVariants } from "./button";

export interface LinkProps extends NextLinkProps, ButtonVariants {}

const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ variant = "underline", className, size, ...props }, ref) => {
  if (!props.href.startsWith("/")) {
    throw new Error("<Link /> href must start with '/'");
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

Link.displayName = "Link";

export { Link };
