import { BaseResponse } from './ApiResponseType';

export type AuthEmailRequest = {
  email: string;
  password: string;
  is_mail_magazine_subscribed?: boolean;
  redirect?: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: string;
  message: string;
  results: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
};

export type RegisterTermRequest = {
  all: boolean;
  clause: boolean;
  security: boolean;
  receiveEmail: boolean;
};

export type ForgotRequest = {
  email: string;
};

export type ForgotResponse = {
  status: any;
  email: string;
};

export type ResetPasswordCodeRequest = {
  email: string;
  password: string;
  code: string;
};

export type ResetPasswordCodeResponse = {
  status: string;
  message: string;
  results: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
};

export type ResetPasswordRequest = {
  password: string;
};

export type SendRegisterOTPRequest = {
  email: string;
};

export type RegisterOTPResponse = {
  status: boolean;
  message: string;
  results: object | null;
};

export type VerifyUserRequest = {
  email: string;
  code: string;
};

export type VerifyUserResponse = {
  status: boolean;
  message: string;
  results: object | null;
};

export type CreateUserRequest = {
  email: string;
  password?: string;
  is_mail_magazine_subscribed?: boolean;
};

export type CreateUserResponse = {
  status: boolean;
  message: string;
  results: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
};

export type RegisterSNSRequest = {
  social_id: string;
  provider: string;
  email: string;
  is_mail_magazine_subscribed?: boolean;
};

export type GetUserBySNS = RegisterSNSRequest;

export type LoginSNSRequest = {
  token: string;
  provider: string;
};

export type RegisterSNSResponse = {
  status: string;
  message: string;
  results: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
};

export type LoginSNSResponse = RegisterSNSResponse;

export type UserResponse = {
  status: string;
  message: string;
  results: {
    id: string | null;
    email: string | null;
    name: string | null;
  };
};

export type SnsUserResponse = {
  status: string;
  message: string;
  results: {
    email: string;
    sns_email: string | null;
    provider: string | null;
    social_id: string | null;
  };
};

export type RefreshTokenRequest = {
  email: string;
  refresh_token: string;
};

export type RefreshTokenData = {
  access_token: string;
  expires_in: number;
};
export type RefreshTokenResponse = BaseResponse<RefreshTokenData>;
