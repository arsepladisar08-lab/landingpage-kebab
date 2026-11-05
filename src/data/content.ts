export const BUSINESS_INFO = {
  name: 'Toko Kebab Al Firdaus',
  shortName: 'AL FIRDAUS',
  tagline: 'Bahan Kebab & Frozen Food Homemade',
  area: 'Taman, Sidoarjo, Jawa Timur',
  phone: '6283830361617',
  phoneDisplay: '0838-3036-1617',
  whatsappBaseUrl: 'https://wa.me/6283830361617',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Taman%2C%20Sidoarjo%2C%20Jawa%20Timur',
  instagramStoreUrl: 'https://www.instagram.com/tokokebabalfirdaus/',
  instagramStoreHandle: '@tokokebabalfirdaus',
  instagramProductUrl: 'https://www.instagram.com/kebabalfirdaus/',
  instagramProductHandle: '@kebabalfirdaus',
};

export function getWhatsAppLink(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const PRODUCT_ITEMS = [
  {
    id: 'meat',
    type: 'Bahan kebab',
    title: 'Daging kebab frozen',
    description: 'Untuk menyiapkan sajian kebab di rumah atau sebagai bahan menu usaha. Tanyakan pilihan varian dan kemasan yang tersedia.',
    icon: '🥩',
    slotLabel: 'Foto daging kebab',
    message: 'Daging kebab frozen',
    track: 'whatsapp_product_meat',
  },
  {
    id: 'tortilla',
    type: 'Bahan kebab',
    title: 'Kulit kebab / tortilla',
    description: 'Pilihan kulit untuk meracik kebab sesuai kebutuhan rumah tangga atau operasional usaha kuliner.',
    icon: '🫓',
    slotLabel: 'Foto kulit kebab',
    message: 'Kulit kebab / tortilla',
    track: 'whatsapp_product_tortilla',
  },
  {
    id: 'frozen-kebab',
    type: 'Siap olah',
    title: 'Kebab frozen',
    description: 'Opsi praktis untuk persediaan di rumah. Konfirmasikan varian, petunjuk penyimpanan, dan cara pengolahan kepada admin.',
    icon: '🌯',
    slotLabel: 'Foto kebab frozen',
    message: 'Kebab frozen siap olah',
    track: 'whatsapp_product_frozen_kebab',
  },
  {
    id: 'frozen-food',
    type: 'Katalog tambahan',
    title: 'Frozen food',
    description: 'Tanyakan daftar produk frozen food pendamping yang tersedia dan detail kemasannya langsung kepada admin.',
    icon: '❄️',
    slotLabel: 'Foto frozen food',
    message: 'Katalog frozen food',
    track: 'whatsapp_product_frozen_food',
  },
  {
    id: 'business-pack',
    type: 'Untuk pelaku usaha',
    title: 'Paket kebutuhan usaha',
    description: 'Diskusikan kebutuhan bahan untuk warung, katering, kantin, atau reseller. Susunan paket dan jumlahnya perlu dikonfirmasi.',
    icon: '📦',
    slotLabel: 'Foto paket usaha',
    message: 'Paket kebutuhan usaha',
    track: 'wholesale_package_click',
  },
  {
    id: 'custom',
    type: 'Pemesanan fleksibel',
    title: 'Kebutuhan sesuai permintaan',
    description: 'Belum tahu produk yang cocok? Sampaikan tujuan, perkiraan jumlah, dan kebutuhan pengiriman untuk dikonsultasikan.',
    icon: '🛍️',
    slotLabel: 'Foto kemasan pesanan',
    message: 'Konsultasi produk',
    track: 'whatsapp_product_consult',
  },
] as const;

export const BENEFITS = [
  {
    icon: '🏡',
    title: 'Produk homemade',
    description: 'Bahan kebab dan frozen food homemade dari Taman, Sidoarjo.',
  },
  {
    icon: '🛒',
    title: 'Satuan atau grosir',
    description: 'Belanja untuk kebutuhan rumah atau tanyakan penawaran untuk usaha.',
  },
  {
    icon: '💬',
    title: 'Langsung via WhatsApp',
    description: 'Tidak perlu membuat akun. Pesan dan pertanyaan produk dikirim langsung ke admin.',
  },
  {
    icon: '🚚',
    title: 'Pengiriman dikonfirmasi',
    description: 'Biaya, jangkauan, dan opsi pengambilan disepakati setelah alamat serta pesanan diketahui.',
  },
] as const;

export const ORDERING_STEPS = [
  { number: '01', title: 'Pilih produk', description: 'Tentukan kategori produk dan perkiraan jumlah yang dibutuhkan.' },
  { number: '02', title: 'Chat admin', description: 'Tekan tombol WhatsApp. Pesan awal akan terisi sesuai produk pilihan.' },
  { number: '03', title: 'Lengkapi detail', description: 'Kirim nama produk, jumlah, dan alamat atau opsi pengambilan.' },
  { number: '04', title: 'Konfirmasi', description: 'Admin memberi informasi stok, harga, ongkir, dan cara pembayaran.' },
  { number: '05', title: 'Selesaikan pesanan', description: 'Pesanan dibayar, lalu dikirim atau diambil sesuai kesepakatan.' },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Apakah produk bisa dibeli satuan?',
    answer: 'Pembelian satuan dan grosir sama-sama dilayani. Tanyakan varian, ketersediaan, dan kemasan kepada admin sebelum memesan.',
  },
  {
    question: 'Apakah tersedia harga grosir untuk reseller atau warung?',
    answer: 'Kamu bisa mengajukan permintaan harga grosir melalui formulir di bagian “Harga Grosir” atau langsung menghubungi admin. Penawaran akan dikonfirmasi sesuai produk dan kebutuhan.',
  },
  {
    question: 'Bagaimana cara memesan?',
    answer: 'Pilih produk, tekan tombol WhatsApp, lalu kirim nama produk, jumlah, dan alamat. Admin akan mengonfirmasi ketersediaan, harga, ongkir, dan cara bayar.',
  },
  {
    question: 'Apakah bisa dikirim ke luar Sidoarjo?',
    answer: 'Jangkauan pengiriman belum dicantumkan sebagai ketentuan tetap. Hubungi admin dengan kota atau kecamatan tujuan untuk mengecek opsi kirim dan ongkir.',
  },
  {
    question: 'Apakah bisa mengambil pesanan langsung di toko?',
    answer: 'Tanyakan opsi pengambilan, alamat lengkap, dan jam operasional kepada admin sebelum datang. Detail tersebut masih perlu dikonfirmasi pemilik toko.',
  },
  {
    question: 'Apakah produk dibuat sendiri (homemade)?',
    answer: 'Toko Kebab Al Firdaus memasarkan bahan kebab dan frozen food homemade dari Taman, Sidoarjo. Untuk detail bahan atau proses produksi tertentu, silakan tanyakan kepada admin.',
  },
  {
    question: 'Berapa lama produk frozen bisa disimpan dan bagaimana cara mengolahnya?',
    answer: 'Masa simpan dan petunjuk pengolahan perlu mengikuti informasi pada kemasan atau panduan resmi dari pemilik produk. Halaman ini tidak menebak masa simpan atau cara olah; silakan konfirmasi kepada admin.',
  },
] as const;

