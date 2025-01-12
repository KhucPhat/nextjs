// Next
import { NextRequest, NextResponse } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

// Services
import ComicDetailService from '@/services/ComicDetailService';

export const GET = async (
  req: NextRequest,
  { params }: { params: { comicHashId: string; volumeHashId: string } }
) => {
  try {
    const { comicHashId, volumeHashId } = params;
    const token: JWT | null = await getToken({ req });
    const access_token = token?.access_token as string;

    const results = await ComicDetailService.getVolumeDetail({
      comicHashId,
      volumeHashId,
      access_token,
    });

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(error, {
      status: error?.status ?? 500,
    });
  }
};
