// Next
import { useRouter } from 'next/navigation';

// Component
import { ButtonBase } from '@/components/common/Button';
import { ContactUs } from '@/components/shared/Auth/ContactUs';

// Lang
import { COMMON, FORGOT_PASSWORD } from '@/utils/constants/langs';

const ForgotPasswordForm = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full justify-center items-center text-black">
      <div className="bg-white rounded-[20px] py-6 px-4 w-full h-auto flex flex-col items-center">
        <div>
          <h4 className="text-[15px] font-bold leading-[18px] mb-5 text-center">
            {FORGOT_PASSWORD.resetTitle}
          </h4>
          <p className="text-[13px] font-normal leading-[19.5px] mb-5 text-center">
            {FORGOT_PASSWORD.formContent}
          </p>
        </div>
        <div className="w-full">
          <ButtonBase
            fullBg
            onClick={() => router.push('/')}
            label={COMMON.goToTopPage}
            disable={false}
            className="mb-8"
          />
        </div>
        <ContactUs />
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
