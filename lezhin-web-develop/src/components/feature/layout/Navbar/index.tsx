'use client';

// Next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Libraries
import { useSetRecoilState } from 'recoil';

// Stores
import { drawerOpenState } from '@/stores/layout';

// Router
import { ROUTES } from '@/router/routes';

// Hooks
import useMediaQuery from '@/hooks/use-media-query';

// Icons
import HomeIcon from '@/assets/icons/home.svg';
import BookIcon from '@/assets/icons/book.svg';
import VipIcon from '@/assets/icons/vip.svg';
import GroupIcon from '@/assets/icons/group.svg';
import MenuIcon from '@/assets/icons/menu.svg';

export default function Navbar() {
  const isMobile = useMediaQuery('mobile');
  const pathname = usePathname();
  const setIsOpen = useSetRecoilState(drawerOpenState);

  const navItems = [
    {
      href: ROUTES.HOME_PAGE,
      label: 'TOP',
      icon: HomeIcon,
    },
    {
      href: ROUTES.RANKING,
      label: 'ランキング',
      icon: VipIcon,
    },
    {
      href: ROUTES.SERIES,
      label: '連載',
      icon: GroupIcon,
    },
    {
      href: ROUTES.MY_BOOKSHELF,
      label: '本棚',
      icon: BookIcon,
    },
    {
      label: 'メニュー',
      icon: MenuIcon,
      onClick: () => setIsOpen(true),
    },
  ];

  if (!isMobile) return <div />;

  return (
    <div className="flex justify-around bg-white h-[62px] shadow-lg fixed bottom-0 left-0 right-0 z-[99]">
      {navItems.map((item, index) => {
        const { onClick, href, label } = item;

        return href ? (
          <Link key={index} href={href} className="flex-1">
            <div
              className={`flex flex-col items-center cursor-pointer ${
                href === pathname ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <span className="text-[11px]">{label}</span>
              <item.icon className="h-6 w-6" />
            </div>
          </Link>
        ) : (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center cursor-pointer text-gray-500`}
            {...(onClick && { onClick })}
          >
            <span className="text-[11px]">{label}</span>
            <item.icon className="h-6 w-6" />
          </div>
        );
      })}
    </div>
  );
}
