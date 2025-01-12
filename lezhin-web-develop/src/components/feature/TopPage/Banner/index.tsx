// React
import * as React from 'react';

// Next
import Image from 'next/image';
import Link from 'next/link';

// Types
import { BannerData } from '@/types/BannerType';

interface BannerProps {
  data: BannerData;
  maxWidth?: string;
  isShowOne?: boolean;
}

export default function Banner({ data, maxWidth, isShowOne }: BannerProps) {
  const getUrl = (type: string, value: string) => {
    // TODO: handle case title, collection when have page title, collection
    switch (type) {
      case 'title':
        return value;
      case 'collection':
        return value;

      default:
        return value;
    }
  };

  return (
    <div
      className="m-auto h-full w-full"
      style={{
        maxWidth,
      }}
    >
      <Link href={getUrl(data.destination_type, data.destination_value)}>
        <div className={`m-auto h-full ${isShowOne && 'w-[450px]'}`}>
          <Image
            src={data.banner_image_url}
            alt={data.banner_image_url}
            width={1920}
            height={0}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </Link>
    </div>
  );
}
