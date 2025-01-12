'use client';

// Routes
import Image from 'next/image';
import { ROUTES } from '@/router/routes';
import { useParams } from 'next/navigation';
import { useRouter } from '@/hooks/useRouter';

// Components
import { ButtonBase } from '@/components/common/Button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { CheckBoxBase } from '@/components/common/CheckBox';
import Countdown from '@/components/common/CountDown';

// Validates
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { checkAvatarUrl } from '@/utils/validate';

// Libraries
import { fromUnixTime } from 'date-fns';

// Utils
import { BUTTON_TYPE_COMIC, COMIC, VOLUME_DETAIL } from '@/utils/constants/langs';
import { calculateDiscountedPrice, formatVolumeRange } from '@/utils/comicUtils';

// Icons
import blingFillRed from '@/assets/icons/bling-fill-red.svg?url';
import bonusPoint from '@/assets/icons/bonus-point.svg?url';
import point from '@/assets/icons/point.svg?url';

// Types
import { VolumeData } from '@/types/ComicType';

// Styles
import './styles.css';

const formSchema = z.object({});
type FormDataIterator = UseFormReturn<any>;

interface VolumeProps {
  data: VolumeData;
  isItemSelected?: boolean;
  available?: boolean;
  onCountdownComplete?: () => void;
}

