import { ROUTES } from '@/router/routes';

// Constants
import { REDIRECT_TO_CART } from '../constants/localStorage';
import { ORDER_TYPE } from '../constants/common';

// Types
import { OrderType } from '@/types/commonType';

// Utils
import { setCookie } from '../cookies';
import { PREVIOUS_PATH } from '../constants/cookieKeys';

export const cleanQueryParams = () => {
  window.history.replaceState(null, '', window.location.pathname);
};

export const getSnsProviderFromErrorCode = (errorCode?: string | null) => {
  if (!errorCode) return '';
  return capitalizeFirstLetter(errorCode.split('_').at(-1) || '');
};

export const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export const parseMessage = (value: string, list: (string | number)[]) => {
  let newValue = value;
  if (newValue && list.length > 0) {
    list.forEach((element, index) => {
      const argument = new RegExp(`\\$\\{${index}\\}`, 'g');
      newValue = newValue.replace(argument, `${element}`);
    });
  }

  return newValue;
};

export const bindPath = (value: string, list: (string | number)[]) => {
  return parseMessage(value, list);
};

export const sortArray = <T extends Record<string, any>>(
  array: T[],
  sortBy: keyof T = 'display_order'
): T[] => {
  return array.sort((a, b) => a[sortBy] - b[sortBy]);
};

export const routeToCartOrDefault = () => {
  const hashIdCard = localStorage.getItem(REDIRECT_TO_CART);
  if (hashIdCard) {
    localStorage.removeItem(REDIRECT_TO_CART);
  }
  return hashIdCard ? `${ROUTES.CART}?hash_id=${hashIdCard}` : ROUTES.HOME_PAGE;
};

export const getNextOrderType = (currentOrderType: OrderType | '') => {
  switch (currentOrderType) {
    case ORDER_TYPE.DESC:
      return ORDER_TYPE.ASC;
    case ORDER_TYPE.ASC:
      return '';
    default:
      return ORDER_TYPE.DESC;
  }
};

export const savePreviousRoute = (path: string, searchParams: string) => {
  if (path !== ROUTES.REGISTER && path !== ROUTES.REGISTER_TERM) {
    const fullPath = searchParams ? `${path}?${searchParams}` : path;
    setCookie(PREVIOUS_PATH, fullPath);
  }
};
