'use client';
// React
import * as React from 'react';

// Libraries
import Autoplay from 'embla-carousel-autoplay';

// Components
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/carousel';
import Banner from '../Banner';

// Types
import { BannerData } from '@/types/BannerType';

// Styles
import './styles.css';

interface BannerCarouselProps {
  listBanner: BannerData[] | null;
}

export default function BannerCarousel({ listBanner }: BannerCarouselProps) {
  if (!listBanner || listBanner?.length === 0) {
    return <div className="w-full h-4 max-sm:h-20" />;
  }

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        loop: true,
        align: 'center',
      }}
    >
      <CarouselContent
        className={`carouse-content ${listBanner.length <= 2 && 'flex justify-center'}`}
      >
        {listBanner?.map((item, index) => (
          <CarouselItem key={index} className={`${listBanner.length >= 2 && 'carouse-item'}`}>
            <Banner data={item} isShowOne={listBanner.length < 2} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
}
