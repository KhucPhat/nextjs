// import { NextResponse } from 'next/server';

import { HTTP_METHOD } from '@/utils/constants/http';
import { ErrorResponse } from '@/types/ApiResponseType';

const DEFAULT_TIMEOUT = 30000;
const BASE_URL = process.env.API_BASE_URL || '';
const NEXT_BASE_URL = process.env.NEXT_API_URL || '';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface FetchOptions extends RequestInit {
  timeout?: number;
  body?: any;
}

const shouldStringifyBody = (method?: string, body?: any) => {
  const methodUpperCase = method?.toUpperCase();
  const isFormData = body instanceof FormData;
  return (
    !isFormData &&
    (methodUpperCase === 'POST' || methodUpperCase === 'PUT' || methodUpperCase === 'PATCH')
  );
};

export const httpFetch = async <T = any>(
  url: string,
  options: FetchOptions = {},
  baseURL = BASE_URL
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || DEFAULT_TIMEOUT);
  let apiBaseURL = `${baseURL}${url}`;

  if (options.body && shouldStringifyBody(options.method, options.body)) {
    options.body = JSON.stringify(options.body);
  }
  if (options.body && options.method?.toUpperCase() === HTTP_METHOD.GET) {
    const queryParams = new URLSearchParams(options.body).toString();
    apiBaseURL = `${apiBaseURL}?${queryParams}`;
    delete options.body;
  }

  console.debug(`${options.method?.toUpperCase()} ${apiBaseURL}`, options?.body ?? '');

  try {
    const initOptions = {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json', Accept: 'application/json' }),
        ...options.headers,
      },
      signal: controller.signal,
    };

    const response = await fetch(apiBaseURL, { ...initOptions, cache: 'no-store' });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData = '';
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const errorData: ErrorResponse = await response.json();
        let message = errorData.message;
        if (errorData.errors) {
          if (errorData.errors.message) {
            message = errorData.errors.message;
          } else {
            const firstMessage = Object.values(errorData.errors)[0];
            if (Array.isArray(firstMessage)) {
              message = firstMessage[0] as string;
            } else {
              message = Object.values(errorData.errors)[0] as string;
            }
          }
        }
        throw {
          ...(errorData as unknown as object),
          status: response.status,
          message: message,
        };
      } else {
        errorData = await response.text();
        throw {
          message: errorData || 'An error occurred while fetching data.',
          status: response.status,
        };
      }
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data as T;
    } else {
      const text = await response.text();
      return text as T;
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw {
        message: 'Request timeout',
        status: 500,
      };
    }
    if (typeof error == 'object' && JSON.stringify(error) !== '{}') {
      throw error;
    }
    throw {
      message: error.message,
      status: 500,
    };
  }
};

export const httpNextFetch = async <T = any>(
  url: string,
  options: FetchOptions = {},
  baseURL = NEXT_PUBLIC_BASE_URL
): Promise<T> => {
  return await httpFetch<T>(url, options, baseURL);
};
