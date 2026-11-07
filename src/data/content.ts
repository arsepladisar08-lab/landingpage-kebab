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

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildCartWhatsAppUrl(data: {
  customerName?: string;
  items: Array<{
    name: string;
    quantity: number;
    portionOption?: string;
    notes?: string;
  }>;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress?: string;
  generalNotes?: string;
}): string {
  const totalItemCount = data.items.reduce((acc, curr) => acc + curr.quantity, 0);

  const itemLines = data.items.map((item, index) => {
    const optionText = item.portionOption ? ` (${item.portionOption})` : '';
    const noteText = item.notes ? ` [Catatan: ${item.notes}]` : '';
    return `${index + 1}. *${item.name}*${optionText} x${item.quantity}${noteText}`;
  });

  const methodText =
    data.deliveryOption === 'delivery'
      ? '🛵 Pengiriman / Antar ke Lokasi'
      : '🏪 Ambil Sendiri di Outlet Medaeng Kulon';

  const lines = [
    'Halo Kebab Al Firdaus! Saya mau memesan melalui keranjang:',
    '',
    '📋 *DAFTAR PESANAN:*',
    ...itemLines,
    '',
    `📦 *Total Pesanan:* ${totalItemCount} item`,
    '💬 Harga akhir dan ketersediaan akan dikonfirmasi oleh admin.',
    '',
    data.customerName ? `👤 *Nama Pemesan:* ${data.customerName}` : '',
    `📍 *Metode Pengambilan:* ${methodText}`,
    data.deliveryOption === 'delivery' && data.deliveryAddress
      ? `🏠 *Alamat Antar:* ${data.deliveryAddress}`
      : '',
    data.generalNotes ? `📝 *Catatan Khusus:* ${data.generalNotes}` : '',
    '',
    'Mohon info ketersediaan stok & estimasi waktu pembuatannya ya. Terima kasih banyak!'
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
    kind: 'ready-to-eat',
    category: 'kebab',
    flavorProfile: 'Gurih smoky, manis-pedas seimbang dengan sensasi segar sayuran',
    spiceLevel: 1,
    portionInfo: 'Tersedia ukuran Reguler & Jumbo (Porsi mengenyangkan)',
    imageDummyAlt: 'Dummy Foto Kebab Original Panggang dengan Sayuran Segar',
    price: 12000,
    priceDisplay: 'Rp 12.000',
    ingredients: [
      'Kulit Tortilla Panggang Renyah',
      'Irisan Daging Kebab Bumbu Rempah',
      'Selada Hijau & Timun Segar',
      'Racikan Saus Spesial & Mayones Gurih',
    ],
  },
  {
    id: 'keju',
    name: 'Kebab Keju',
    tag: 'CREAMY GURIH',
    description: 'Paduan daging kebab gurih dengan lumuran keju lezat yang creamy dan memanjakan lidah.',
    badge: 'BESTSELLER',
    type: 'keju',
    kind: 'ready-to-eat',
    category: 'kebab',
    flavorProfile: 'Creamy gurih lumer dengan aroma keju khas menggugah selera',
    spiceLevel: 1,
    portionInfo: 'Tersedia porsi Reguler & Ekstra Keju Double Melt',
    imageDummyAlt: 'Dummy Foto Kebab Keju Lumer Creamy',
    price: 15000,
    priceDisplay: 'Rp 15.000',
    ingredients: [
      'Kulit Tortilla Lembut Terpanggang',
      'Daging Kebab Pilihan Berbumbu',
      'Saus Keju Creamy & Keju Parut Lumer',
      'Selada Segar & Saus Mayones Gurih',
    ],
  },
  {
    id: 'pedas',
    name: 'Kebab Pedas',
    tag: 'SPICY MOOD',
    description: 'Dibalut saus pedas nikmat untuk kamu yang mencari sensasi gigitan hangat dan membakar selera.',
    badge: 'PEDAS MANTAP',
    type: 'pedas',
    kind: 'ready-to-eat',
    category: 'kebab',
    flavorProfile: 'Pedas nendang, hangat di tenggorokan, gurih rempah autentik',
    spiceLevel: 3,
    portionInfo: 'Level pedas bisa disesuaikan (Sedang / Ekstra Pedas)',
    imageDummyAlt: 'Dummy Foto Kebab Pedas dengan Saus Cabai Menggoda',
    price: 14000,
    priceDisplay: 'Rp 14.000',
    ingredients: [
      'Kulit Tortilla Dipanggang Matang',
      'Daging Kebab Gurih Empuk',
      'Saus Sambal Racikan Pedas Mantap',
      'Irisan Selada Segar & Ekstra Rempah Cabai',
    ],
  },
  {
    id: 'komplit',
    name: 'Kebab Komplit',
    tag: 'KOMPLIT JUMBO',
    description: 'Kombinasi lengkap daging melimpah, sayur, ekstra saus, dan keju dalam satu porsi mantap.',
    badge: 'SPESIAL',
    type: 'komplit',
    kind: 'ready-to-eat',
    category: 'kebab',
    flavorProfile: 'Semua kelezatan dalam satu gulungan: daging dobel, keju melted, saus berlimpah',
    spiceLevel: 2,
    portionInfo: 'Ukuran Jumbo Spesial, porsi paling mantap dan memuaskan',
    imageDummyAlt: 'Dummy Foto Kebab Komplit Porsi Jumbo Spesial',
    price: 18000,
    priceDisplay: 'Rp 18.000',
    ingredients: [
      'Kulit Tortilla Jumbo Lembut & Renyah',
      'Porsi Ekstra Daging Kebab Berlimpah',
      'Lumuran Keju Lumer Melimpah',
      'Sayuran Lengkap Segar',
      'Kombinasi Saus Spesial & Saus Cabai',
    ],
  },
  {
    id: 'maryam',
    name: 'Roti Maryam Gurih / Manis',
    tag: 'KUDAPAN POPULER',
    description: 'Roti canai/maryam renyah di luar dan lembut di dalam, nikmat disantap hangat bersama teh/kopi.',
    badge: 'KUDAPAN KHAS',
    type: 'custom',
    kind: 'snack',
    category: 'snack',
    flavorProfile: 'Gurih manis berlapis renyah, wangi margarin khas Timur Tengah',
    spiceLevel: 0,
    portionInfo: 'Isi per pack atau siap santap hangat dengan topping pilihan',
    imageDummyAlt: 'Dummy Foto Roti Maryam Hangat Berlapis',
    price: 10000,
    priceDisplay: 'Rp 10.000',
    ingredients: [
      'Adonan Tepung Gandum Berkualitas',
      'Margarin & Susu Pilihan',
      'Pilihan Rasa Gurih Original atau Manis',
      'Bisa Dinikmati Hangat atau Frozen',
    ],
  },
  {
    id: 'bahan-grosir',
    name: 'Bahan Baku Kebab Grosir',
    tag: 'UNTUK USAHA & RESELLER',
    description: 'Kulit tortilla, daging olahan kebab, dan saus kemasan grosir untuk mitra dan pedagang.',
    badge: 'SUPPLY USAHA',
    type: 'custom',
    kind: 'wholesale',
    category: 'wholesale',
    flavorProfile: 'Kualitas konsisten standar komersial untuk pedagang & reseller kuliner',
    spiceLevel: 0,
    portionInfo: 'Paket grosir per pack kulit tortilla, daging roll/blok, & saus jerigen',
    imageDummyAlt: 'Dummy Foto Paket Bahan Baku Kebab Grosir',
    price: 50000,
    priceDisplay: 'Mulai Rp 50.000',
    ingredients: [
      'Kulit Tortilla (berbagai diameter)',
      'Daging Kebab Olahan Roll / Siap Panggang',
      'Saus Sambal & Saus Tomat Kemasan Grosir',
      'Mayones & Kemasan Kebab Khusus Reseller',
    ],
  },
  {
    id: 'pesanan-acara',
    name: 'Paket Pesanan Acara / Hajatan',
    tag: 'ACARA & SYUKURAN',
    description: 'Pesanan porsi besar untuk arisan, hajatan, kantor, atau syukuran keluarga di Sidoarjo.',
    badge: 'CATERING ACARA',
    type: 'custom',
    kind: 'event',
    category: 'event',
    flavorProfile: 'Rasa konsisten lezat, kemasan rapi dan higienis siap santap untuk tamu',
    spiceLevel: 1,
    portionInfo: 'Pemesanan mulai puluhan hingga ratusan porsi, harap info H-2/H-3',
    imageDummyAlt: 'Dummy Foto Sajian Kebab untuk Katering Acara dan Syukuran',
    price: 15000,
    priceDisplay: 'Mulai Rp 15.000/porsi',
    ingredients: [
      'Pilihan Varian Kebab Sesuai Permintaan',
      'Kemasan Box Praktis & Bersih',
      'Dibuat Hangat Menjelang Waktu Pengambilan/Antar',
      'Bisa Dikombinasikan dengan Roti Maryam',
    ],
  },
];

