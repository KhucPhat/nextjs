'use client';

// Routes
import Link from 'next/link';
import { ROUTES } from '@/router/routes';
import { useParams } from 'next/navigation';

// Components
import Tabs from '@/components/common/Tabs';
import { Button } from '@/components/ui/button';
import ChapterTab from '../ChapterTab';
import VolumeTab from '../VolumeTab';

// Hooks
import useChapterVolumeTabs from './useChapterVolumeTabs';

// Types
import { ChapterReadMetadata, VolumeReadMetadata } from '@/types/ComicType';

// Utils
import { COMIC_ITEM } from '@/utils/constants/langs';
import { COMIC_TABS } from '@/utils/constants/common';
import { bindPath, parseMessage } from '@/utils/helpers';

// Styles
import './styles.css';

interface ChapterVolumeTabsProps {
  chapterReadMetadata: ChapterReadMetadata | null;
  volumeReadMetadata: VolumeReadMetadata | null;
}

export default function ChapterVolumeTabs({
  chapterReadMetadata,
  volumeReadMetadata,
}: ChapterVolumeTabsProps) {
  const { currentTab, setCurrentTab, contentTabs } = useChapterVolumeTabs(
    chapterReadMetadata,
    volumeReadMetadata
  );
  const { slug } = useParams();

  const getContentButton = () => {
    const type =
      currentTab === COMIC_TABS.chapter
        ? chapterReadMetadata?.read_button_type
        : volumeReadMetadata?.read_button_type;

    const isChapterTab = currentTab === COMIC_TABS.chapter;
    const key = isChapterTab ? 'readTheChapter' : 'readTheVolume';
    const value =
      (isChapterTab
        ? chapterReadMetadata?.next_chapter_number
        : volumeReadMetadata?.next_volume_number) || 0;

    return {
      title: type === 'read' ? parseMessage(COMIC_ITEM[key], [value]) : COMIC_ITEM.readBeginning,
      hash_id:
        currentTab === COMIC_TABS.chapter
          ? `${bindPath(ROUTES.CHAPTER_DETAIL, [
              slug as string,
              chapterReadMetadata?.next_chapter_hash_id as string,
            ])}`
          : `${bindPath(ROUTES.VOLUME_DETAIL, [
              slug as string,
              volumeReadMetadata?.next_volume_hash_id as string,
            ])}`,
    };
  };

  return (
    <div className="chapter-volume-tabs bg-white rounded-t-xl">
      {contentTabs && (
        <>
          <Tabs
            defaultValue={currentTab}
            items={contentTabs}
            onChange={(value) => {
              setCurrentTab(value);
            }}
          />
          <div className="w-full px-4 py-2.5">
            <Link href={`${getContentButton()?.hash_id}`}>
              <Button className="w-full h-10 text-[13px] rounded btn-drop-shadow-red">
                {getContentButton()?.title}
              </Button>
            </Link>
          </div>
        </>
      )}

      {currentTab === COMIC_TABS.chapter && chapterReadMetadata && (
        <ChapterTab chapterReadMetadata={chapterReadMetadata} />
      )}
      {currentTab === COMIC_TABS.volume && volumeReadMetadata && (
        <VolumeTab volumeReadMetadata={volumeReadMetadata} />
      )}
    </div>
  );
}
