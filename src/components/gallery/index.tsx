'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const Table = dynamic(() => import('./table').then((m) => m.Table));
const Images = dynamic(() => import('./images').then((m) => m.Images));

export function Gallery() {
  const params = useSearchParams();
  const view = params.get('view');
  return view === 'table' ? <Table /> : <Images />;
}
