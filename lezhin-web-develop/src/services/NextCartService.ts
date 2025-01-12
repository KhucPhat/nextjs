// utils
import { NEXTCART_API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// service
import { httpFetch } from '@/configs/fetch.config';

//Type
import { CartStatsResponse } from '@/types/CartType';

class NextCartService {
  async getCartStatistics(): Promise<CartStatsResponse> {
    return await httpFetch(NEXTCART_API_ENDPOINT.GET_CART_STATS, {
      method: HTTP_METHOD.GET,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new NextCartService();
