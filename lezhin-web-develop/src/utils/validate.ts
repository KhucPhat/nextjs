// Img
import imgNoData from '@/assets/img/no-data.png';

export const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{7,30}$/;
export const passwordValidate = (value: string) => {
  return regexPassword.test(value);
};

export const checkAvatarUrl = (urlImg: string | undefined | null) => {
  if (!urlImg) return imgNoData;
  return urlImg.startsWith('http') || urlImg.startsWith('data:image')
    ? urlImg
    : `${process.env.NEXT_IMAGE_URL}${urlImg}`;
};

export const convertSaleRate = (saleRate: string) => {
  if (!saleRate) return '';
  if (saleRate.endsWith('.00')) {
    return saleRate.slice(0, -3);
  }
  return saleRate;
};
