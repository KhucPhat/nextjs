// Next
import { NextRequest, NextResponse } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

// Services
import ComicDetailService from '@/services/ComicDetailService';

export const GET = async (req: NextRequest, { params }: { params: { comicHashId: string } }) => {
  try {
    const { comicHashId } = params;
    const { searchParams } = new URL(req.url);
    const order_by = searchParams.get('order_by') || '';
    const order_type = searchParams.get('order_type') || '';
    const token: JWT | null = await getToken({ req });
    const access_token = token?.access_token as string;

    const results = await ComicDetailService.getListChapter({
      comicHashId,
      order_by,
      order_type,
      access_token,
    });

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(error, {
      status: error?.status ?? 500,
    });
  }
};
