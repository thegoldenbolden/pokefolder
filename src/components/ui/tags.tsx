"use client";

import { TagX } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";

export function Tags(props: React.ComponentProps<"ul">) {
  return (
    <ul className="flex flex-wrap items-center gap-1 text-sm">
      {props.children}
    </ul>
  );
}

type TagItemProps = React.ComponentProps<"li"> & {
  id: string;
  name: string;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
};

export function TagItem({ id, name, onDelete, ...props }: TagItemProps) {
  return (
    <li
      {...props}
      className="flex items-stretch gap-1 rounded-sm border border-solid border-border px-2 focus-within:bg-muted focus-within:outline-none focus-within:ring-1 focus-within:ring-primary"
    >
      <span>{name}</span>
      {!onDelete ? null : (
        <Button
          type="button"
          variant={null}
          className="hover:text-destructive focus-visible:text-destructive rounded-none outline-none hover:bg-transparent"
          aria-label={`remove ${name}`}
          onClick={onDelete}
        >
          <TagX className="size-4" />
        </Button>
      )}
    </li>
  );
}
