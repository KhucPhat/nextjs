// Next
import { NextRequest, NextResponse } from 'next/server';

// Service
import AuthService from '@/services/AuthService';

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    const res = await AuthService.resendOTP({
      email,
    });
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json(err, {
      status: err?.status ?? 500,
    });
  }
};
