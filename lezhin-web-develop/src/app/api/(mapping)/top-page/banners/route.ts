// Next
import { NextRequest, NextResponse } from 'next/server';

// Services
import TopPageService from '@/services/TopPageService';

export const GET = async (res: NextRequest) => {
  try {
    const { searchParams } = new URL(res.url);
    const category_hash_id = searchParams.get('category_hash_id') || '';

    const results = await TopPageService.getBanner(category_hash_id);

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(error, {
      status: error?.status ?? 500,
    });
  }
};
