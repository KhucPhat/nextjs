'use client';

// React
import { useEffect, useState } from 'react';

// Next
import { getSession } from 'next-auth/react';
import Link from 'next/link';

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ContentSidebar from '../RightSidebar/components/ContentSidebar';

// Router
import { ROUTES } from '@/router/routes';

// Hooks
import useHeader from './use-header';
import useMediaQuery from '@/hooks/use-media-query';

// Icons
import LogoIcon from '@/assets/icons/logo.svg';
import ShoppingIcon from '@/assets/icons/shopping.svg';
import GiftIcon from '@/assets/icons/gift.svg';
import SearchIcon from '@/assets/icons/search.svg';
import BookIcon from '@/assets/icons/book.svg';
import VipIcon from '@/assets/icons/vip.svg';
import GroupIcon from '@/assets/icons/group.svg';
import MenuIcon from '@/assets/icons/menu.svg';

const navItems = [
  {
    href: ROUTES.RANKING,
    label: 'ランキング',
    icon: VipIcon,
    hideMobile: true,
    key: 'ranking',
  },
  {
    href: ROUTES.SERIES,
    label: '連載',
    icon: GroupIcon,
    hideMobile: true,
    key: 'series',
  },
  {
    href: ROUTES.MY_BOOKSHELF,
    label: '本棚',
    icon: BookIcon,
    hideMobile: true,
    key: 'bookshelf',
  },
  {
    href: ROUTES.CART,
    label: 'カート',
    icon: ShoppingIcon,
    hideMobile: false,
    key: 'cart',
  },
  {
    href: ROUTES.MY_PRESENT,
    label: 'Myプレゼント',
    icon: GiftIcon,
    hideMobile: false,
    key: 'present',
  },
  {
    href: ROUTES.SEARCH,
    label: '検索',
    icon: SearchIcon,
    hideMobile: false,
    key: 'search',
  },
];

export default function Header() {
  const { cartStatistic, isScrolled, openDropdown, setOpenDropdown } = useHeader();
  const isPC = useMediaQuery('mobile');
  const { items_count } = cartStatistic;
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    async function getAuthSession() {
      if (await getSession()) {
        setIsLogged(true);
      }
    }
    getAuthSession();
  }, []);

  return (
    <div
      className={`fixed z-10 w-full px-4 py-3 top-0 left-0 sm:bg-primary ${
        isScrolled ? 'bg-primary' : 'max-sm:bg-gradient-to-b from-black/70 to-black/0'
      } sm:h-[80px]`}
      style={{
        paddingRight: openDropdown ? '1.625rem' : '1rem',
      }}
    >
      <div className="flex items-center justify-between max-w-[1280px] mx-auto">
      <Link href={ROUTES.HOME_PAGE}>
        <LogoIcon fill="#fff" />
      </Link>
        <div className="flex">
          {navItems.map((item, index) => {
            const { href, label, hideMobile, key } = item;

            return (
              <Link
                key={index}
                href={href}
                className={`flex items-center flex-col justify-between ml-2 text-white sm:w-[71px] ${
                  hideMobile && 'max-sm:hidden'
                }`}
              >
                <span className="text-[11px] mb-2.5 max-sm:hidden">{label}</span>
                {key === 'cart' ? (
                  <div className="relative">
                    <item.icon />
                    {items_count > 0 && (
                      <div
                        className={`${
                          !isPC
                            ? 'bg-[#FFF42A] text-primary'
                            : isScrolled
                            ? 'bg-[#FFF42A] text-primary'
                            : 'text-white bg-primary'
                        } absolute top-0 right-0 flex items-center justify-center w-4 h-4 font-bold rounded-full text-xs`}
                      >
                        {items_count}
                      </div>
                    )}
                  </div>
                ) : (
                  <item.icon />
                )}
              </Link>
            );
          })}

          <DropdownMenu open={openDropdown} onOpenChange={() => setOpenDropdown(!openDropdown)}>
            <DropdownMenuTrigger className="outline-none">
              <div
                className={`flex-1 flex flex-col items-center cursor-pointer text-white sm:w-[71px] max-sm:hidden`}
              >
                <span className="text-[11px] mb-2.5">メニュー</span>
                <MenuIcon className="h-6 w-6" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-[20px] p-0 w-[290px]">
              <ContentSidebar isLogin={isLogged} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
