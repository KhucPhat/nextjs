// Components
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingVolumeDetail() {
  return (
    <div className="bg-white">
      <Skeleton className="w-full h-[380px]" />
      <div className="p-4 pb-9">
        <Skeleton className="w-[220px] h-[27px]" />
        <Skeleton className="w-[120px] h-[12px] mt-1" />
      </div>
    </div>
  );
}
