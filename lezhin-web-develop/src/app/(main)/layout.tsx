// React
import React from 'react';

// Layout
import MainLayout from '@/components/feature/layout/MainLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
