// React
import React from 'react';

// Next
import Link from 'next/link';
import { ROUTES } from '@/router/routes';

// Component
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Utils
import { COMIC_DETAIL, QUERY_SEARCH } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers';

// Icons
import { ChevronRightIcon } from 'lucide-react';

interface ModalInfoComicProps {
  isPC: boolean;
  dataComicDetail: {
    description: string;
    publisher: {
      name: string;
      hash_id: string;
    };
    copyright: string;
    tag?: {
      data: {
        name: string;
        hash_id: string;
      }[];
    };
  };
}

export default function ModalInfoComic({ isPC, dataComicDetail }: ModalInfoComicProps) {
  return (
    <Dialog>
      <DialogTitle className="hidden" />
      <DialogTrigger asChild>
        <Button className="text-black bg-white rounded-[30px] border-[0.5px] border-comic-btn mt-2 font-normal">
          {COMIC_DETAIL.comicDetailInfo}
          <ChevronRightIcon className="h-6 w-6 text-black" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md !bg-light-grayish-blue py-8 px-4" isPC={isPC}>
        <DialogDescription className="hidden" />
        <div className="overflow-y-scroll no-scrollbar flex flex-col text-[13px] font-normal leading-[19.5px] py-8 px-5 bg-white mt-6 rounded-[16px] text-[#333]">
          <h4 className="text-[15px] font-bold leading-[18px] mb-2">
            {COMIC_DETAIL.modalContents.title}
          </h4>
          <p className="mb-5">{dataComicDetail?.description}</p>
          <p className="text-comic font-bold mb-4">
            {COMIC_DETAIL.modalContents.pushlisherTitle}
            <Link
              href={`${parseMessage(ROUTES.SEARCH, [
                QUERY_SEARCH.author,
                dataComicDetail.publisher.hash_id,
              ])}`}
            >
              <span className="ml-5 font-normal border-b border-text-comic">
                {dataComicDetail.publisher?.name}
              </span>
            </Link>
          </p>
          <p className="text-comic text-[11px] leading-[11px] mb-8">{dataComicDetail?.copyright}</p>
          <div>
            <h5 className="text-[#333] font-bold leading-[18px] text-[15px] mb-2">
              {COMIC_DETAIL.modalContents.workInfo}
            </h5>
            <div className="flex flex-wrap mt-4">
              {dataComicDetail.tag?.data.map((item, index) => (
                <Link
                  key={index}
                  className="h-7 px-1.5 py-1 bg-light-grayish-blue mr-1.5 rounded text-comic-tag text-[11px] flex items-center mb-1.5 leading-[11px]"
                  href={`${parseMessage(ROUTES.SEARCH, [QUERY_SEARCH.tag, item.hash_id])}`}
                >
                  {parseMessage(COMIC_DETAIL.tag, [item.name])}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
