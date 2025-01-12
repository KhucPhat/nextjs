// Service
import { httpNextFetch } from '@/configs/fetch.config';

// Utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';
import { bindPath } from '@/utils/helpers';

// Types
import { AddFavoriteResponse, VolumeRequest, VolumesResponse } from '@/types/ComicType';

class NextComicService {
  async getVolumes({ comicHashId, order_by, order_type }: VolumeRequest): Promise<VolumesResponse> {
    const results = await httpNextFetch(bindPath(API_ENDPOINT.GET_LIST_VOLUME, [comicHashId]), {
      method: HTTP_METHOD.GET,
      ...(order_type && order_by && { body: { order_by, order_type } }),
    });

    return results;
  }

  async addFavorite(hash_id: string): Promise<AddFavoriteResponse> {
    return await httpNextFetch(bindPath(API_ENDPOINT.ADD_FAVORITE_COMIC, [hash_id]), {
      method: HTTP_METHOD.POST,
    });
  }
}

export default new NextComicService();
