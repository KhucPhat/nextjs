// utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// service
import { httpFetch } from '@/configs/fetch.config';

//Type
import {
  ComicResponse,
  ComicDetailResponse,
  VolumeRequest,
  VolumesResponse,
  AddFavoriteResponse,
} from '@/types/ComicType';

// Utils
import { bindPath } from '@/utils/helpers';

class ComicService {
  async getComicDetail(comicHashId: string, access_token?: string): Promise<ComicDetailResponse> {
    return await httpFetch(bindPath(API_ENDPOINT.GET_COMIC, [comicHashId]), {
      method: HTTP_METHOD.GET,
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
  }

  async getRecommendationItems(hash_id: string, access_token: string): Promise<ComicResponse> {
    return await httpFetch(bindPath(API_ENDPOINT.GET_RECOMMENDATION_ITEMS, [hash_id]), {
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  async getSameAuthorItems(hash_id: string): Promise<ComicResponse> {
    return await httpFetch(bindPath(API_ENDPOINT.GET_SAME_AUTHOR_ITEMS, [hash_id]), {
      method: HTTP_METHOD.GET,
    });
  }

  async getVolumes({
    comicHashId,
    order_by,
    order_type,
    access_token,
  }: VolumeRequest): Promise<VolumesResponse> {
    const results = await httpFetch<Promise<VolumesResponse>>(
      bindPath(API_ENDPOINT.GET_LIST_VOLUME, [comicHashId]),
      {
        method: HTTP_METHOD.GET,
        ...(order_type && order_by && { body: { order_by, order_type } }),
        ...(access_token && {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }),
      }
    );

    return results;
  }

  async addFavorite(hash_id: string, access_token: string): Promise<AddFavoriteResponse> {
    return await httpFetch(bindPath(API_ENDPOINT.ADD_FAVORITE_COMIC, [hash_id]), {
      method: HTTP_METHOD.POST,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}

export default new ComicService();
