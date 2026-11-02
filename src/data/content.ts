import { BusinessInfo, OfferItem, OrderingStep, FaqItem } from '../types';

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
    description: 'Kirim pesan WhatsApp dan sampaikan yang kamu cari.',
  },
  {
    number: '03',
    title: 'Konfirmasi detail',
    description: 'Cek harga, ketersediaan, jumlah, dan waktu pemesanan.',
  },
  {
    number: '04',
    title: 'Atur pengambilan',
    description: 'Konfirmasi cara ambil atau opsi pengiriman yang tersedia.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Apakah bisa membeli bahan kebab secara grosir?',
    answer: 'Listing dan ulasan publik menyebut pembelian bahan kebab/grosir. Hubungi kami untuk memastikan jenis bahan, minimum pembelian, harga, dan stok saat ini.',
  },
  {
    question: 'Apakah menerima pesanan untuk acara?',
    answer: 'Informasi publik menyebut adanya pesanan untuk acara. Silakan diskusikan tanggal, jumlah, dan kebutuhan menu melalui WhatsApp.',
  },
  {
    question: 'Bagaimana cara mengetahui menu dan harga terbaru?',
    answer: 'Menu dan harga dapat dikonfirmasi langsung melalui WhatsApp agar informasi yang kamu terima sesuai dengan ketersediaan terbaru.',
  },
  {
    question: 'Apakah tersedia layanan pengiriman?',
    answer: 'Opsi pengiriman tercantum pada direktori pihak ketiga. Area layanan, biaya kirim, dan minimum pesanan perlu dikonfirmasi langsung.',
  },
];
