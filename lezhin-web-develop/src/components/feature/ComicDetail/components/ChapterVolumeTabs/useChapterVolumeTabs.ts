import { useEffect, useState } from 'react';

// Types
import { ChapterReadMetadata, VolumeReadMetadata } from '@/types/ComicType';

// Utils
import { COMIC_TABS } from '@/utils/constants/common';
import { COMIC_ITEM } from '@/utils/constants/langs';

const useChapterVolumeTabs = (
  chapterReadMetadata: ChapterReadMetadata | null,
  volumeReadMetadata: VolumeReadMetadata | null
) => {
  const [currentTab, setCurrentTab] = useState('');
  const [contentTabs, setContentTabs] = useState<{ label: string; value: string }[] | null>(null);

  useEffect(() => {
    const newContentTabs = [];

    if (chapterReadMetadata) {
      newContentTabs.push({
        label: COMIC_ITEM.chapterReading,
        value: COMIC_TABS.chapter,
      });
      setCurrentTab(COMIC_TABS.chapter);
    }

    if (volumeReadMetadata) {
      newContentTabs.push({
        label: COMIC_ITEM.volumeReading,
        value: COMIC_TABS.volume,
      });

      if (!chapterReadMetadata) {
        setCurrentTab(COMIC_TABS.volume);
      }
    }

    setContentTabs(newContentTabs);
  }, []);

  return { currentTab, setCurrentTab, contentTabs };
};

export default useChapterVolumeTabs;
