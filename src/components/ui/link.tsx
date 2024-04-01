import { buttonVariants, type ButtonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";

export interface LinkProps extends NextLinkProps, ButtonVariants {}

export function Link({
  variant = "underline",
  className,
  size,
  ...props
}: LinkProps & React.ComponentProps<"a">) {
  if (!props.href.startsWith("/")) {
    throw new Error("<Link /> href must start with '/'");
  }

  return (
    <NextLink
      prefetch={false}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
