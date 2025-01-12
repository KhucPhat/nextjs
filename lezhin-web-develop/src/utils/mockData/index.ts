// Remove file when integrate data
import test1 from '@/assets/img/test1.png';
import test2 from '@/assets/img/test2.png';
import test3 from '@/assets/img/test3.png';
import test4 from '@/assets/img/test4.png';
import test5 from '@/assets/img/test5.png';
import test6 from '@/assets/img/test6.png';
import test7 from '@/assets/img/test7.png';
import test8 from '@/assets/img/test8.png';
import test9 from '@/assets/img/test9.png';
import test10 from '@/assets/img/test10.png';
import test11 from '@/assets/img/test11.png';
import test from '@/assets/img/test.png';
import testBanner from '@/assets/img/test-banner.png';
import testBanner1 from '@/assets/img/test-banner-2.png';
import bannerList1 from '@/assets/img/banner-list-1.png';
import bannerList2 from '@/assets/img/banner-list-2.png';
import bannerList3 from '@/assets/img/banner-list-3.png';

// Types
import { ChapterData, VolumeReadMetadata, VolumeDetail } from '@/types/ComicType';

export const getRandomImage = () => {
  const array = [test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11];

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getRandomImageBanner = () => {
  const arrayBanner = [test, testBanner, testBanner1];
  const arrayBannerList = [bannerList1, bannerList2, bannerList3];
  const arrayType = ['main', 'list'];

  const randomIndex = Math.floor(Math.random() * arrayBanner.length);
  const randomType = Math.floor(Math.random() * arrayType.length);

  return {
    hash_id: '01gd6r360bp37zj17nxb55yv40',
    type: arrayType[randomType],
    destination_type: 'url',
    destination_value: 'https://lezhin-domain/ja/custom/241101_t5_1514775',
    banner_image_url:
      arrayType[randomType] === 'list' ? arrayBannerList[randomIndex] : arrayBanner[randomIndex],
  };
};

export const getRandomBanner = (total: number) => {
  return generateArrayMock(total, getRandomImageBanner);
};

export const generateArrayMock = (total: number, generateRandomObject: () => void): any[] => {
  const result = [];
  for (let i = 0; i <= total; i++) {
    result.push(generateRandomObject());
  }
  return result;
};

export const getTopPageReadingItems = () => {
  const itemData = {
    hash_id: '01gd6r360bp37zj17nxb55yv40',
    name: '心の奥を覗かせて',
    name_kana: 'ココロ ノ オク ヲ ノゾカセテ',
    cover_thumbnail_url:
      'https://ccdn.lezhin.com/v2/inventory_items/7101729550861072/media/upperBannerMobile.webp?updated=1729550861072&width=688',
    display_order: 1,
    is_waiting_for_free: true,
    is_up: true,
    is_original: true,
    is_safe_mode: true,
    is_trial: true,
    sale_type: 'cashback',
    sale_rate: 70,
    button_type: 'add_card',
  };
  return itemData;
};

export const dataVolumeList = [
  {
    hash_id: '01gd6r360bp37zj17nxb55yv40',
    name: 'キルタイムコミュニケーション',
    read: false,
    cover_thumbnail_url: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-9.png',
    is_allow_trial: false,
    sale_viewable_type: 'point',
    point_consumption: 100,
    sale_type: 'point',
    sale_value: '11.00',
    free_volume: '1,3',
    free_volume_expires_date: 1735516800,
    sale_expires_date: 1735516800,
    is_added_to_cart: false,
    is_bought: false,
  },
  {
    hash_id: '01gd6r360bp37zj17nxb55yv40',
    name: 'キルタイムコミュニケーション',
    read: true,
    cover_thumbnail_url: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-9.png',
    is_allow_trial: true,
    sale_viewable_type: 'free',
    point_consumption: 100,
    sale_type: 'free',
    sale_value: '11.00',
    free_volume: '1,3',
    free_volume_expires_date: 1735516800,
    sale_expires_date: 1735516800,
    is_added_to_cart: true,
    is_bought: false,
  },
  {
    hash_id: '01gd6r360bp37zj17nxb55yv40',
    name: 'キルタイムコミュニケーション',
    read: false,
    cover_thumbnail_url: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-9.png',
    is_allow_trial: true,
    sale_viewable_type: 'bonus_point',
    point_consumption: 100,
    sale_type: 'point',
    sale_value: '11.00',
    free_volume: '1,3',
    free_volume_expires_date: 1735516800,
    sale_expires_date: 1735516800,
    is_added_to_cart: true,
    is_bought: false,
  },
  {
    hash_id: '01gd6r360bp37zj17nxb55yv40',
    name: 'キルタイムコミュニケーション',
    read: false,
    cover_thumbnail_url: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-9.png',
    is_allow_trial: true,
    sale_viewable_type: 'bonus_point',
    point_consumption: 100,
    sale_type: 'discount',
    sale_value: '10',
    free_volume: '1,3',
    free_volume_expires_date: 1735516800,
    sale_expires_date: 1735516800,
    is_added_to_cart: false,
    is_bought: false,
  },
  {
    hash_id: '01gd6r360bp37zj17nxb55yv40',
    name: 'キルタイムコミュニケーション',
    read: false,
    cover_thumbnail_url: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-9.png',
    is_allow_trial: true,
    sale_viewable_type: 'bonus_point',
    point_consumption: 100,
    sale_type: 'discount',
    sale_value: '11.00',
    free_volume: '1,3',
    free_volume_expires_date: 1735516800,
    sale_expires_date: 1735516800,
    is_added_to_cart: false,
    is_bought: true,
  },
];

export const mockVolumeReadMetadata: VolumeReadMetadata = {
  next_volume_number: 2,
  read_button_type: 'beginning',
  next_volume_hash_id: '',
  total_volume: 5,
  data: dataVolumeList,
};

export const mockListChapterData: {
  volume_id: number;
  name: string;
  volume_url: string;
  chapter: ChapterData[];
}[] = [
  {
    volume_id: 123,
    name: '1巻',
    volume_url: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
    chapter: [
      {
        hash_id: '01jexp4npj97f52qtxngy9zw8h',
        name: '[C] まってるんで、あたし、その小さな鳥。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
        viewable_type: 'bonus_point',
        point_consumption: 753,
        sale_rate: null,
        sale_expires_date: 1735212300,
        wait_for_free_expires_at: null,
      },
      {
        hash_id: '01jexp4ndbvvq7gjaws5yw2sfg',
        name: '[C] 果りんごうしていました。ジョバンニは。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-10.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-10.png',
        viewable_type: 'free',
        point_consumption: 7,
        sale_rate: null,
        sale_expires_date: null,
        wait_for_free_expires_at: null,
      },
      {
        hash_id: '01jexp4ndw64q9hyh920sbkpcn',
        name: '[C] だってとるときな鍵。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
        viewable_type: 'free',
        point_consumption: 6,
        sale_rate: null,
        sale_expires_date: null,
        wait_for_free_expires_at: null,
      },
      {
        hash_id: '01jexp4ne9nnebkdef4r69mhff',
        name: '[C] 子ふたりしてしかけました。「今晩。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-2.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-2.png',
        viewable_type: 'free_ticket',
        point_consumption: 0,
        sale_rate: null,
        sale_expires_date: null,
        wait_for_free_expires_at: null,
      },
      {
        hash_id: '01jexp4neye6qebhyxefykft61',
        name: '[C] かざられなんでいったといった一つ。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-1.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-1.png',
        viewable_type: 'wait_for_free',
        point_consumption: 10,
        sale_rate: null,
        sale_expires_date: null,
        wait_for_free_expires_at: null,
      },
    ],
  },
  {
    volume_id: 123,
    name: '1巻',
    volume_url: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
    chapter: [
      {
        hash_id: '01jexp4npj97f52qtxngy9zw8h',
        name: '[C] まってるんで、あたし、その小さな鳥。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
        viewable_type: 'bonus_point',
        point_consumption: 753,
        sale_rate: null,
        sale_expires_date: 1735212300,
        wait_for_free_expires_at: null,
      },
      {
        hash_id: '01jexp4ndbvvq7gjaws5yw2sfg',
        name: '[C] 果りんごうしていました。ジョバンニは。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-10.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-10.png',
        viewable_type: 'free',
        point_consumption: 7,
        sale_rate: null,
        sale_expires_date: null,
        wait_for_free_expires_at: null,
      },
      {
        hash_id: '01jexp4ndw64q9hyh920sbkpcn',
        name: '[C] だってとるときな鍵。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-4.png',
        viewable_type: 'free',
        point_consumption: 6,
        sale_rate: null,
        sale_expires_date: null,
        wait_for_free_expires_at: null,
      },
      {
        hash_id: '01jexp4ne9nnebkdef4r69mhff',
        name: '[C] 子ふたりしてしかけました。「今晩。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-2.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-2.png',
        viewable_type: 'free_ticket',
        point_consumption: 0,
        sale_rate: null,
        sale_expires_date: null,
        wait_for_free_expires_at: null,
      },
      {
        hash_id: '01jexp4neye6qebhyxefykft61',
        name: '[C] かざられなんでいったといった一つ。',
        cover_thumbnail_url_1: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-1.png',
        cover_thumbnail_url_2: 'https://contents.lezhin.hrsm-tech.com/dummy/item/item-1.png',
        viewable_type: 'wait_for_free',
        point_consumption: 10,
        sale_rate: null,
        sale_expires_date: null,
        wait_for_free_expires_at: null,
      },
    ],
  },
];
