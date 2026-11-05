export type MenuKind = 'ready-to-eat' | 'snack' | 'wholesale' | 'event';

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
  tagColor?: string;
  description: string;
  badge: string;
  type: 'original' | 'keju' | 'pedas' | 'komplit' | 'custom';
  kind?: MenuKind;
  imageDummyAlt?: string;
  ingredients?: string[];
  flavorProfile?: string;
  spiceLevel?: number; // 0 to 3
  portionInfo?: string;
  category?: 'kebab' | 'snack' | 'wholesale' | 'event';
}

export interface OrderFormData {
  customerName?: string;
  product: string;
  quantity: number;
  unit?: string;
  notes?: string;
  eventDate?: string;
  eventLocation?: string;
}

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
  mapsUrl: string;
  whatsappBaseUrl: string;
}
