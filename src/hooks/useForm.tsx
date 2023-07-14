'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { getURL } from '@/lib/utils';
import { type FieldValues, useFormContext } from '@/context/search';
import { getPageSize } from '@/lib/tcg';
import type { FormEventHandler } from 'react';

type SubmitHandler = FormEventHandler<HTMLFormElement>;
export function useForm() {
  const fields = useFormContext();
  const params = useSearchParams();
  const router = useRouter();

  const onSubmit: SubmitHandler = (e) => {
    e.preventDefault();
    const url = new URL(getURL('/search'));
    url.searchParams.set('page', '1');
    url.searchParams.set('pageSize', `${getPageSize(params.get('pageSize'))}`);
    url.searchParams.set(
      'view',
      params.get('view') === 'table' ? 'table' : 'grid',
    );

    Object.entries(fields).forEach(([key, value]) => {
      if (!(value instanceof Array)) return;
      if (!value.length) return;

      if (key === 'hp') {
        const hpIncompatible = fields.supertypes.find(
          (e) => !e.exclude && e.name !== 'Pokémon',
        );

        if (hpIncompatible) return;
        url.searchParams.set(`${key}_low`, `${Math.min(...fields[key])}`);
        url.searchParams.set(`${key}_high`, `${Math.max(...fields[key])}`);
        return;
      }

      if (key === 'orderBy') {
        url.searchParams.set(
          'orderBy',
          (value as FieldValues).map((v) => v.id).join(','),
        );
        return;
      }

      const omit: string[] = [];
      const include: string[] = [];

      (value as FieldValues).forEach((r) => {
        if (!r.exclude) {
          include.push(key === 'sets' || key === 'legalities' ? r.id : r.name);
        } else {
          omit.push(key === 'sets' || key === 'legalities' ? r.id : r.name);
        }
      });

      omit.length && url.searchParams.set(`exclude_${key}`, omit.join(','));
      include.length && url.searchParams.set(key, include.join(','));
    });
    router.push(decodeURIComponent(url.href));
  };

  return { onSubmit, fields };
}
