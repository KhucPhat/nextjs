import { useState } from 'react';

// Next
import { useParams } from 'next/navigation';

// Services
import NextComicDetailService from '@/services/NextComicDetailService';

// Utils
import { ORDER_BY, ORDER_TYPE } from '@/utils/constants/common';
import { getNextOrderType } from '@/utils/helpers';

// Types
import { ChapterReadMetadata } from '@/types/ComicType';
import { OrderType } from '@/types/commonType';

const useChapterTab = (chapterReadMetadata: ChapterReadMetadata) => {
  const [chapterData, setChapterData] = useState(chapterReadMetadata);
  const [orderType, setOrderType] = useState<OrderType | ''>(ORDER_TYPE.DESC);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const hashId = (params?.slug as string) || '';

  const fetchChapterData = async (orderType: string) => {
    try {
      setLoading(true);

      const results = await NextComicDetailService.getListChapter({
        comicHashId: hashId,
        ...(orderType && { order_by: ORDER_BY.PUBLIC_DATE, order_type: orderType }),
      });

      if (results) {
        setChapterData(results);
      }
    } catch (error) {
      console.error('Error fetching chapter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortChapter = async () => {
    const newOrderType = getNextOrderType(orderType);

    setOrderType(newOrderType);

    await fetchChapterData(newOrderType);
  };

  const fetchData = async () => {
    await fetchChapterData(orderType);
  };

  return { chapterData, sortChapter, loading, fetchData, orderType };
};

export default useChapterTab;
