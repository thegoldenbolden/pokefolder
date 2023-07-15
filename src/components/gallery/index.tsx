'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const Table = dynamic(() => import('./table'));
const Images = dynamic(() => import('./images'));

export default function Gallery() {
  const params = useSearchParams();
  const view = params.get('view');
  return view === 'table' ? <Table /> : <Images />;
}
