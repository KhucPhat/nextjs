'use client';

// React
import React from 'react';

// Components
import VolumeList from '@/components/feature/ComicDetail/components/VolumeList';

// Hooks
import useVolumeList from '../VolumeList/useVolumeList';

// Img
import TransferTwoLineIcon from '@/assets/icons/transfer-2-line.svg';

// Styles
import './styles.css';

// Utils
import { COMIC_ITEM } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers';
import { ORDER_TYPE } from '@/utils/constants/common';

// Types
import { VolumeReadMetadata } from '@/types/ComicType';

interface VolumeReadTabsProps {
  volumeReadMetadata: VolumeReadMetadata;
}

export default function ComicVolumeList({ volumeReadMetadata }: VolumeReadTabsProps) {
  const { volumeData, sortVolume, loading, fetchData, orderType } =
    useVolumeList(volumeReadMetadata);

  return (
    <div className="bg-white pb-5">
      <div className="bg-gray-24 flex items-center justify-between px-4 py-3 border-very-light-black border-y">
        <span className="text-white ml-1 text-[13px] font-bold">
          {parseMessage(COMIC_ITEM.totalVolume, [
            volumeData.total_volume >= 5 ? '5' : volumeData.total_volume,
          ])}
        </span>
        <div
          onClick={sortVolume}
          className="text-white flex items-center justify-center hover:underline hover:decoration-1 cursor-pointer"
        >
          <TransferTwoLineIcon width="14px" height="14px" />
          <span className="text-[11px] font-bold">
            {orderType === ORDER_TYPE.DESC ? COMIC_ITEM.fromNew : COMIC_ITEM.fromBeginning}
          </span>
        </div>
      </div>
      <VolumeList
        data={volumeData.data.slice(0, 5)}
        volumeReadMetadata={volumeData}
        onFetchNewData={fetchData}
        isLoading={loading}
      />
    </div>
  );
}
