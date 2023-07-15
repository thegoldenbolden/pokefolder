import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_PAGE_SIZE,
  defaultQueryParams,
  allowedTCGParams,
} from './lib/tcg';

export const config = {
  matcher: ['/search'],
};

const allowedParams = [...allowedTCGParams, ...defaultQueryParams];

export async function middleware(request: NextRequest) {
  const params = new URLSearchParams(request.nextUrl.searchParams);
  let changed = false;

  for (const [param, value] of params.entries()) {
    if (allowedParams.includes(param)) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
  }

  if (!params.get('page')) {
    params.set('page', '1');
    changed ||= true;
  }

  if (!params.get('pageSize')) {
    params.set('pageSize', `${DEFAULT_PAGE_SIZE}`);
    changed ||= true;
  }

  if (!params.get('view')) {
    params.set('view', 'grid');
    changed ||= true;
  }

  if (!params.get('orderBy')) {
    params.set('orderBy', '-cardmarket');
    changed ||= true;
  }

  params.sort();
  const decodedParams = decodeURIComponent(params.toString());

  if (changed) {
    return NextResponse.redirect(
      new URL(`/search?${decodedParams}`, request.url),
    );
  }
}
