import { CartStatsData } from '@/types/CartType';
import { atom } from 'recoil';

export const totalCartSaleAtom = atom<CartStatsData>({
  key: 'totalCartSaleAtom',
  default: {
    items_count: 0,
    sale_items_count: 0,
  },
});
