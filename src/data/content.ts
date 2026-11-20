import { BusinessInfo, OfferItem, MenuVariant, OrderingStep, FaqItem } from '../types';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'AL FIRDAUS',
  subName: 'KEBAB & MORE',
  address: 'Jl. Bali No.13 Blok O, Medaeng Kulon, Kedungturi, Taman, Sidoarjo 61257',
  hoursWeekday: 'Senin - Sabtu 06.00 - 21.00',
  hoursSunday: 'Minggu 06.00 - 18.00',
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
    'Mohon info ketersediaan dan harga terbaru ya. Terima kasih!',
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
    price: number;
    portionOption?: string;
    notes?: string;
  }>;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress?: string;
  generalNotes?: string;
}): string {
  const totalItemCount = data.items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = data.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const itemLines = data.items.map((item, index) => {
    const optionText = item.portionOption ? ` (${item.portionOption})` : '';
    const noteText = item.notes ? ` [Catatan: ${item.notes}]` : '';
    const subtotal = formatRupiah(item.price * item.quantity);
    return `${index + 1}. *${item.name}*${optionText} x${item.quantity} = ${subtotal}${noteText}`;
  });

  const methodText =
    data.deliveryOption === 'delivery'
      ? 'Pengiriman / Antar ke Lokasi'
      : 'Ambil Sendiri di Outlet Medaeng Kulon';

  const lines = [
    'Halo Kebab Al Firdaus! Saya mau memesan melalui keranjang:',
    '',
    '*DAFTAR PESANAN:*',
    ...itemLines,
    '',
    `*Total Pesanan:* ${totalItemCount} item`,
    `*Estimasi Total:* ${formatRupiah(totalPrice)}`,
    '',
    data.customerName ? `*Nama Pemesan:* ${data.customerName}` : '',
    `*Metode Pengambilan:* ${methodText}`,
    data.deliveryOption === 'delivery' && data.deliveryAddress
      ? `*Alamat Antar:* ${data.deliveryAddress}`
      : '',
    data.generalNotes ? `*Catatan Khusus:* ${data.generalNotes}` : '',
    '',
    'Mohon info ketersediaan stok dan estimasi waktu pembuatannya ya. Terima kasih!',
  ].filter(Boolean);

  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}

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
    flavorProfile: 'Gurih smoky dengan saus manis-pedas seimbang dan sayuran segar',
    spiceLevel: 1,
    portionInfo: 'Tersedia ukuran Reguler dan Jumbo',
    imageDummyAlt: 'Ilustrasi Kebab Original panggang dengan selada dan saus',
    price: 12000,
    priceDisplay: 'Rp 12.000',
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
    flavorProfile: 'Gurih creamy dengan aroma keju lumer yang lembut',
    spiceLevel: 1,
    portionInfo: 'Tersedia porsi Reguler dan Ekstra Keju',
    imageDummyAlt: 'Ilustrasi Kebab Keju dengan lumuran saus keju',
    price: 15000,
    priceDisplay: 'Rp 15.000',
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
    flavorProfile: 'Pedas terasa, hangat di tenggorokan, dengan bumbu rempah gurih',
    spiceLevel: 3,
    portionInfo: 'Level pedas bisa pilih sedang atau ekstra pedas',
    imageDummyAlt: 'Ilustrasi Kebab Pedas dengan balutan saus sambal',
    price: 14000,
    priceDisplay: 'Rp 14.000',
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
    flavorProfile: 'Daging lebih banyak, keju lumer, dan kombinasi saus gurih pedas',
    spiceLevel: 2,
    portionInfo: 'Ukuran Jumbo Spesial untuk porsi lebih kenyang',
    imageDummyAlt: 'Ilustrasi Kebab Komplit porsi jumbo dengan keju dan daging dobel',
    price: 18000,
    priceDisplay: 'Rp 18.000',
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
    flavorProfile: 'Gurih atau manis berlapis renyah dengan aroma margarin hangat',
    spiceLevel: 0,
    portionInfo: 'Tersedia siap santap hangat atau kemasan frozen per pack',
    imageDummyAlt: 'Ilustrasi Roti Maryam hangat berlapis kecokelatan',
    price: 10000,
    priceDisplay: 'Rp 10.000',
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
    flavorProfile: 'Standar produksi rutin untuk kebutuhan pedagang dan reseller kuliner',
    spiceLevel: 0,
    portionInfo: 'Tersedia per pack kulit tortilla, daging roll, dan saus kemasan usaha',
    imageDummyAlt: 'Ilustrasi paket dus bahan baku kebab grosir dan tumpukan tortilla',
    price: 50000,
    priceDisplay: 'Mulai Rp 50.000',
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
    flavorProfile: 'Rasa konsisten, kemasan kotak rapi, dibuat hangat menjelang jadwal acara',
    spiceLevel: 1,
    portionInfo: 'Melayani puluhan hingga ratusan porsi, konfirmasi minimal H-2',
    imageDummyAlt: 'Ilustrasi sajian paket kebab untuk acara dan syukuran',
    price: 15000,
    priceDisplay: 'Mulai Rp 15.000/porsi',
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
    description: 'Butuh kulit tortilla, daging kebab olahan, atau saus untuk jualan? Diskusikan jumlah dan jadwal pasokan dengan kami.',
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
    description: 'Punya arisan, rapat kantor, atau syukuran keluarga? Sampaikan tanggal dan jumlah porsi lebih awal agar kami siapkan hangat.',
    actionText: 'Diskusikan pesanan acara',
    whatsappMessage: 'Halo, saya ingin bertanya tentang pesanan untuk acara.',
    type: 'event',
    productName: 'Paket Pesanan Acara / Hajatan',
  },
];

