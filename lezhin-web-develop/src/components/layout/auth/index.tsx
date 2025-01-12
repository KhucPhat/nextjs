// React
import React from 'react';

// Provider
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import Logo from './Logo';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession();

  return (
    <div className="flex flex-col h-screen justify-center items-center w-full">
      <div className="mx-auto md:w-full md:max-w-md py-4 px-[28px] bg-primary w-full h-full max-md:overflow-y-scroll">
        <div className="max-md:w-full pb-8">
          <Logo />
          <SessionProvider session={session}>
            <div>{children}</div>
          </SessionProvider>
        </div>
      </div>
    </div>
  );
}
