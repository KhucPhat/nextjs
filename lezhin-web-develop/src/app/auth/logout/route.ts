// Next
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Router
import { ROUTES } from '@/router/routes';

export async function GET() {
  const cookieStore = cookies();
  const allCookies = cookieStore?.getAll();

  allCookies?.forEach((cookie) => {
    if (cookie.name.includes('session-token')) {
      cookies().set({
        name: cookie.name,
        value: '',
        httpOnly: true,
        path: '/',
        expires: new Date(0),
      });
    }
  });

  redirect(ROUTES.LOGIN);
}
