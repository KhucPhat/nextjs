// Service
import { httpFetch } from '@/configs/fetch.config';

// Utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// Types
import { BannerData, BannerResponse } from '@/types/BannerType';
import { SectionReponse, TopPageReadedItemsRequest } from '@/types/TopPageType';
import { ComicResponse } from '@/types/ComicType';

class TopPageService {
  async getBanner(category_hash_id?: string): Promise<BannerData[]> {
    const results = await httpFetch<Promise<BannerResponse>>(API_ENDPOINT.GET_BANNER, {
      method: HTTP_METHOD.GET,
      ...(category_hash_id && { body: { category_hash_id } }),
    });

    return results.results.data;
  }
  async getFavoriteItems(access_token: string): Promise<ComicResponse> {
    return await httpFetch<Promise<ComicResponse>>(API_ENDPOINT.GET_FAVORITE_ITEMS, {
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  async getReadingItems({
    access_token,
    ...param
  }: TopPageReadedItemsRequest): Promise<ComicResponse> {
    return await httpFetch(API_ENDPOINT.READING_ITEMS, {
      body: param,
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
  async getSections({
    access_token,
    ...param
  }: TopPageReadedItemsRequest): Promise<SectionReponse> {
    return await httpFetch(API_ENDPOINT.SECTIONS, {
      body: param,
      method: HTTP_METHOD.GET,
    });
  }
  async getViewedItems({
    access_token,
    ...param
  }: TopPageReadedItemsRequest): Promise<ComicResponse> {
    return await httpFetch(API_ENDPOINT.VIEWED_ITEMS, {
      body: param,
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
  async topPageViewedItems({
    access_token,
    ...param
  }: TopPageReadedItemsRequest): Promise<ComicResponse> {
    return await httpFetch(API_ENDPOINT.VIEWED_ITEMS, {
      body: param,
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
  async getNewReleaseWeeklyItems(param: TopPageReadedItemsRequest): Promise<ComicResponse> {
    return await httpFetch(API_ENDPOINT.GET_NEW_RELEASE_ITEMS, {
      body: param,
      method: HTTP_METHOD.GET,
    });
  }
}

export default new TopPageService();
