import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingVolumeItem() {
  return Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className="flex justify-between items-center px-4 py-2 border-b h-[165px]">
      <div className="flex">
        <Skeleton className="w-[105px] h-[140px]" />
        <div className="ml-3">
          <Skeleton className="w-[50px] h-[20px] mb-1" />
          <Skeleton className="w-[105px] h-[17px] mb-1" />
          <Skeleton className="w-[105px] h-[11px]" />
        </div>
      </div>
    </div>
  ));
}
