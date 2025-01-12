// React
import React from 'react';

// next
import Image from 'next/image';

// Components
import Banner from '../Banner';

// Router
import { ROUTES } from '@/router/routes';

// Icons
import TimeDuration from '@/assets/icons/time-duration.svg?url';

// Types
import { BannerData } from '@/types/BannerType';
import { SectionData } from '@/types/TopPageType';

// Styles
import './styles.css';

// utils
import { TITLE_SECTION_OF_TOP_PAGE_AND_FLOOR_TOP } from '@/utils/constants/langs';

// Types
import { ComicData } from '@/types/ComicType';
import ComicList from '@/components/common/ComicList';

interface ComicListContainerProps {
  listBanner: BannerData[] | null;
  isTopPage: boolean;
  data: {
    readItems: ComicData[];
    favoriteItems: ComicData[];
    sessionItems: SectionData[];
    viewItems: ComicData[];
    releaseWeeklyItems: ComicData[];
  };
}

export default async function ComicListContainer({
  listBanner,
  isTopPage,
  data,
}: ComicListContainerProps) {
  const { readItems, favoriteItems, sessionItems, viewItems, releaseWeeklyItems } = data;

  return (
    <>
      <ComicList
        className="mb-2 default-display-item-comic"
        url={ROUTES.MY_BOOKSHELF}
        title={
          isTopPage
            ? TITLE_SECTION_OF_TOP_PAGE_AND_FLOOR_TOP.favoriteItemOnSale
            : TITLE_SECTION_OF_TOP_PAGE_AND_FLOOR_TOP.readMore
        }
        data={isTopPage ? favoriteItems : readItems}
      />

      <ComicList
        className="mb-2 default-display-item-comic"
        url={ROUTES.MY_BOOKSHELF}
        title={
          isTopPage
            ? TITLE_SECTION_OF_TOP_PAGE_AND_FLOOR_TOP.readMore
            : TITLE_SECTION_OF_TOP_PAGE_AND_FLOOR_TOP.newRelease
        }
        data={isTopPage ? readItems : releaseWeeklyItems}
      />
      {isTopPage && (
        <ComicList
          className="mb-2 checked-work-section"
          title={
            <div className="flex items-center">
              <div className="relative w-6 h-6 max-md:w-4 max-md:h-4 mr-[3px]">
                <Image src={TimeDuration} alt="time-duration" fill />
              </div>
              <span className="font-bold text-[20px] max-md:text-[15px] leading-[18px] ml-0.5">
                {TITLE_SECTION_OF_TOP_PAGE_AND_FLOOR_TOP.timeDuration}
              </span>
            </div>
          }
          data={viewItems}
        />
      )}
      {listBanner?.[0] && <Banner data={listBanner[0]} maxWidth="562px" />}
      {sessionItems &&
        sessionItems
          .slice(0, 2)
          .map((items, index) => (
            <ComicList
              key={index}
              className="mb-2 default-display-item-comic"
              url={ROUTES.MY_BOOKSHELF}
              backgroundColor={items.background_color}
              title={items.name}
              data={items.items}
              maxRow={items.max_row}
            />
          ))}

      {listBanner?.[1] && <Banner data={listBanner[1]} maxWidth="562px" />}
      {sessionItems &&
        sessionItems.length > 2 &&
        sessionItems
          .slice(2, 6)
          .map((items, index) => (
            <ComicList
              key={index}
              className="mb-2 default-display-item-comic"
              url={ROUTES.MY_BOOKSHELF}
              backgroundColor={items.background_color}
              title={items.name}
              data={items.items}
              maxRow={items.max_row}
            />
          ))}
      {listBanner?.[2] && <Banner data={listBanner[2]} maxWidth="562px" />}
    </>
  );
}
