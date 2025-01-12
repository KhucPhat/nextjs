'use client';
// React
import React from 'react';

// Next
import Link from 'next/link';
import { signOut } from 'next-auth/react';

// Utils
import { deleteCookie } from '@/utils/cookies';

// Router
import { ROUTES } from '@/router/routes';

// Constant
import { STORAGE_KEYS } from '@/utils/constants';

// Lang
import { COMMON } from '@/utils/constants/langs';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const handleSignOut = () => {
    signOut().then(() => {
      deleteCookie(STORAGE_KEYS.CSRF_TOKEN);
      localStorage.clear();
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/*===Header===*/}
      <nav className="navbar navbar-expand navbar-dark bg-white px-5 py-3">
        <Link href={ROUTES.HOME_PAGE} className="me-3 hover:underline">
          {COMMON.homePage}
        </Link>
        <span onClick={() => handleSignOut()} className="cursor-pointer hover:underline">
          {COMMON.logout}
        </span>
      </nav>

      {/*===Main content===*/}
      <div className="container-fluid flex flex-1 bg-gray-300">{children}</div>

      {/*===Footer===*/}
      <footer className="text-center bg-white">
        <div className="text-center text-dark p-3">{COMMON.copyright}</div>
      </footer>
    </div>
  );
}
