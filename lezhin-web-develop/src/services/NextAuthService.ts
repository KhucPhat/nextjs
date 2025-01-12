// utils
import { deleteCookie } from '@/utils/cookies';
import { API_ENDPOINT, NEXTAUTH_API_ENDPOINT, STORAGE_KEYS } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';

// service
import { httpFetch, httpNextFetch } from '@/configs/fetch.config';

// type
import {
  CreateUserRequest,
  CreateUserResponse,
  ForgotRequest,
  ForgotResponse,
  LoginRequest,
  LoginResponse,
  SendRegisterOTPRequest,
  RegisterOTPResponse,
  RegisterSNSResponse,
  ResetPasswordCodeRequest,
  VerifyUserRequest,
  VerifyUserResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RefreshTokenData,
} from '@/types/AuthType';

class NextAuthService {
  async registerOTP(param: SendRegisterOTPRequest): Promise<RegisterOTPResponse> {
    return await httpFetch(NEXTAUTH_API_ENDPOINT.REGISTER_OTP, {
      body: param,
      method: HTTP_METHOD.POST,
    });
  }

  async registerVerify(param: VerifyUserRequest): Promise<VerifyUserResponse> {
    return await httpFetch(NEXTAUTH_API_ENDPOINT.REGISTER_VERIFY, {
      body: param,
      method: HTTP_METHOD.POST,
    });
  }

  async registerEmail(param: CreateUserRequest): Promise<CreateUserResponse> {
    return await httpFetch(NEXTAUTH_API_ENDPOINT.REGISTER_CREATE_USER, {
      body: param,
      method: HTTP_METHOD.POST,
    });
  }

  async registerSns(): Promise<RegisterSNSResponse> {
    return await httpFetch(NEXTAUTH_API_ENDPOINT.REGISTER_SNS, {
      method: HTTP_METHOD.POST,
    });
  }

  async login(param: LoginRequest): Promise<LoginResponse> {
    return await httpFetch(NEXTAUTH_API_ENDPOINT.LOGIN, {
      body: param,
      method: HTTP_METHOD.POST,
    });
  }

  async forgotPassword(param: ForgotRequest): Promise<ForgotResponse> {
    return await httpFetch(NEXTAUTH_API_ENDPOINT.FORGOT_PASSWORD, {
      body: param,
      method: HTTP_METHOD.POST,
    });
  }

  async forgotPasswordReset(param: ResetPasswordCodeRequest): Promise<LoginResponse> {
    return await httpFetch(NEXTAUTH_API_ENDPOINT.FORGOT_PASSWORD_RESET, {
      body: param,
      method: HTTP_METHOD.POST,
    });
  }

  async resendOTP(param: SendRegisterOTPRequest): Promise<CreateUserResponse> {
    return await httpFetch(NEXTAUTH_API_ENDPOINT.FORGOT_PASSWORD_RESEND, {
      body: param,
      method: HTTP_METHOD.POST,
    });
  }

  async refreshAccessToken(param: RefreshTokenRequest): Promise<RefreshTokenData> {
    const results = await httpFetch<Promise<RefreshTokenResponse>>(API_ENDPOINT.REFRESH_TOKEN, {
      body: param,
      method: HTTP_METHOD.POST,
    });
    return results.results;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new NextAuthService();
