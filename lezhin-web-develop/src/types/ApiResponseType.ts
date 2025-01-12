export interface ErrorResponse {
  errors?: any;
  message?: string;
}

export interface BaseResponse<T = any> {
  data: any;
  status: boolean;
  message: string;
  results: T;
}
