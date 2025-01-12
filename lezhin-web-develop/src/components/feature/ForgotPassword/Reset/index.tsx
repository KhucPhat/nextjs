'use client';
// React
import { useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

// Component
import { ButtonBase } from '@/components/common/Button';
import { InputBase } from '@/components/common/Input';
import { ContactUs } from '@/components/shared/Auth/ContactUs';

// Validate
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@/utils/zod/validate';

// Constant
import { ROUTES } from '@/router/routes';

// Types
import { ResetPasswordCodeRequest } from '@/types/AuthType';

// Service
import NextAuthService from '@/services/NextAuthService';

// Utils
import { getErrorMessage } from '@/utils/handleApiResponse';

// Lang
import { COMMON, FORGOT_PASSWORD } from '@/utils/constants/langs';

const formSchema = z.object({
  password: passwordSchema,
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const email = searchParams.get('email') || '';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isDirty },
  } = useForm<ResetPasswordCodeRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const password = watch('password');
  const isNoAction = !errors.password?.message && isDirty;
  const onSubmit = async (data: ResetPasswordCodeRequest) => {
    setIsLoading(true);

    try {
      const formResetPassword: ResetPasswordCodeRequest = {
        email: email,
        password: data.password,
        code: code,
      };
      await NextAuthService.forgotPasswordReset(formResetPassword);
      router.push(ROUTES.FORGOT_PASSWORD_COMPLETE);
    } catch (error: any) {
      const message = getErrorMessage(error);
      if (message) {
        setErrorMessage(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = () => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    setErrorMessage('');
  }, [password]);

  return (
    <div className="w-full h-full justify-center items-center text-black">
      <div className="bg-white rounded-[20px] py-6 px-4 w-full h-auto flex flex-col items-center">
        <h4 className="text-[15px] font-bold leading-[18px] mb-5 text-center">
          {FORGOT_PASSWORD.resetTitle}
        </h4>
        <p className="text-[13px] font-normal leading-[19.5px] mb-[6px] !text-start w-full">
          {FORGOT_PASSWORD.resetContent}
        </p>
        <p className="text-[11px] font-normal leading-[11px] mb-5 !text-start w-full text-[#0009]">
          {COMMON.passwordRule}
        </p>
        <div className="w-full">
          <form>
            <div className="w-full mb-5">
              <div className="mb-3">
                <InputBase
                  {...register('password', { required: true })}
                  type="password"
                  maxLength={30}
                  placeholder={COMMON.password}
                  classNameInput="w-full bg-[#ECECEC] text-[13px] font-normal leading-[15.6px] mb-2 h-10 rounded-[6px]"
                  messageError={errors.password?.message}
                />
                {errorMessage && (
                  <p className="error text-[11px] font-normal leading-[initial] text-primary">
                    {COMMON.resetFail}
                    <br />
                    <span>{COMMON.resetSuggest}</span>
                  </p>
                )}
              </div>
            </div>
          </form>
          <ButtonBase
            onClick={() => handleResetPassword()}
            fullBg
            label={COMMON.resetPassword}
            disable={!isNoAction || isLoading}
            className="mb-4"
          />
        </div>
        <ContactUs />
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
