'use client';

// React
import { useState } from 'react';

// Next
import Image from 'next/image';

// Icons
import bonusPoint from '@/assets/icons/bonus-point.svg?url';
import point from '@/assets/icons/point.svg?url';

// Img
import CheckRedIcon from '@/assets/icons/check-red.svg';

// Component
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Description, DialogTitle } from '@radix-ui/react-dialog';

// Utils
import { Cart, COMIC_ITEM } from '@/utils/constants/langs';

// Styles
import './styles.css';

interface ModalCheckPriceBottomProps {
  numberVolume: number;
  isBuyPoint?: boolean;
  isBuyBonusPoint?: boolean;
  total: number;
}

export default function ModalCheckPriceBottom({
  numberVolume,
  isBuyPoint,
  isBuyBonusPoint,
  total,
}: ModalCheckPriceBottomProps) {
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  return (
    <Sheet key="bottom" modal={false} open={openSheet}>
      <SheetTrigger asChild disabled={openSheet}>
        <Button
          className="flex w-[280px] h-9 text-[13px] rounded btn-drop-shadow-red ml-auto mr-auto"
          onClick={() => setOpenSheet(true)}
        >
          {COMIC_ITEM.bulkPurchase}
        </Button>
      </SheetTrigger>
      <SheetContent
        onInteractOutside={() => setOpenSheet(false)}
        side="bottom"
        className="rounded-t-xl !z-[1] p-0 custom-sheet !z-[3] custom-height-sheet"
      >
        <DialogTitle className="hidden" />
        <Description className="hidden" />
        <div className="pb-2 pt-3 px-4">
          <div className="flex items-center pb-2">
            {numberVolume > 0 && (
              <>
                <div className="w-[15px] h-[15px]">
                  <CheckRedIcon />
                </div>
                <p className="text-[15px] text-black">
                  <span className="font-family-inter text-[15.5px]">{numberVolume}</span>
                  {Cart.quantity}
                </p>
              </>
            )}
          </div>
          <div className="h-[30px] bg-black-51 rounded-lg flex items-center justify-between px-2.5 text-black mb-4">
            <p className="text-[11px]">{Cart.consumption}</p>
            <div className="items-center flex h-full">
              <div className="absolute w-[18px] h-[18px] z-[2]">
                {isBuyPoint && <Image src={bonusPoint} alt="bonus-point" fill className="z-[2]" />}
                {isBuyBonusPoint && (
                  <div
                    className={`absolute ${isBuyPoint && 'left-[10px]'} w-[18px] h-[18px] top-0`}
                  >
                    <Image src={point} alt="point" fill />
                  </div>
                )}
              </div>
              <p
                className={`font-bold text-[15px] text-black text-center flex items-center ${
                  isBuyPoint && isBuyBonusPoint ? 'ml-[30px]' : 'ml-[20px]'
                }`}
              >
                {total}
              </p>
            </div>
          </div>
          <Button className="flex w-[calc(100%_-_70px)] h-9 text-[13px] rounded btn-drop-shadow-red ml-auto mr-auto">
            {Cart.addCart}
          </Button>
          <p
            onClick={() => setOpenSheet(false)}
            className="text-black-60 text-[13px] leading-[13px] mt-[19.5px] text-center cursor-pointer w-fit ml-auto mr-auto"
          >
            {Cart.cancel}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
