// Service
import { httpFetch } from '@/configs/fetch.config';

// Utils
import { API_ENDPOINT } from '@/utils/constants';
import { HTTP_METHOD } from '@/utils/constants/http';
import { bindPath } from '@/utils/helpers';

// Types
import {
  ChapterRequest,
  ChapterResponse,
  VolumeDetailRequest,
  VolumeRequest,
  VolumeResponse,
  VolumesResponse,
} from '@/types/ComicType';

class ComicDetailService {
  async getListChapter({
    comicHashId,
    order_by,
    order_type,
    access_token,
  }: ChapterRequest): Promise<ChapterResponse> {
    return await httpFetch(bindPath(API_ENDPOINT.GET_LIST_CHAPTER, [comicHashId]), {
      method: HTTP_METHOD.GET,
      ...(order_type && order_by && { body: { order_by, order_type } }),
      ...(access_token && {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    });
  }
  async getVolumeDetail({
    comicHashId,
    volumeHashId,
    access_token,
  }: VolumeDetailRequest): Promise<VolumeResponse> {
    return await httpFetch(bindPath(API_ENDPOINT.GET_VOLUME_DETAIL, [comicHashId, volumeHashId]), {
      method: HTTP_METHOD.GET,
      ...(access_token && {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    });
  }
  async getListVolume({
    comicHashId,
    order_by,
    order_type,
    access_token,
  }: VolumeRequest): Promise<VolumesResponse> {
    return await httpFetch(bindPath(API_ENDPOINT.GET_LIST_VOLUME, [comicHashId]), {
      method: HTTP_METHOD.GET,
      ...(order_type && order_by && { body: { order_by, order_type } }),
      ...(access_token && {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    });
  }
}

export default new ComicDetailService();
