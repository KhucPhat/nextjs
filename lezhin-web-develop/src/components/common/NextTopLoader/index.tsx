'use client';
import { useEffect } from 'react';

// Libraries
import Loader from 'nextjs-toploader';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

const NextTopLoader = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return <Loader showSpinner={false} />;
};

export default NextTopLoader;
