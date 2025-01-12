'use client';

import { useState } from 'react';

// Next
import { useParams } from 'next/navigation';

// Services
import NextComicService from '@/services/NextComicService';

// Utils
import { ORDER_BY, ORDER_TYPE } from '@/utils/constants/common';
import { getNextOrderType } from '@/utils/helpers';

// Types
import { VolumeReadMetadata } from '@/types/ComicType';
import { OrderType } from '@/types/commonType';

const useVolumeList = (volumeReadMetadata: VolumeReadMetadata) => {
  const [volumeData, setVolumeData] = useState(volumeReadMetadata);
  const [orderType, setOrderType] = useState<OrderType | ''>(ORDER_TYPE.DESC);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const hashId = (params?.slug as string) || '';

  const fetchVolumeData = async (orderType: string) => {
    try {
      setLoading(true);

      const results = await NextComicService.getVolumes({
        comicHashId: hashId,
        ...(orderType && { order_by: ORDER_BY.PUBLIC_DATE, order_type: orderType }),
      });

      if (results) {
        setVolumeData(results.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sortVolume = async () => {
    const newOrderType = getNextOrderType(orderType);

    setOrderType(newOrderType);

    await fetchVolumeData(newOrderType);
  };

  const fetchData = async () => {
    await fetchVolumeData(orderType);
  };

  return { volumeData, sortVolume, loading, fetchData, orderType };
};

export default useVolumeList;
