// utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// service
import { httpFetch } from '@/configs/fetch.config';

import { CartStatsResponse } from '@/types/CartType';

class CartService {
  async getCartStatistics(access_token: string): Promise<CartStatsResponse> {
    return await httpFetch(API_ENDPOINT.GET_CART_STATS, {
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}

export default new CartService();
