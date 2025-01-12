import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingChapterItem() {
  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index}
      className="flex justify-between items-center px-4 py-2 border-very-light-black border-b"
    >
      <div className="flex items-center">
        <Skeleton className="w-[76px] h-[57px]" />
        <Skeleton className="w-[76px] h-[57px] ml-1" />

        <Skeleton className="w-[100px] h-[25px] ml-3" />
      </div>
      <Skeleton className="w-8 h-8" />
    </div>
  ));
}
