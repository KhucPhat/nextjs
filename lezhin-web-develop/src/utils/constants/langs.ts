import {
  EMAIL_EXISTED_IN_SNS_ACCOUNT,
  EMAIL_OR_PASSWORD_INVALID,
  EXISTED_USER_EMAIL,
  SNS_EXISTED_IN_SNS_ACCOUNT,
} from '@/utils/constants/errorCodes';
import { BUTTON_KEYS } from './common';

export const SALE_ITEMS_CART = {
  itemsCartOnSale: 'カート内の作品、${0}作品がセール中！',
};

export const AUTH: { [key: string]: string } = {
  [EMAIL_OR_PASSWORD_INVALID]: '情報をお確かめの上、再度ログインしてください。',
  [EMAIL_EXISTED_IN_SNS_ACCOUNT]:
    '${0}と連携されたアカウントです。 「${0}でログイン」をご利用ください。',
  [SNS_EXISTED_IN_SNS_ACCOUNT]: '{{provider}}と連携されたアカウントです。',
  [EXISTED_USER_EMAIL]: '既に登録済みのアドレスです。',
};

export const TERM_MESSAGE = {
  termsAgreementMessage: '利用規約確認の上、各項目チェックを入れて同意ボタンを押してください。',
  agreeAllTerms: '全ての規約に同意する',
  agreeWith: 'に同意する',
  termOfUse: 'レジンコミックス利用規約',
  privatePolicy: 'プライバシーポリシー',
  receiveEmail: 'メルマガの受信',
  magazineSubcribed: 'メルマガの受信',
  loginBtn: 'ログイン',
  agreeBtn: '同意',
  cancel: 'キャンセル',
};

export const FOOTER = {
  copyrightNotice:
    '著作権者または、レジンコミックスの許可なしにwebコミックの一部または、全体をコピーして他の媒体(個人メディアも含む)に掲載する行為は著作権法に基づいて法的に罰せられる場合があります。',

  copyrightProtectionNotice:
    'レジンコミックスの全てのwebコミックは著作権法に基づいて保護されています。',
  abjMarkNotice:
    'ABJマークは、この電子書店・電子書籍配信サービスが、著作権者からコンテンツ使用許諾を得た正規版配信サービスであることを示す登録商標（登録番号第6091713号）です。',
  companyName: '(株)レジンエンターテインメント',
  termsOfService: '利用規約',
  privacyPolicy: 'プライバシーポリシー',
  actOnSpecifiedCommercialTransactions: '特定商取引法',
};

export const COMIC_ITEM = {
  saleRateOff: '最大 ${0}%OFF',
  saleRatePoint: '最大 ${0} %還元',
  free: '無料',
  readBeginning: '最初から読む',
  fromBeginning: '最初から',
  waitForFree: '話分',
  remaining: '残り',
  left: 'あと',
  totalChappter: '全${0}話',
  showAllChappter: '全${0}話を表示',
  bulkPurchase: 'まとめ買い',
  rateOff: '%OFF',
  chapterReading: '話読み',
  volumeReading: '巻読み',
  totalVolume: '全${0}巻',
  fromNew: '最新から',
  viewingTime: '閲覧時間',
  readTheChapter: '${0}話を読む',
  readTheVolume: '${0}巻を読む',
  readItNow: '今すぐ読めます！',
};

export const TITLE_SECTION_OF_TOP_PAGE_AND_FLOOR_TOP = {
  favoriteItemOnSale: 'お気に入りの作品がセール中！',
  readMore: '続きを読む',
  newRelease: '新着話・巻、続々配信中！',
  timeDuration: 'チェックした作品',
};

export const BUTTON_TYPE: { [key: string]: string } = {
  [BUTTON_KEYS.CHAPTER_FREE]: '話無料', // Number of free items
  [BUTTON_KEYS.COMIC_DETAIL]: '',
  [BUTTON_KEYS.OPEN_CART]: 'カートを見る',
  [BUTTON_KEYS.ADD_TO_CART]: 'カートに追加',
  [BUTTON_KEYS.VOLUME_FREE]: '巻無料', // Number of free items
  [BUTTON_KEYS.VOLUME_TRIAL]: '試し読み',
  free: '読む',
  home: '作品TOP',
};

export const COMIC_DETAIL = {
  discount: '最大${0}お得！',
  tag: '＃${0}',
  suggestBy: ' 初回購入or月額コース登録は',
  suggestTitle: '会員登録はコチラ！',
  modalContents: {
    title: '作品紹介',
    contents: [
      '子役時代から今に至るまで、芸歴と器用さだけで芸能界にしがみついているマルチタレントの大峰虎生。',
      'そんな自分とは正反対の売れてるはずの若手俳優・加々良海が「憧れている役者」で自分の名前を挙げたことで全く関わることのなかった二人はバラエティ番組の企画で共演することになり・・・？',
      'クール？な人気若手俳優✕いまいちパッとしないタレントの多大にすれ違うボーイズラブ第1話！',
    ],
    pushlisherTitle: '出版社',
    tradeMark: '(C)植野メグル/KTC',
    workInfo: '作品タグ',
    suggestTitle: '会員登録はコチラ！',
    suggestButtonTitle: '初回購入or月額コース登録は',
  },
  tagTitle: '作品タグ',
  authorTitle: '作者',
  sale: '6000',
  comicDetailInfo: '作品情報',
  recommendationTitle: 'あなたにおすすめ',
  sameAuthorTitle: '同じ作家の別の作品',
};

