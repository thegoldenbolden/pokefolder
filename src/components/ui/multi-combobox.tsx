'use client';

import { useState, useMemo, useCallback } from 'react';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import type { TSet } from '@/types/tcg';
import { Toggle } from './toggle';
import {
  type UseComboboxGetLabelPropsOptions,
  useCombobox,
  useMultipleSelection,
} from 'downshift';
import {
  Ascending,
  Descending,
  type Icon as TIcon,
  Minus,
  X,
} from '@/components/icons';
import {
  type StateKeysWithoutHP,
  type StateValues,
  useForm,
} from '@/hooks/use-form';

export type DefaultMultiComboboxValue = { name: string; id: string };

type Props = {
  data: TSet[] | DefaultMultiComboboxValue[];
  placeholder?: string;
  stateKey: StateKeysWithoutHP;
  render: (item: Props['data'][number]) => JSX.Element;
  label: { value: string; props?: UseComboboxGetLabelPropsOptions };
  sets?: TSet[];
};

export const Combobox = ({
  data,
  placeholder,
  stateKey,
  label,
  sets,
  ...props
}: Props) => {
  const [excluded, setExcluded] = useState(false);
  const [input, setInput] = useState('');
  const { state, dispatch } = useForm();

  const getFiltered = useCallback(
    (selected: StateValues, input: String) => {
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
    () => getFiltered(state[stateKey], input),
    [state, stateKey, input, getFiltered],
  );

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems: state[stateKey],
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
              key: stateKey,
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
              type: 'set',
              key: stateKey,
              values: [...state[stateKey], { excluded, ...selectedItem }],
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
          {state[stateKey].map((item, index) => {
            let Icon: TIcon | null = null;

            if (stateKey == 'orderBy') {
              Icon = item.excluded ? Descending : Ascending;
            } else {
              Icon = item.excluded ? Minus : null;
            }

            return (
              <span
                className="flex items-center gap-1 capitalize border border-solid border-border rounded-sm px-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:bg-muted"
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
          <div className="flex flex-col w-full gap-1">
            <Input
              variant="outline"
              className="grow"
              placeholder={placeholder}
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
            <Toggle
              aria-label="exclude from search"
              defaultPressed={excluded}
              type="button"
              className="basis-1/2 rounded-sm border-2 px-2 py-1 data-[state='on']:bg-foreground data-[state='on']:text-background"
              onPressedChange={(e) => {
                setExcluded((p) => !p);
              }}
            >
              {stateKey === 'orderBy'
                ? excluded
                  ? 'Descending'
                  : 'Ascending'
                : 'Exclude'}
            </Toggle>
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
            className={cn('py-2 px-3 flex items-center gap-2 rounded-sm', {
              'bg-foreground/5 text-foreground': highlightedIndex === index,
              'font-bold': selectedItem === item,
            })}
            key={`${item.name}${index}`}
            {...getItemProps({ item, index })}
          >
            <props.render {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
