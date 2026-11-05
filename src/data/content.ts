import type { BusinessInfo, OfferItem, MenuVariant, OrderFormData, OrderingStep, FaqItem } from '../types';

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
  return BUSINESS_INFO.whatsappBaseUrl + '?text=' + encodeURIComponent(message);
}

export const MENU_VARIANTS: MenuVariant[] = [
  { id: 'original', name: 'Kebab Original', tag: 'KLASIK', description: 'Rasa daging gurih berpadu dengan sayuran renyah dan racikan saus khas Al Firdaus.', badge: 'FAVORIT', type: 'original', kind: 'ready-to-eat' },
  { id: 'keju', name: 'Kebab Keju', tag: 'CREAMY GURIH', description: 'Paduan daging kebab gurih dengan keju yang creamy dan memanjakan lidah.', badge: 'BESTSELLER', type: 'keju', kind: 'ready-to-eat' },
  { id: 'pedas', name: 'Kebab Pedas', tag: 'SPICY MOOD', description: 'Saus pedas nikmat untuk kamu yang mencari sensasi gigitan hangat.', badge: 'PEDAS MANTAP', type: 'pedas', kind: 'ready-to-eat' },
  { id: 'komplit', name: 'Kebab Komplit', tag: 'KOMPLIT JUMBO', description: 'Kombinasi daging, sayur, ekstra saus, dan keju dalam satu porsi mantap.', badge: 'SPESIAL', type: 'komplit', kind: 'ready-to-eat' },
  { id: 'maryam', name: 'Roti Maryam Gurih / Manis', tag: 'KUDAPAN POPULER', description: 'Roti maryam untuk teman santai. Tanyakan pilihan rasa dan ketersediaannya.', badge: 'KUDAPAN KHAS', type: 'custom', kind: 'snack' },
  { id: 'bahan-grosir', name: 'Bahan Baku Kebab Grosir', tag: 'UNTUK USAHA & RESELLER', description: 'Konsultasikan kebutuhan tortilla, daging olahan kebab, dan saus untuk usaha.', badge: 'SUPPLY USAHA', type: 'custom', kind: 'wholesale' },
  { id: 'pesanan-acara', name: 'Paket Pesanan Acara / Hajatan', tag: 'ACARA & SYUKURAN', description: 'Diskusikan kebutuhan kebab untuk arisan, hajatan, kantor, atau syukuran keluarga.', badge: 'CATERING ACARA', type: 'custom', kind: 'event' },
];

export function getMenuVariant(product: string): MenuVariant | undefined {
  return MENU_VARIANTS.find((item) => item.name === product);
}

export function buildOrderWhatsAppUrl(data: OrderFormData): string {
  const kind = getMenuVariant(data.product)?.kind ?? 'ready-to-eat';
  const quantityLabel = kind === 'wholesale' ? 'Perkiraan kebutuhan' : kind === 'event' ? 'Perkiraan jumlah porsi' : kind === 'snack' ? 'Jumlah kudapan' : 'Jumlah porsi';
  const quantityValue = kind === 'wholesale' || kind === 'snack'
    ? String(data.quantity) + ' ' + (data.unit || (kind === 'wholesale' ? 'pack' : 'paket'))
    : String(data.quantity) + ' porsi';

  const lines = [
    'Halo Kebab Al Firdaus! Saya ingin bertanya dan memesan:',
    '',
    'Menu / Kebutuhan: ' + data.product,
    quantityLabel + ': ' + quantityValue,
    data.eventDate ? 'Tanggal acara: ' + data.eventDate : '',
    data.eventLocation ? 'Lokasi acara / tujuan: ' + data.eventLocation : '',
    data.customerName && data.customerName.trim() ? 'Nama pemesan: ' + data.customerName.trim() : '',
    data.notes && data.notes.trim() ? 'Catatan tambahan: ' + data.notes.trim() : '',
    '',
    'Mohon info ketersediaan, harga terbaru, dan detail pemesanan. Terima kasih.',
  ].filter(Boolean);

  return BUSINESS_INFO.whatsappBaseUrl + '?text=' + encodeURIComponent(lines.join('\n'));
}

