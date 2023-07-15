'use client';

import { cn } from '@/lib/utils';
import { Grid, Table } from '@/ui/icons';
import { Link } from '@/ui/link';
import { useSearchParams } from 'next/navigation';

export default function ViewAs() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const isTableView = params.get('view') === 'table';
  params.set('view', 'table');
  const table = (
    <Link
      button="foreground"
      href={`/search?${params}`}
      highlight="none"
      className={cn(
        'h-9 w-9 flex items-center justify-center aspect-square p-2 rounded-sm',
        { 'bg-foreground text-background': isTableView },
      )}
    >
      <Table className="w-6 h-6" />
    </Link>
  );

  params.set('view', 'grid');
  const images = (
    <Link
      highlight="none"
      button="foreground"
      href={`/search?${params}`}
      className={cn(
        'h-9 w-9 flex items-center justify-center aspect-square p-2 rounded-sm',
        { 'bg-foreground text-background': !isTableView },
      )}
    >
      <Grid className="w-6 h-6" />
    </Link>
  );

  return (
    <>
      {images}
      {table}
    </>
  );
}