export const PROMO_BANNER_ITEMS = [
  {
    id: 'gallery-kebab',
    type: 'gallery' as const,
    tag: 'MENU PILIHAN',
    title: 'Pilihan Kebab',
    subtitle: 'Lihat varian menu dan tanyakan ketersediaan terbaru kepada admin.',
    badge: 'MENU',
    actionText: 'Lihat menu',
  },
  {
    id: 'gallery-maryam',
    type: 'gallery' as const,
    tag: 'PILIHAN KUDAPAN',
    title: 'Roti Maryam',
    subtitle: 'Lihat detail menu dan tanyakan pilihan yang tersedia kepada admin.',
    badge: 'KUDAPAN',
    actionText: 'Lihat menu',
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
    productName: 'Kebab Original',
  },
  {
    id: 'supply',
    code: 'A / 02',
    tag: 'UNTUK USAHA',
    title: 'Bahan kebab & grosir',
    description: 'Sedang mencari bahan kebab untuk usaha? Hubungi admin untuk menanyakan ketersediaan dan ketentuan pemesanan.',
    actionText: 'Tanya kebutuhan grosir',
    whatsappMessage: 'Halo, saya ingin bertanya tentang bahan kebab dan pembelian grosir.',
    type: 'supply',
    productName: 'Bahan Baku Kebab Grosir',
  },
  {
    id: 'event',
    code: 'A / 03',
    tag: 'UNTUK MOMEN SPESIAL',
    title: 'Pesanan acara',
    description: 'Punya acara keluarga atau komunitas? Tanyakan terlebih dahulu apakah kebutuhan dan tanggal pesananmu dapat dilayani.',
    actionText: 'Diskusikan pesanan acara',
    whatsappMessage: 'Halo, saya ingin bertanya tentang pesanan untuk acara.',
    type: 'event',
    productName: 'Paket Pesanan Acara / Hajatan',
  },
];

