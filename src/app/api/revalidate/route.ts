import { NextResponse } from 'next/server';
import { Tags, revalidateTags } from '@/lib/tcg';
import { revalidateTag } from 'next/cache';

export async function GET(request: Request) {
  const url = new URL(request.url);

  const token = url.searchParams.get('token');
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      {
        code: 403,
        message: 'Forbidden',
        description: 'You do not have permission to access this resource',
      },
      { status: 403 },
    );
  }

  const tag = url.searchParams.get('tag');

  if (!tag || !revalidateTags.includes(tag as Tags)) {
    return NextResponse.json({
      code: 400,
      message: 'Bad Request',
      description: `Tag must be one of ${revalidateTags.join(', ')}`,
    });
  }

  revalidateTag(tag);

  return NextResponse.json({
    code: 200,
    message: 'OK',
    description: `Revalidated ${tag} ${new Date().toDateString()}`,
  });
}
