'use client';

import { DEFAULT_QUERY_PARAMS, QUERY_PARAMS } from '@/lib/tcg';
import { Search } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { cn, getURL } from '@/lib/utils';
import { Input } from '@/ui/input';
import { forwardRef } from 'react';

interface SearchbarProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Searchbar = forwardRef<HTMLFormElement, SearchbarProps>(
  ({ className, ...props }, ref) => {
    const router = useRouter();

    return (
      <form
        id={props.id}
        className={cn(
          'group flex items-center gap-2 border border-border border-solid rounded-sm text-sm hover:bg-muted focus-within:bg-muted focus-within:ring-1 focus-within:ring-primary',
          className,
        )}
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const url = new URL(`${getURL('/search')}`);

          [...QUERY_PARAMS, ...DEFAULT_QUERY_PARAMS].forEach((q) => {
            const value = form.getAll(q);
            if (!value) return;
            if (value.length && value[0].toString().length) {
              url.searchParams.set(q, value.toString());
            }
          });

          url.href = decodeURIComponent(url.href);
          url.href = url.href.replaceAll(/(,\++)/gi, ',');
          router.push(url.href);
        }}
      >
        <label htmlFor="searchbar" className="sr-only">
          search cards
        </label>
        <div className="pl-2 flex items-center bg-transparent">
          <Search className="text-foreground/75 group-hover:text-foreground group-focus-within:text-foreground h-5 w-5" />
        </div>
        <Input
          className="bg-transparent py-1.5 px-2 outline-none"
          placeholder="Search cards"
          name="cards"
          id="searchbar"
          aria-label="Search cards"
          autoComplete="off"
        />
      </form>
    );
  },
);

Searchbar.displayName = 'Searchbar';
export { Searchbar };