export const ORDERING_STEPS: OrderingStep[] = [
  {
    number: '01',
    title: 'Pilih kebutuhan',
    description: 'Pilih menu atau kebutuhan yang ingin kamu tanyakan.',
  },
  {
    number: '02',
    title: 'Hubungi kami',
    description: 'Pilih menu untuk dimasukkan ke keranjang, atau hubungi admin untuk konsultasi kebutuhan khusus.',
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
    answer: 'Silakan hubungi admin untuk menanyakan apakah bahan kebab grosir sedang tersedia, termasuk jenis bahan, minimum pembelian, harga, dan stok terbaru.',
  },
  {
    question: 'Apakah menerima pesanan untuk acara atau hajatan?',
    answer: 'Untuk pesanan acara, silakan hubungi admin terlebih dahulu untuk memastikan apakah kebutuhan, tanggal, jumlah porsi, dan waktu yang kamu ajukan dapat dilayani.',
  },
  {
    question: 'Apakah tersedia layanan pengantaran (delivery)?',
    answer: 'Hubungi admin untuk menanyakan apakah pengantaran tersedia ke alamatmu. Area layanan, minimal pesanan, dan ongkir perlu dikonfirmasi sebelum checkout.',
  },
  {
    question: 'Di mana lokasi Kebab Al Firdaus?',
    answer: 'Kami berada di area Medaeng, Sidoarjo. Hubungi admin untuk memastikan alamat lengkap, pin lokasi, dan jam operasional terbaru sebelum berkunjung.',
  },
];
