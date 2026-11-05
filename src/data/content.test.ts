import test from 'node:test';
import assert from 'node:assert/strict';
import { BUSINESS_INFO, getWhatsAppLink, buildOrderWhatsAppUrl, MENU_VARIANTS } from './content';

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

test('MENU_VARIANTS includes primary kebabs and snacks', () => {
  const ids = MENU_VARIANTS.map((m) => m.id);
  assert.ok(ids.includes('original'));
  assert.ok(ids.includes('keju'));
  assert.ok(ids.includes('pedas'));
  assert.ok(ids.includes('komplit'));
  assert.ok(ids.includes('maryam'));
  assert.ok(ids.includes('bahan-grosir'));
});
