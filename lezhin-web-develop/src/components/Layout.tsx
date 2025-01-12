import React from 'react';
import MainLayout from './layout/main';

type LayoutPropsType = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutPropsType) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
