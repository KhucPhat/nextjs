// Next
import { redirect } from 'next/navigation';

// Component
import ComicDetailPage from '@/components/feature/ComicDetail';
import ComicList from '@/components/common/ComicList';

// Configs
import { auth } from '@/configs/auth';

// Services
import ComicDetailService from '@/services/ComicDetailService';
import ComicService from '@/services/ComicService';

// Router
import { ROUTES } from '@/router/routes';

// Langs
import { COMIC_DETAIL } from '@/utils/constants/langs';

// Types
import { ChapterRequest } from '@/types/ComicType';

async function getComicDetail(hashId: string, access_token: string) {
  try {
    const response = await ComicService.getComicDetail(hashId, access_token);
    return response.results;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function getRecommendationItems(hashId: string, access_token: string) {
  try {
    if (access_token) {
      const response = await ComicService.getRecommendationItems(hashId, access_token);
      return response.results.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}

async function getSameAuthorItems(hashId: string) {
  try {
    const response = await ComicService.getSameAuthorItems(hashId);
    return response.results.data;
  } catch (error) {
    console.log(error);
  }
}

async function getListChapter(data: ChapterRequest) {
  try {
    const results = await ComicDetailService.getListChapter(data);
    return results.results;
  } catch (error) {
    console.error('error:', error);
  }
  return null;
}

async function getListVolume(data: ChapterRequest) {
  try {
    const results = await ComicDetailService.getListVolume(data);
    return results.results;
  } catch (error) {
    console.error('error:', error);
  }
  return null;
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const hashId = (await params).slug as string;
  const session = await auth();
  const accessToken = session?.access_token || '';

  const comicData = await getComicDetail(hashId, accessToken);

  if (!comicData) {
    redirect(ROUTES.NOT_FOUND);
  }

  const [sameAuthorItems, recommendationItems, chapterReadMetadata, volumeReadMetadata] =
    await Promise.all([
      getSameAuthorItems(hashId),
      getRecommendationItems(hashId, accessToken),
      getListChapter({ comicHashId: hashId, access_token: accessToken }),
      getListVolume({ comicHashId: hashId, access_token: accessToken }),
    ]);

  return (
    <div>
      <ComicDetailPage
        comicDetailData={comicData}
        chapterReadMetadata={chapterReadMetadata}
        volumeReadMetadata={volumeReadMetadata}
      />
      {recommendationItems && (
        <ComicList
          className="mb-2 default-display-item-comic"
          title={COMIC_DETAIL.recommendationTitle}
          data={recommendationItems}
        />
      )}
      {sameAuthorItems && (
        <ComicList
          className="mb-2 default-display-item-comic"
          title={COMIC_DETAIL.sameAuthorTitle}
          data={sameAuthorItems}
        />
      )}
    </div>
  );
}
