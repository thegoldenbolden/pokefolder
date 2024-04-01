import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariants } from "./button";

export function Anchor({
  className,
  variant = "underline",
  size,
  ...props
}: React.ComponentProps<"a"> & ButtonVariants) {
  return (
    <a
      rel="noreferrer noopener"
      target="_blank"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
