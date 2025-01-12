'use client';

// Components
import { Button } from '@/components/ui/button';
import ItemVolume from './ItemVolume';
import LoadingVolumeItem from './LoadingVolumeItem';

// Routes
import { ROUTES } from '@/router/routes';
import { useParams } from 'next/navigation';
import { useRouter } from '@/hooks/useRouter';

// Utils
import { COMIC_ITEM } from '@/utils/constants/langs';
import { parseMessage } from '@/utils/helpers';

// Types
import { VolumeData, VolumeReadMetadata } from '@/types/ComicType';

// Validates
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Styles
import './styles.css';

const formSchema = z.object({});

interface VolumeListProps {
  data?: VolumeData[];
  isItemSelected?: boolean;
  available?: boolean;
  volumeReadMetadata?: VolumeReadMetadata;
  onFetchNewData?: () => void;
  isLoading?: boolean;
  isMoreVolumePage?: boolean;
}

export default function VolumeList({
  data,
  isItemSelected = false,
  available = false,
  volumeReadMetadata,
  onFetchNewData,
  isLoading,
  isMoreVolumePage,
}: VolumeListProps) {
  const router = useRouter();
  const param = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // todo
  const onSubmit = async () => {
    return 0;
  };

  return (
    <>
      {isLoading ? (
        <LoadingVolumeItem />
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div>
              {volumeReadMetadata?.data?.map((item, index) => (
                <ItemVolume data={item} key={index} onCountdownComplete={onFetchNewData} />
              ))}
              {data && data.length > 0 && !isMoreVolumePage && (
                <div className="flex flex-col items-center w-full px-4 pt-2.5 pb-5">
                  <Button
                    onClick={() =>
                      router.push(parseMessage(ROUTES.VOLUMES_LIST, [param.slug as string]))
                    }
                    className="w-[280px] h-9 text-[13px] rounded btn-drop-shadow-gray mb-2.5"
                    variant="secondary"
                  >
                    {volumeReadMetadata &&
                      parseMessage(COMIC_ITEM.showAllChappter, [volumeReadMetadata?.total_volume])}
                  </Button>
                  <Button
                    onClick={() => {
                      router.push(parseMessage(ROUTES.PURCHASE, [param.slug as string]));
                    }}
                    className="w-[280px] h-9 text-[13px] rounded btn-drop-shadow-red"
                  >
                    {COMIC_ITEM.bulkPurchase}
                  </Button>
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
}
