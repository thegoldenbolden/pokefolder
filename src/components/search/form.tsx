"use client";
import { Filter, Search, X } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm, type FormValue } from "@/hooks/use-form";
import { isHPCompatible, setQueryParams } from "@/lib/pokemon-tcg/utils";
import { getQueryFallback, getSearchUrl } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useFormStatus } from "react-dom";

export function Form({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { dispatch, state } = useForm();
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        title="Filter"
        aria-label="open filter form"
        size="icon"
        variant="border"
      >
        <Filter />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 overflow-auto">
        <form
          {...props}
          data-pending={pending}
          className="h-full bg-inherit"
          onSubmit={(e) => {
            e.preventDefault();
            if (pending) return;

            const params = new URLSearchParams(searchParams.toString());
            params.set("page", "1");

            Object.entries(state).forEach(([key, value]) => {
              if (!(value instanceof Array)) return;

              if (!value.length) {
                params.delete(key);
                return;
              }

              if (key === "hp") {
                if (!isHPCompatible(params)) {
                  params.delete("hp");
                  return;
                }

                const fallbackHP = getQueryFallback("hp");

                const min = Math.min(...state.hp);
                const max = Math.max(...state.hp);
                if (min === fallbackHP[0] && max === fallbackHP[1]) {
                  params.delete("hp");
                  return;
                }

                params.set(`hp`, `${min}-${max}`);
                return;
              }

              const q: string[] = [];

              (value as FormValue[]).forEach((r) => {
                if (key === "sets" || key === "legalities") {
                  q.push(r.id);
                } else {
                  q.push(r.name);
                }
              });

              if (q.length) {
                params.set(key, q.join(","));
              } else {
                params.delete(key);
              }
            });

            setQueryParams(params);
            window.history.pushState(null, "", getSearchUrl(params));
            close && close();
          }}
        >
          <div className="sticky top-0 z-40 flex flex-wrap items-start justify-between gap-1 border-b border-border bg-inherit px-3 py-4 text-lg">
            <div className="flex flex-col">
              <SheetTitle className="font-bungee text-lg">Search</SheetTitle>
              <Button
                type="reset"
                variant="underline"
                size={null}
                aria-label="reset form"
                className="justify-start text-xs uppercase transition-none hover:text-destructive"
                onClick={() => dispatch({ type: "reset" })}
              >
                Clear all
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <Button
                title="Search"
                aria-label="search"
                type="submit"
                size="icon"
                variant="ghost"
              >
                <Search />
              </Button>
              <SheetClose
                title="Close"
                aria-label="close dialog"
                variant="ghost"
                color="muted"
                size="icon"
              >
                <X />
              </SheetClose>
            </div>
          </div>
          <div className="divide-y divide-border">{children}</div>
          <div className="sticky bottom-0 z-40 mt-auto w-full border-t border-border bg-inherit px-3 py-4">
            <Button
              className="w-full p-2 font-bungee capitalize"
              variant="foreground"
              type="submit"
            >
              Apply filters
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
