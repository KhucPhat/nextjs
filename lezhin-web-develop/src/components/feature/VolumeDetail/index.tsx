'use client';

// React
import React from 'react';

// Routes
import Image from 'next/image';
import { ROUTES } from '@/router/routes';
import { useRouter } from 'next/navigation';

// Components
import ModalImageComic from '@/components/feature/ComicDetail/components/ModalImageZoom';
import { ButtonBase } from '@/components/common/Button';
import Countdown from '@/components/common/CountDown';

// Icons
import BlingFillRed from '@/assets/icons/bling-fill-red.svg?url';
import ComicBonus from '@/assets/icons/comic/bonus.svg?url';
import BlingFillDarkAqua from '@/assets/icons/bling-fill-dark-aqua.svg?url';
import ComicPoint from '@/assets/icons/comic/point.svg?url';
import LoadingVolumeDetail from './components/LoadingVolumeDetail';

// Styles
import './styles.css';

// Hooks
import useMediaQuery from '@/hooks/use-media-query';

// Utils
import { BUTTON_TYPE, COMIC_DETAIL, VOLUME_DETAIL } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers/common';
import { calculateDiscountedPrice, formatVolumeRange } from '@/utils/comicUtils';
import { checkAvatarUrl } from '@/utils/validate';

// Types
import { VolumeDetail } from '@/types/ComicType';

// Libraries
import { fromUnixTime } from 'date-fns';

// Hooks
import useVolumeDetail from './useVolumeDetail';

interface VolumeDetailProps {
  volumeDetailData: VolumeDetail | null;
  formData: {
    comicHashId: string;
    volumeHashId: string;
    access_token: string;
  };
}

