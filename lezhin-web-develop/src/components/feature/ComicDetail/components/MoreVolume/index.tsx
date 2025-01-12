'use client';

// Components
import { Button } from '@/components/ui/button';
import VolumeList from '../VolumeList';

// Routes
import Link from 'next/link';

// Utils
import { COMIC_ITEM } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers';
import { ORDER_TYPE } from '@/utils/constants/common';
import { API_ENDPOINT } from '@/utils/constants';

// Img
import TransferTwoLineIcon from '@/assets/icons/transfer-2-line.svg';

// Types
import { VolumeReadMetadata } from '@/types/ComicType';

// Hooks
import useVolumeList from '../VolumeList/useVolumeList';

interface MoreVolumeProps {
  volumeReadMetadata: VolumeReadMetadata;
  hashId: string;
}

export default function MoreVolume({ volumeReadMetadata, hashId }: MoreVolumeProps) {
  const { volumeData, sortVolume, loading, fetchData, orderType } =
    useVolumeList(volumeReadMetadata);

  return (
    <div className="mt-[64px] bg-white">
      <div className="w-full px-4 py-2.5">
        <Link href={parseMessage(API_ENDPOINT.PURCHASE_VOLUME, [hashId])}>
          <Button className="w-full h-10 text-[13px] rounded btn-drop-shadow-red">
            {COMIC_ITEM.readBeginning}
          </Button>
        </Link>
      </div>
      <div className="bg-gray-24 flex items-center justify-between px-4 py-3 border-very-light-black border-y">
        <span className="text-white ml-1 text-[13px] font-bold">
          {parseMessage(COMIC_ITEM.totalChappter, [volumeReadMetadata.total_volume])}
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
        data={volumeData.data}
        available
        volumeReadMetadata={volumeData}
        onFetchNewData={fetchData}
        isLoading={loading}
        isMoreVolumePage
      />
    </div>
  );
}
