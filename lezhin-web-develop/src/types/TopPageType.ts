import { BaseResponse } from './ApiResponseType';
import { ComicData } from './ComicType';

export type TopPageReadedItemsRequest = {
  category_hash_id: string;
  access_token?: string | null;
};

export type SectionData = {
  name: string;
  background_color: string;
  display_order: number;
  max_row: number;
  items: ComicData[];
};

export type SectionReponse = BaseResponse<{ data: SectionData[] }>;
