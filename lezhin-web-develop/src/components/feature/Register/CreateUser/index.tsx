'use client';
// React
import { useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/navigation';

// NextAuth
import { signIn } from 'next-auth/react';

// Validate
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@/utils/zod/validate';

// Component
import { ContactUs } from '@/components/shared/Auth/ContactUs';
import { ButtonBase } from '@/components/common/Button';
import { InputBase } from '@/components/common/Input';
import { SNS } from '@/components/shared/Auth/SNS';
import CompleteRegister from '../Complete';

// Types
import { CreateUserRequest, AuthEmailRequest } from '@/types/AuthType';

// Utils
import { deleteCookie, getCookie, hasCookie } from '@/utils/cookies';
import { getErrorMessage } from '@/utils/handleApiResponse';

// Service
import NextAuthService from '@/services/NextAuthService';

// Hook
import { toast } from '@/hooks/use-toast';

// Route
import { ROUTES } from '@/router/routes';

// Lang
import { ACCEPT_TERM, MAIL_MAGAZINE_SUBCRIBED, REGISTER_EMAIL } from '@/utils/constants/cookieKeys';
import { COMMON, REGISTER } from '@/utils/constants/langs';

const formSchema = z.object({
  password: passwordSchema,
});

const CreateUserForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors, isDirty },
    register,
  } = useForm<CreateUserRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });
  const isNoAction = !errors.password?.message && isDirty;
  const [isCompleteRegister, setIsCompleteRegister] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);

  useEffect(() => {
    if (!hasCookie(ACCEPT_TERM)) {
      router.push(ROUTES.REGISTER_TERM);
    }
    setIsLoadingPage(false);
  }, []);

  const onSubmit = async (data: CreateUserRequest) => {
    setIsLoading(true);
    try {
      const email = getCookie(REGISTER_EMAIL) ?? '';
      const isMagazineSubcribed = getCookie(MAIL_MAGAZINE_SUBCRIBED) === 'true';
      const password = data.password ?? '';
      const credential: AuthEmailRequest = {
        email: email,
        password: password,
        is_mail_magazine_subscribed: isMagazineSubcribed,
        redirect: false,
      };
      // create user in API
      await NextAuthService.registerEmail(credential);
      // log in nextauth
      await signIn('credentials', credential);
      // delete cookies
      deleteCookie(ACCEPT_TERM);
      deleteCookie(MAIL_MAGAZINE_SUBCRIBED);
      deleteCookie(REGISTER_EMAIL);

      setIsCompleteRegister(true);
    } catch (error: any) {
      toast({
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = () => {
    if (errors.password?.message) return;
    handleSubmit(onSubmit)();
  };

  if (isLoadingPage) {
    return <></>;
  }

  return (
    <>
      {isCompleteRegister ? (
        <CompleteRegister />
      ) : (
        <div className="w-full max-md:h-screen h-full justify-center items-center text-black">
          <div className="bg-white rounded-[20px] py-6 px-4 w-full h-auto flex flex-col items-center">
            <div>
              <h4 className="text-[15px] font-bold leading-[18px] mb-4 text-center">
                {COMMON.freeMembershipRegistration}
              </h4>
              <p className="text-[13px] leading-[19.5px] mb-2">
                {REGISTER.emailVerificationComplete}
              </p>
              <p className="text-content-blur font-normal leading-[11px] mb-[17px] text-[11px]">
                {COMMON.passwordRule}
              </p>
            </div>
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mb-5">
                  <InputBase
                    {...register('password', { required: true })}
                    type="password"
                    maxLength={30}
                    placeholder={COMMON.password}
                    classNameInput="w-full bg-[#ECECEC] text-[13px] font-normal leading-[15.6px] mb-2 h-10 rounded-[6px]"
                    messageError={errors.password?.message}
                  />
                </div>
              </form>
              <ButtonBase
                fullBg
                label={COMMON.createUser}
                disable={!isNoAction || isLoading}
                className="mb-[32px]"
                onClick={() => handleVerify()}
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
      )}
    </>
  );
};

export default CreateUserForm;