export default function ItemVolume({
  data,
  isItemSelected = false,
  available = false,
  onCountdownComplete,
}: VolumeProps) {
  const router = useRouter();
  const param = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleTypeLabelLeft = (isInCart: boolean, isBought: boolean) => {
    if (isInCart) return BUTTON_TYPE_COMIC.inCart;
    if (isBought) return BUTTON_TYPE_COMIC.bought;
    return BUTTON_TYPE_COMIC.addCart;
  };

  const handleTypeLabelRight = (isBought: boolean, isFree: boolean) => {
    return isFree ? BUTTON_TYPE_COMIC.free : isBought ? BUTTON_TYPE_COMIC.bought : '';
  };

  const renderActionCheckBox = (available: boolean) => {
    return (
      <div className="absolute top-[40%] right-0 custom-checkbox">
        {available ? (
          <FormField
            control={form.control}
            name={data.name || ''}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CheckBoxBase
                    {...field}
                    name={data.name || ''}
                    value={form.getValues(data.name || '')}
                    classNameCheckBox="w-[14px] h-[14px] absolute top-[50%] right-0 !translate-y-[90%]"
                    htmlFor={data.name || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <div>
            {data.is_allow_trial && <p>{VOLUME_DETAIL.notAvailable}</p>}
            {data.is_bought && <p>{VOLUME_DETAIL.purchased}</p>}
          </div>
        )}
      </div>
    );
  };

  const renderActionButton = () => {
    return (
      <>
        {!isItemSelected ? (
          <div className="flex w-full h-auto items-end justify-end">
            {data.is_allow_trial &&
              data.free_volume &&
              !data.is_bought &&
              data.sale_type !== VOLUME_DETAIL.saleType.free && (
                <ButtonBase
                  fullBg
                  label={BUTTON_TYPE_COMIC.trialRead}
                  onClick={() => router.push(ROUTES.VOLUME_PREVIEW)}
                  className="text-dark-gray text-[11px] w-[100px] h-7 !bg-golden-yellow border-0 border-b-2 border-amber ml-4"
                />
              )}
            {!data.is_added_to_cart &&
              data.sale_type !== VOLUME_DETAIL.saleType.free &&
              !data.is_bought && (
                <ButtonBase
                  fullBg
                  label={handleTypeLabelLeft(data.is_added_to_cart, data.is_bought)}
                  onClick={() => router.push(ROUTES.CART)}
                  className="text-[11px] w-[100px] h-7 text-white border-0 border-b-2 border-dark-red ml-4"
                />
              )}
            {data.is_bought || data.sale_type === VOLUME_DETAIL.saleType.free ? (
              <ButtonBase
                fullBg
                label={handleTypeLabelRight(
                  data.is_bought,
                  data.sale_type === VOLUME_DETAIL.saleType.free
                )}
                onClick={() => router.push(ROUTES.VOLUME_PREVIEW)}
                className="ml-4 text-dark-gray text-[11px] w-[100px] h-7 !bg-white border-[1px] border-b-2 border-light-gray"
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="absolute top-[40%] right-0 custom-checkbox">
            {available ? (
              <FormField
                control={form.control}
                name={data.name || ''}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBase
                        {...field}
                        name={data.name || ''}
                        value={form.getValues(data.name || '')}
                        classNameCheckBox="w-[14px] h-[14px] absolute top-[50%] right-0 !translate-y-[90%]"
                        htmlFor={data.name || ''}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <div>
                {data.is_allow_trial && <p>{VOLUME_DETAIL.notAvailable}</p>}
                {data.is_bought && <p>{VOLUME_DETAIL.purchased}</p>}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  const renderActionVolume = (isItemSelected: boolean, available: boolean) => {
    return (
      <>{!isItemSelected ? <>{renderActionButton()}</> : <>{renderActionCheckBox(available)}</>}</>
    );
  };

  return (
    <>
      <div
        className={`flex border-b border-transparent-black p-3 ${
          data.read && 'bg-snow-white'
        } transition-all`}
      >
        <div
          className="relative w-[105px] h-[140px] mr-3 cursor-pointer"
          onClick={() =>
            router.push(`${ROUTES.COMIC}/${param.slug}${ROUTES.VOLUME}/${data.hash_id}`)
          }
        >
          <Image
            src={checkAvatarUrl(data.cover_thumbnail_url)}
            alt="comic-item"
            fill
            style={{
              objectFit: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        <div className="w-[calc(100%_-_105px)] flex flex-col justify-between relative">
          <div className="w-full">
            <h3 className="text-[13px] leading-[19.5px] font-bold">{data.name}</h3>
            {data.sale_type === VOLUME_DETAIL.saleType.free && !data.is_bought && (
              <p className="text-[11px] py-1 !text-primary font-bold leading-[16.5px]">
                {COMIC.status.free}
              </p>
            )}
            {data.is_bought && (
              <p className="text-[11px] py-1 !text-semi-transparent-black font-bold leading-[16.5px]">
                {COMIC.status.bought}
              </p>
            )}
            {data.free_volume && (
              <div className="flex items-center text-primary text-[11px] pb-px">
                {formatVolumeRange(data?.free_volume)}
                <div className="relative w-[10px] h-[10px]">
                  <Image src={blingFillRed} alt="comic-item" fill />
                </div>
              </div>
            )}
            {data.sale_type !== VOLUME_DETAIL.saleType.free && !data.is_bought && (
              <div className="flex items-center text-primary text-[11px] pb-px text-center">
                {!data.is_bought && (
                  <div className="absolute w-[18px] h-[18px] z-[2]">
                    {data.sale_viewable_type === VOLUME_DETAIL.viewableType.bonus_point && (
                      <Image src={bonusPoint} alt="comic-item" fill className="z-[2]" />
                    )}
                    {(!data.is_allow_trial ||
                      !data.is_bought ||
                      data.sale_viewable_type !== VOLUME_DETAIL.saleType.free) && (
                      <div
                        className={`absolute ${
                          data.sale_viewable_type === VOLUME_DETAIL.viewableType.bonus_point
                            ? 'left-[10px]'
                            : ''
                        } w-[18px] h-[18px] top-0`}
                      >
                        <Image src={point} alt="comic-item" fill />
                      </div>
                    )}
                  </div>
                )}
                <p
                  className={`font-normal text-[15px] text-black text-center flex items-center text-center ${
                    data.sale_viewable_type === VOLUME_DETAIL.viewableType.bonus_point
                      ? 'ml-8'
                      : 'ml-[22px]'
                  }`}
                >
                  {data.sale_value !== VOLUME_DETAIL.saleType.free && !data.is_bought && (
                    <span>
                      {calculateDiscountedPrice(
                        data.point_consumption,
                        Math.round(Number(data.sale_value))
                      )}
                    </span>
                  )}
                  {data.sale_type && (
                    <span className="text-[13px] leading-[13px] text-semi-transparent-black relative ml-[3px] line-through-custom">
                      {data.point_consumption}
                    </span>
                  )}
                </p>
              </div>
            )}
            {data.sale_type &&
              data.sale_type !== VOLUME_DETAIL.saleType.free &&
              !data.is_bought && (
                <div className="flex items-center text-primary text-[11px] pb-px">
                  <p className="text-[13px]">
                    {Math.round(Number(data.sale_value))}
                    <span className="text-[11px]">{COMIC.discount}</span>
                  </p>
                  <div className="relative w-[10px] h-[10px] mt-px">
                    <Image src={blingFillRed} alt="comic-item" fill />
                  </div>
                </div>
              )}
            {data?.sale_type === VOLUME_DETAIL.saleType.free && data?.free_volume_expires_date && (
              <Countdown
                className="text-content-blur text-[11px] font-family-inter"
                targetDate={fromUnixTime(data.free_volume_expires_date)}
                showAsDateIfMoreThan24Hours
                prefix="("
                suffix=")"
                onCountdownComplete={onCountdownComplete}
              />
            )}
            {data?.sale_type !== VOLUME_DETAIL.saleType.free && data?.sale_expires_date && (
              <Countdown
                className="text-content-blur text-[11px] font-family-inter"
                targetDate={fromUnixTime(data.sale_expires_date)}
                showAsDateIfMoreThan24Hours
                prefix="("
                suffix=")"
                onCountdownComplete={onCountdownComplete}
              />
            )}
          </div>
          {renderActionVolume(isItemSelected, available)}
        </div>
      </div>
    </>
  );
}
