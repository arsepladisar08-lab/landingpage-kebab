export type MenuKind = 'ready-to-eat' | 'snack' | 'wholesale' | 'event';

export interface ProductImageAsset {
  src: string | null;
  webpSrc?: string | null;
  expectedFile: string;
  fallbackType: string;
  alt: string;
  width: number;
  height: number;
  isPlaceholder?: boolean;
}

export interface ShowcaseMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  width: number;
  height: number;
  fit?: 'cover' | 'contain';
}

export interface OfferItem {
  id: string;
  code: string;
  tag: string;
  title: string;
  description: string;
  actionText: string;
  whatsappMessage: string;
  type: 'food' | 'supply' | 'event';
  productName: string;
}

export interface MenuVariant {
  id: string;
  name: string;
  tag: string;
  description: string;
  badge: string;
  type: 'original' | 'keju' | 'pedas' | 'komplit' | 'custom';
  kind?: MenuKind;
  image?: ProductImageAsset;
  imageDummyAlt?: string;
  ingredients?: string[];
  flavorProfile?: string;
  spiceLevel?: number;
  portionInfo?: string;
  category?: 'kebab' | 'snack' | 'wholesale' | 'event';
  /** Optional price in IDR. Only treated as confirmed when priceVerified is true. */
  price?: number;
  priceVerified?: boolean;
  priceDisplay?: string;
  validOptions?: string[];
}

export interface PersistedCartEntry {
  menuId: string;
  qty: number;
  option?: string;
}

export interface CartItem {
  id: string;
  menuId: string;
  name: string;
  tag: string;
  type?: 'original' | 'keju' | 'pedas' | 'komplit' | 'custom';
  option: string;
  qty: number;
  /** Defined only when the catalog item has a verified positive price. */
  verifiedPrice?: number;
  priceDisplay?: string;
}

export type ServiceInquiryMode = 'wholesale' | 'event';

export interface OrderingStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BusinessInfo {
  name: string;
  subName: string;
  address: string;
  hoursWeekday: string;
  hoursSunday: string;
  phone: string;
  phoneDisplay: string;
  rating: number;
  reviewCount: number;
  /** Only render public rating/reviews in UI when verified by the business owner. */
  ratingVerified?: boolean;
  mapsUrl: string;
  whatsappBaseUrl: string;
}
