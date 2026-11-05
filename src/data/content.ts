import { BusinessInfo, OfferItem, MenuVariant, OrderingStep, FaqItem } from '../types';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'AL FIRDAUS',
  subName: 'KEBAB & MORE',
  address: 'Jl. Bali No.13 Blok O, Medaeng Kulon, Kedungturi, Taman, Sidoarjo 61257',
  hoursWeekday: 'Senin–Sabtu 06.00–21.00',
  hoursSunday: 'Minggu 06.00–18.00',
  phone: '6283830361617',
  phoneDisplay: '0838-3036-1617',
  rating: 4.6,
  reviewCount: 57,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kebab+Murah+Di+Sidoarjo+Alfirdaus+Jl+Bali+No+13+Medaeng',
  whatsappBaseUrl: 'https://wa.me/6283830361617',
};

export function getWhatsAppLink(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function buildOrderWhatsAppUrl(data: {
  customerName?: string;
  product: string;
  quantity: number;
  notes?: string;
}): string {
  const lines = [
    'Halo Kebab Al Firdaus! Saya mau tanya dan pesan:',
    '',
    `Menu / Kebutuhan: ${data.product}`,
    `Jumlah: ${data.quantity} porsi/paket`,
    data.customerName ? `Nama Pemesan: ${data.customerName}` : '',
    data.notes ? `Catatan Tambahan: ${data.notes}` : '',
    '',
    'Mohon info ketersediaan dan harga terbaru ya. Terima kasih!'
  ].filter(Boolean);

  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export const MENU_VARIANTS: MenuVariant[] = [
  {
    id: 'original',
    name: 'Kebab Original',
    tag: 'KLASIK',
    description: 'Rasa daging gurih berpadu dengan sayuran renyah dan racikan saus spesial khas Al Firdaus.',
    badge: 'FAVORIT',
    type: 'original',
  },
  {
    id: 'keju',
    name: 'Kebab Keju',
    tag: 'CREAMY GURIH',
    description: 'Paduan daging kebab gurih dengan lumuran keju lezat yang creamy dan memanjakan lidah.',
    badge: 'BESTSELLER',
    type: 'keju',
  },
  {
    id: 'pedas',
    name: 'Kebab Pedas',
    tag: 'SPICY MOOD',
    description: 'Dibalut saus pedas nikmat untuk kamu yang mencari sensasi gigitan hangat dan membakar selera.',
    badge: 'PEDAS MANTAP',
    type: 'pedas',
  },
  {
    id: 'komplit',
    name: 'Kebab Komplit',
    tag: 'KOMPLIT JUMBO',
    description: 'Kombinasi lengkap daging melimpah, sayur, ekstra saus, dan keju dalam satu porsi mantap.',
    badge: 'SPESIAL',
    type: 'komplit',
  },
  {
    id: 'maryam',
    name: 'Roti Maryam Gurih / Manis',
    tag: 'KUDAPAN POPULER',
    description: 'Roti canai/maryam renyah di luar dan lembut di dalam, nikmat disantap hangat bersama teh/kopi.',
    badge: 'KUDAPAN KHAS',
    type: 'custom',
  },
  {
    id: 'bahan-grosir',
    name: 'Bahan Baku Kebab Grosir',
    tag: 'UNTUK USAHA & RESELLER',
    description: 'Kulit tortilla, daging olahan kebab, dan saus kemasan grosir untuk mitra dan pedagang.',
    badge: 'SUPPLY USAHA',
    type: 'custom',
  },
  {
    id: 'pesanan-acara',
    name: 'Paket Pesanan Acara / Hajatan',
    tag: 'ACARA & SYUKURAN',
    description: 'Pesanan porsi besar untuk arisan, hajatan, kantor, atau syukuran keluarga di Sidoarjo.',
    badge: 'CATERING ACARA',
    type: 'custom',
  },
];

export const OFFER_ITEMS: OfferItem[] = [
  {
    id: 'food',
    code: 'A / 01',
    tag: 'SIAP DINIKMATI',
    title: 'Kebab & kudapan',
    description: 'Untuk teman istirahat, santai di rumah, atau berbagi bersama orang terdekat.',
    actionText: 'Tanya menu & harga',
    whatsappMessage: 'Halo, boleh minta daftar menu dan harga Kebab Al Firdaus?',
    type: 'food',
  },
  {
    id: 'supply',
    code: 'A / 02',
    tag: 'UNTUK USAHA',
    title: 'Bahan kebab & grosir',
    description: 'Sedang mencari kebutuhan bahan kebab untuk produksi atau jualan kembali? Konsultasikan kebutuhanmu.',
    actionText: 'Tanya kebutuhan grosir',
    whatsappMessage: 'Halo, saya ingin bertanya tentang bahan kebab dan pembelian grosir.',
    type: 'supply',
  },
  {
    id: 'event',
    code: 'A / 03',
    tag: 'UNTUK MOMEN SPESIAL',
    title: 'Pesanan acara',
    description: 'Punya acara keluarga, kumpul komunitas, atau hajatan? Bicarakan jumlah dan kebutuhan pesanan lebih dulu.',
    actionText: 'Diskusikan pesanan acara',
    whatsappMessage: 'Halo, saya ingin bertanya tentang pesanan untuk acara.',
    type: 'event',
  },
];

export const ORDERING_STEPS: OrderingStep[] = [
  {
    number: '01',
    title: 'Pilih kebutuhan',
    description: 'Kebab, kudapan, bahan grosir, atau pesanan acara.',
  },
  {
    number: '02',
    title: 'Hubungi kami',
    description: 'Kirim pesan WhatsApp atau gunakan formulir cepat untuk merangkum pesanan.',
  },
  {
    number: '03',
    title: 'Konfirmasi detail',
    description: 'Cek harga, ketersediaan, jumlah, dan waktu pemesanan langsung dengan tim.',
  },
  {
    number: '04',
    title: 'Atur pengambilan',
    description: 'Konfirmasi cara ambil langsung di Medaeng Kulon atau opsi pengiriman yang tersedia.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Berapa kisaran harga menu di Kebab Al Firdaus?',
    answer: 'Harga resmi dapat dikonfirmasi langsung melalui WhatsApp atau saat berkunjung ke lokasi, agar informasi yang kamu peroleh akurat sesuai porsi dan promo terbaru.',
  },
  {
    question: 'Apakah bisa membeli bahan kebab secara grosir?',
    answer: 'Ya, listing publik menyebutkan penyediaan bahan kebab/grosir (tortilla, daging olahan, bumbu). Hubungi kami untuk memastikan jenis bahan, minimum pembelian, dan ketersediaan stok.',
  },
  {
    question: 'Apakah menerima pesanan untuk acara atau hajatan?',
    answer: 'Bisa! Kami melayani pesanan untuk acara keluarga, arisan, syukuran, atau komunitas. Silakan konsultasikan tanggal acara, jumlah porsi, dan waktu pengambilan/pengiriman.',
  },
  {
    question: 'Apakah tersedia layanan pengantaran (delivery)?',
    answer: 'Opsi pengantaran dapat dikoordinasikan langsung melalui WhatsApp. Area layanan, minimal order, dan ongkir akan diinformasikan oleh tim kami.',
  },
  {
    question: 'Di mana lokasi Kebab Al Firdaus?',
    answer: 'Kami beralamat di Jl. Bali No.13 Blok O, Medaeng Kulon, Kedungturi, Taman, Sidoarjo (area Medaeng dekat Surabaya–Sidoarjo). Tersedia panduan rute via Google Maps.',
  },
];
