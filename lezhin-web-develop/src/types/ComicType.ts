import { BaseResponse } from './ApiResponseType';

export interface ComicData {
  hash_id: string;
  title_hash_id: string;
  name: string;
  name_kana: string;
  cover_thumbnail_url: string;
  display_order: number;
  is_waiting_for_free: boolean;
  is_up: boolean;
  is_original: boolean;
  is_safe_mode: boolean;
  is_trial: boolean;
  sale_type: string;
  sale_rate: string;
  button_type: string;
  total_free: number;
  comic_type: string;
}

export type ComicResponse = BaseResponse<{ data: ComicData[] }>;

export interface ComicDetailData {
  hash_id: string;
  name: string;
  name_kana: string;
  description: string;
  cover_image_url: string;
  cover_thumbnail_url: string;
  copyright: string;
  is_favorite: boolean;
  author?: {
    data: {
      hash_id: string;
      name: string;
      name_kane: string;
      code: string;
    }[];
  };
  tag?: {
    data: {
      hash_id: string;
      name: string;
      display_order: number;
      code: string;
    }[];
  };
  publisher: {
    hash_id: string;
    name: string;
    code: string;
    display_order: number;
  };
  category?: {
    data: {
      hash_id: string;
      name: string;
      display_order: number;
      code: string;
    }[];
  };
}

export type ComicDetailResponse = BaseResponse<ComicDetailData>;
export type SaleViewableType = 'free' | 'free_ticket' | 'wait_for_free' | 'bonus_point' | 'point';

export interface ChapterData {
  hash_id: string;
  name: string;
  cover_thumbnail_url_1?: string;
  cover_thumbnail_url_2?: string;
  viewable_type: SaleViewableType;
  point_consumption: number;
  sale_rate: number | null;
  sale_expires_date: number | null;
  wait_for_free_expires_at: number | null;
}

export type ReadButtonType = 'beginning' | 'read' | 'lastest';

export interface ChapterReadMetadata {
  read_button_type: ReadButtonType;
  next_chapter_number: number | null;
  next_chapter_hash_id: string | null;
  next_chapter_require_purchase: boolean;
  total_chapter: number;
  total_wait_for_free: number;
  next_wait_for_free_at: number;
  data: ChapterData[];
}

export type ChapterRequest = {
  comicHashId: string;
  order_by?: string;
  order_type?: string;
  access_token?: string;
};

export type ChapterResponse = BaseResponse<ChapterReadMetadata>;

export interface VolumeRequest {
  comicHashId: string;
  order_by?: string;
  order_type?: string;
  access_token?: string;
}
export interface VolumeData {
  hash_id: string;
  name: string;
  read: boolean;
  cover_thumbnail_url: string;
  is_allow_trial: boolean;
  sale_viewable_type: string;
  point_consumption: number;
  sale_type: string;
  sale_value: string;
  free_volume: string;
  free_volume_expires_date: number;
  sale_expires_date: number;
  is_added_to_cart: boolean;
  is_bought: boolean;
}

export type ReadButtonTypeVolume = 'beginning' | 'read';

export interface VolumeReadMetadata {
  read_button_type: ReadButtonTypeVolume;
  next_volume_number: number | null;
  next_volume_hash_id: string | null;
  total_volume: number;
  data: VolumeData[];
}

export type VolumesResponse = BaseResponse<VolumeReadMetadata>;

export interface VolumeDetailRequest {
  comicHashId: string;
  volumeHashId: string;
  access_token?: string;
}

export interface VolumeDetail {
  hash_id: string;
  name: string;
  name_kana: string;
  description: string;
  cover_image_url: string;
  is_trial: boolean;
  button_type: string;
  point_consumption: number;
  sale_type: string;
  sale_value: string;
  free_volume: string;
  sale_expires_date: number;
  is_added_to_cart: boolean;
  is_bought: boolean;
  free_volume_expires_date: number;
}

export type VolumeResponse = BaseResponse<VolumeDetail>;

export type AddFavoriteResponse = {
  status: boolean;
  message: string;
  results: object | null;
};
