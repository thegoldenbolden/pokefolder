'use client';

import { cn } from '@/lib/utils';
import { Minus, X } from '@/components/icons';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';
import * as React from 'react';
import { Toggle } from '@/ui/toggle';
import { type StateKeys, useForm } from '@/hooks/use-form';

type Props = React.PropsWithChildren<{
  input: React.InputHTMLAttributes<HTMLInputElement>;
  stateKey: Exclude<StateKeys, 'hp'>;
  heading: string;
}>;

const AccordionWithInput = ({ input, heading, stateKey }: Props) => {
  const [excluded, setExcluded] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { state, dispatch } = useForm();
  const values = state[stateKey];

  const addValue = React.useCallback(
    (value: string) => {
      if (!value.trim().length) return;
      const lowercased = value.toLowerCase();
      if (values.find((f) => f.id === lowercased)) return;
      dispatch({
        type: 'set',
        key: stateKey,
        values: [...values, { id: lowercased, name: value, excluded }],
      });
    },
    [values, dispatch, stateKey, excluded],
  );

  const removeValue = React.useCallback(
    (value: string) => {
      const lowercased = value.toLowerCase();
      dispatch({ type: 'delete', key: stateKey, id: lowercased });
    },
    [stateKey, dispatch],
  );

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        if (e.key === 'Tab') {
          if (!e.currentTarget.value.trim().length) return;
          addValue(e.currentTarget.value);
          setValue('');
          e.preventDefault();
          return;
        }
      },
      [addValue],
    );

  const onClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (e) => {
      addValue(value);
      setValue('');
    },
    [addValue, setValue, value],
  );

  return (
    <AccordionItem value={heading} className="border-border group">
      <AccordionTrigger className="px-3 gap-1 flex py-2 group-hover:bg-foreground/5 group-focus-within:bg-foreground/5">
        <div className="flex flex-col gap-1 text-start">
          <span className="text-sm uppercase tracking-wide">
            {heading}&nbsp;
          </span>
          {state[stateKey].length <= 0 ? null : (
            <span className="text-xs italic">{`${state[stateKey].length} selected`}</span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-3 flex flex-col gap-1">
          <ul className="flex text-sm items-center flex-wrap gap-1">
            {state[stateKey].map((value) => (
              <li
                key={value.id}
                className="flex items-center gap-1 border border-solid border-border rounded-sm px-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:bg-muted"
              >
                {value.excluded && <Minus className="w-4 h-4" />}
                {value.name}
                <Button
                  variant="ghost"
                  className="p-0 h-auto hover:bg-transaprent hover:text-destructive focus-visible:text-destructive"
                  aria-label={`remove ${value.name}`}
                  onClick={() => removeValue(value.id)}
                  type="button"
                >
                  <X className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1">
            <label className="sr-only" htmlFor={`search-${stateKey}`}>
              type a {stateKey}
            </label>
            <Input
              id={`search-${stateKey}`}
              autoComplete="off"
              variant="outline"
              onKeyDown={onKeyDown}
              onChange={(e) => setValue(e.currentTarget.value)}
              {...input}
              value={value}
              className={cn('grow rounded-sm', input.className)}
            />
            <div className="flex w-full items-center gap-1">
              <Toggle
                aria-label="excluded from search"
                defaultPressed={excluded}
                type="button"
                className="basis-1/2 rounded-sm border-2 p-0 px-2 py-1 data-[state='on']:bg-foreground data-[state='on']:text-background"
                onPressedChange={(e) => {
                  setExcluded((p) => !p);
                }}
              >
                Exclude
              </Toggle>
              <Button
                onClick={onClick}
                type="button"
                className="basis-1/2 rounded-sm border-2 px-2 py-1"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export { AccordionWithInput };
