'use client';

// Libraries
import { useRecoilState } from 'recoil';
import { Drawer } from 'vaul';

// Components
import ContentSidebar from './components/ContentSidebar';

// Stores
import { drawerOpenState } from '@/stores/layout';

// Icons
import CloseIcon from '@/assets/icons/close.svg';

// Lang
import { SIDEBAR } from '@/utils/constants/langs';

interface RightSidebarProps {
  isLogin: boolean;
}

export default function RightSidebar({ isLogin }: RightSidebarProps) {
  const [isOpen, setIsOpen] = useRecoilState(drawerOpenState);

  return (
    <Drawer.Root open={isOpen} direction="right" onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-dark-gray-modal-50 z-20" />
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="fixed top-4 left-4 z-30"
            aria-label="Close Drawer"
          >
            <CloseIcon />
          </button>
        )}
        <Drawer.Content
          className="right-0 top-0 bottom-0 fixed z-20 outline-none w-[290px] flex"
          style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
        >
          <Drawer.Title className="hidden">{SIDEBAR.dialogTitle}</Drawer.Title>
          <ContentSidebar isLogin={isLogin} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
