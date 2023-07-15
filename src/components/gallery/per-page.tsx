'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Select, SelectTrigger, SelectValue } from '@/ui/select';

const SelectContent = dynamic(() =>
  import('@/ui/select').then((mod) => mod.SelectContent),
);
const SelectItem = dynamic(() =>
  import('@/ui/select').then((mod) => mod.SelectItem),
);

const ItemsPerPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Select
      defaultValue={`${searchParams.get('pageSize')}`}
      onValueChange={(v) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('pageSize', v);
        params.set('page', '1');
        router.push(`/search?=${params}`);
      }}
    >
      <SelectTrigger className="w-auto focus-visible:ring-2 focus-visible:ring-primary">
        <SelectValue placeholder="Items Per Page" />
      </SelectTrigger>
      <SelectContent>
        {[10, 20, 30, 40, 50].map((size) => {
          return (
            <SelectItem key={`items-per-${size}`} value={`${size}`}>
              {`${size}`}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export { ItemsPerPage };
