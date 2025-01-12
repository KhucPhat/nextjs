'use client';
// React
import { useEffect, useState } from 'react';

// Next
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// validate
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';

// Component
import { ContactUs } from '@/components/shared/Auth/ContactUs';
import { ButtonBase } from '@/components/common/Button';
import { CheckBoxBase } from '@/components/common/CheckBox';
import CompleteRegister from '@/components/feature/Register/Complete';

// Assets
import RegisterCheckBox from '@/assets/icons/register/ticket-checkbox.svg?url';

// Router
import { ROUTES } from '@/router/routes';

// Type
import { RegisterTermRequest } from '@/types/AuthType';

// Utils
import { deleteCookie, getCookie, setCookie } from '@/utils/cookies';
import { ACCEPT_TERM, MAIL_MAGAZINE_SUBCRIBED, PREVIOUS_PATH } from '@/utils/constants/cookieKeys';

// Lang
import { AUTH, COMMON, TERM_MESSAGE } from '@/utils/constants/langs';

// Service
import NextAuthService from '@/services/NextAuthService';

// hook
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  all: z.boolean().default(false).optional(),
  clause: z.boolean().default(false).optional(),
  security: z.boolean().default(false).optional(),
  receiveEmail: z.boolean().default(false).optional(),
});

const Terms = ({ isSNS = false }: { isSNS?: boolean }) => {
  const router = useRouter();
  const previourRouter = getCookie(PREVIOUS_PATH);
  const { data: session, update, status } = useSession();
  const form = useForm<RegisterTermRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      all: false,
      clause: false,
      security: false,
      receiveEmail: false,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleteRegister, setIsCompleteRegister] = useState<boolean>(false);

  const { clause, security, receiveEmail } = form.watch();
  const areAllChecked = clause && security && receiveEmail;

  const toPreviousRoute = () => {
    if (previourRouter) {
      router.push(previourRouter);
    } else {
      router.push(ROUTES.HOME_PAGE);
    }
  };

  const onSubmit = async () => {
    setCookie(MAIL_MAGAZINE_SUBCRIBED, receiveEmail);
    if (isSNS && session) {
      setIsLoading(true);
      try {
        const res = await NextAuthService.registerSns();
        await update({
          access_token: res.results.access_token,
          refresh_token: res.results.refresh_token,
          expires_in: res.results.expires_in,
        });
        setIsCompleteRegister(true);
        deleteCookie(MAIL_MAGAZINE_SUBCRIBED);
      } catch (error: any) {
        toast({
          description: AUTH[`${error?.message}`] ?? error?.message,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setCookie(ACCEPT_TERM, 1);
      router.push(ROUTES.REGISTER);
    }
  };

  useEffect(() => {
    form.setValue('all', areAllChecked);
  }, [areAllChecked]);

  return isCompleteRegister ? (
    <CompleteRegister />
  ) : (
    <div className="w-full max-md:h-screen h-full justify-center items-center text-black">
      <div className="bg-white rounded-[20px] py-6 px-4 w-full h-auto flex flex-col items-center">
        <div>
          <h4 className="text-[15px] font-bold leading-[18px] mb-4 text-center">
            {COMMON.freeMembershipRegistration}
          </h4>
          <p className="mb-5 font-normal text-[13px] leading-[19.5px]">
            {TERM_MESSAGE.termsAgreementMessage}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="w-full">
              <FormField
                control={form.control}
                name="all"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBase
                        {...field}
                        value={form.getValues('all')}
                        classNameBox="flex w-full items-center py-2 mb-[9px]"
                        classNameCheckBox="w-[14px] h-[14px] mr-1 border-none bg-[#ECECEC]"
                        onChange={(value) => {
                          (['clause', 'security', 'receiveEmail'] as const).forEach((field) =>
                            form.setValue(field, value)
                          );
                        }}
                        htmlFor="all"
                        label={TERM_MESSAGE.agreeAllTerms}
                        classNameContent="w-fit text-[13px] font-normal"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <hr className="bg-[#0000001a] mb-4" />
              <div className="flex items-center justify-between mb-[9px]">
                <FormField
                  control={form.control}
                  name="clause"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CheckBoxBase
                          {...field}
                          classNameBox="flex w-full items-center py-2"
                          classNameCheckBox="w-[14px] h-[14px] mr-1 border-none bg-[#ECECEC]"
                          htmlFor="clause"
                          label={
                            <>
                              <a
                                href="#"
                                className="!text-link border-b border-text-link cursor-pointer"
                              >
                                {TERM_MESSAGE.termOfUse}
                              </a>
                              {TERM_MESSAGE.agreeWith}
                            </>
                          }
                          classNameContent="w-fit text-[13px] font-normal"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Image src={RegisterCheckBox} alt="ticket-checkbox" />
              </div>
              <div className="flex items-center justify-between mb-[9px]">
                <FormField
                  control={form.control}
                  name="security"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CheckBoxBase
                          {...field}
                          classNameBox="flex w-full items-center py-2 "
                          classNameCheckBox="w-[14px] h-[14px] mr-1 border-none bg-[#ECECEC]"
                          htmlFor="security"
                          label={
                            <>
                              <a
                                href="#"
                                className="!text-link border-b border-text-link cursor-pointer"
                              >
                                {TERM_MESSAGE.privatePolicy}
                              </a>
                            </>
                          }
                          classNameContent="w-fit text-[13px] font-normal"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Image src={RegisterCheckBox} alt="ticket-checkbox" />
              </div>
              <FormField
                control={form.control}
                name="receiveEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CheckBoxBase
                        {...field}
                        classNameBox="flex w-full items-center py-2 mb-[9px]"
                        classNameCheckBox="w-[14px] h-[14px] mr-1 border-none bg-[#ECECEC]"
                        htmlFor="4"
                        label={TERM_MESSAGE.receiveEmail}
                        classNameContent="w-fit text-[13px] font-normal"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-between">
                <div className="w-[calc(50%_-_8px)]">
                  <ButtonBase
                    type="button"
                    label={TERM_MESSAGE.cancel}
                    disable={false}
                    className="mb-4 !text-black !w-full !border-transparent-black-102"
                    onClick={toPreviousRoute}
                  />
                </div>
                <div className="w-[calc(50%_-_8px)]">
                  <ButtonBase
                    fullBg
                    label={TERM_MESSAGE.agreeBtn}
                    disable={!clause || !security || isLoading || status == 'loading'}
                    className="w-full mb-4"
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>

        <ContactUs />
      </div>
    </div>
  );
};

export default Terms;
