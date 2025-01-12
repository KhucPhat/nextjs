import { BaseResponse } from './ApiResponseType';

export type CartStatsResponse = BaseResponse<CartStatsData>;

export type CartStatsData = {
  items_count: number;
  sale_items_count: number;
};
