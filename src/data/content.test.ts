import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BUSINESS_INFO,
  getWhatsAppLink,
  buildCartWhatsAppUrl,
  buildServiceInquiryWhatsAppUrl,
  formatRupiah,
  MENU_VARIANTS,
  OFFER_ITEMS,
  ORDERING_STEPS,
  FAQ_ITEMS,
} from './content';

test('BUSINESS_INFO holds Medaeng Kulon Sidoarjo reference details and updated admin WhatsApp number', () => {
  assert.equal(BUSINESS_INFO.phone, '6288989113552');
  assert.equal(BUSINESS_INFO.phoneDisplay, '+62 889-8911-3552');
  assert.equal(BUSINESS_INFO.rating, 4.6);
  assert.equal(BUSINESS_INFO.reviewCount, 57);
  assert.equal(BUSINESS_INFO.ratingVerified, false);
  assert.match(BUSINESS_INFO.address, /Medaeng Kulon/);
});

test('getWhatsAppLink generates correct URL with query text', () => {
  const url = getWhatsAppLink('Halo Kebab');
  assert.equal(url, 'https://wa.me/6288989113552?text=Halo%20Kebab');
});

test('formatRupiah formats currency in Indonesian Rupiah', () => {
  const formatted = formatRupiah(15000);
  assert.match(formatted, /15\.000/);
});

test('buildCartWhatsAppUrl shows total only when all items have verified prices', () => {
  const verifiedUrl = buildCartWhatsAppUrl({
    customerName: 'Siti Aminah',
    customerPhone: '0812-3456-7890',
    items: [
      { name: 'Kebab Keju', qty: 2, verifiedPrice: 15000, option: 'Reguler' },
      { name: 'Roti Maryam', qty: 1, verifiedPrice: 10000, option: 'Siap Santap' },
    ],
    deliveryOption: 'delivery',
    deliveryAddress: 'Jl. Medaeng Asri No. 5',
    generalNotes: 'Minta ekstra saus ya',
  });

  const verifiedText = new URL(verifiedUrl).searchParams.get('text') || '';
  assert.match(verifiedText, /Nama: Siti Aminah/);
  assert.match(verifiedText, /Kontak WhatsApp: 0812-3456-7890/);
  assert.match(verifiedText, /Kebab Keju \(Reguler\) x 2/);
  assert.match(verifiedText, /40\.000/);
  assert.match(verifiedText, /Jl\. Medaeng Asri No\. 5/);
  assert.match(verifiedText, /Ketersediaan, ongkir, dan konfirmasi akhir menunggu admin\./);

  const unverifiedUrl = buildCartWhatsAppUrl({
    customerName: 'Budi',
    customerPhone: '081234567890',
    items: [
      { name: 'Kebab Original', qty: 2, option: 'Reguler' },
      { name: 'Kebab Keju', qty: 1, verifiedPrice: 15000, option: 'Reguler' },
    ],
    deliveryOption: 'pickup',
  });

  const unverifiedText = new URL(unverifiedUrl).searchParams.get('text') || '';
  assert.match(unverifiedText, /Total Item: 3 item/);
  assert.match(unverifiedText, /Harga dikonfirmasi admin via WhatsApp/);
  assert.doesNotMatch(unverifiedText, /Estimasi Total:/);
  assert.match(unverifiedText, /Ketersediaan, ongkir, dan konfirmasi akhir menunggu admin\./);
});

test('buildServiceInquiryWhatsAppUrl formats separate wholesale and event inquiries', () => {
  const wholesaleUrl = buildServiceInquiryWhatsAppUrl({
    mode: 'wholesale',
    customerName: 'Andi',
    customerPhone: '081234567890',
    product: 'Kulit Tortilla & Daging Kebab',
    quantity: 10,
    unit: 'pack',
    notes: 'Untuk jualan mingguan',
  });
  const wholesaleText = new URL(wholesaleUrl).searchParams.get('text') || '';
  assert.match(wholesaleText, /10 pack/);
  assert.match(wholesaleText, /Ketersediaan, ongkir, dan konfirmasi akhir menunggu admin\./);

  const eventUrl = buildServiceInquiryWhatsAppUrl({
    mode: 'event',
    customerName: 'Rina',
    customerPhone: '+628123456789',
    product: 'Paket Pesanan Acara / Hajatan',
    quantity: 50,
    eventDate: '2026-12-01',
    eventLocation: 'Taman, Sidoarjo',
  });
  const eventText = new URL(eventUrl).searchParams.get('text') || '';
  assert.match(eventText, /50 porsi/);
  assert.match(eventText, /Tanggal Acara: 2026-12-01/);
  assert.match(eventText, /Lokasi Acara: Taman, Sidoarjo/);
});

test('MENU_VARIANTS includes primary kebabs, snack, wholesale, and event without unverified verified flags', () => {
  const ids = MENU_VARIANTS.map((m) => m.id);
  assert.ok(ids.includes('original'));
  assert.ok(ids.includes('keju'));
  assert.ok(ids.includes('pedas'));
  assert.ok(ids.includes('komplit'));
  assert.ok(ids.includes('maryam'));
  assert.ok(ids.includes('bahan-grosir'));
  assert.ok(ids.includes('pesanan-acara'));

  for (const item of MENU_VARIANTS) {
    assert.equal(item.priceVerified, false);
  }
});

test('UI copy contains no em dashes or en dashes (R-02)', () => {
  const serialized = JSON.stringify({
    BUSINESS_INFO,
    MENU_VARIANTS,
    OFFER_ITEMS,
    ORDERING_STEPS,
    FAQ_ITEMS,
  });
  assert.doesNotMatch(serialized, /[—–]/);
});
