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

test('BUSINESS_INFO provides a WhatsApp destination', () => {
  assert.match(BUSINESS_INFO.whatsappBaseUrl, /^https:\/\/wa\.me\//);
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

test('buildCartWhatsAppUrl produces itemized request without quoting unverified prices', () => {
  const url = buildCartWhatsAppUrl({
    customerName: 'Siti Aminah',
    items: [
      { name: 'Kebab Keju', quantity: 2, portionOption: 'Reguler' },
      { name: 'Roti Maryam', quantity: 1, notes: 'Topping manis' },
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
  assert.match(textParam, /Harga akhir dan ketersediaan akan dikonfirmasi oleh admin/);
  assert.doesNotMatch(textParam, /Estimasi Total/);
  assert.match(textParam, /Siti Aminah/);
  assert.match(textParam, /Jl\. Medaeng Asri No\. 5/);
  assert.match(textParam, /Pengiriman \/ Antar ke Lokasi/);
});

test('MENU_VARIANTS includes core kebabs and secondary items', () => {
  const ids = MENU_VARIANTS.map((m) => m.id);
  assert.ok(ids.includes('original'));
  assert.ok(ids.includes('keju'));
  assert.ok(ids.includes('pedas'));
  assert.ok(ids.includes('komplit'));
  assert.ok(ids.includes('maryam'));
  assert.ok(ids.includes('bahan-grosir'));

  const wholesale = MENU_VARIANTS.find((m) => m.id === 'bahan-grosir');
  assert.equal(wholesale?.kind, 'wholesale');
});

test('PROMO_BANNER_ITEMS only publishes neutral gallery cards', () => {
  assert.ok(PROMO_BANNER_ITEMS.length > 0);
  assert.equal(PROMO_BANNER_ITEMS.every((item) => item.type === 'gallery'), true);
  assert.equal(PROMO_BANNER_ITEMS.some((item) => item.highlightText), false);
});
