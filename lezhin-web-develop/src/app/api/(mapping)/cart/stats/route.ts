// Next
import { NextRequest, NextResponse } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

// Service
import CartService from '@/services/CartService';

export const GET = async (request: NextRequest) => {
  try {
    const token: JWT | null = await getToken({ req: request });
    const res = await CartService.getCartStatistics(token?.access_token as string);
    return Response.json(res);
  } catch (err: any) {
    return NextResponse.json(err, {
      status: err?.status ?? 500,
    });
  }
};
