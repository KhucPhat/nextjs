import { ErrorResponse } from '@/types/ApiResponseType';

export const getErrorMessage = (response: ErrorResponse) => {
  if (response.errors) {
    return Object.values(response.errors)[0] as string;
  }
  return response.message as string || 'Error';
};
