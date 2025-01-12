// utils
import { deleteCookie } from '@/utils/cookies';
import { API_ENDPOINT, STORAGE_KEYS } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// service
import { httpFetch } from '@/configs/fetch.config';

// type
import {
  CreateUserRequest,
  CreateUserResponse,
  ForgotRequest,
  ForgotResponse,
  LoginRequest,
  LoginResponse,
  LoginSNSRequest,
  LoginSNSResponse,
  SendRegisterOTPRequest,
  RegisterOTPResponse,
  RegisterSNSRequest,
  RegisterSNSResponse,
  ResetPasswordCodeRequest,
  UserResponse,
  VerifyUserRequest,
  VerifyUserResponse, SnsUserResponse, GetUserBySNS
} from '@/types/AuthType';

class AuthService {
  async registerOTP(params: SendRegisterOTPRequest): Promise<RegisterOTPResponse> {
    return await httpFetch(API_ENDPOINT.REGISTER_OTP, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }

  async registerVerify(params: VerifyUserRequest): Promise<VerifyUserResponse> {
    return await httpFetch(API_ENDPOINT.REGISTER_VERIFY, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }

  async registerEmail(params: CreateUserRequest): Promise<CreateUserResponse> {
    return await httpFetch(API_ENDPOINT.REGISTER_CREATE_USER, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }

  async registerSNS(params: RegisterSNSRequest): Promise<RegisterSNSResponse> {
    return await httpFetch(API_ENDPOINT.REGISTER_SNS, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }

  async loginSNS(params: LoginSNSRequest): Promise<LoginSNSResponse> {
    return await httpFetch(API_ENDPOINT.LOGIN_SNS, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }

  async getUserInfo(access_token: string): Promise<UserResponse> {
    return await httpFetch(API_ENDPOINT.GET_USER_INFO, {
      method: HTTP_METHOD.GET,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  async getUserInfoBySns(params: GetUserBySNS): Promise<UserResponse> {
    return await httpFetch(API_ENDPOINT.GET_SNS_USER_INFO, {
      body: params,
      method: HTTP_METHOD.GET
    });
  }

  async login(params: LoginRequest): Promise<LoginResponse> {
    return await httpFetch(API_ENDPOINT.LOGIN, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }

  async forgotPassword(params: ForgotRequest): Promise<ForgotResponse> {
    return await httpFetch(API_ENDPOINT.FORGOT_PASSWORD, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }

  async forgotPasswordReset(params: ResetPasswordCodeRequest): Promise<LoginResponse> {
    return await httpFetch(API_ENDPOINT.FORGOT_PASSWORD_RESET, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }

  async resendOTP(params: CreateUserRequest): Promise<CreateUserResponse> {
    return await httpFetch(API_ENDPOINT.FORGOT_PASSWORD_RESEND, {
      body: params,
      method: HTTP_METHOD.POST,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
