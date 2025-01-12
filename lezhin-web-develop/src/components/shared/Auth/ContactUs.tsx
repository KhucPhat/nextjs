// next
import Link from 'next/link';

// router
import { ROUTES } from '@/router/routes';

// Lang
import { CONTACT_US } from '@/utils/constants/langs';

export function ContactUs() {
  return (
    <div className="bg-[#ECECEC] rounded-lg w-full p-4 break-words leading-[19px]">
      <p className="font-normal text-[11px]">
        {CONTACT_US.title}
        <Link
          className="text-[11px] text-link text-center border-b border-link"
          href={ROUTES.FORGOT_PASSWORD}
        >
          {CONTACT_US.forgotPasswordLink}
        </Link>
        <span>{CONTACT_US.forgotPasswordContent}</span>
        <Link className="text-link border-link border-b" href={`mailto:${CONTACT_US.supportMail}`}>
          {CONTACT_US.supportMail}
        </Link>
        <span>{CONTACT_US.supportContent}</span>
      </p>
    </div>
  );
}
