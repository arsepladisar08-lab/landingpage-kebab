import { BusinessInfo, OfferItem, MenuVariant, OrderingStep, FaqItem } from '../types';
import { PRODUCT_ASSETS } from './productAssets';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'AL FIRDAUS',
  subName: 'KEBAB & MORE',
  address: 'Jl. Bali No.13 Blok O, Medaeng Kulon, Kedungturi, Taman, Sidoarjo 61257',
  hoursWeekday: 'Senin - Sabtu 06.00 - 21.00',
  hoursSunday: 'Minggu 06.00 - 18.00',
  phone: '6288989113552',
  phoneDisplay: '+62 889-8911-3552',
  rating: 4.6,
  reviewCount: 57,
  ratingVerified: false,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kebab+Murah+Di+Sidoarjo+Alfirdaus+Jl+Bali+No+13+Medaeng',
  whatsappBaseUrl: 'https://wa.me/6288989113552',
};

export function getWhatsAppLink(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export interface CartWhatsAppItemInput {
  name: string;
  qty: number;
  option?: string;
  verifiedPrice?: number;
}

export function buildCartWhatsAppUrl(data: {
  customerName: string;
  customerPhone: string;
  items: CartWhatsAppItemInput[];
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress?: string;
  generalNotes?: string;
}): string {
  const totalItemCount = data.items.reduce((acc, curr) => acc + curr.qty, 0);
  const allPricesVerified =
    data.items.length > 0 &&
    data.items.every(
      (item) =>
        typeof item.verifiedPrice === 'number' &&
        Number.isFinite(item.verifiedPrice) &&
        item.verifiedPrice > 0
    );

  const totalPrice = allPricesVerified
    ? data.items.reduce((acc, curr) => acc + (curr.verifiedPrice as number) * curr.qty, 0)
    : null;

  const itemLines = data.items.map((item, index) => {
    const optionText = item.option ? ` (${item.option})` : '';
    const hasVerifiedPrice =
      typeof item.verifiedPrice === 'number' &&
      Number.isFinite(item.verifiedPrice) &&
      item.verifiedPrice > 0;

    if (hasVerifiedPrice) {
      const subtotal = formatRupiah((item.verifiedPrice as number) * item.qty);
      return `${index + 1}. ${item.name}${optionText} x ${item.qty} = ${subtotal}`;
    }
    return `${index + 1}. ${item.name}${optionText} x ${item.qty}`;
  });

  const methodText =
    data.deliveryOption === 'delivery'
      ? 'Kirim / Antar ke Lokasi'
      : 'Ambil Sendiri di Outlet Medaeng Kulon';

  const lines = [
    'Halo Kebab Al Firdaus, saya ingin memesan melalui keranjang:',
    '',
    `Nama: ${data.customerName.trim()}`,
    `Kontak WhatsApp: ${data.customerPhone.trim()}`,
    '',
    'Daftar Pesanan:',
    ...itemLines,
    '',
    `Total Item: ${totalItemCount} item`,
    allPricesVerified && totalPrice !== null
      ? `Estimasi Total: ${formatRupiah(totalPrice)}`
      : 'Harga: Harga dikonfirmasi admin via WhatsApp',
    '',
    `Metode: ${methodText}`,
    data.deliveryOption === 'delivery' && data.deliveryAddress?.trim()
      ? `Alamat: ${data.deliveryAddress.trim()}`
      : '',
    data.generalNotes?.trim() ? `Catatan: ${data.generalNotes.trim()}` : '',
    '',
    'Ketersediaan, ongkir, dan konfirmasi akhir menunggu admin.',
  ].filter((line, idx, arr) => {
    if (line !== '') return true;
    return idx > 0 && arr[idx - 1] !== '';
  });

  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildServiceInquiryWhatsAppUrl(data: {
  mode: 'wholesale' | 'event';
  customerName: string;
  customerPhone: string;
  product: string;
  quantity: number;
  unit?: string;
  eventDate?: string;
  eventLocation?: string;
  notes?: string;
}): string {
  const header =
    data.mode === 'wholesale'
      ? 'Halo Kebab Al Firdaus, saya ingin konsultasi bahan baku kebab grosir:'
      : 'Halo Kebab Al Firdaus, saya ingin konsultasi pesanan kebab untuk acara:';

  const quantityLine =
    data.mode === 'wholesale'
      ? `Perkiraan Jumlah: ${data.quantity} ${data.unit?.trim() || 'pack'}`
      : `Perkiraan Jumlah: ${data.quantity} porsi`;

  const lines = [
    header,
    '',
    `Nama: ${data.customerName.trim()}`,
    `Kontak WhatsApp: ${data.customerPhone.trim()}`,
    `Kebutuhan: ${data.product}`,
    quantityLine,
    data.mode === 'event' && data.eventDate?.trim() ? `Tanggal Acara: ${data.eventDate.trim()}` : '',
    data.mode === 'event' && data.eventLocation?.trim()
      ? `Lokasi Acara: ${data.eventLocation.trim()}`
      : '',
    data.notes?.trim() ? `Catatan: ${data.notes.trim()}` : '',
    '',
    'Ketersediaan, ongkir, dan konfirmasi akhir menunggu admin.',
  ].filter((line, idx, arr) => {
    if (line !== '') return true;
    return idx > 0 && arr[idx - 1] !== '';
  });

  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/**
 * Note on pricing (see PROJECT-FACTS.md):
 * Retail and wholesale prices still require final confirmation from the owner.
 * `price` is optional and `priceVerified` remains `false` until owner approval.
 * When `priceVerified` is set to `true` alongside a confirmed `price`, totals
 * and unit prices appear automatically across the catalog, cart, and WhatsApp message.
 */
export const MENU_VARIANTS: MenuVariant[] = [
  {
    id: 'original',
    name: 'Kebab Original',
    tag: 'Klasik',
    description: 'Daging kebab gurih berpadu dengan sayuran renyah dan racikan saus khas Al Firdaus.',
    badge: 'Favorit',
    type: 'original',
    kind: 'ready-to-eat',
    category: 'kebab',
    image: PRODUCT_ASSETS.original,
    flavorProfile: 'Gurih smoky dengan saus manis-pedas seimbang dan sayuran segar',
    spiceLevel: 1,
    portionInfo: 'Tersedia ukuran Reguler dan Jumbo',
    validOptions: ['Reguler', 'Jumbo'],
    imageDummyAlt: 'Ilustrasi Kebab Original panggang dengan selada dan saus',
    priceVerified: false,
    ingredients: [
      'Kulit tortilla panggang renyah',
      'Irisan daging kebab bumbu rempah',
      'Selada hijau dan timun segar',
      'Racikan saus spesial dan mayones gurih',
    ],
  },
  {
    id: 'keju',
    name: 'Kebab Keju',
    tag: 'Creamy gurih',
    description: 'Paduan daging kebab hangat dengan lumuran saus keju creamy dan keju parut.',
    badge: 'Terlaris',
    type: 'keju',
    kind: 'ready-to-eat',
    category: 'kebab',
    image: PRODUCT_ASSETS.keju,
    flavorProfile: 'Gurih creamy dengan aroma keju lumer yang lembut',
    spiceLevel: 1,
    portionInfo: 'Tersedia porsi Reguler dan Ekstra Keju',
    validOptions: ['Reguler', 'Ekstra Keju'],
    imageDummyAlt: 'Ilustrasi Kebab Keju dengan lumuran saus keju',
    priceVerified: false,
    ingredients: [
      'Kulit tortilla lembut terpanggang',
      'Daging kebab pilihan berbumbu',
      'Saus keju creamy dan keju parut lumer',
      'Selada segar dan mayones gurih',
    ],
  },
  {
    id: 'pedas',
    name: 'Kebab Pedas',
    tag: 'Pedas hangat',
    description: 'Dibalut saus sambal racikan pedas untuk kamu yang suka gigitan hangat dan tajam.',
    badge: 'Pedas mantap',
    type: 'pedas',
    kind: 'ready-to-eat',
    category: 'kebab',
    image: PRODUCT_ASSETS.pedas,
    flavorProfile: 'Pedas terasa, hangat di tenggorokan, dengan bumbu rempah gurih',
    spiceLevel: 3,
    portionInfo: 'Level pedas bisa pilih sedang atau ekstra pedas',
    validOptions: ['Pedas Sedang', 'Ekstra Pedas'],
    imageDummyAlt: 'Ilustrasi Kebab Pedas dengan balutan saus sambal',
    priceVerified: false,
    ingredients: [
      'Kulit tortilla dipanggang matang',
      'Daging kebab gurih empuk',
      'Saus sambal racikan pedas',
      'Irisan selada segar dan cabai rempah',
    ],
  },
  {
    id: 'komplit',
    name: 'Kebab Komplit',
    tag: 'Komplit jumbo',
    description: 'Isian lengkap daging dobel, sayuran segar, ekstra saus, dan keju dalam satu gulungan.',
    badge: 'Spesial',
    type: 'komplit',
    kind: 'ready-to-eat',
    category: 'kebab',
    image: PRODUCT_ASSETS.komplit,
    flavorProfile: 'Daging lebih banyak, keju lumer, dan kombinasi saus gurih pedas',
    spiceLevel: 2,
    portionInfo: 'Ukuran Jumbo Spesial untuk porsi lebih kenyang',
    validOptions: ['Jumbo Spesial', 'Reguler'],
    imageDummyAlt: 'Ilustrasi Kebab Komplit porsi jumbo dengan keju dan daging dobel',
    priceVerified: false,
    ingredients: [
      'Kulit tortilla jumbo lembut dan renyah',
      'Porsi ekstra daging kebab',
      'Lumuran keju lumer',
      'Sayuran segar lengkap',
      'Kombinasi saus spesial dan saus cabai',
    ],
  },
  {
    id: 'maryam',
    name: 'Roti Maryam Gurih / Manis',
    tag: 'Kudapan hangat',
    description: 'Roti maryam berlapis renyah di luar dan lembut di dalam, pas menemani teh atau kopi.',
    badge: 'Kudapan khas',
    type: 'custom',
    kind: 'snack',
    category: 'snack',
    image: PRODUCT_ASSETS.maryam,
    flavorProfile: 'Gurih atau manis berlapis renyah dengan aroma margarin hangat',
    spiceLevel: 0,
    portionInfo: 'Tersedia siap santap hangat atau kemasan frozen per pack',
    validOptions: ['Siap Santap', 'Frozen'],
    imageDummyAlt: 'Ilustrasi Roti Maryam hangat berlapis kecokelatan',
    priceVerified: false,
    ingredients: [
      'Adonan tepung gandum pilihan',
      'Margarin dan susu',
      'Pilihan rasa gurih original atau manis',
      'Tersedia versi hangat dan frozen',
    ],
  },
  {
    id: 'bahan-grosir',
    name: 'Bahan Baku Kebab Grosir',
    tag: 'Untuk usaha',
    description: 'Kulit tortilla, daging olahan kebab, dan saus kemasan grosir untuk warung dan reseller.',
    badge: 'Pasokan usaha',
    type: 'custom',
    kind: 'wholesale',
    category: 'wholesale',
    image: PRODUCT_ASSETS['bahan-grosir'],
    flavorProfile: 'Standar produksi rutin untuk kebutuhan pedagang dan reseller kuliner',
    spiceLevel: 0,
    portionInfo: 'Tersedia per pack kulit tortilla, daging roll, dan saus kemasan usaha',
    imageDummyAlt: 'Ilustrasi paket dus bahan baku kebab grosir dan tumpukan tortilla',
    priceVerified: false,
    ingredients: [
      'Kulit tortilla berbagai diameter',
      'Daging kebab olahan siap panggang',
      'Saus sambal dan saus tomat kemasan grosir',
      'Mayones dan kemasan kebab untuk jualan',
    ],
  },
  {
    id: 'pesanan-acara',
    name: 'Paket Pesanan Acara / Hajatan',
    tag: 'Acara & syukuran',
    description: 'Pesanan porsi banyak untuk arisan, hajatan, rapat kantor, atau syukuran keluarga di Sidoarjo.',
    badge: 'Pesanan acara',
    type: 'custom',
    kind: 'event',
    category: 'event',
    image: PRODUCT_ASSETS['pesanan-acara'],
    flavorProfile: 'Rasa konsisten, kemasan kotak rapi, dibuat hangat menjelang jadwal acara',
    spiceLevel: 1,
    portionInfo: 'Koordinasikan estimasi porsi, tanggal, dan lokasi acara bersama admin',
    imageDummyAlt: 'Ilustrasi sajian paket kebab untuk acara dan syukuran',
    priceVerified: false,
    ingredients: [
      'Pilihan varian kebab sesuai permintaan',
      'Kemasan kotak rapi dan bersih',
      'Dipanggang hangat mendekati jam ambil atau antar',
      'Bisa ditambah paket roti maryam',
    ],
  },
];

export const OFFER_ITEMS: OfferItem[] = [
  {
    id: 'food',
    code: '01',
    tag: 'Siap dinikmati',
    title: 'Kebab hangat, frozen & kudapan',
    description: 'Pilihan kebab panggang siap santap, kemasan frozen isi 5, 6, atau 10 untuk stok di rumah, serta roti maryam gurih dan manis.',
    actionText: 'Lihat daftar menu',
    whatsappMessage: 'Halo, boleh minta daftar menu dan harga Kebab Al Firdaus?',
    type: 'food',
    productName: 'Kebab Original',
  },
  {
    id: 'supply',
    code: '02',
    tag: 'Untuk usaha',
    title: 'Bahan kebab & grosir',
    description: 'Butuh kulit tortilla, daging kebab olahan, atau saus untuk jualan? Diskusikan jumlah, satuan, dan jadwal pasokan dengan kami.',
    actionText: 'Tanya bahan grosir',
    whatsappMessage: 'Halo, saya ingin bertanya tentang bahan kebab dan pembelian grosir.',
    type: 'supply',
    productName: 'Bahan Baku Kebab Grosir',
  },
  {
    id: 'event',
    code: '03',
    tag: 'Untuk momen bersama',
    title: 'Pesanan acara & hajatan',
    description: 'Punya arisan, rapat kantor, atau syukuran keluarga? Sampaikan tanggal, lokasi, dan jumlah porsi lebih awal agar kami siapkan hangat.',
    actionText: 'Diskusikan pesanan acara',
    whatsappMessage: 'Halo, saya ingin bertanya tentang pesanan untuk acara.',
    type: 'event',
    productName: 'Paket Pesanan Acara / Hajatan',
  },
];

export const ORDERING_STEPS: OrderingStep[] = [
  {
    number: '01',
    title: 'Pilih menu atau layanan',
    description: 'Tentukan varian kebab siap santap dan roti maryam, atau ajukan konsultasi bahan grosir dan paket acara.',
  },
  {
    number: '02',
    title: 'Atur pesanan di keranjang',
    description: 'Masukkan menu harian ke keranjang, lalu lengkapi nama, kontak WhatsApp, dan metode ambil atau antar.',
  },
  {
    number: '03',
    title: 'Konfirmasi dengan admin',
    description: 'Tim kami memastikan stok hari ini, harga terbaru, ongkir, serta perkiraan waktu siap melalui WhatsApp.',
  },
  {
    number: '04',
    title: 'Ambil atau antar',
    description: 'Ambil langsung di outlet Medaeng Kulon atau atur pengantaran sesuai kesepakatan dengan admin.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Bagaimana cara mengetahui daftar harga terbaru di Kebab Al Firdaus?',
    answer: 'Daftar harga terbaru untuk kebab siap santap, kemasan frozen, roti maryam, dan pasokan grosir dikonfirmasi langsung melalui admin WhatsApp sebelum pesanan diproses.',
  },
  {
    question: 'Apakah tersedia kebab frozen untuk stok di rumah?',
    answer: 'Ya, tersedia Kebab Al Firdaus kemasan frozen dalam pilihan isi 5, 6, dan 10 sesuai stok harian. Keluarkan sebentar dari freezer lalu panggang di teflon dengan sedikit margarin hingga kecokelatan.',
  },
  {
    question: 'Apakah bisa membeli bahan kebab secara grosir?',
    answer: 'Ya, kami menyediakan kulit tortilla, daging kebab olahan, dan saus dalam kemasan grosir untuk pedagang dan reseller. Gunakan tombol konsultasi grosir untuk cek stok, satuan, dan minimum pembelian.',
  },
  {
    question: 'Apakah menerima pesanan untuk acara atau hajatan?',
    answer: 'Bisa. Kami melayani pesanan porsi besar untuk arisan, syukuran, hajatan, dan kegiatan kantor. Sampaikan tanggal, lokasi, dan perkiraan jumlah porsi lebih awal lewat konsultasi acara.',
  },
  {
    question: 'Di mana lokasi outlet dan apakah melayani pengantaran?',
    answer: 'Outlet kami berada di Jl. Bali No.13 Blok O, Medaeng Kulon, Kedungturi, Taman, Sidoarjo (dekat perbatasan Surabaya-Sidoarjo). Opsi pengantaran dan ongkir dikonfirmasi langsung oleh admin via WhatsApp.',
  },
];
