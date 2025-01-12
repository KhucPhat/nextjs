// Next
import { NextResponse } from 'next/server';

// Service
import AuthService from '@/services/AuthService';

export const POST = async (request: any) => {
  try {
    const { email, password } = await request.json();
    const res = await AuthService.login({ email, password });
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json(err, {
      status: err?.status ?? 500,
    });
  }
};