export default function VolumeDetailComponent({ volumeDetailData, formData }: VolumeDetailProps) {
  const isPC = useMediaQuery('pc');
  const router = useRouter();
  const { loading, volumeDetail, fetchData } = useVolumeDetail({ volumeDetailData, formData });

  return (
    <>
      {loading || !volumeDetail?.hash_id ? (
        <LoadingVolumeDetail />
      ) : (
        <div className="relative bg-white">
          <div className="h-[380px] overflow-hidden relative">
            <div>
              <Image
                src={checkAvatarUrl(volumeDetail?.cover_image_url)}
                alt="lezhin-original"
                width={1920}
                height={380}
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'blur(8px)',
                  scale: 1.2,
                }}
              />
            </div>
            <ModalImageComic src={checkAvatarUrl(volumeDetail?.cover_image_url)} isPC={isPC} />
          </div>
          <div className="content p-4 pb-9">
            <h3 className="text-[18px] font-bold leading-[27px] pb-1">{volumeDetail?.name}</h3>
            <div className="flex items-center text-primary text-[11px] pb-1">
              {volumeDetail?.free_volume && formatVolumeRange(volumeDetail?.free_volume)}

              {volumeDetail?.sale_type === VOLUME_DETAIL.saleType.discount &&
                volumeDetail?.sale_type === VOLUME_DETAIL.viewableType.point &&
                parseMessage(VOLUME_DETAIL.sale, [Math.round(Number(volumeDetail?.sale_value))])}
              {volumeDetail?.sale_type === VOLUME_DETAIL.viewableType.bonus_point &&
                volumeDetail?.sale_type === VOLUME_DETAIL.saleType.discount && (
                  <div className="flex items-center">
                    <div className="relative w-[18px] h-[18px]">
                      <Image src={ComicBonus} alt="bonus-point" fill className="z-[2]" />
                    </div>
                    <p className="text-[13px] text-dark-aqua leading-[13px]">
                      {Math.round(Number(volumeDetail?.sale_value))}
                      <span className="text-[11px]">{VOLUME_DETAIL.bonus}</span>
                    </p>
                  </div>
                )}
              {volumeDetail?.sale_type === VOLUME_DETAIL.saleType.discount && (
                <div className="relative w-[10px] h-[10px]">
                  <Image
                    src={
                      volumeDetail?.sale_type === VOLUME_DETAIL.saleType.discount &&
                      volumeDetail?.sale_type === VOLUME_DETAIL.viewableType.bonus_point
                        ? BlingFillDarkAqua
                        : BlingFillRed
                    }
                    alt="comic-item"
                    fill
                  />
                </div>
              )}
              {!volumeDetail?.free_volume_expires_date && volumeDetail?.sale_expires_date && (
                <div className="text-content-blur text-[11px] flex font-family-inter">
                  <Countdown
                    prefix="("
                    suffix=")"
                    showAsDateIfMoreThan24Hours
                    targetDate={fromUnixTime(volumeDetail?.sale_expires_date)}
                    onCountdownComplete={fetchData}
                  />
                </div>
              )}

              {volumeDetail?.free_volume_expires_date && (
                <div className="text-content-blur text-[11px] flex font-family-inter">
                  <Countdown
                    prefix="("
                    suffix=")"
                    showAsDateIfMoreThan24Hours
                    targetDate={fromUnixTime(volumeDetail?.free_volume_expires_date)}
                    onCountdownComplete={fetchData}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-end w-full items-end">
              {volumeDetail?.sale_type === VOLUME_DETAIL.viewableType.free && (
                <span className="text-primary font-bold text-[13px]">{VOLUME_DETAIL.free}</span>
              )}
              {volumeDetail?.sale_type !== VOLUME_DETAIL.viewableType.free &&
                volumeDetail?.sale_value && (
                  <span className="line-through-custom text-[13px] leading-[13px] pl-0.5 text-semi-transparent-black relative w-fit">
                    {volumeDetail?.point_consumption}
                  </span>
                )}
              {volumeDetail?.sale_type !== VOLUME_DETAIL.viewableType.free && (
                <div className="flex items-center h-[18px] text-center">
                  <div className={`relative w-[18px] h-[18px]`}>
                    {volumeDetail?.sale_type !== VOLUME_DETAIL.viewableType.free &&
                      volumeDetail?.point_consumption && (
                        <Image src={ComicPoint} alt="point" fill className="z-[1]" />
                      )}
                    {volumeDetail?.point_consumption && (
                      <div
                        className={`absolute z-[1] w-[18px] h-[18px] top-0 
                    ${
                      volumeDetail?.sale_type == VOLUME_DETAIL.viewableType.bonus_point &&
                      'right-2.5'
                    }
                  `}
                      >
                        <Image src={ComicBonus} alt="bonus-point" fill />
                      </div>
                    )}
                  </div>
                  {volumeDetail?.point_consumption && (
                    <p
                      className={`font-normal text-[15px] pl-[5px] leading-[15.5px] h-full text-center`}
                    >
                      {calculateDiscountedPrice(
                        Number(Math.round(Number(volumeDetail?.point_consumption))),
                        Math.round(Number(volumeDetail?.sale_value))
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="my-4">
              {volumeDetail?.sale_type !== VOLUME_DETAIL.viewableType.free && (
                <div
                  className={`flex w-full ${
                    !volumeDetail?.is_added_to_cart &&
                    !volumeDetail?.is_bought &&
                    volumeDetail?.is_trial
                      ? 'justify-between'
                      : 'justify-end'
                  }`}
                >
                  {!volumeDetail?.is_added_to_cart && !volumeDetail?.is_bought && (
                    <div className="w-[calc(50%_-_8px)]">
                      <ButtonBase
                        fullBg
                        label={BUTTON_TYPE.add_to_cart}
                        onClick={() => router.push(ROUTES.CART)}
                        className="w-full text-[13px] h-9 text-white border-0 border-b-2 border-dark-red"
                      />
                    </div>
                  )}
                  {volumeDetail?.is_trial && (
                    <div className="w-[calc(50%_-_8px)]">
                      <ButtonBase
                        fullBg
                        label={BUTTON_TYPE.volume_trial}
                        onClick={() =>
                          router.push(`${ROUTES.VOLUME_PREVIEW}/${volumeDetail.hash_id}`)
                        }
                        className="w-full text-[13px] h-9 text-dark-gray !bg-golden-yellow border-0 border-b-2 border-amber"
                      />
                    </div>
                  )}
                </div>
              )}
              {(volumeDetail?.sale_type === VOLUME_DETAIL.viewableType.free ||
                volumeDetail?.is_bought) && (
                <div className="w-[calc(50%_-_8px)] ml-auto mr-4">
                  <ButtonBase
                    fullBg
                    label={BUTTON_TYPE.free}
                    onClick={() => router.push('')}
                    className="w-full ml-4 text-dark-gray text-[13px] h-9 !bg-very-light-gray border-0 border-b-2 border-light-gray"
                  />
                </div>
              )}
            </div>
            {volumeDetail?.description && (
              <div className="flex flex-col text-[13px] font-normal leading-[19.5px] pb-4 mt-6 text-black">
                <h4 className="text-[15px] font-bold leading-[18px] mb-2">
                  {COMIC_DETAIL.modalContents.title}
                </h4>
                <p className="mb-5">{volumeDetail?.description}</p>
              </div>
            )}
            <ButtonBase
              fullBg
              label={BUTTON_TYPE.home}
              onClick={() => router.push(ROUTES.HOME_PAGE)}
              className="w-full text-[13px] h-10 text-white border-0 border-b-2 border-dark-red rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
