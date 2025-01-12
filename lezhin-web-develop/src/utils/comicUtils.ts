import { COMIC } from './constants/langs';

export const formatVolumeRange = (value: string) => {
  const [from, to] = value.split(',');
  return from && to ? `${from}${COMIC.from}${to}${COMIC.to}` : `${from || to}${COMIC.to}`;
};

export const calculateDiscountedPrice = (price: number, discount: number) => {
  return Math.round(price - (price * discount) / 100);
};
