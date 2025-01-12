import { OrderType } from '@/types/commonType';

export const COMIC_TABS = {
  chapter: 'chapter',
  volume: 'volume',
};

export const BUTTON_KEYS = {
  CHAPTER_FREE: 'chapter_free',
  COMIC_DETAIL: 'comic_detail',
  OPEN_CART: 'open_cart',
  ADD_TO_CART: 'add_to_cart',
  VOLUME_FREE: 'volume_free',
  VOLUME_TRIAL: 'volume_trial',
};

export const SALE_TYPE = {
  DISCOUNT: 'discount',
  CASHBACK: 'cashback',
};

export const ORDER_BY = {
  PUBLIC_DATE: 'public_date',
};

export const ORDER_TYPE: { [key: string]: OrderType } = {
  DESC: 'desc',
  ASC: 'asc',
};

export const REFRESH_TOKEN_ERROR = 'RefreshTokenError';
