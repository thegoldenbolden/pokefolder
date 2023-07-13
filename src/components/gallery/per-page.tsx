'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

const ItemsPerPage = ({
  size,
  currentPage,
}: {
  size: number;
  currentPage: number;
}) => {
  const router = useRouter();
  const readonlyParams = useSearchParams();
  const params = new URLSearchParams(readonlyParams.toString());
  params.set('page', `${currentPage}`);
  return (
    <Select
      defaultValue={`${size}`}
      onValueChange={(v) => {
        params.set('pageSize', `${v}`);
        router.push(`/search?${params}`);
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
