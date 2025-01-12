// next
import Image from 'next/image';
import Link from 'next/link';

// Assets
import lezhinSrc from '@/assets/img/lezhin.png';
import xSrc from '@/assets/img/x.png';
import instagramSrc from '@/assets/img/instagram.png';
import youtubeSrc from '@/assets/img/youtube.png';
import blogSrc from '@/assets/img/blog.png';
import authorizedBookJapanSrc from '@/assets/img/authorized-book-japan.png';

// Router
import { LINK, ROUTES } from '@/router/routes';

// Lang
import { COMMON, FOOTER } from '@/utils/constants/langs';

const linkSns = [
  { href: LINK.x, src: xSrc },
  { href: LINK.instagram, src: instagramSrc },
  { href: LINK.youtube, src: youtubeSrc },
  { href: LINK.blog, src: blogSrc },
];

const legalLinks = [
  { href: ROUTES.TERM, label: FOOTER.termsOfService },
  { href: ROUTES.PRIVACY_POLICY, label: FOOTER.privacyPolicy },
  { href: ROUTES.HELP_CENTER, label: COMMON.helpCenter },
  { href: ROUTES.COMMERCIAL_TRANSACTION_LAW, label: FOOTER.actOnSpecifiedCommercialTransactions },
];

export default function Footer() {
  return (
    <footer className="text-center bg-white max-sm:mb-16">
      <div className="bg-primary p-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="sm:flex justify-between items-center">
            <div className="flex flex-wrap">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white px-1 py-[11px] max-sm:w-2/4 sm:mr-8 md:mr-2 text-left font-bold text-[13px]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex justify-center max-sm:py-6">
              {linkSns.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-10 h-10 bg-semi-transparent-white rounded-full flex justify-center items-center sm:ml-4 max-sm:mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={item.src} style={{ objectFit: 'contain' }} alt={item.href} />
                </a>
              ))}
            </div>
          </div>

          <div className="max-sm:hidden flex flex-col my-10">
            <span className="text-[15px] text-white text-left font-bold w-full">
              {FOOTER.copyrightProtectionNotice}
            </span>
            <span className="text-[13px] text-white text-left mt-2">{FOOTER.copyrightNotice}</span>
          </div>

          <div className="flex">
            <div className="w-16 min-w-16">
              <Image
                src={authorizedBookJapanSrc}
                style={{ objectFit: 'contain' }}
                alt="authorized-book-japan"
              />
            </div>
            <span className="ml-5 text-[11px] text-white text-left">{FOOTER.abjMarkNotice}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-6">
        <Image src={lezhinSrc} style={{ objectFit: 'contain' }} alt="lezhin" />
        <div className="text-center text-neutral-gray pt-2">{FOOTER.companyName}</div>
      </div>
    </footer>
  );
}
