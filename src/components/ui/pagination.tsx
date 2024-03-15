import { ChevronLeft, ChevronRight } from "@/components/icons";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import * as React from "react";

export function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li className={cn(className)} {...props} />;
}

export function PaginationLink({
  className,
  size = "icon",
  ...props
}: React.ComponentProps<typeof Link>) {
  return <Link prefetch={true} size={size} {...props} />;
}

export function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      variant="ghost"
      aria-label="Go to previous page"
      className={cn("gap-1", className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      variant="ghost"
      aria-label="Go to next page"
      className={cn("gap-1", className)}
      {...props}
    >
      <ChevronRight className="size-4" />
    </PaginationLink>
  );
}
