// Service
import { httpNextFetch } from '@/configs/fetch.config';

// Utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// Types
import { CategoryData, CategoryResponse } from '@/types/CategoryType';

class NextMasterService {
  async getCategories(type?: string): Promise<CategoryData[]> {
    const results = await httpNextFetch<Promise<CategoryResponse>>(API_ENDPOINT.GET_CATEGORIES, {
      method: HTTP_METHOD.GET,
      ...(type && { body: { type } }),
    });

    return results.results.data;
  }
}

export default new NextMasterService();
