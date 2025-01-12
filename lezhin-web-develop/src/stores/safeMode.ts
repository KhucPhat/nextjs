import { SafeMode } from '@/types/SafeModeType';
import { atom } from 'recoil';

export const safeModeAtom = atom<SafeMode>({
  key: 'safeModeAtom',
  default: {
    isSafeMode: false,
  },
});
