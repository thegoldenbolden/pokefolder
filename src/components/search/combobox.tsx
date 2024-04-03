"use client";

import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagItem, Tags } from "@/components/ui/tags";
import { useForm, type FormField, type FormValue } from "@/hooks/use-form";
import type { Expansion } from "@/lib/pokemon-tcg/constants";
import { cn, getQueryKey } from "@/lib/utils";
import { useCombobox, useMultipleSelection } from "downshift";
import * as React from "react";

export type DefaultMultiComboboxValue = {
  id: string;
  name: string;
};

type ComboboxQueryParams = Exclude<FormField, "hp">;

type ComboboxProps = React.PropsWithChildren<{
  data: (Expansion | DefaultMultiComboboxValue)[];
  name: string;
  placeholder?: string;
  id: ComboboxQueryParams;
}>;

const ComboboxTypes = Object.assign(
  (i: DefaultMultiComboboxValue) => {
    return <span className="text-sm capitalize">{i.name}</span>;
  },
  {
    [getQueryKey("region")]: (item: DefaultMultiComboboxValue) => {
      return (
        <div className="flex flex-col">
          <span className="text-sm capitalize">{item.name}</span>
          <span className="text-ellipsis text-xs">{item.id}</span>
        </div>
      );
    },
    [getQueryKey("legalities")]: (item: DefaultMultiComboboxValue) => {
      const [legal, status] = item.id.split("_");
      return (
        <div className="flex flex-col">
          <span className="text-sm capitalize">{legal}</span>
          <span className="text-ellipsis text-xs capitalize">{status}</span>
        </div>
      );
    },
    [getQueryKey("sets")]: (item: Expansion) => {
      return (
        <>
          {item.images?.symbol && (
            <span className="rounded-sm bg-fg p-1">
              <Image
                src={item.images.symbol.src}
                alt={item.images.symbol.alt}
                height={20}
                width={20}
                className="aspect-square object-contain"
              />
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-sm">{item.name}</span>
            <span className="text-ellipsis text-xs">{item.series.name}</span>
          </div>
        </>
      );
    },
    [getQueryKey("types")]: (item: DefaultMultiComboboxValue) => {
      return (
        <>
          <span className="rounded-lg p-1">
            <Image
              src={`/types/${item.id}.png`}
              alt={`${item.name} type`}
              height={20}
              width={20}
              className="aspect-square size-5 object-contain"
            />
          </span>
          <div className="flex flex-col">
            <span className="text-sm">{item.name}</span>
          </div>
        </>
      );
    },
  },
);

function getFiltered(
  input: string,
  selected: FormValue[],
  comboboxValues: (DefaultMultiComboboxValue & {
    series?: Expansion["series"];
  })[],
) {
  const value = input.toLowerCase();

  return comboboxValues.filter((item) => {
    if (selected.some((s) => s.id === item.id)) return;
    return (
      item.id.toLowerCase().includes(value) ||
      item.name.toLowerCase().includes(value) ||
      item.series?.name.toLowerCase().includes(value)
    );
  });
}

export function Combobox({ data, name, id, placeholder }: ComboboxProps) {
  const [input, setInput] = React.useState("");
  const { state, dispatch } = useForm();
  const selected = state[id];

  const items = React.useMemo(() => {
    return getFiltered(input, selected, data);
  }, [input, selected, data]);

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: selected,
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          default:
            break;
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            dispatch({
              type: "set",
              key: id,
              values: newSelectedItems ?? [],
            });
            break;
        }
      },
    });

  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    items,
    itemToString: (item) => (item ? item.name : ""),
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue: input,
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
            highlightedIndex: 0, // with the first option highlighted.
          };
        default:
          return changes;
      }
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            dispatch({
              type: "add",
              key: id,
              values: [{ id: selectedItem.id, name: selectedItem.name }],
            });
            setInput("");
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInput(inputValue ?? "");
          break;
        default:
          break;
      }
    },
  });

  const Combobox = ComboboxTypes[id] ?? ComboboxTypes;

  return (
    <div className="flex flex-col gap-2 px-3 py-6">
      <div className="flex flex-row flex-wrap items-start justify-between gap-1 text-start">
        <div className="flex flex-col">
          <Label htmlFor={id}>{name}</Label>
          <span className={selected.length ? "text-xs italic" : "hidden"}>
            {selected.length.toString()} selected
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
      <div className="flex w-full flex-col gap-2">
        <Tags className="flex flex-wrap items-center gap-1 text-sm">
          {selected.map((item, index) => (
            <TagItem
              id={item.id}
              key={`selected-item-${index}`}
              name={item.name.replaceAll("_", ": ")}
              {...getSelectedItemProps({ selectedItem: item, index })}
              onDelete={(e) => {
                e.stopPropagation();
                removeSelectedItem(item);
              }}
            />
          ))}
        </Tags>
        <Input
          name={id}
          className="grow outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-canvas motion-safe:transition-colors"
          placeholder={placeholder}
          {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          id={id}
        />
        <ul
          className={`z-10 max-h-72 w-full overflow-auto rounded-lg border border-border ${
            !(isOpen && items.length) && "hidden"
          }`}
          {...getMenuProps()}
        >
          {items.map((item, index) => (
            <li
              className={cn(
                "flex items-center gap-2 px-3 py-2 first:rounded-t-md last:rounded-b-md",
                {
                  "bg-fg/10 text-fg": highlightedIndex === index,
                  "font-bold": selectedItem === item,
                },
              )}
              key={`${item.name}${index}`}
              {...getItemProps({ item, index })}
            >
              <Combobox {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
