'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/ui/select';

const ItemsPerPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div>
      <label htmlFor="items-per-page" className="sr-only">
        items per page
      </label>
      <Select
        defaultValue={`${searchParams.get('pageSize') || 24}`}
        onValueChange={(v) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('pageSize', v);
          params.set('page', '1');
          const pathname = decodeURIComponent(`/search?${params}`);
          router.push(pathname);
        }}
      >
        <SelectTrigger className="bg-muted focus-visible:ring-2 focus-visible:ring-primary">
          <SelectValue placeholder="Items Per Page" />
        </SelectTrigger>
        <SelectContent id="items-per-page" className="bg-muted">
          {[12, 24, 36, 48, 60].map((size) => {
            return (
              <SelectItem key={`items-per-${size}`} value={`${size}`}>
                {`${size}`}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export { ItemsPerPage };