export const FORGOT_PASSWORD = {
  title: 'パスワードを忘れた時',
  content: 'パスワードを再設定する場合、下の入力欄に登録したメールアドレスを入力してください。',
  formContent: 'パスワードの変更が完了しました',
  resetTitle: 'パスワード初期化',
  resetContent: 'パスワードを変更してください',
  resetCompleteContent: 'パスワードの変更が完了しました',
  passwordResetEmailSent: 'パスワード再設定メールをお送りしました。',
  checkYourEmail: 'メールを確認してください。',
};

export const REGISTER = {
  memberRegistrationThanks: '会員登録ありがとうございます。',
  comicsStart: '今からレジンコミックスの',
  enjoyPremiumService: 'プレミアムサービスをお楽しみください！',
  emailVerificationComplete:
    'メールの認証が完了しました。ログインに利用するパスワードを入力してください。',
  SNS: 'SNSアカウントで会員登録',
  verificationCodeSentCheckSpam:
    '下記のメールアドレスに認証コードが送信されました。認証メールが受信できない場合は「迷惑メール」フォルダをご確認ください。',
  verificationCodeSentCheckSpamFolder:
    '上記のアドレスに認証コードが送信されました。認証メールが受信できない場合は、「迷惑メール」フォルダーをご確認ください。',
  verificationCodeSentToEmail: 'メールアドレスに認証コードが送信されます。',
  provider: 'でログイン',
};

export const LOGIN = {
  SNS: 'SNSアカウントでログイン',
  title: 'メールアドレスでログイン',
  forgotPasswordLink: 'パスワードを忘れた方はこちら',
  registerReward: '初回限定で最大20％ポイント増量中！',
  registerNow: 'お得な会員登録はこちら！',
  errorServer: 'サーバーによる実行エラー。もう一度試してください',
};

// TODO waiting for requirement
export const NOT_FOUND = {
  title: 'Page Not Found',
  link: 'Go Home',
};

export const CONTACT_US = {
  title: 'ご利用中の質問等につきましては',
  forgotPasswordLink: 'ヘルプセンター',
  forgotPasswordContent: 'まで、ログインに問題がある場合は',
  supportContent: 'までお問い合わせください。',
  supportMail: 'help.jp@lezhin.com',
};

export const COMMON = {
  goToTopPage: 'TOPに戻る',
  resetPassword: '確認',
  sendConfirmationEmail: '確認メールを送る',
  copyright: '© 2023 Copyright',
  homePage: 'Home',
  logout: 'ログアウト',
  login: 'ログイン',
  register: '新規会員登録',
  mypage: 'マイページ',
  buyPoint: 'ポイント購入',
  helpCenter: 'ヘルプセンター',
  email: 'メールアドレス',
  password: 'パスワード',
  passwordRule: '英字、数字、記号をすべて組み合わせて8文字以上',
  verify: '次へ',
  OTP: '認証コード6桁',
  verifyUser: '次へ',
  resetOTP: '認証コード再送信',
  freeMembershipRegistration: '無料会員登録',
  createUser: '登録する',
  validateEmailNoSuggest: '正しいメールアドレス形式ではありません。',
  validateEmailSuggest:
    '(正しいメールアドレス形式ではありません。（半角英数字と 「@」「.」「-」「_」「+」が利用可能です。)',
  resetFail:
    'リンクが無効です。 このリンクは使用済みであるか、または有効期限が切れている可能性があります。',
  resetSuggest: 'もう一度お試しください。',
  requireEmail: 'ログインに利用するメールアドレスを入力してください。',
  requirePassword: 'ログインに利用するパスワードを入力してください。',
  validatePasswordNoSuggest: 'パスワードは8文字以上で入力してください。',
  validatePasswordSuggest:
    'パスワードは英字、数字、記号をすべて組み合わせて8文字以上にしてください。',
  unsupportedEmails: 'Docomo,KDDI,Softbankなどのキャリアメールは使用できません',
};

export const SIDEBAR = {
  username: 'アカウント名',
  dialogTitle: 'Dialog Title', // TODO recheck
};

export const BUTTON_TYPE_COMIC = {
  free: '読む',
  inCart: 'カートを見る',
  addCart: 'カートに追加',
  bought: '巻読むボタン',
  trialRead: '試し読み',
  showNumberItem: '全${0}巻を表示',
  buyInBulk: 'まとめ買い',
};

export const COMIC = {
  numberVolume: '${0}巻',
  free: '無料',
  discount: '%OFF',
  time: '(${0} まで)',
  from: '巻〜',
  to: '巻無料',
  status: {
    free: '無料',
    bought: '購入済み',
  },
};

export const VOLUME_DETAIL = {
  numberVolume: '${0}巻',
  free: '無料',
  discount: '${0}%OFF',
  from: '巻〜',
  to: '巻無料',
  status: {
    free: '無料',
  },
  sale: '最大 ${0}%OFF',
  bonus: '％BP還元',
  purchased: '購入済み',
  notAvailable: '購入不可',
  saleType: {
    point: 'point',
    free: 'free',
    discount: 'discount',
  },
  viewableType: {
    free: 'free',
    free_ticket: 'free_ticket',
    wait_for_free: 'wait_for_free',
    bonus_point: 'bonus_point',
    point: 'point',
  },
};

export const Cart = {
  quantity: '巻分選択中',
  consumption: '消費アイテム',
  addCart: 'カートに追加',
  cancel: 'キャンセル',
};

export const DATE = {
  time: '時間',
  minutes: '分',
};

export const QUERY_SEARCH = {
  author: 'author',
  tag: 'tag',
};
