// React
import React from 'react';

// Routes
import { redirect } from 'next/navigation';
import { ROUTES } from '@/router/routes';

// Components
import VolumeDetailPage from '@/components/feature/VolumeDetail';

// Types
import { VolumeDetailRequest } from '@/types/ComicType';

// Services
import ComicDetailService from '@/services/ComicDetailService';

// Configs
import { auth } from '@/configs/auth';

async function getVolumeDetail(data: VolumeDetailRequest) {
  try {
    const results = await ComicDetailService.getVolumeDetail(data);
    return results.results;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export default async function VolumeDetail({
  params,
}: {
  params: Promise<{ slug: string; hash_id: string }>;
}) {
  const { slug, hash_id } = await params;
  const session = await auth();
  const token = session?.access_token || '';
  const formData = {
    comicHashId: slug,
    volumeHashId: hash_id,
    access_token: token,
  };

  const volumeDetailData = await getVolumeDetail({
    comicHashId: slug,
    volumeHashId: hash_id,
    access_token: token,
  });

  if (Array.isArray(volumeDetailData)) {
    redirect(ROUTES.NOT_FOUND);
  }

  return <VolumeDetailPage volumeDetailData={volumeDetailData} formData={formData} />;
}
