// Next
import { NextRequest, NextResponse } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

// Services
import ComicService from '@/services/ComicService';

export const GET = async (
  request: NextRequest,
  { params }: { params: { comicHashId: string } }
) => {
  try {
    const token: JWT | null = await getToken({ req: request });
    const { comicHashId } = params;
    const access_token = token?.access_token as string;
    const results = await ComicService.getVolumes({ comicHashId, access_token });

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(error, {
      status: error?.status ?? 500,
    });
  }
};
