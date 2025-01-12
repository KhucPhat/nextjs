import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions, getServerSession } from 'next-auth';

// provider
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import TwitterProvider from 'next-auth/providers/twitter';

// Services
import AuthService from '@/services/AuthService';
import NextAuthService from '@/services/NextAuthService';

// Utils
import {
  SNS_EXISTED_IN_SNS_ACCOUNT,
  EXISTED_USER_EMAIL,
  NOT_EXISTED_SNS_ACCOUNT,
  SNS_WITHOUT_EMAIL,
} from '@/utils/constants/errorCodes';

// Router
import { ROUTES } from '@/router/routes';
import { getExpiresToken } from '@/utils/helpers/auth';
import { REFRESH_TOKEN_ERROR } from '@/utils/constants/common';

const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }: any) {
      return { ...session, ...token };
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session };
      }

      if (user && user.provider === 'credentials') {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.provider = user.provider;
        token.expires_in = getExpiresToken(user.expires_in);
      }

      if (account && account.provider !== 'credentials') {
        token.id_token = account.id_token;
        token.sns_access_token = account.access_token;
        token.sns_refresh_token = account.refresh_token;
        if (account.provider === 'twitter') {
          account.provider = 'x';
        }
        token.provider = account.provider;
      }

      if (!token.access_token && token.provider !== 'credentials') {
        try {
          const res = await AuthService.loginSNS({
            provider: token?.provider! as string,
            token: token.sns_access_token! as string,
          });

          token.access_token = res.results.access_token;
          token.refresh_token = res.results.refresh_token;
          token.expires_in = getExpiresToken(res.results.expires_in);
        } catch (error) {
          console.debug('DEBUG NextAuth.jwt login sns', error);
        }
      }

      if (!token.id && token.access_token) {
        try {
          const userInfoResponse = await AuthService.getUserInfo(token.access_token as string);
          token.id = userInfoResponse.results.id;
          token.email = userInfoResponse.results.email;
          token.name = userInfoResponse.results.name;
        } catch (err: any) {
          console.debug('DEBUG NextAuth.jwt get user info', err);
        }
      }

      // Buffer time in milliseconds to request a new token before the current token expires.
      // This ensures the application has enough time to handle potential delays in token renewal.
      const buffer = 30000;

      if (Date.now() - buffer >= (token?.expires_in as number)) {
        try {
          const results = await NextAuthService.refreshAccessToken({
            email: token.email as string,
            refresh_token: token.refresh_token as string,
          });
          token.access_token = results.access_token;
          token.expires_in = getExpiresToken(results.expires_in);
        } catch (error) {
          return { ...token, error: REFRESH_TOKEN_ERROR };
        }
      }

      return token;
    },
    async signIn({ user, account, profile }) {
      const supportedProviders = ['google', 'line', 'yahoo', 'twitter'];
      if (account?.provider === 'credentials') {
        return Promise.resolve(true);
      }

      if (supportedProviders.includes(account?.provider!)) {
        try {
          if (account?.provider === 'twitter') {
            account.provider = 'x';
          }
          await AuthService.getUserInfoBySns({
            provider: account?.provider!,
            social_id: account?.providerAccountId!,
            email: user.email || '',
          });
          return Promise.resolve(true);
        } catch (error: any) {
          if (error.message === EXISTED_USER_EMAIL) {
            return `${ROUTES.LOGIN}?error=${error.message}`;
          }
          if (error.message?.includes(SNS_EXISTED_IN_SNS_ACCOUNT)) {
            return `${ROUTES.REGISTER}?error=${error.message}`;
          }
          if (error.message === NOT_EXISTED_SNS_ACCOUNT) {
            if (user.email) {
              // handle redirect to /register/term/sns in layout
              return Promise.resolve(true);
            } else {
              return `${ROUTES.REGISTER}?error=${SNS_WITHOUT_EMAIL}`;
            }
          }
        }
      }

      return false;
    },
  },
  providers: [
    {
      id: 'yahoo',
      name: 'Yahoo',
      type: 'oauth',
      version: '2.0',
      clientId: process.env.YAHOO_CLIENT_ID!,
      clientSecret: process.env.YAHOO_CLIENT_SECRET!,
      wellKnown: process.env.YAHOO_URL_WELL_KNOW!,
      authorization: {
        params: {
          client_id: process.env.YAHOO_CLIENT_ID!,
          response_type: 'code',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile,
          email: profile.email,
          image: profile.picture || profile.avatar,
        };
      },
      idToken: true,
      client: {
        authorization_signed_response_alg: 'ES256',
        id_token_signed_response_alg: 'RS256',
      },
    },
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const { email, password } = credentials;

        try {
          const res = await AuthService.login({
            email,
            password,
          });
          return {
            id: '',
            access_token: res.results.access_token as string,
            refresh_token: res.results.refresh_token as string,
            expires_in: res.results.expires_in as number,
            provider: 'credentials',
          };
        } catch (error) {
          return null;
        }
      },
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.X_CLIENT_ID!,
      clientSecret: process.env.X_CLIENT_SECRET!,
      version: '2.0',
    }),
  ],
  cookies: {},
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {},
  theme: {},
};

function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export { authOptions, auth };
