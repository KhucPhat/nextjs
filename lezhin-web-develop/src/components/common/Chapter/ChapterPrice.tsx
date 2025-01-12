'use client';

// Next
import { useSession } from 'next-auth/react';

// Libraries
import { fromUnixTime } from 'date-fns';

// Components
import Countdown from '@/components/common/CountDown';

// Icons
import WaitForFreeSquareIcon from '@/assets/icons/wait-for-free-square.svg';
import WaitForFreeSquareDisableIcon from '@/assets/icons/wait-for-free-square-disable.svg';
import BonusPointIcon from '@/assets/icons/bonus-point.svg';
import PointIcon from '@/assets/icons/point.svg';
import PresentIcon from '@/assets/icons/present.svg';

// Types
import { ChapterData } from '@/types/ComicType';

// Utils
import { COMIC_ITEM } from '@/utils/constants/langs';
import { calculateDiscountedPrice } from '@/utils/helpers/calculator';

interface ChapterPriceProps {
  item: ChapterData;
  hasWaitForFree?: boolean;
  onWaitForFreeExpired?: () => void;
}

export default function ChapterPrice({
  item,
  hasWaitForFree,
  onWaitForFreeExpired,
}: ChapterPriceProps) {
  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';

  switch (item.viewable_type) {
    case 'free':
      return <p className="text-primary text-[11px] font-bold">{COMIC_ITEM.free}</p>;

    case 'free_ticket':
      return (
        <div>
          <PresentIcon width="32px" height="32px" viewBox="0 0 18 18" />
        </div>
      );

    case 'wait_for_free':
      if (!isAuthenticated) return <></>;
      else if (item?.wait_for_free_expires_at) {
        return (
          <div>
            <p className="text-end text-[11px] font-bold text-black/50">{COMIC_ITEM.viewingTime}</p>
            <Countdown
              className="text-[11px] text-black/50"
              targetDate={fromUnixTime(item.wait_for_free_expires_at)}
              prefix={COMIC_ITEM.remaining}
              onCountdownComplete={() => {
                onWaitForFreeExpired && onWaitForFreeExpired();
              }}
            />
          </div>
        );
      } else if (hasWaitForFree) {
        return (
          <div>
            <WaitForFreeSquareDisableIcon width="32px" height="32px" viewBox="0 0 32 32" />
          </div>
        );
      }
      return (
        <div>
          <WaitForFreeSquareIcon width="32px" height="32px" viewBox="0 0 22 22" />
        </div>
      );

    case 'bonus_point':
      return (
        <div>
          {item?.sale_rate && (
            <div className="text-[13px] line-through text-black/50 text-end">
              {item.point_consumption}
            </div>
          )}
          <div className="flex">
            <div className="flex w-7 relative">
              <BonusPointIcon className="z-[1] absolute left-0" />
              <PointIcon className="absolute left-2.5" />
            </div>
            <p className="text-[15px] leading-[15px]">
              {calculateDiscountedPrice(item.point_consumption, item.sale_rate)}
            </p>
          </div>
        </div>
      );

    case 'point':
      return (
        <div>
          {item?.sale_rate && (
            <div className="text-[13px] line-through text-black/50 text-end">
              {item.point_consumption}
            </div>
          )}

          <div className="flex">
            <PointIcon />
            <p className="text-[15px] leading-[15px]">
              {calculateDiscountedPrice(item.point_consumption, item.sale_rate)}
            </p>
          </div>
        </div>
      );

    default:
      return <></>;
  }
}
