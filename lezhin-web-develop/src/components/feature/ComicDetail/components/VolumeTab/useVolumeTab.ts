import { useState } from 'react';

// Next
import { useParams } from 'next/navigation';

// Services
import ComicDetailService from '@/services/ComicDetailService';

// Utils
import { ORDER_BY } from '@/utils/constants/common';
import { getNextOrderType } from '@/utils/helpers';

// Types
import { VolumeReadMetadata } from '@/types/ComicType';
import { OrderType } from '@/types/commonType';

const useVolumeTab = (volumeReadMetadata: VolumeReadMetadata) => {
  const [volumeData, setVolumeData] = useState(volumeReadMetadata);
  const [orderType, setOrderType] = useState<OrderType | ''>('');
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const hashId = (params?.slug as string) || '';

  const fetchVolumeData = async (orderType: string) => {
    try {
      setLoading(true);

      const results = await ComicDetailService.getListVolume({
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

  return { volumeData, sortVolume, loading, fetchData };
};

export default useVolumeTab;
