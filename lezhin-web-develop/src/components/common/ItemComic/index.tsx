'use client';

// Next
import Image from 'next/image';
import { useSession } from 'next-auth/react';

// Components
import { Button } from '@/components/ui/button';

// Icons
import waitForFreeSrc from '@/assets/icons/wait-for-free.svg?url';
import lezhinOriginalSrc from '@/assets/icons/lezhin-original.svg?url';
import upSrc from '@/assets/icons/up.svg?url';
import blingFillSrc from '@/assets/icons/bling-fill.svg?url';

// Styles
import './styles.css';

// types
import { ComicData } from '@/types/ComicType';

// Utils
import { BUTTON_TYPE, COMIC_ITEM } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers';
import { checkAvatarUrl, convertSaleRate } from '@/utils/validate';
import { BUTTON_KEYS, SALE_TYPE } from '@/utils/constants/common';
import { REDIRECT_TO_CART } from '@/utils/constants/localStorage';
import { bindPath } from '@/utils/helpers';

// Router
import { ROUTES } from '@/router/routes';

// Hooks
import { useRouter } from '@/hooks/useRouter';

interface ItemComicProps {
  data: ComicData;
}

const ItemComic = ({ data }: ItemComicProps) => {
  const {
    hash_id,
    title_hash_id,
    cover_thumbnail_url,
    name,
    display_order,
    is_waiting_for_free,
    is_up,
    is_original,
    is_safe_mode,
    sale_type,
    sale_rate,
    button_type,
    comic_type,
    total_free,
  } = data;

  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const contentButton = (key: string) => {
    return BUTTON_TYPE?.[key] || BUTTON_TYPE.add_to_cart;
  };

  const handleButton = (type: string) => {
    let href = ROUTES.CART;

    if (type === BUTTON_KEYS.ADD_TO_CART && !isAuthenticated) {
      localStorage.setItem(REDIRECT_TO_CART, hash_id);
      router.push(ROUTES.LOGIN);
      return;
    } else if ([BUTTON_KEYS.VOLUME_TRIAL, BUTTON_KEYS.OPEN_CART].includes(type)) {
      href = ROUTES.VIEWER;
    }

    router.push(`${href}?hash_id=${hash_id}`);
  };

  const handleRedirectDetailPage = (type: string, hashId: string, titleHashId: string) => {
    if (type === 'volume') {
      router.push(bindPath(ROUTES.VOLUME_DETAIL, [titleHashId, hashId]));
    } else if (type === 'chapter') {
      router.push(bindPath(ROUTES.COMIC_DETAIL, [titleHashId]));
    } else {
      router.push(bindPath(ROUTES.COMIC_DETAIL, [hashId]));
    }
  };

  return (
    <div className="item-comic w-full max-w-[210px]">
      <div className="item-comic-image-box relative flex items-center justify-center max-w-[210px]">
        <div
          className="item-comic-image w-full h-full flex items-center justify-center"
          onClick={() => handleRedirectDetailPage(comic_type, hash_id, title_hash_id)}
        >
          <Image
            src={checkAvatarUrl(cover_thumbnail_url)}
            style={{ objectFit: 'contain' }}
            fill
            alt={name}
          />
        </div>
        {is_original && (
          <div className="absolute top-0 left-0">
            <Image
              src={lezhinOriginalSrc}
              style={{ objectFit: 'contain' }}
              alt="lezhin-original"
              className="w-[55px] h-[28px]  max-md:w-[32px] max-md:h-[16px]"
            />
          </div>
        )}
        {is_waiting_for_free && (
          <div className="absolute bottom-0 right-0">
            <Image
              src={waitForFreeSrc}
              style={{ objectFit: 'contain' }}
              alt="wait-for-free"
              className="w-[60px] h-[32px]  max-md:w-[34px] max-md:h-[18px]"
            />
          </div>
        )}
      </div>
      <div className="item-comic-content pt-2 pb-4 px-1.5">
        <div className="flex">
          {is_up && (
            <Image src={upSrc} style={{ objectFit: 'contain' }} alt="up" className="pr-[2px]" />
          )}
          <span className="truncate text-[18px] max-md:text-[13px] text-ellipsis overflow-hidden">
            {name}
          </span>
        </div>

        {sale_type === SALE_TYPE.DISCOUNT && (
          <div className="flex h-[27px]">
            <span
              className={`text-[18px] max-md:text-[13px] text-primary ${!sale_rate && 'mb-[17px]'}`}
            >
              {sale_rate && parseMessage(COMIC_ITEM.saleRateOff, [convertSaleRate(sale_rate)])}
            </span>
            {sale_rate && <Image src={blingFillSrc} objectFit="contain" alt="bling-fill" />}
          </div>
        )}
        {sale_type === SALE_TYPE.CASHBACK && (
          <div className="flex h-[27px]">
            <span
              className={`text-[18px] max-md:text-[13px] text-primary ${!sale_rate && 'mb-[17px]'}`}
            >
              {sale_rate && parseMessage(COMIC_ITEM.saleRatePoint, [convertSaleRate(sale_rate)])}
            </span>
            <Image src={blingFillSrc} objectFit="contain" alt="bling-fill" />
          </div>
        )}
        {!sale_type && <div className="h-[27px]" />}

        {button_type && button_type !== BUTTON_KEYS.COMIC_DETAIL ? (
          <div className="flex justify-center">
            <Button
              onClick={() => handleButton(button_type)}
              className={`mt-2.5 w-[calc(100%_-_30px)] max-md:w-[calc(100%_-_11px)] max-md:h-[48px] max-md:h-[28px] text-[18px] max-md:text-[11px] rounded-full btn-drop-shadow-red ${
                button_type === 'volume_trial' && '!bg-trial custom-border text-black'
              }`}
            >
              {total_free > 0 && total_free} {contentButton(button_type)}
            </Button>
          </div>
        ) : (
          <div className="h-[38px]" />
        )}
      </div>
    </div>
  );
};

export default ItemComic;
