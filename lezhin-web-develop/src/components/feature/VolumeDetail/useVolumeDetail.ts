'use client';

import { useState } from 'react';

// Types
import { VolumeDetail, VolumeDetailRequest } from '@/types/ComicType';

// Services
import NextComicDetailService from '@/services/NextComicDetailService';

interface VolumeDetailProps {
  volumeDetailData: VolumeDetail | null;
  formData: VolumeDetailRequest;
}

const useVolumeDetail = ({ volumeDetailData, formData }: VolumeDetailProps) => {
  const [volumeDetail, setVolumeDetail] = useState(volumeDetailData);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const results = await NextComicDetailService.getVolumeDetail(formData);
      setVolumeDetail(results.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { volumeDetail, loading, fetchData };
};

export default useVolumeDetail;
