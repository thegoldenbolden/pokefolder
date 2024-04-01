"use client";

import { Plus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input as TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagItem, Tags } from "@/components/ui/tags";
import { useForm, type FormField } from "@/hooks/use-form";
import * as React from "react";

type InputProps = React.ComponentProps<typeof TextInput> & {
  id: Exclude<FormField, "hp">;
  name: string;
};

export function Input({ name, id, ...props }: InputProps) {
  const [value, setValue] = React.useState<string>("");
  const { state, dispatch } = useForm();
  const values = state[id];

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        if (e.key === "Tab") {
          if (!e.currentTarget.value.trim().length) return;

          const input = e.currentTarget.value.split(",");
          const toAdd = input
            .filter((i) => i.trim().length)
            .map((i) => ({
              id: i.trim().toLowerCase(),
              name: i.trim(),
            }));

          dispatch({
            type: "add",
            key: id,
            values: toAdd,
          });

          setValue("");
          e.preventDefault();
          return;
        }
      },
      [id, dispatch],
    );

  const onClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (e) => {
      const input = value.split(",");
      const toAdd = input
        .filter((i) => i.trim().length)
        .map((i) => ({
          id: i.trim().toLowerCase(),
          name: i.trim(),
        }));

      dispatch({
        type: "add",
        key: id,
        values: toAdd,
      });

      setValue("");
    },
    [value, id, dispatch],
  );

  return (
    <div className="flex flex-col gap-2 px-3 py-6">
      <div className="flex flex-row flex-wrap items-start justify-between gap-1 text-start">
        <div className="flex flex-col">
          <Label htmlFor={id}>{name}</Label>
          <span className={values.length ? "text-xs italic" : "hidden"}>
            {values.length.toString()} selected
          </span>
        </div>
        <Button
          type="button"
          variant="underline"
          size={null}
          aria-label={`reset ${id}`}
          className="hover:text-destructive justify-start text-xs uppercase transition-none"
          onClick={() => dispatch({ type: "set", key: id, values: [] })}
        >
          reset
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Tags className="flex flex-wrap items-center gap-1 text-sm">
          {values.map((value) => (
            <TagItem
              id={value.id}
              key={value.id}
              name={value.name}
              onDelete={(e) =>
                dispatch({ type: "delete", key: id, id: value.id })
              }
            />
          ))}
        </Tags>
        <div className="flex flex-row items-stretch gap-2">
          <TextInput
            id={id}
            name={id}
            autoComplete="off"
            value={value}
            onKeyDown={onKeyDown}
            onChange={(e) => setValue(e.currentTarget.value)}
            className="grow rounded-md outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-canvas motion-safe:transition-colors"
            {...props}
          />
          <Button
            color="border"
            variant="outline"
            size="icon"
            className="aspect-square"
            type="button"
            onClick={onClick}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
