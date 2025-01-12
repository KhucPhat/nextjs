'use client';
// Next
import Image from 'next/image';

// Libraries
import { fromUnixTime } from 'date-fns';

// Components
import Countdown from '@/components/common/CountDown';
import ChapterPrice from '../ChapterPrice';

// Icons
import BlingFillIcon from '@/assets/icons/bling-fill.svg';

// Types
import { ChapterData } from '@/types/ComicType';

// Utils
import { COMIC_ITEM } from '@/utils/constants/langs';

interface ChapterItemProps {
  item: ChapterData;
  onClickChapter: () => void;
  onCountdownComplete: () => void;
  hasWaitForFree?: boolean;
}

export default function ChapterItem({
  item,
  onClickChapter,
  onCountdownComplete,
  hasWaitForFree,
}: ChapterItemProps) {
  const renderImage = (src: string | undefined) => {
    if (!src) return <></>;
    return (
      <div className="h-[57px] w-[76px] relative border-very-light-black flex items-center justify-center last:ml-1">
        <Image
          src={src}
          style={{ objectFit: 'cover' }}
          alt={src}
          className="h-[57px] w-auto"
          height={57}
          width={57}
        />
      </div>
    );
  };

  return (
    <div
      className="flex items-center justify-between px-4 py-2 border-very-light-black border-b"
      onClick={onClickChapter}
    >
      <div className="flex">
        {renderImage(item?.cover_thumbnail_url_1)}
        {renderImage(item?.cover_thumbnail_url_2)}
      </div>

      <div className="mx-3 grow">
        <p className="text-black text-[11px]">{item.name}</p>
        <div className="mt-1">
          {item?.sale_rate && (
            <div className="text-primary text-[11px] flex items-center">
              {item.sale_rate}
              {COMIC_ITEM.rateOff} <BlingFillIcon />
            </div>
          )}
          {item?.sale_expires_date && (
            <Countdown
              className="w-fit text-[11px] text-black/50 text-start"
              targetDate={fromUnixTime(item.sale_expires_date)}
              showAsDateIfMoreThan24Hours
              prefix="("
              suffix=")"
              onCountdownComplete={onCountdownComplete}
            />
          )}
        </div>
      </div>
      <ChapterPrice
        item={item}
        onWaitForFreeExpired={onCountdownComplete}
        hasWaitForFree={hasWaitForFree}
      />
    </div>
  );
}
