'use client';

// React
import React, { useEffect } from 'react';

// Routes
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// Assets
import RegisterLogo from '@/assets/icons/register/logo_lezhin.svg?url';
import RegisterLogoName from '@/assets/icons/register/name_lezhin.svg?url';

// Utils
import { savePreviousRoute } from '@/utils/helpers';

export default function Logo() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    savePreviousRoute(pathname, searchParams.toString());
  }, [pathname, searchParams]);

  return (
    <Link href="/">
      <div className="flex justify-center mb-4 relative w-full">
        <Image
          src={RegisterLogo}
          alt="logo"
          width={59.37}
          height={60}
          className="mr-[8.9px]"
          style={{ objectFit: 'contain' }}
        />
        <Image
          src={RegisterLogoName}
          alt="name-logo"
          width={111.72}
          height={60}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </Link>
  );
}
