'use client';
// React
import { useState } from 'react';

// Next
import { useRouter } from 'next/navigation';

// Validate
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema } from '@/utils/zod/validate';

// Component
import { ButtonBase } from '@/components/common/Button';
import { InputBase } from '@/components/common/Input';
import { ContactUs } from '@/components/shared/Auth/ContactUs';

// Type
import { ForgotRequest } from '@/types/AuthType';

// Router
import { ROUTES } from '@/router/routes';

// Service
import NextAuthService from '@/services/NextAuthService';

// Lang
import { COMMON, FORGOT_PASSWORD } from '@/utils/constants/langs';

const formSchema = z.object({
  email: emailSchema(COMMON.validateEmailNoSuggest),
});

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isDirty },
    register,
  } = useForm<ForgotRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  const isNoAction = !errors.email?.message && isDirty;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: ForgotRequest) => {
    setIsLoading(true);

    try {
      const formForgot: ForgotRequest = {
        email: data.email,
      };
      await NextAuthService.forgotPassword(formForgot);
      router.push(ROUTES.FORGOT_PASSWORD_CONFIRM);
    } catch (error) {
      router.push(ROUTES.FORGOT_PASSWORD_CONFIRM);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full h-full justify-center items-center text-black">
      <div className="bg-white rounded-[20px] py-6 px-4 w-full h-auto flex flex-col items-center">
        <div>
          <h4 className="text-[15px] font-bold leading-[18px] mb-5 text-center">
            {FORGOT_PASSWORD.title}
          </h4>
          <p className="text-[13px] font-normal leading-[19.5px] mb-5">{FORGOT_PASSWORD.content}</p>
        </div>
        <div className="w-full">
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
          </div>
          <ButtonBase
            onClick={() => {
              handleForgotPassword();
            }}
            fullBg
            label={COMMON.sendConfirmationEmail}
            disable={!isNoAction || isLoading}
            className="mb-8"
          />
        </div>
        <ContactUs />
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
