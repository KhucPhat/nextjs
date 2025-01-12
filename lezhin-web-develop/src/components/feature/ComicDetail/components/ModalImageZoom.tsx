// React
import React from 'react';

// Next
import Image, { StaticImageData } from 'next/image';

// Component
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface ModalImageComicProps {
  src: StaticImageData | string;
  isPC: boolean;
}

export default function ModalImageComic({ src, isPC }: ModalImageComicProps) {
  return (
    <Dialog>
      <DialogTitle className="hidden" />
      <DialogTrigger asChild>
        <div className="absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden">
          <Image
            src={src}
            alt="small-image"
            width={200}
            height={0}
            style={{ objectFit: 'cover' }}
            className="rounded overflow-hidden"
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md p-0 border-none shadow-none"
        isPC={isPC}
        hiddenClose={false}
        classNameClose="-bottom-11 text-white left-1/2 -translate-x-1/2"
        aria-describedby="dialog-description"
      >
        <div className="relative">
          <DialogDescription className="hidden" />
          <div className="overflow-y-scroll no-scrollbar flex flex-col py-0 bg-transparent mt-0">
            <Image
              src={src}
              alt="small-image"
              width={1920}
              height={0}
              style={{ objectFit: 'fill' }}
              className="overflow-hidden"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
