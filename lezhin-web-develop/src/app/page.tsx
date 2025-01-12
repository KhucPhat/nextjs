// Next
import { redirect } from 'next/navigation';

// Components
import MainLayout from '@/components/feature/layout/MainLayout';
import AlertCart from '@/components/feature/TopPage/AlertCart';
import BannerCarousel from '@/components/feature/TopPage/BannerCarousel';
import ComicListContainer from '@/components/feature/TopPage/ComicListContainer';
import TabCategory from '@/components/feature/TopPage/TabCategory';

// Services
import NextMasterService from '@/services/NextMasterService';
import TopPageService from '@/services/TopPageService';

// Router
import { ROUTES } from '@/router/routes';

// Configs
import { auth } from '@/configs/auth';

// Utils
import { sortArray } from '@/utils/helpers';

// Types
import { BannerData } from '@/types/BannerType';
import { CategoryData } from '@/types/CategoryType';
import { ComicData } from '@/types/ComicType';
import { SectionData } from '@/types/TopPageType';

async function getCategories(categoryHashId: string) {
  try {
    const dataCategory = await NextMasterService.getCategories();

    if (dataCategory && Array.isArray(dataCategory)) {
      const sortedCategories = sortArray(dataCategory);

      if (categoryHashId) {
        const categorySelected = sortedCategories.find((item) => item.hash_id === categoryHashId);

        if (!categorySelected) {
          return undefined;
        }

        const isTopPage = categorySelected.hash_id === sortedCategories?.[0]?.hash_id;

        return {
          categories: sortedCategories,
          categoryHashIdSelected: categorySelected.hash_id,
          isTopPage,
        };
      } else {
        return {
          categories: sortedCategories,
          categoryHashIdSelected: sortedCategories?.[0]?.hash_id,
          isTopPage: true,
        };
      }
    }
  } catch (error) {
    console.error(error);
  }

  return { categories: [] as CategoryData[], categoryHashIdSelected: '', isTopPage: false };
}

async function getBanners(categoryHashId: string) {
  const banner: {
    bannersMain: BannerData[] | null;
    bannersList: BannerData[] | null;
  } = { bannersMain: null, bannersList: null };

  try {
    const results = await TopPageService.getBanner(categoryHashId);

    if (results && Array.isArray(results)) {
      const banners = sortArray(results).reduce(
        (acc, banner) => {
          acc[banner.type === 'main' ? 'main' : 'list'].push(banner);
          return acc;
        },
        { main: [] as BannerData[], list: [] as BannerData[] }
      );

      banner.bannersMain = banners.main;
      banner.bannersList = banners.list;
    }
  } catch (error) {
    console.error('error', error);
  }

  return banner;
}

async function getFavoriteItems(accessToken: string) {
  try {
    if (accessToken) {
      const results = await TopPageService.getFavoriteItems(accessToken);
      return results.results.data;
    }
  } catch (error) {
    console.error('error:', error);
  }
  return [];
}

async function getComics(category: string, token: string, isTopPage: boolean) {
  if (!token) {
    const sessionComic = await TopPageService.getSections({
      category_hash_id: category,
    }).catch((err) => err);

    let releaseWeeklyItems: ComicData[] = [];
    if (!isTopPage) {
      const releaseItems = await TopPageService.getNewReleaseWeeklyItems({
        category_hash_id: category,
      }).catch((err) => err);
      releaseWeeklyItems = releaseItems.results?.data || [];
    }
    return {
      readItems: [],
      sessionItems: sessionComic.results?.data || [],
      viewItems: [],
      releaseWeeklyItems,
    };
  }

  const [readItems, sessionComic, viewItems, releaseWeeklyItems] = await Promise.allSettled([
    TopPageService.getReadingItems({
      category_hash_id: category,
      access_token: token,
    }),
    TopPageService.getSections({
      category_hash_id: category,
    }),
    TopPageService.getViewedItems({
      category_hash_id: category,
      access_token: token,
    }),
    !isTopPage
      ? TopPageService.getNewReleaseWeeklyItems({
          category_hash_id: category,
        })
      : Promise.resolve({ results: { data: [] } }),
  ]);

  return {
    readItems:
      readItems.status === 'fulfilled' ? readItems.value.results.data : ([] as ComicData[]),
    sessionItems:
      sessionComic.status === 'fulfilled' ? sessionComic.value.results.data : ([] as SectionData[]),
    viewItems:
      viewItems.status === 'fulfilled' ? viewItems.value.results.data : ([] as ComicData[]),
    releaseWeeklyItems:
      releaseWeeklyItems.status === 'fulfilled'
        ? releaseWeeklyItems.value.results.data
        : ([] as ComicData[]),
  };
}

export default async function Dashboard({ searchParams }: { searchParams: { category: string } }) {
  const categoryHashId = searchParams.category;

  const session = await auth();
  const accessToken = session?.access_token || '';

  const categoryData = await getCategories(categoryHashId);

  if (!categoryData) {
    redirect(ROUTES.NOT_FOUND);
  }

  const { categories, categoryHashIdSelected, isTopPage } = categoryData;
  const [comicsData, bannersData, favoriteItems] = await Promise.all([
    getComics(categoryHashIdSelected, accessToken, isTopPage),
    getBanners(categoryHashIdSelected),
    getFavoriteItems(accessToken),
  ]);

  const { readItems, sessionItems, viewItems, releaseWeeklyItems } = comicsData;
  const { bannersMain, bannersList } = bannersData;

  return (
    <MainLayout>
      <main>
        <BannerCarousel listBanner={bannersMain} />
        <TabCategory categories={categories} defaultValue={categoryHashIdSelected} />
        {isTopPage && <AlertCart />}
        <ComicListContainer
          listBanner={bannersList}
          isTopPage={isTopPage}
          data={{
            readItems,
            favoriteItems,
            sessionItems,
            viewItems,
            releaseWeeklyItems,
          }}
        />
      </main>
    </MainLayout>
  );
}
