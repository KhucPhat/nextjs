'use client';
// React
import React, { useState } from 'react';

// Next
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Img
import StarNoActive from '@/assets/icons/star-noactive.svg?url';
import StarActive from '@/assets/icons/star-active.svg?url';
import blingFillSrc from '@/assets/icons/bling-fill-white.svg?url';

// Styles
import './styles.css';

// Router
import { ROUTES } from '@/router/routes';

// Component
import { Button } from '@/components/ui/button';
import ModalInfoComic from '@/components/feature/ComicDetail/components/ModalInfoComic';
import ModalImageComic from '@/components/feature/ComicDetail/components/ModalImageZoom';
import ChapterVolumeTabs from '@/components/feature/ComicDetail/components/ChapterVolumeTabs';

// Hooks
import useMediaQuery from '@/hooks/use-media-query';

// Utils
import { COMIC_DETAIL, QUERY_SEARCH } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers/common';
import { checkAvatarUrl } from '@/utils/validate';

// Types
import { ChapterReadMetadata, VolumeReadMetadata } from '@/types/ComicType';
import { ComicDetailData } from '@/types/ComicType';

// Services
import NextComicService from '@/services/NextComicService';

interface ComicDetailProps {
  comicDetailData: ComicDetailData;
  chapterReadMetadata: ChapterReadMetadata | null;
  volumeReadMetadata: VolumeReadMetadata | null;
}

export default function ComicDetail({
  comicDetailData,
  chapterReadMetadata,
  volumeReadMetadata,
}: ComicDetailProps) {
  const session = useSession();
  const [isLiked, setIsLiked] = useState<boolean>(comicDetailData?.is_favorite);
  const isPC = useMediaQuery('pc');
  const router = useRouter();

  const handleLikeComic = async (hash_id: string): Promise<void> => {
    try {
      await NextComicService.addFavorite(hash_id);
      setIsLiked(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="h-[380px] overflow-hidden relative">
        <div>
          <Image
            src={checkAvatarUrl(comicDetailData?.cover_thumbnail_url)}
            alt={comicDetailData?.name || 'lezhin-original'}
            width={1920}
            height={380}
            style={{
              width: '100%',
              height: 'auto',
              filter: 'blur(8px)',
              scale: 1.2,
            }}
          />
        </div>
        {comicDetailData?.cover_image_url && (
          <ModalImageComic src={checkAvatarUrl(comicDetailData.cover_image_url)} isPC={isPC} />
        )}
        {session.status === 'authenticated' && (
          <div
            onClick={() => {
              if (!comicDetailData.is_favorite) {
                handleLikeComic(comicDetailData.hash_id);
              }
            }}
            className="absolute h-12 w-12 bg-red bottom-4 z-5 right-4 bg-comic-modal-blur rounded-[50%] items-center flex justify-center cursor-pointer"
          >
            <Image src={isLiked ? StarActive : StarNoActive} alt="like" width={24} height={24} />
          </div>
        )}
      </div>

      <div className="content p-4 pb-9">
        <h3 className="text-text-primary text-[18px] font-bold leading-[27px]">
          {comicDetailData?.name}
        </h3>
        {comicDetailData?.author && (
          <p className="mt-1 text-[11px] font-bold text-comic">
            {COMIC_DETAIL.authorTitle}
            {comicDetailData?.author?.data.map((item, index, array) => (
              <span key={index} className="font-normal ml-1.5">
                <Link href={`${parseMessage(ROUTES.SEARCH, [QUERY_SEARCH.author, item.hash_id])}`}>
                  <span className="border-b !border-comic">{item.name}</span>
                </Link>
                <span className="border-b-0">{index < array.length - 1 ? '/' : ''}</span>
              </span>
            ))}
          </p>
        )}
        <p className="mt-2 text-[13px] font-normal text-text-primary">
          {comicDetailData?.category?.data.map((item, index, array) => (
            <span key={index} className="font-normal ml-1.5">
              <span className="text-[13px] font-normal">{item.name}</span>
              <span>{index < array.length - 1 ? ',' : ''}</span>
            </span>
          ))}
        </p>
        {comicDetailData && <ModalInfoComic isPC={isPC} dataComicDetail={comicDetailData} />}
        <div className="flex flex-wrap mt-4">
          {comicDetailData?.tag?.data.map((item, index) => (
            <Link
              href={`${parseMessage(ROUTES.SEARCH, [QUERY_SEARCH.tag, item.hash_id])}`}
              key={index}
              className="h-7 px-1.5 py-1 bg-white mr-1.5 rounded text-comic-tag text-[11px] flex items-center"
            >
              {parseMessage(COMIC_DETAIL.tag, [item.name])}
            </Link>
          ))}
        </div>
        {session.status !== 'authenticated' && (
          <div className="relative mt-[33px]">
            <Button
              className="bg-golden-yellow realtive w-full h-12"
              onClick={() => router.push(ROUTES.REGISTER)}
            >
              <Image
                src={blingFillSrc}
                objectFit="contain"
                alt="bling-fill"
                className="text-white"
                width={16}
                height={16}
              />
              <p className="text-black text-[11px]">
                {COMIC_DETAIL.suggestBy}
                <span className="text-crimson-red text-[15px]">
                  {parseMessage(COMIC_DETAIL.discount, [COMIC_DETAIL.sale])}
                </span>
              </p>
              <Image
                src={blingFillSrc}
                objectFit="contain"
                alt="bling-fill"
                className="text-white"
                width={16}
                height={16}
              />
            </Button>
            <div className="absolute font-bold h-[22px] bg-crimson-red px-4 py-1 flex items-center rounded-[11px] text-[11px] top-[-18px] left-1.5 text-white arrow-down">
              {COMIC_DETAIL.suggestTitle}
            </div>
          </div>
        )}
      </div>
      <div className="mt-[16px]">
        <ChapterVolumeTabs
          chapterReadMetadata={chapterReadMetadata}
          volumeReadMetadata={volumeReadMetadata}
        />
      </div>
    </div>
  );
}
