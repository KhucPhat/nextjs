// Service
import { httpFetch } from '@/configs/fetch.config';

// Utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// Types
import { CategoryResponse } from '@/types/CategoryType';

class MasterService {
  async getCategories(type?: string): Promise<CategoryResponse> {
    return await httpFetch(API_ENDPOINT.GET_CATEGORIES, {
      method: HTTP_METHOD.GET,
      ...(type && { body: { type } }),
    });
  }
}

export default new MasterService();
