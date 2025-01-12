// Service
import { httpNextFetch } from '@/configs/fetch.config';

// Utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// Types
import { BannerData, BannerResponse } from '@/types/BannerType';

class NextTopPageService {
  async getBanner(category_hash_id?: string): Promise<BannerData[]> {
    const results = await httpNextFetch<Promise<BannerResponse>>(API_ENDPOINT.GET_BANNER, {
      method: HTTP_METHOD.GET,
      ...(category_hash_id && { body: { category_hash_id } }),
    });

    return results.results.data;
  }
}

export default new NextTopPageService();
