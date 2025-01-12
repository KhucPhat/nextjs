// React
import React from 'react';

// Layout
import LayoutAuth from '@/components/layout/auth';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function LayoutLogin({ children }: AuthLayoutProps) {
  return <LayoutAuth>{children}</LayoutAuth>;
}
