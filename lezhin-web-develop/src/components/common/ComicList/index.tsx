'use client';

import { Fragment, useEffect, useState } from 'react';

// Next
import Link from 'next/link';

// Components
import ItemComic from '../ItemComic';

// Types
import { ComicData } from '@/types/ComicType';

// Icons
import { ChevronRightIcon } from 'lucide-react';

// Styles
import './styles.css';

// Hooks
import useMediaQuery from '@/hooks/use-media-query';

interface ComicListProps {
  url?: string;
  title: string | React.ReactNode;
  data?: ComicData[];
  className?: string;

  isNoScrollHorizontal?: boolean;
  backgroundColor?: string;
  maxRow?: number;
}

export default function ComicList({
  url,
  title,
  data,
  className = '',
  backgroundColor = '#fff',
  maxRow,
  isNoScrollHorizontal = false,
}: ComicListProps) {
  const [filterData, setFilterData] = useState<ComicData[]>([]);
  const isMobile = useMediaQuery('mobile');
  const isPC = useMediaQuery('pc');

  const renderSpacer = (index: number, totalLength: number): JSX.Element | null => {
    if (index === totalLength - 1) return null;

    const shouldRenderSpacer =
      (isMobile && (index + 1) % 3 !== 0) || (isPC && (index + 1) % 6 !== 0);

    return Number(maxRow) === 1 || !maxRow ? (
      <div className="spacer">
        <div />
      </div>
    ) : shouldRenderSpacer ? (
      <div className="spacer">
        <div />
      </div>
    ) : (
      <></>
    );
  };
  useEffect(() => {
    if (!data?.length) return;
    const rowsToShow = maxRow && maxRow !== 1 ? (isPC ? maxRow * 6 : maxRow * 3) : data.length;

    const filter = data
      .slice(0, rowsToShow)
      .sort((a: ComicData, b: ComicData) => a.display_order - b.display_order);

    setFilterData(filter);
  }, [data, maxRow, isPC, isMobile]);

  if (!data || data?.length === 0) return <></>;

  return (
    <div
      className={`comic-list-container ${className}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <div>
        {url ? (
          <Link href={url} className="flex items-center justify-between pl-4 py-3 pr-2">
            <span className="font-bold text-[20px] max-md:text-[15px] leading-[18px]">{title}</span>
            <ChevronRightIcon className="h-6 w-6" />
          </Link>
        ) : (
          <div className="px-4 py-3 font-bold text-[20px] max-md:text-[15px] leading-[18px]">
            {title}
          </div>
        )}
      </div>

      <div
        className={`w-full flex ${Number(maxRow) > 1 && 'flex-wrap'}`}
        style={{
          overflowX: isNoScrollHorizontal ? 'hidden' : 'auto',
        }}
      >
        {filterData?.map((item, index) => (
          <Fragment key={index}>
            <ItemComic data={item} />
            {renderSpacer(index, filterData.length)}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
