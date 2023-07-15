import { getCards } from '@/lib/fetch';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headers = new Headers(request.headers);
  // TODO: Use a different/additional way to restrict access.
  const referer = headers.get('referer');
  if (!referer) {
    return NextResponse.json({
      code: 403,
      message: 'You do not have permission to access this resource.',
    });
  }
  const url = new URL(referer);
  if (url.pathname !== '/search') {
    return NextResponse.json({
      code: 403,
      message: 'You do not have permission to access this resource.',
    });
  }

  try {
    const cards = await getCards(url.searchParams);
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error('An error occurred fetching cards\n\n', error);
    return NextResponse.json(
      {
        error: {
          code: error.code ?? 500,
          message: error.message ?? 'An error occurred',
        },
      },
      { status: error.code },
    );
  }
}
