export interface OfferItem {
  id: string;
  code: string;
  tag: string;
  title: string;
  description: string;
  actionText: string;
  whatsappMessage: string;
  type: 'food' | 'supply' | 'event';
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
