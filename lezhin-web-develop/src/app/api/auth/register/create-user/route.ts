// Next
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// Service
import AuthService from '@/services/AuthService';

export const POST = async (request: NextRequest, res: NextApiResponse) => {
  try {
    const { password, email, is_mail_magazine_subscribed } = await request.json();
    const res = await AuthService.registerEmail({ email, password, is_mail_magazine_subscribed });
    return Response.json(res);
  } catch (err: any) {
    return NextResponse.json(err, {
      status: err?.status ?? 500,
    });
  }
};
