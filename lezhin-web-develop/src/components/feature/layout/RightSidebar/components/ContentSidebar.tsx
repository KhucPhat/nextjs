// Next
import Image from 'next/image';
import Link from 'next/link';

// NextAuth
import { signOut } from 'next-auth/react';

// Libraries
import { useSetRecoilState } from 'recoil';

// Stores
import { drawerOpenState } from '@/stores/layout';

// Utils
import { deleteCookie } from '@/utils/cookies';
import { COMMON, SIDEBAR } from '@/utils/constants/langs';

// Constant
import { STORAGE_KEYS } from '@/utils/constants';

// Components
import { Button } from '@/components/ui/button';
import AdultContentTogge from './AdultContentTogge';

// Router
import { ROUTES } from '@/router/routes';

// Icons
import BonusPointIcon from '@/assets/icons/bonus-point.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import PointIcon from '@/assets/icons/point.svg';
import PresentIcon from '@/assets/icons/present.svg';
import { ChevronRightIcon } from 'lucide-react';

interface ContentSidebarProps {
  isLogin: boolean;
}

export default function ContentSidebar({ isLogin }: ContentSidebarProps) {
  const setIsOpen = useSetRecoilState(drawerOpenState);
  const userLogoUrl = '';

  const userOptions = [
    {
      icon: PresentIcon,
      label: '無料券',
      route: ROUTES.MY_PRESENT,
      value: '×2',
    },
    {
      icon: PointIcon,
      label: 'ポイント',
      route: ROUTES.BUY_POINT,
      value: '200PT',
    },
    {
      icon: BonusPointIcon,
      label: 'ボーナスポイント',
      route: ROUTES.BUY_POINT,
      value: '100PT',
    },
  ];

  const renderLinkItem = (href: string, label: string) => {
    return (
      <Link
        href={href}
        className="flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-100"
      >
        <span className="text-[15px] font-bold text-black">{label}</span>
        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
      </Link>
    );
  };

  const renderUserOptions = () => (
    <div className="w-full bg-white rounded-lg">
      {userOptions.map(({ icon: Icon, label, route, value }, idx) => (
        <Link
          key={label}
          href={route}
          className={`flex items-center justify-between px-4 py-3 ${
            idx < userOptions.length - 1 ? 'border-b' : ''
          } border-gray-200 hover:bg-gray-100`}
        >
          <div className="flex items-center">
            <Icon />
            <span className="text-black ml-1 text-[13px]">{label}</span>
          </div>
          <div className="flex items-center">
            <span className="text-black mr-1 text-sm">{value}</span>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          </div>
        </Link>
      ))}
    </div>
  );

  const renderAuthActions = () => {
    return (
      <>
        <Link
          href={ROUTES.LOGIN}
          className="w-full block mb-[12px]"
          onClick={() => setIsOpen(false)}
        >
          <Button className="h-[48px] w-full rounded-[40px] text-[15px]">{COMMON.login}</Button>
        </Link>
        <Link href={ROUTES.REGISTER} className="w-full block" onClick={() => setIsOpen(false)}>
          <Button className="h-[48px] w-full rounded-[40px] text-[15px]" variant="outline">
            {COMMON.register}
          </Button>
        </Link>
      </>
    );
  };

  const renderIsLogged = () => {
    return (
      <div className="flex flex-col items-center">
        {userLogoUrl ? (
          <Image src={userLogoUrl} width="80" height="80" alt="user-logo" />
        ) : (
          <div className="w-[80px] h-[80px] bg-white rounded-full" />
        )}
        <span className="text-[13px] font-bold mt-[18px]">{SIDEBAR.username}</span>
        <span className="text-[11px] mb-[18px] text-semi-transparent-black">LEZ123456</span>{' '}
        {/* TODO use Auth username */}
        <div className="w-full bg-white rounded-[6px]">{renderUserOptions()}</div>
      </div>
    );
  };

  const onHandleSignOut = () => {
    signOut().then(() => {
      deleteCookie(STORAGE_KEYS.CSRF_TOKEN);
      localStorage.clear();
    });
  };

  return (
    <div className="h-full w-full grow rounded-tl-[20px] bg-white">
      <div className="bg-lavender-mist p-4 rounded-tl-[20px]">
        <div className="pb-4 flex justify-between">
          <LogoIcon fill="black" />
          <AdultContentTogge />
        </div>
        {isLogin ? renderIsLogged() : renderAuthActions()}
      </div>
      <div>
        {renderLinkItem(ROUTES.MY_PAGE, COMMON.mypage)}
        {renderLinkItem(ROUTES.BUY_POINT, COMMON.buyPoint)}
        {renderLinkItem(ROUTES.HELP_CENTER, COMMON.helpCenter)}
      </div>
      {isLogin && (
        <div
          className="mt-[48px] text-primary border-b border-t border-gray-200 px-4 py-3 cursor-pointer hover:bg-gray-100 text-[15px]"
          onClick={onHandleSignOut}
        >
          {COMMON.logout}
        </div>
      )}
    </div>
  );
}
