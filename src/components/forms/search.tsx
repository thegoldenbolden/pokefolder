'use client';
import type { FormEventHandler, MutableRefObject } from 'react';
import type { TQueryKey } from '@tcg';
import { usePathname, useRouter } from 'next/navigation';

type SearchForm = JSX.IntrinsicElements['form'] & {
  closeRef?: MutableRefObject<HTMLButtonElement | null>;
};

export default function SearchForm(props: SearchForm) {
  const router = useRouter();
  let pathname = usePathname();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    pathname = e.currentTarget.id.startsWith('searchbar') ? 'search' : pathname;
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/${pathname}`);

    const keys: TQueryKey[] = [
      'artists',
      'cards',
      'rarities',
      'sets',
      'subtypes',
      'supertypes',
      'types',
    ];

    keys.forEach((key) => {
      let value = form.getAll(key);
      if (value.length && value[0].toString().length) {
        url.searchParams.set(key, value.toString());
      }
    });

    url.href = decodeURIComponent(url.href);
    url.href = url.href.replaceAll(/(,\++)/gi, ',');
    router.push(url.href);
    // If advanced search form is open click the close button.
    props.closeRef && props.closeRef.current?.click();
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      {props.children}
    </form>
  );
}