export const OFFER_ITEMS: OfferItem[] = [
  { id: 'food', code: 'A / 01', tag: 'MENU UTAMA', title: 'Kebab siap santap', description: 'Empat pilihan rasa untuk teman santai, makan bersama, atau mengisi perut saat beraktivitas.', actionText: 'Lihat menu kebab', whatsappMessage: 'Halo, boleh minta daftar menu dan harga Kebab Al Firdaus?', type: 'food', productName: 'Kebab Original' },
  { id: 'supply', code: 'A / 02', tag: 'LAYANAN TAMBAHAN', title: 'Bahan kebab & grosir', description: 'Untuk warung kebab, reseller, atau pelaku usaha yang ingin berkonsultasi soal pasokan bahan.', actionText: 'Konsultasi grosir', whatsappMessage: 'Halo, saya ingin bertanya tentang bahan kebab dan pembelian grosir.', type: 'supply', productName: 'Bahan Baku Kebab Grosir' },
  { id: 'event', code: 'A / 03', tag: 'LAYANAN TAMBAHAN', title: 'Pesanan acara', description: 'Diskusikan kebutuhan porsi untuk arisan, syukuran, rapat, atau acara keluarga.', actionText: 'Diskusikan acara', whatsappMessage: 'Halo, saya ingin bertanya tentang pesanan untuk acara.', type: 'event', productName: 'Paket Pesanan Acara / Hajatan' },
];

export const ORDERING_STEPS: OrderingStep[] = [
  { number: '01', title: 'Pilih menu', description: 'Pilih varian kebab atau kudapan yang ingin kamu nikmati.' },
  { number: '02', title: 'Atur pesanan', description: 'Tentukan jumlah porsi dan tulis catatan bila ada.' },
  { number: '03', title: 'Kirim ke WhatsApp', description: 'Periksa rangkuman pesanan sebelum mengirimnya ke admin.' },
  { number: '04', title: 'Konfirmasi', description: 'Admin mengonfirmasi stok, harga, waktu, dan opsi pengambilan/pengiriman.' },
];

export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Bagaimana cara memesan kebab?', answer: 'Pilih varian pada bagian menu, tekan tombol Pesan, lalu tentukan jumlah dan catatan. Rangkuman akan dibuka di WhatsApp untuk kamu periksa sebelum dikirim.' },
  { question: 'Berapa harga setiap varian kebab?', answer: 'Harga dapat berubah mengikuti menu dan ketersediaan. Hubungi admin melalui WhatsApp untuk memperoleh daftar harga terbaru.' },
  { question: 'Apakah tersedia roti maryam?', answer: 'Roti maryam tercantum sebagai kudapan tambahan. Tanyakan pilihan rasa dan ketersediaannya kepada admin sebelum memesan.' },
  { question: 'Apakah bisa membeli bahan kebab secara grosir?', answer: 'Informasi pada referensi proyek menyebutkan layanan bahan kebab/grosir. Hubungi admin untuk memastikan jenis bahan, harga, minimum pembelian, dan stok saat ini.' },
  { question: 'Apakah menerima pesanan untuk acara atau hajatan?', answer: 'Konsultasikan tanggal acara, perkiraan jumlah porsi, lokasi, dan waktu yang dibutuhkan. Detail pesanan akan dikonfirmasi langsung oleh admin.' },
  { question: 'Apakah tersedia layanan pengiriman?', answer: 'Opsi pengiriman, area layanan, biaya kirim, dan minimum pesanan perlu dikonfirmasi langsung melalui WhatsApp.' },
  { question: 'Di mana lokasi Kebab Al Firdaus?', answer: 'Alamat yang tercantum pada referensi proyek adalah Jl. Bali No.13 Blok O, Medaeng Kulon, Kedungturi, Taman, Sidoarjo 61257. Pastikan kembali alamat dan jam operasional sebelum berkunjung.' },
];
