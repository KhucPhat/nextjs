// Next
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// Service
import AuthService from '@/services/AuthService';

export const POST = async (request: NextRequest, res: NextApiResponse) => {
  try {
    const { email } = await request.json();
    const res = await AuthService.registerOTP({ email });
    return Response.json(res);
  } catch (err: any) {
    return NextResponse.json(err, {
      status: err?.status ?? 500,
    });
  }
};
