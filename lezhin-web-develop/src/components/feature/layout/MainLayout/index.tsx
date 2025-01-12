import React from 'react';

// Components
import Header from '../Header';
import Navbar from '../Navbar';
import Footer from '../Footer';
import RightSidebar from '../RightSidebar';

// Config
import { auth } from '@/configs/auth';

type LayoutPropsType = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: LayoutPropsType) => {
  const session = await auth();
  return (
    <div className={'flex flex-col min-h-screen relative bg-secondary'}>
      <Header />
      <div className="w-full grow max-w-[1280px] mx-auto sm:pt-[80px]">{children}</div>
      <RightSidebar isLogin={!!session?.email} />
      <Navbar />
      <Footer />
    </div>
  );
};

export default MainLayout;
