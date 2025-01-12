// NextAuth
import NextAuth from 'next-auth';

// Config
import { authOptions } from '@/configs/auth';

// Route
import { ROUTES } from '@/router/routes';

const handler = async function auth(req: any, res: any) {
  const nextAuthResponse = await NextAuth(req, res, authOptions);
  // handle callback error and redirect to home page
  if (req.url.includes('callback')) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const error = searchParams.get('error');
    if (error) {
      console.debug('DEBUG NextAuth.handler error', error);
      const errorRedirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTES.HOME_PAGE}`;
      nextAuthResponse.headers.set('location', errorRedirectUrl);
      return nextAuthResponse;
    }
  }
  return nextAuthResponse;
};

export { handler as GET, handler as POST };
