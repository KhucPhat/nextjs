'use client';
// React
import React, { useEffect, useState } from 'react';

// Next
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

// validate
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { restrictedEmailSchema } from '@/utils/zod/validate';

// Component
import { ContactUs } from '@/components/shared/Auth/ContactUs';
import { ButtonBase } from '@/components/common/Button';
import { InputBase } from '@/components/common/Input';
import { SNS } from '@/components/shared/Auth/SNS';

// Type
import { SendRegisterOTPRequest } from '@/types/AuthType';

// Router
import { ROUTES } from '@/router/routes';

// Cookie
import { hasCookie, setCookie } from '@/utils/cookies';

// Service
import NextAuthService from '@/services/NextAuthService';

// Utils
import { ACCEPT_TERM, REGISTER_EMAIL } from '@/utils/constants/cookieKeys';
import {
  cleanQueryParams,
  getSnsProviderFromErrorCode,
  parseMessage,
  routeToCartOrDefault,
} from '@/utils/helpers';
import { EXISTED_USER_EMAIL, SNS_EXISTED_IN_SNS_ACCOUNT } from '@/utils/constants/errorCodes';

// Lang
import { AUTH, COMMON, REGISTER } from '@/utils/constants/langs';

const formSchema = z.object({
  email: restrictedEmailSchema,
});

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isDirty },
  } = useForm<SendRegisterOTPRequest>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [showAnotherSnsLoginLink, setShowAnotherSnsLoginLink] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>('');
  const isNoAction = !errors.email?.message && isDirty;

  useEffect(() => {
    if (!error && !hasCookie(ACCEPT_TERM)) {
      router.push(ROUTES.REGISTER_TERM);
    }
    setIsLoadingPage(false);
  }, []);

  useEffect(() => {
    if (error) {
      cleanQueryParams();
      if (error.includes(SNS_EXISTED_IN_SNS_ACCOUNT)) {
        const provider = getSnsProviderFromErrorCode(error);
        setProvider(provider);
        setError('email', {
          message: parseMessage(AUTH[`${SNS_EXISTED_IN_SNS_ACCOUNT}`] ?? error, [provider]),
        });
        setShowAnotherSnsLoginLink(true);
      }
    }
  }, []);

  const onSubmit = async (data: SendRegisterOTPRequest) => {
    setIsLoading(true);

    try {
      await NextAuthService.registerOTP({
        email: data.email,
      });
      setCookie(REGISTER_EMAIL, data.email);
      setCookie(ACCEPT_TERM, 1);
      router.push(ROUTES.REGISTER_VERIFY);
    } catch (error) {
      setError('email', {
        message: AUTH[EXISTED_USER_EMAIL],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    handleSubmit(onSubmit)();
  };

  const handleLoginSns = async () => {
    let _provider = provider;
    if (provider.toLowerCase() === 'x') {
      _provider = 'twitter';
    }
    await signIn(_provider, {
      callbackUrl: routeToCartOrDefault(),
    });
  };

  // TODO use loading screen
  if (isLoadingPage) {
    return <></>;
  }

  return (
    <div className="w-full max-md:h-screen h-full justify-center items-center text-black">
      <div className="bg-white rounded-[20px] py-6 px-4 w-full h-auto flex flex-col ">
        <div>
          <h4 className="text-[15px] font-bold leading-[18px] mb-4 text-center">
            {COMMON.freeMembershipRegistration}
          </h4>
          <p className="mb-5 font-normal text-[13px] leading-[19.5px] text-left">
            {REGISTER.verificationCodeSentToEmail}
          </p>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-5">
              <InputBase
                {...register('email', { required: true })}
                type="text"
                placeholder={COMMON.email}
                classNameInput="w-full bg-[#ECECEC] text-[13px] font-normal leading-[15.6px] mb-2 h-10 rounded-[6px]"
                messageError={errors.email?.message}
              />
              {showAnotherSnsLoginLink && (
                <p
                  className="error text-[11px] font-normal leading-[initial] text-primary underline cursor-pointer"
                  onClick={handleLoginSns}
                >
                  {provider}
                  {REGISTER.provider}
                </p>
              )}
            </div>
          </form>
          <ButtonBase
            fullBg
            label={COMMON.sendConfirmationEmail}
            disable={!isNoAction || isLoading}
            className="mb-[32px]"
            onClick={() => {
              handleRegister();
            }}
          />
          <hr className="bg-[#0000001a] mb-4" />
          <div>
            <h4 className="text-[15px] font-bold leading-[18px] mb-4 text-center">
              {REGISTER.SNS}
            </h4>
          </div>
          <SNS />
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
