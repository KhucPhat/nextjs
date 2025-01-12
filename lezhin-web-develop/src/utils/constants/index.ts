export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  CSRF_TOKEN: 'csrf-token',
};

export const API_ENDPOINT = {
  LOGIN: '/auth/login/email',
  REGISTER_OTP: '/auth/register/email/send-otp',
  REGISTER_CREATE_USER: '/auth/register/email',
  REGISTER_VERIFY: '/auth/register/email/verify-otp',
  REGISTER_SNS: '/auth/register/sns',
  FORGOT_PASSWORD: '/auth/reset-password/send-link',
  FORGOT_PASSWORD_RESET: '/auth/reset-password/reset',
  FORGOT_PASSWORD_RESEND: '/auth/register/email/resend-otp',
  LOGIN_SNS: '/auth/login/sns',
  GET_USER_INFO: '/user-info',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOGOUT: '/auth/logout',
  GET_BANNER: '/top-page/banners',
  GET_SNS_USER_INFO: '/user/info/sns',
  GET_CART_STATS: '/cart/stats',
  GET_CATEGORIES: '/categories',
  GET_FAVORITE_ITEMS: '/top-page/favorite-items',
  READING_ITEMS: '/top-page/new-released-items',
  SECTIONS: '/top-page/sections',
  VIEWED_ITEMS: '/top-page/viewed-items',
  GET_COMIC: '/comic/${0}',
  GET_NEW_RELEASE_ITEMS: '/top-page/new-release/weekly',
  GET_RECOMMENDATION_ITEMS: '/comic/${0}/recommendation-items',
  GET_SAME_AUTHOR_ITEMS: '/comic/${0}/same-author-items',
  GET_LIST_CHAPTER: '/comic/${0}/chapters',
  GET_LIST_VOLUME: '/comic/${0}/volumes',
  GET_VOLUME_DETAIL: '/comic/${0}/volume/${1}',
  PURCHASE_VOLUME: '/comic/${0}/volume/purchase',
  ADD_FAVORITE_COMIC: '/comic/${0}/favorite',
};

export const NEXTAUTH_API_ENDPOINT = {
  FORGOT_PASSWORD_RESET: '/api/auth/forgot-password/reset',
  LOGIN: '/api/auth/login',
  REGISTER_OTP: '/api/auth/register',
  REGISTER_CREATE_USER: '/api/auth/register/create-user',
  REGISTER_VERIFY: '/api/auth/register/verify',
  REGISTER_SNS: '/api/auth/register/sns',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  FORGOT_PASSWORD_RESEND: '/api/auth/resend',
};

export const NEXTCART_API_ENDPOINT = {
  GET_CART_STATS: '/api/cart/stats',
};
