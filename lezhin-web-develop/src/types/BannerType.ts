import { BaseResponse } from './ApiResponseType';

export type BannerData = {
  hash_id: string;
  type: string;
  display_order: number;
  destination_type: string;
  destination_value: string;
  banner_image_url: string;
};

export type BannerResponse = BaseResponse<{ data: BannerData[] }>;
