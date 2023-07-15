'use client';
import { useFormContext } from '@/context/search';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, type FormEventHandler } from 'react';
import { createQueryStringFromForm } from '@/lib/tcg';

type SubmitHandler = FormEventHandler<HTMLFormElement>;
export function useForm() {
  const searchParams = useSearchParams();
  const fields = useFormContext();
  const router = useRouter();

  const onSubmit: SubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const params = createQueryStringFromForm(fields, searchParams);
      router.push(`/search?${params}`);
    },
    [router, searchParams, fields],
  );

  return { onSubmit, fields };
}
