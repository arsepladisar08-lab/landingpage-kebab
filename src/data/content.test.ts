import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BUSINESS_INFO,
  getWhatsAppLink,
  buildOrderWhatsAppUrl,
  buildCartWhatsAppUrl,
  formatRupiah,
  MENU_VARIANTS,
  PROMO_BANNER_ITEMS,
} from './content';

test('BUSINESS_INFO holds correct Medaeng Kulon Sidoarjo details', () => {
  assert.equal(BUSINESS_INFO.phone, '6283830361617');
  assert.equal(BUSINESS_INFO.phoneDisplay, '0838-3036-1617');
  assert.equal(BUSINESS_INFO.rating, 4.6);
  assert.equal(BUSINESS_INFO.reviewCount, 57);
  assert.match(BUSINESS_INFO.address, /Medaeng Kulon/);
});

test('getWhatsAppLink generates correct URL with query text', () => {
  const url = getWhatsAppLink('Halo Kebab');
  assert.equal(url, 'https://wa.me/6283830361617?text=Halo%20Kebab');
});

test('buildOrderWhatsAppUrl encodes full order payload properly', () => {
  const url = buildOrderWhatsAppUrl({
    customerName: 'Budi Santoso',
    product: 'Kebab Komplit',
    quantity: 3,
    notes: 'Pedas sedang, tanpa timun',
  });

  assert.match(url, /^https:\/\/wa\.me\/6283830361617\?text=/);
  const textParam = new URL(url).searchParams.get('text') || '';
  assert.match(textParam, /Kebab Komplit/);
  assert.match(textParam, /Jumlah: 3 porsi\/paket/);
  assert.match(textParam, /Nama Pemesan: Budi Santoso/);
  assert.match(textParam, /Catatan Tambahan: Pedas sedang, tanpa timun/);
});

test('formatRupiah formats currency in Indonesian Rupiah', () => {
  const formatted = formatRupiah(15000);
  assert.match(formatted, /15\.000/);
});

test('buildCartWhatsAppUrl produces complete itemized order with total', () => {
  const url = buildCartWhatsAppUrl({
    customerName: 'Siti Aminah',
    items: [
      { name: 'Kebab Keju', quantity: 2, price: 15000, portionOption: 'Reguler' },
      { name: 'Roti Maryam', quantity: 1, price: 10000, notes: 'Topping manis' },
    ],
    deliveryOption: 'delivery',
    deliveryAddress: 'Jl. Medaeng Asri No. 5',
    generalNotes: 'Minta ekstra saus ya',
  });

  assert.match(url, /^https:\/\/wa\.me\/6283830361617\?text=/);
  const textParam = new URL(url).searchParams.get('text') || '';
  assert.match(textParam, /Kebab Keju/);
  assert.match(textParam, /Roti Maryam/);
  assert.match(textParam, /Total Pesanan/);
  assert.match(textParam, /3 item/);
  assert.match(textParam, /Siti Aminah/);
  assert.match(textParam, /Jl\. Medaeng Asri No\. 5/);
  assert.match(textParam, /Pengiriman \/ Antar ke Lokasi/);
});

test('MENU_VARIANTS includes primary kebabs, prices, and snacks', () => {
  const ids = MENU_VARIANTS.map((m) => m.id);
  assert.ok(ids.includes('original'));
  assert.ok(ids.includes('keju'));
  assert.ok(ids.includes('pedas'));
  assert.ok(ids.includes('komplit'));
  assert.ok(ids.includes('maryam'));
  assert.ok(ids.includes('bahan-grosir'));

  const keju = MENU_VARIANTS.find((m) => m.id === 'keju');
  assert.equal(keju?.price, 15000);
});

test('PROMO_BANNER_ITEMS contains promo deals and gallery showcases', () => {
  assert.ok(PROMO_BANNER_ITEMS.length >= 4);
  const promo = PROMO_BANNER_ITEMS.find((p) => p.type === 'promo');
  const gallery = PROMO_BANNER_ITEMS.find((p) => p.type === 'gallery');
  assert.ok(promo);
  assert.ok(gallery);
});
