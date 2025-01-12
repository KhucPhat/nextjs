// Component
import MoreVolumePage from '@/components/feature/ComicDetail/components/MoreVolume';

// Next
import { redirect } from 'next/navigation';

// Configs
import { auth } from '@/configs/auth';

// Service
import ComicDetailService from '@/services/ComicDetailService';

// Types
import { VolumeRequest } from '@/types/ComicType';

// Routes
import { ROUTES } from '@/router/routes';

async function getMoreVolume(data: VolumeRequest) {
  try {
    const results = await ComicDetailService.getListVolume(data);
    return results.results;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export default async function MoreVolume({ params }: { params: Promise<{ slug: string }> }) {
  const hash_id = (await params).slug;
  const session = await auth();
  const accessToken = session?.access_token || '';
  const volumeReadMetadata = await getMoreVolume({
    comicHashId: hash_id,
    access_token: accessToken,
  });

  if (!volumeReadMetadata?.data.length) {
    redirect(ROUTES.NOT_FOUND);
  }
  return (
    <>
      <MoreVolumePage hashId={hash_id} volumeReadMetadata={volumeReadMetadata} />
    </>
  );
}
