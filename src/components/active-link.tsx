"use client";
import { Link } from "@/components/ui/link";
import { cx } from "class-variance-authority";
import { usePathname } from "next/navigation";

export type ActiveLinkProps = React.ComponentProps<typeof Link> & {
  classes: {
    default: string;
    active?: string;
    inactive?: string;
  };
};

export function ActiveLink({ classes, ...props }: ActiveLinkProps) {
  const pathname = usePathname() || "/";
  const isActive = pathname === props.href;

  return (
    <Link
      {...props}
      data-active={isActive}
      variant={null}
      className={cx(
        classes.default,
        isActive ? classes.active : classes.inactive,
      )}
    />
  );
}
