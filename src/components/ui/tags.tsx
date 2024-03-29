"use client";

import React from "react";
import { Remove } from "../icons";
import { Button } from "./button";

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
          className="rounded-none outline-none hover:bg-transparent hover:text-destructive focus-visible:text-destructive"
          aria-label={`remove ${name}`}
          onClick={onDelete}
        >
          <Remove className="size-4" />
        </Button>
      )}
    </li>
  );
}
