import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md disabled:pointer-events-none",
  {
    variants: {
      defaultVariants: {
        variant: "outline",
      },
      variant: {
        outline:
          "bg-transparent border border-border hover:bg-fg/5 hover:text-fg",
        primary: "bg-primary text-primary-fg hover:bg-primary/75",
        fg: "bg-fg text-fg-contrast hover:bg-fg/75",
        muted: "bg-muted border border-border text-muted-fg hover:bg-muted/75",
        ghost: "hover:bg-fg/10",
        border: "bg-border hover:bg-border/75",
        underline: "decoration-2 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "size-9 *:size-4",
      },
    },
    compoundVariants: [
      {
        variant: ["outline", "fg", "ghost", "muted", "primary"],
        className:
          "motion-safe:transition-colors outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-canvas",
      },
      {
        variant: "underline",
        className:
          "outline-none focus-visible:outline-none focus-visible:underline",
      },
    ],
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
export { Button, buttonVariants };
