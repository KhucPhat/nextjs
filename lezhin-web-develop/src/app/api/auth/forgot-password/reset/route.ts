// Next
import { NextResponse } from 'next/server';

// Service
import AuthService from '@/services/AuthService';

export const POST = async (request: any) => {
  try {
    const { email, password, code } = await request.json();
    const res = await AuthService.forgotPasswordReset({ email, password, code });
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json(err, {
      status: err?.status ?? 500,
    });
  }
};
