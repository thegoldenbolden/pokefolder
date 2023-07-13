'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import { Search } from '@/ui/icons';
import { Input } from '@/ui/input';
import { type FormEventHandler, forwardRef, useCallback } from 'react';
import { cn, getURL } from '@/lib/utils';
import { query } from '@/lib/tcg';
import { usePathname, useRouter } from 'next/navigation';

const searchbarVariants = cva(
  'group flex items-center gap-2 border border-border border-solid rounded-sm text-sm hover:bg-spotlight/75 focus-within:bg-spotlight/75 focus-within:ring-1 focus-within:ring-primary',
  {
    variants: {
      size: {
        default: '',
        md: 'w-4/5 md:w-3/5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface SearchbarProps
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof searchbarVariants> {
  to?: `/${string}`;
}

type SubmitHandler = FormEventHandler<HTMLFormElement>;

const Searchbar = forwardRef<HTMLFormElement, SearchbarProps>(
  ({ className, size, ...props }, ref) => {
    const pathname = usePathname();
    const router = useRouter();

    const onSubmit: SubmitHandler = useCallback((e) => {
      const form = new FormData(e.currentTarget);
      const url = new URL(
        `${getURL(props.to ?? pathname == '/' ? '/search' : pathname)}`,
      );

      query.forEach((q) => {
        const value = form.getAll(q);
        if (!value) return;
        if (value.length && value[0].toString().length) {
          url.searchParams.set(q, value.toString());
        }
      });

      url.href = decodeURIComponent(url.href);
      url.href = url.href.replaceAll(/(,\++)/gi, ',');
      router.push(url.href);
    }, []);

    return (
      <form
        id={props.id}
        onSubmit={onSubmit}
        className={cn(searchbarVariants({ className, size }))}
      >
        <div className="pl-2 flex items-center bg-transparent">
          <Search className="text-foreground/75 group-hover:text-foreground group-focus-within:text-foreground h-5 w-5" />
        </div>
        <Input
          className="bg-transparent py-1.5 px-2 outline-none"
          placeholder="Search cards"
          name="cards"
          id="cards"
          aria-label="Search cards"
          autoComplete="off"
        />
      </form>
    );
  },
);

Searchbar.displayName = 'Searchbar';
export { Searchbar };
