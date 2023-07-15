'use client';
import { cn } from '@/lib/utils';
import {
  type UseComboboxGetLabelPropsOptions,
  useCombobox,
  useMultipleSelection,
} from 'downshift';
import { useState, useMemo, useCallback } from 'react';
import {
  Ascending,
  Descending,
  type Icon as TIcon,
  Minus,
  X,
} from '@/ui/icons';
import { Input } from '@/ui/input';
import {
  type FieldValues,
  useFormContext,
  useDispatchContext,
  ExcludedFormKeys,
} from '@/context/search';
import type { TSet } from '@/types/tcg';
import { ExcludeSearchField } from '../exclude-field';

export type DefaultMultiComboboxValue = { name: string; id: string };

type Props = {
  data: TSet[] | DefaultMultiComboboxValue[];
  placeholder?: string;
  field: ExcludedFormKeys;
  item: (item: Props['data'][number]) => JSX.Element;
  label: { value: string; props?: UseComboboxGetLabelPropsOptions };
};

export const Combobox = ({
  data,
  placeholder,
  field,
  label,
  ...props
}: Props) => {
  const dispatch = useDispatchContext();
  const [input, setInput] = useState('');
  const form = useFormContext();

  const getFiltered = useCallback(
    (selected: FieldValues, input: String) => {
      const value = input.toLowerCase();
      return data.filter((data) => {
        return (
          !selected.find((s) => s.id === data.id) &&
          (data.name.toLowerCase().includes(value) ||
            data.series?.toLowerCase().includes(value))
        );
      });
    },
    [data],
  );

  const items = useMemo(
    () => getFiltered(form[field], input),
    [form, field, input, getFiltered],
  );

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: form[field],
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
              type: 'set',
              key: field,
              value: newSelectedItems ?? [],
            });
            break;
        }
      },
    });

  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    items,
    itemToString: (item) => (item ? item.name : ''),
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    inputValue: input,
    stateReducer: (state, actionAndChanges) => {
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
              type: 'set',
              key: field,
              value: [
                ...form[field],
                { exclude: form.exclude, ...selectedItem },
              ],
            });
            setInput('');
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInput(inputValue ?? '');
          break;
        default:
          break;
      }
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        <label className="w-fit" {...getLabelProps(label.props)}>
          {label.value}
        </label>
        <div className="text-sm inline-flex gap-1 items-center flex-wrap p-1.5">
          {form[field].map((item, index) => {
            let Icon: TIcon | null = null;

            if (field == 'orderBy') {
              Icon = item.exclude ? Descending : Ascending;
            } else {
              Icon = item.exclude ? Minus : null;
            }

            return (
              <span
                className="flex items-center gap-1 border border-solid border-border rounded-sm px-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:bg-spotlight/75"
                key={`selected-item-${index}`}
                {...getSelectedItemProps({ selectedItem: item, index })}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item.name}
                <span
                  className="cursor-pointer hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedItem(item);
                  }}
                >
                  <X className="w-4 h-4" />
                </span>
              </span>
            );
          })}
          <div className="flex gap-1 w-full items-center">
            <ExcludeSearchField field={field} />
            <Input
              variant="outline"
              className="grow"
              placeholder={placeholder}
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
          </div>
        </div>
      </div>
      <ul
        className={`w-full mt-1 max-h-72 overflow-auto p-0 z-10 ${
          !(isOpen && items.length) && 'hidden'
        }`}
        {...getMenuProps()}
      >
        {items.map((item, index) => (
          <li
            className={cn('py-2 px-3 flex items-center gap-2', {
              'bg-spotlight/75 text-foreground': highlightedIndex === index,
              'font-bold': selectedItem === item,
            })}
            key={`${item.name}${index}`}
            {...getItemProps({ item, index })}
          >
            <props.item {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
