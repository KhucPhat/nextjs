import { ISODateString } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User extends JWT {}

  interface Session extends JWT {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: ISODateString;
  }

  interface JWT {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    id_token?: string | null;
    provider?: string | null;
    access_token?: string | null;
    refresh_token?: string | null;
    expires_in?: number | null;
    sns_access_token?: string | null;
    sns_refresh_token?: string | null;
    error?: 'RefreshTokenError';
  }
}
