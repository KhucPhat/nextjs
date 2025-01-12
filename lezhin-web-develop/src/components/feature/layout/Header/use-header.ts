// React
import { useEffect, useState } from 'react';

// Routes
import { usePathname, useSearchParams } from 'next/navigation';

// Services
import NextCartService from '@/services/NextCartService';

// Libraries
import { useRecoilState } from 'recoil';
import { totalCartSaleAtom } from '@/stores/cart';
import { getSession } from 'next-auth/react';

// Hooks
import useMediaQuery from '@/hooks/use-media-query';

// Utils
import { deleteCookie } from '@/utils/cookies';
import { ACCEPT_TERM } from '@/utils/constants/cookieKeys';
import { savePreviousRoute } from '@/utils/helpers';

const useHeader = () => {
  const isMobile = useMediaQuery('mobile');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [cartStatistic, setCartStatistic] = useRecoilState(totalCartSaleAtom);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const fetchCartStatistics = async () => {
    const session = await getSession();
    if (session) {
      try {
        const response = await NextCartService.getCartStatistics();
        setCartStatistic(response.results);
      } catch (error) {
        console.error('Failed to fetch cart statistics:', error);
      }
    } else {
      deleteCookie(ACCEPT_TERM);
    }
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    fetchCartStatistics();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobile && openDropdown) {
      setOpenDropdown(false);
    }
  }, [isMobile]);

  useEffect(() => {
    savePreviousRoute(pathname, searchParams.toString());
  }, [pathname, searchParams]);

  return { cartStatistic, isScrolled, openDropdown, setOpenDropdown };
};

export default useHeader;
