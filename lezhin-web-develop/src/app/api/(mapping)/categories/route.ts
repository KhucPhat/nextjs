// Next
import { NextRequest, NextResponse } from 'next/server';

// Services
import MasterService from '@/services/MasterService';

export const GET = async (res: NextRequest) => {
  try {
    const { searchParams } = new URL(res.url);
    const type = searchParams.get('type') || '';
    const results = await MasterService.getCategories(type);
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(error, {
      status: error?.status ?? 500,
    });
  }
};
