import { BaseResponse } from './ApiResponseType';

export type CategoryData = {
  hash_id: string;
  code: string;
  name: string;
  display_order: number;
};

export type CategoryResponse = BaseResponse<{ data: CategoryData[] }>;
