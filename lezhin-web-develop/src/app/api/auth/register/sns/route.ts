// Next
import { NextRequest, NextResponse } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';

// Service
import AuthService from '@/services/AuthService';

// Util
import { MAIL_MAGAZINE_SUBCRIBED } from '@/utils/constants/cookieKeys';

export const POST = async (request: NextRequest) => {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    const isMagazineSubcribed = request.cookies.get(MAIL_MAGAZINE_SUBCRIBED)?.value === 'true';
    const token: JWT | null = await getToken({ req: request, secret });
    const res = await AuthService.registerSNS({
      email: (token?.email as string) ?? '',
      social_id: (token?.sub as string) ?? '',
      provider: (token?.provider as string) ?? '',
      is_mail_magazine_subscribed: isMagazineSubcribed,
    });
    return NextResponse.json(res);
  } catch (err: any) {
    return NextResponse.json(err, {
      status: err?.status ?? 500,
    });
  }
};
