'use client';
import { ExcludeSearchField } from '@/components/exclude-field';
import { cn } from '@/lib/utils';
import { Minus, X } from '@/ui/icons';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';
import {
  type ExcludedFormKeys,
  useFormContext,
  useDispatchContext,
} from '@/context/search';
import {
  type InputHTMLAttributes,
  type MouseEventHandler,
  useCallback,
  KeyboardEventHandler,
  useState,
} from 'react';

type Props = React.PropsWithChildren<{
  input: InputHTMLAttributes<HTMLInputElement>;
  field: ExcludedFormKeys;
  heading: string;
}>;

const AccordionWithInput = ({ input, heading, field }: Props) => {
  const form = useFormContext();
  const [value, setValue] = useState('');
  const dispatch = useDispatchContext();

  const addValue = useCallback(
    (value: string) => {
      const lowercased = value.toLowerCase();
      if (form[field].find((f) => f.id === lowercased)) return;
      dispatch({
        type: 'set',
        key: field,
        value: [
          ...form[field],
          { id: lowercased, name: value, exclude: form['exclude'] },
        ],
      });
    },
    [form, dispatch, field],
  );

  const removeValue = useCallback(
    (value: string) => {
      const lowercased = value.toLowerCase();
      dispatch({ type: 'delete', key: field, id: lowercased });
    },
    [field, dispatch],
  );

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
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

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      addValue(value);
      setValue('');
    },
    [addValue, setValue, value],
  );

  return (
    <AccordionItem value={heading} className="border-border group">
      <AccordionTrigger className="px-3 gap-2 py-1 hover:no-underline group-hover:bg-spotlight/75 group-focus-within:bg-spotlight/75">
        <div className="text-lg flex w-full gap-2 items-center">
          <Button
            type="button"
            variant="ghost"
            aria-label={`reset ${heading}`}
            className="rounded-none bg-transparent p-0 hover:text-destructive focus-visible:text-destructive hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'reset', key: field });
            }}
          >
            <X className="w-4 h-4" />
          </Button>
          <span>
            {heading}&nbsp;
            <span className="text-sm">{`(${form[field].length})`}</span>
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-3 h-full py-1.5">
        <div className="flex flex-col gap-1">
          {form[field].length > 0 && (
            <ul className="flex text-sm items-center flex-wrap gap-1">
              {form[field].map((value) => (
                <li
                  key={value.id}
                  className="flex items-center gap-1 border border-solid border-border rounded-sm px-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:bg-spotlight/75"
                >
                  {value.exclude && <Minus className="w-4 h-4" />}
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
          )}
          <div className="flex items-center gap-1">
            <ExcludeSearchField field={field} />
            <Input
              autoComplete="off"
              variant="outline"
              onKeyDown={onKeyDown}
              onChange={(e) => setValue(e.currentTarget.value)}
              {...input}
              value={value}
              className={cn('grow', input.className)}
            />
            <Button
              onClick={onClick}
              type="button"
              className="rounded-none border-2"
            >
              Add
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionWithInput;
