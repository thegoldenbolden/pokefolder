'use client';

import { cn } from '@/lib/utils';
import { Grid, Table } from '@/components/icons';
import { Link } from '@/ui/link';
import { useSearchParams } from 'next/navigation';

export function ViewAs() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const isTableView = params.get('view') === 'table';

  params.set('view', 'table');
  const table = (
    <Link
      variant={null}
      size="icon"
      href={`/search?${params}`}
      className={cn(
        'bg-muted border border-border flex items-center justify-center aspect-square p-2 rounded-sm hover:bg-foreground hover:text-background motion-safe:transition-colors',
        { 'bg-foreground text-background hover:bg-foreground/80': isTableView },
      )}
    >
      <Table className="size-6" />
    </Link>
  );

  params.set('view', 'grid');
  const images = (
    <Link
      variant={null}
      size="icon"
      href={`/search?${params}`}
      className={cn(
        'bg-muted border border-border flex items-center justify-center aspect-square p-2 rounded-sm hover:bg-foreground hover:text-background motion-safe:transition-colors',
        {
          'bg-foreground text-background hover:bg-foreground/80': !isTableView,
        },
      )}
    >
      <Grid className="size-6" />
    </Link>
  );

  return (
    <>
      {images}
      {table}
    </>
  );
}
