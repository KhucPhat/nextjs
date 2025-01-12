'use client';
// React
import { useEffect, useState } from 'react';

// Next
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

// Validate
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, passwordSchema } from '@/utils/zod/validate';

// Component
import { InputBase } from '@/components/common/Input';
import { ContactUs } from '@/components/shared/Auth/ContactUs';
import { ButtonBase } from '@/components/common/Button';
import { SNS } from '@/components/shared/Auth/SNS';

// Router
import { ROUTES } from '@/router/routes';

// Types
import { AuthEmailRequest, LoginRequest } from '@/types/AuthType';

// Utils
import {
  cleanQueryParams,
  getSnsProviderFromErrorCode,
  parseMessage,
  routeToCartOrDefault,
} from '@/utils/helpers';
import { EMAIL_EXISTED_IN_SNS_ACCOUNT, EXISTED_USER_EMAIL } from '@/utils/constants/errorCodes';

// Lang
import { AUTH, COMMON, LOGIN } from '@/utils/constants/langs';

// Service
import NextAuthService from '@/services/NextAuthService';

const formSchema = z.object({
  email: emailSchema(),
  password: passwordSchema,
});

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors, isDirty },
    register,
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm<LoginRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const email = watch('email');
  const password = watch('password');

  const isNoAction = !(
    (getValues('email') && !errors.email?.message && isDirty) ||
    (getValues('password') && !errors.password?.message && isDirty)
  );

  const onSubmit = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      const credential: AuthEmailRequest = {
        email: data.email,
        password: data.password,
        redirect: false,
      };
      // check credential
      await NextAuthService.login(credential);
      // log in nextauth
      await signIn('credentials', credential);
      const href = routeToCartOrDefault();
      router.push(href);
      router.refresh();
    } catch (error: any) {
      setIsLoading(false);
      if (error.status === 500) {
        setError('password', { message: LOGIN.errorServer });
        return;
      }
      if (error?.message?.includes(EMAIL_EXISTED_IN_SNS_ACCOUNT)) {
        const provider = getSnsProviderFromErrorCode(error.message);
        setError('password', {
          message: parseMessage(AUTH[`${EMAIL_EXISTED_IN_SNS_ACCOUNT}`] ?? error?.message, [
            provider,
          ]),
        });
      } else {
        setError('password', { message: AUTH[`${error?.message}`] ?? error?.message });
      }
    }
  };

  useEffect(() => {
    clearErrors();
  }, [email, password]);

  useEffect(() => {
    if (error) {
      cleanQueryParams();
    }
  }, []);

  const handleLogin = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full max-md:h-screen h-full justify-center items-center text-black">
      <div className="bg-white rounded-[20px] py-6 px-4 w-full h-auto flex flex-col items-center">
        <div>
          <h4 className="text-[15px] font-bold leading-[18px] mb-4 text-center">{LOGIN.SNS}</h4>
          <SNS />
        </div>
        <div className="w-full">
          <h4 className="text-[15px] font-bold leading-[18px] mb-5 text-center">{LOGIN.title}</h4>
          <form>
            <div className="w-full mb-5">
              <div className="mb-3">
                <InputBase
                  {...register('email', { required: true })}
                  type="email"
                  placeholder={COMMON.email}
                  classNameInput="w-full bg-[#ECECEC] text-[13px] font-normal leading-[15.6px] mb-2 h-10 rounded-[6px]"
                  messageError={errors.email?.message}
                />
              </div>
              <div>
                <InputBase
                  {...register('password', { required: true })}
                  type="password"
                  maxLength={30}
                  placeholder={COMMON.password}
                  classNameInput="w-full bg-[#ECECEC] text-[13px] font-normal leading-[15.6px] mb-2 h-10 rounded-[6px]"
                  messageError={errors.password?.message}
                />
              </div>
            </div>
          </form>
          <ButtonBase
            fullBg
            label={COMMON.login}
            loading={isLoading}
            disable={isNoAction || isLoading || !!errors.password?.message}
            className={`${error ? 'mb-2' : 'mb-4'}`}
            onClick={() => handleLogin()}
          />
          {error && (
            <p className="error text-[11px] font-normal leading-[initial] text-primary w-fit ml-auto mr-auto mb-4">
              {AUTH[EXISTED_USER_EMAIL]}
            </p>
          )}
          <div className="ml-auto flex mb-6">
            <Link
              className="text-[11px] text-link font-normal leading-[13.2px] text-center border-b ml-auto mr-auto w-fit border-link"
              href={ROUTES.FORGOT_PASSWORD}
            >
              {LOGIN.forgotPasswordLink}
            </Link>
          </div>
          <hr className="bg-[#00000040] mb-4" />
          <ButtonBase
            label={COMMON.register}
            className="mb-4"
            onClick={() => router.push(ROUTES.REGISTER_TERM)}
          />
        </div>
        <ContactUs />
      </div>
    </div>
  );
};

export default LoginForm;
