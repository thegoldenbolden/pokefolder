'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Search, X } from './icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_HP, addDefaultParams, isHPCompatible } from '@/lib/tcg';
import { type StateKeys, type StateValues, useForm } from '@/hooks/use-form';
import { cn } from '@/lib/utils';

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  close?: () => void;
};

export function Form({ className, close, ...props }: Props) {
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();
  const { state } = useForm();
  const router = useRouter();

  return (
    <form
      {...props}
      data-pending={pending}
      className={cn('flex flex-col group/form h-full', className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (pending) return;

        const params = new URLSearchParams(searchParams.toString());

        params.set('page', '1');

        Object.entries(state).forEach(
          ([key, value]: [StateKeys, StateValues]) => {
            if (!(value instanceof Array)) {
              return;
            }

            if (!value.length) {
              params.delete(key);
              params.delete(`excluded_${key}`);
              return;
            }

            if (key === 'hp') {
              if (!isHPCompatible(params)) {
                params.delete('hp');
                return;
              }

              const min = Math.min(...state.hp);
              const max = Math.max(...state.hp);
              if (min === DEFAULT_HP[0] && max === DEFAULT_HP[1]) {
                params.delete('hp');
                return;
              }

              params.set(`hp`, `${min}-${max}`);
              return;
            }

            if (key === 'orderBy') {
              params.set(
                'orderBy',
                value.map((v) => `${v.excluded ? '-' : ''}${v.id}`).join(','),
              );
              return;
            }

            const exclude: string[] = [];
            const include: string[] = [];

            value.forEach((r) => {
              if (!r.excluded) {
                include.push(
                  key === 'sets' || key === 'legalities' ? r.id : r.name,
                );
              } else {
                exclude.push(
                  key === 'sets' || key === 'legalities' ? r.id : r.name,
                );
              }
            });

            if (exclude.length) {
              params.set(`excluded_${key}`, exclude.join(','));
            } else {
              params.delete(`excluded_${key}`);
            }

            if (include.length) {
              params.set(key, include.join(','));
            } else {
              params.delete(key);
            }
          },
        );

        addDefaultParams(params);
        params.sort();
        router.push(`/search?${decodeURIComponent(params.toString())}`);
        close && close();
      }}
    >
      {props.children}
    </form>
  );
}

export function FormSheet({ children }: React.PropsWithChildren) {
  const isMobile = useMediaQuery('(max-width: 1080px)');
  const [open, setOpen] = React.useState(false);
  const { dispatch } = useForm();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          variant="border"
          className="justify-self-start h-9 px-3 py-2 bg-muted text-muted-foreground"
        >
          Filter & Sort
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-4 overflow-auto">
          <Form
            close={() => {
              setOpen(false);
            }}
          >
            <SheetTitle className="flex items-start gap-1 flex-wrap px-3 py-4 text-lg">
              <div className="flex flex-col gap-1">
                <h2>Search</h2>
                <Button
                  type="reset"
                  variant="link"
                  className="text-xs font-thin uppercase hover:text-destructive"
                  onClick={() => {
                    dispatch({ type: 'reset' });
                  }}
                >
                  Clear all
                </Button>
              </div>
              <Button
                title="Search"
                aria-label="search"
                type="submit"
                size="icon"
                className="border-none ml-auto"
              >
                <Search className="size-5" />
              </Button>
              <SheetClose
                title="Close"
                aria-label="close dialog"
                variant="ghost"
                size="icon"
              >
                <X className="size-5" />
              </SheetClose>
            </SheetTitle>
            {children}
            <Button
              className="font-bungee m-4 text-xl capitalize"
              variant="foreground"
              size="default"
              type="submit"
            >
              Apply filters
            </Button>
          </Form>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-[256px] rounded-sm max-h-svh overflow-y-auto bg-foreground/5 border border-border sticky top-6 self-start">
      <Form className="max-h-[75svh]">
        <div className="flex p-3 bg-muted border-b border-border justify-between sticky top-0 items-center flex-wrap gap-2">
          <h1 className="text-lg">Search</h1>
          <Button
            type="reset"
            variant="link"
            className="ml-auto text-xs font-thin uppercase hover:text-destructive"
            onClick={() => {
              dispatch({ type: 'reset' });
            }}
          >
            Clear all
          </Button>
          <Button
            className="hover:text-primary p-1 hover:bg-transparent border-none"
            type="submit"
          >
            <Search className="size-4" />
          </Button>
        </div>
        {children}
        <div className="py-1 flex sticky bg-muted  border-t border-border bottom-0">
          <Button
            variant="foreground"
            className="px-3 py-2 m-2 grow font-bungee"
            type="submit"
          >
            Apply filters
          </Button>
        </div>
      </Form>
    </aside>
  );
}
