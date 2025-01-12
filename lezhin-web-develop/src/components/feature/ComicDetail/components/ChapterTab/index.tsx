'use client';

// React
import { useState } from 'react';

// Next
import { useSession } from 'next-auth/react';

// Libraries
import { fromUnixTime } from 'date-fns';

// Components
import { Button } from '@/components/ui/button';
import Countdown from '@/components/common/CountDown';
import LoadingChapterItem from '@/components/common/Chapter/ChapterItem/loading';
import ChapterItem from '@/components/common/Chapter/ChapterItem';
import SortControlPanel from '@/components/common/SortControlPanel';

// Hooks
import useChapterTab from './useChapterTab';

// Icons
import WaitForFreeSquareIcon from '@/assets/icons/wait-for-free-square.svg';

// Types
import { ChapterReadMetadata } from '@/types/ComicType';

// Utils
import { COMIC_ITEM } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers';
import { ORDER_TYPE } from '@/utils/constants/common';

interface ChapterTabsProps {
  chapterReadMetadata: ChapterReadMetadata;
}

export default function ChapterTab({ chapterReadMetadata }: ChapterTabsProps) {
  const { chapterData, sortChapter, loading, fetchData, orderType } =
    useChapterTab(chapterReadMetadata);
  const { data, next_wait_for_free_at = null } = chapterData;

  const titleSort = orderType === ORDER_TYPE.DESC ? COMIC_ITEM.fromNew : COMIC_ITEM.fromBeginning;

  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <div>
      {isAuthenticated && (
        <div className="flex items-center justify-between px-4 py-3 border-very-light-black border-y">
          <div className="flex items-center">
            <WaitForFreeSquareIcon />
            <span className="text-black ml-1 text-[13px]">
              {chapterData.total_wait_for_free ?? 0}
              {COMIC_ITEM.waitForFree}
            </span>
          </div>
          {next_wait_for_free_at ? (
            <Countdown
              className="overflow-hidden text-white text-[11px] font-bold w-[122px] h-[24px] bg-[#B0B0B0] rounded-sm"
              targetDate={fromUnixTime(next_wait_for_free_at)}
              prefix={COMIC_ITEM.left}
              showProcessbar
              onCountdownComplete={fetchData}
            />
          ) : (
            <div className="flex justify-center items-center bg-mint-green font-bold w-[122px] text-white text-[11px] h-[24px] rounded-sm">
              {COMIC_ITEM.readItNow}
            </div>
          )}
        </div>
      )}

      <SortControlPanel
        title={parseMessage(COMIC_ITEM.totalChappter, [chapterData.total_chapter])}
        onSort={sortChapter}
        loading={loading}
        titleSort={titleSort}
      />

      {loading && <LoadingChapterItem />}

      {!loading &&
        data?.map((item) => (
          <ChapterItem
            item={item}
            key={item.hash_id}
            onClickChapter={() => {}}
            onCountdownComplete={fetchData}
            hasWaitForFree={Boolean(next_wait_for_free_at)}
          />
        ))}

      <div className="flex flex-col items-center w-full px-4 pt-2.5 pb-5">
        <Button
          className="w-[280px] h-9 text-[13px] rounded btn-drop-shadow-gray mb-2.5"
          variant="secondary"
        >
          {parseMessage(COMIC_ITEM.showAllChappter, [chapterData.total_chapter])}
        </Button>
        <Button className="w-[280px] h-9 text-[13px] rounded btn-drop-shadow-red">
          {COMIC_ITEM.bulkPurchase}
        </Button>
      </div>
    </div>
  );
}