// Backwards-compatible exports retained for components that remain in the source tree.
export const OFFER_ITEMS = [
  {
    id: 'meat', code: 'A / 01', tag: 'BAHAN KEBAB', title: 'Daging kebab frozen',
    description: 'Tanyakan pilihan varian, ukuran kemasan, stok, dan harga terbaru kepada admin.',
    actionText: 'Tanya Harga', whatsappMessage: 'Saya ingin bertanya tentang daging kebab frozen.', type: 'supply' as const,
  },
  {
    id: 'tortilla', code: 'A / 02', tag: 'BAHAN KEBAB', title: 'Kulit kebab / tortilla',
    description: 'Pilihan kulit untuk meracik kebab sesuai kebutuhan rumah tangga atau operasional usaha.',
    actionText: 'Tanya Harga', whatsappMessage: 'Saya ingin bertanya tentang kulit kebab / tortilla.', type: 'supply' as const,
  },
  {
    id: 'frozen', code: 'A / 03', tag: 'SIAP OLAH', title: 'Kebab frozen & frozen food',
    description: 'Tanyakan daftar produk, detail kemasan, petunjuk penyimpanan, dan ketersediaannya.',
    actionText: 'Lihat Katalog', whatsappMessage: 'Saya ingin bertanya tentang katalog frozen food.', type: 'food' as const,
  },
];
export const ORDERING_STEPS = [
  { number: '01', title: 'Pilih produk', description: 'Tentukan kategori produk dan perkiraan jumlah yang dibutuhkan.' },
  { number: '02', title: 'Chat admin', description: 'Pesan awal akan terisi sesuai produk pilihan.' },
  { number: '03', title: 'Lengkapi detail', description: 'Kirim nama produk, jumlah, dan alamat atau opsi pengambilan.' },
  { number: '04', title: 'Konfirmasi', description: 'Admin menginformasikan stok, harga, ongkir, dan cara pembayaran.' },
];
