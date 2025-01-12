'use client';
import { useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/navigation';

// Validate
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Component
import { ContactUs } from '@/components/shared/Auth/ContactUs';
import { ButtonBase } from '@/components/common/Button';
import { InputBase } from '@/components/common/Input';
import { SNS } from '@/components/shared/Auth/SNS';

// Types
import { VerifyUserRequest } from '@/types/AuthType';

// Router
import { ROUTES } from '@/router/routes';

// Utils
import { getCookie, hasCookie } from '@/utils/cookies';
import { ACCEPT_TERM, REGISTER_EMAIL } from '@/utils/constants/cookieKeys';

// Service
import NextAuthService from '@/services/NextAuthService';

// Lang
import { COMMON, REGISTER } from '@/utils/constants/langs';

const formSchema = z.object({
  code: z.string().refine((e) => !(e.length < 6), {
    message: '認証コードは6桁です。',
  }),
});

const CreateUserForm = () => {
  const router = useRouter();
  const [enableResend, setEnableResend] = useState<boolean>(true);
  const [showMessageResend, setShowEnableResend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('.....');
  const {
    handleSubmit,
    formState: { errors, isDirty },
    register,
    setError,
  } = useForm<VerifyUserRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });
  const timeShowMessage = 10000;

  const isNoAction = !errors.code?.message && isDirty;

  useEffect(() => {
    if (!hasCookie(ACCEPT_TERM)) {
      router.push(ROUTES.REGISTER_TERM);
    }
    setIsLoadingPage(false);
  }, []);

  useEffect(() => {
    const email = getCookie(REGISTER_EMAIL) ?? '';
    setEmail(email);
  }, []);

  const onSubmit = async (data: VerifyUserRequest) => {
    try {
      setIsLoading(true);
      data.email = email;
      await NextAuthService.registerVerify({
        email: data.email,
        code: data.code,
      });
      router.push(ROUTES.REGISTER_CREATE_USER);
    } catch (error) {
      setError('code', {
        message: '認証コードを確認してください。',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reSendOTP = async () => {
    if (enableResend) {
      try {
        await NextAuthService.resendOTP({
          email: email,
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
        setEnableResend(false);
        setTimeout(() => {
          setEnableResend(true);
          setShowEnableResend(false);
        }, timeShowMessage);
      }
    } else {
      setShowEnableResend(true);
    }
  };

  const handleVerifyUser = () => {
    handleSubmit(onSubmit)();
  };

  if (isLoadingPage) {
    return <></>;
  }

  return (
    <div className="w-full max-md:h-screen h-full justify-center items-center text-black">
      <div className="bg-white rounded-[20px] py-6 px-4 w-full h-auto flex flex-col items-center">
        <div>
          <h4 className="text-[15px] font-bold leading-[18px] mb-4 text-center">
            {COMMON.freeMembershipRegistration}
          </h4>
          <p className="mb-5 text-[13px] leading-[19.5px] mb-3">
            {REGISTER.verificationCodeSentCheckSpam}
          </p>
          <p className="text-black font-bold leading-[18px] text-center mb-[17px]">{email}</p>
          <ButtonBase
            className="!text-black !border-transparent-black-102"
            label={COMMON.resetOTP}
            onClick={() => reSendOTP()}
          />
          {showMessageResend && (
            <p className={`mb-5 text-[13px] leading-[19.5px]`}>
              {REGISTER.verificationCodeSentCheckSpamFolder}
            </p>
          )}
          <hr className="bg-[#0000001a] mb-4" />
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-5">
              <InputBase
                {...register('code', {
                  required: true,
                })}
                maxLength={6}
                type="text"
                typeValue="number"
                placeholder={COMMON.OTP}
                classNameInput="w-full bg-[#ECECEC] text-[13px] font-normal leading-[15.6px] mb-2 h-10 rounded-[6px]"
                messageError={errors.code?.message}
              />
            </div>
          </form>
          <ButtonBase
            fullBg
            label={COMMON.verifyUser}
            disable={!isNoAction || isLoading}
            className="mb-[32px]"
            onClick={() => handleVerifyUser()}
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

export default CreateUserForm;