export const ORDERING_STEPS: OrderingStep[] = [
  {
    number: '01',
    title: 'Pilih menu atau paket',
    description: 'Tentukan varian kebab hangat, kemasan frozen, roti maryam, bahan grosir, atau paket acara.',
  },
  {
    number: '02',
    title: 'Masukkan ke keranjang',
    description: 'Tambahkan pilihan ke keranjang pesanan atau langsung kirim pesan lewat WhatsApp.',
  },
  {
    number: '03',
    title: 'Konfirmasi dengan admin',
    description: 'Tim kami memastikan stok hari ini, total harga, ongkir, serta perkiraan waktu siap.',
  },
  {
    number: '04',
    title: 'Ambil atau antar',
    description: 'Ambil langsung di outlet Medaeng Kulon atau atur pengantaran ke alamatmu.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Berapa kisaran harga menu di Kebab Al Firdaus?',
    answer: 'Harga kebab siap santap mulai Rp 12.000 dan roti maryam mulai Rp 10.000. Untuk harga paket frozen, promo harian, atau grosir terbaru, konfirmasi langsung melalui WhatsApp sebelum memesan.',
  },
  {
    question: 'Apakah tersedia kebab frozen untuk stok di rumah?',
    answer: 'Ya, kami menyediakan Kebab Al Firdaus kemasan frozen (-18°C) dalam pilihan isi 5, 6, dan 10. Tinggal cairkan sebentar lalu panggang di teflon dengan sedikit margarin hingga kecokelatan.',
  },
  {
    question: 'Apakah bisa membeli bahan kebab secara grosir?',
    answer: 'Ya, kami menyediakan kulit tortilla, daging kebab olahan, dan saus dalam kemasan grosir untuk pedagang dan reseller. Hubungi kami lewat WhatsApp untuk cek stok dan minimum pembelian.',
  },
  {
    question: 'Apakah menerima pesanan untuk acara atau hajatan?',
    answer: 'Bisa. Kami melayani pesanan porsi besar untuk arisan, syukuran, hajatan, dan kegiatan kantor. Hubungi kami minimal H-2 agar tim bisa menyiapkan pesanan hangat tepat waktu.',
  },
  {
    question: 'Di mana lokasi outlet dan apakah melayani pengantaran?',
    answer: 'Outlet kami berada di Jl. Bali No.13 Blok O, Medaeng Kulon, Kedungturi, Taman, Sidoarjo (dekat perbatasan Surabaya-Sidoarjo). Opsi pengantaran dan ongkir bisa dikoordinasikan langsung via WhatsApp.',
  },
];
