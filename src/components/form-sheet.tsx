'use client';
import { type FormHTMLAttributes } from 'react';
import { useForm } from '@/hooks/use-form';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui/sheet';
import { Button } from '@/ui/button';
import { Accordion } from '@/ui/accordion';
import { ArrowRightLong, Filter } from '@/ui/icons';
import { useDispatchContext } from '@/context/search';

type Props = FormHTMLAttributes<HTMLFormElement>;

export default function FormSheet(props: Props) {
  const { onSubmit } = useForm();
  const dispatch = useDispatchContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="px-2 py-1.5 gap-2 focus-visible:ring-2 focus-visible:ring-primary">
          <span>Filter & Sort</span>
          <Filter className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-border bg-background top-0 m-0 p-0">
        <form
          {...props}
          onSubmit={onSubmit}
          className="flex flex-col overflow-auto h-full"
        >
          <SheetHeader className="px-3 py-4 sticky w-full top-0 bg-background border-b-border border-b">
            <SheetTitle className="grow w-full justify-between items-center">
              <span>Search</span>
              <Button
                variant="destructive"
                onClick={() => dispatch({ type: 'reset', key: null })}
                className="bg-transparent hover:bg-transparent"
              >
                Clear All
              </Button>
            </SheetTitle>
          </SheetHeader>
          <Accordion type="single" collapsible className="w-full py-0">
            {props.children}
          </Accordion>
          <SheetFooter className="px-3 py-4 sticky bottom-0 bg-background border-t border-t-border">
            <SheetClose asChild>
              <Button
                variant="foreground"
                tabIndex={1}
                type="submit"
                className="rounded-none text-xl tracking-wide font-bungee w-full flex items-center justify-between"
              >
                Apply Filters
                <ArrowRightLong className="w-4 h-4" />
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
