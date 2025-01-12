'use client';
// React
import * as React from 'react';
import { totalCartSaleAtom } from '@/stores/cart';

// Icons
import ShoppingIcon from '@/assets/icons/shopping.svg';
import { ChevronRightIcon } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { SALE_ITEMS_CART } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers';

export default function AlertCart() {
  const { sale_items_count } = useRecoilValue(totalCartSaleAtom);

  if (!sale_items_count) return <></>;

  return (
    <div className="bg-white p-2">
      <div className="border border-primary flex items-center sm:justify-center max-sm:justify-between  bg-light-yellow text-red-500 rounded py-3 px-4">
        <div />
        <div className="flex items-center">
          <ShoppingIcon width="18" height="18" viewBox="0 0 28 28" />
          <span className="font-bold text-[13px] leading-[18px]">
            {parseMessage(SALE_ITEMS_CART.itemsCartOnSale, [sale_items_count])}
          </span>
        </div>
        <ChevronRightIcon className="h-5 w-5 sm:ml-6" />
      </div>
    </div>
  );
}
