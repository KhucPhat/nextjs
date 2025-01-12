// Service
import { httpNextFetch } from '@/configs/fetch.config';

// Utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';
import { bindPath } from '@/utils/helpers';

// Types
import {
  ChapterReadMetadata,
  ChapterRequest,
  ChapterResponse,
  VolumeDetailRequest,
  VolumeResponse,
} from '@/types/ComicType';

class NextComicDetailService {
  async getListChapter({
    comicHashId,
    order_by,
    order_type,
  }: ChapterRequest): Promise<ChapterReadMetadata> {
    const results = await httpNextFetch<Promise<ChapterResponse>>(
      bindPath(API_ENDPOINT.GET_LIST_CHAPTER, [comicHashId]),
      {
        method: HTTP_METHOD.GET,
        ...(order_type && order_by && { body: { order_by, order_type } }),
      }
    );

    return results.results;
  }
  async getVolumeDetail({
    comicHashId,
    volumeHashId,
  }: VolumeDetailRequest): Promise<VolumeResponse> {
    const results = await httpNextFetch<Promise<VolumeResponse>>(
      bindPath(API_ENDPOINT.GET_VOLUME_DETAIL, [comicHashId, volumeHashId]),
      {
        method: HTTP_METHOD.GET,
      }
    );

    return results;
  }
}

export default new NextComicDetailService();
