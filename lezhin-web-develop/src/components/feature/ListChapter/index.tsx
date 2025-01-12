'use client';
// Next
import Image from 'next/image';

// Components
import ChapterItem from '@/components/common/Chapter/ChapterItem';
import { Button } from '@/components/ui/button';
import SortControlPanel from '@/components/common/SortControlPanel';

// Utils
import { mockListChapterData } from '@/utils/mockData';
import { parseMessage } from '@/utils/helpers';
import { COMIC_ITEM } from '@/utils/constants/langs';

export default function ListChapter() {
  const data = mockListChapterData;

  const mockTotalChapter = 20;

  return (
    <div>
      <div className="flex flex-col items-center w-full px-4 pt-4 pb-[18px] bg-white">
        <Button className="w-[280px] h-9 text-[13px] rounded btn-drop-shadow-red">
          {COMIC_ITEM.bulkPurchase}
        </Button>
      </div>
      <SortControlPanel
        title={parseMessage(COMIC_ITEM.totalChappter, [mockTotalChapter])}
        onSort={() => {
          // TODO: wait api
        }}
        loading={false}
        titleSort={COMIC_ITEM.fromBeginning}
      />

      <div>
        {data?.map((item, index) => (
          <div className="first:mt-0 mt-2 bg-white" key={index}>
            {item?.volume_id && (
              <div className="flex items-center px-4 py-2 border-very-light-black border-b-2">
                <Image
                  src={item.volume_url}
                  style={{ objectFit: 'cover' }}
                  alt={item.volume_url}
                  className="max-h-[43px] max-w-8 h-full w-full"
                  height={57}
                  width={57}
                />
                <p className="text-black text-[11px] ml-3">{item.name}</p>
              </div>
            )}
            {item.chapter?.map((chapter) => (
              <ChapterItem
                item={chapter}
                key={chapter.hash_id}
                onClickChapter={() => {
                  // TODO: wait api
                }}
                onCountdownComplete={() => {
                  // TODO: wait api
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
