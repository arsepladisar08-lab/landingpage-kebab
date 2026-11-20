import test from 'node:test';
import assert from 'node:assert/strict';
import { MenuVariant } from '../types';
import {
  CART_STORAGE_KEY,
  MAX_CART_ITEM_QTY,
  reconcileCart,
  serializeCart,
  summarizeCart,
} from './cart';

const TEST_CATALOG: MenuVariant[] = [
  {
    id: 'original',
    name: 'Kebab Original',
    tag: 'Klasik',
    description: 'Daging kebab gurih.',
    badge: 'Favorit',
    type: 'original',
    kind: 'ready-to-eat',
    category: 'kebab',
    validOptions: ['Reguler', 'Jumbo'],
    price: 12000,
    priceVerified: true,
  },
  {
    id: 'keju',
    name: 'Kebab Keju',
    tag: 'Creamy',
    description: 'Kebab dengan keju.',
    badge: 'Terlaris',
    type: 'keju',
    kind: 'ready-to-eat',
    category: 'kebab',
    validOptions: ['Reguler', 'Ekstra Keju'],
    priceVerified: false,
  },
  {
    id: 'bahan-grosir',
    name: 'Bahan Baku Kebab Grosir',
    tag: 'Usaha',
    description: 'Bahan grosir.',
    badge: 'Grosir',
    type: 'custom',
    kind: 'wholesale',
    category: 'wholesale',
  },
  {
    id: 'pesanan-acara',
    name: 'Paket Pesanan Acara',
    tag: 'Acara',
    description: 'Pesanan acara.',
    badge: 'Acara',
    type: 'custom',
    kind: 'event',
    category: 'event',
  },
];

test('CART_STORAGE_KEY uses versioned kebab-cart-v1 key', () => {
  assert.equal(CART_STORAGE_KEY, 'kebab-cart-v1');
});

test('reconcileCart safely returns [] on corrupt JSON or non-array payloads', () => {
  assert.deepEqual(reconcileCart('{bad-json', TEST_CATALOG), []);
  assert.deepEqual(reconcileCart('', TEST_CATALOG), []);
  assert.deepEqual(reconcileCart(null, TEST_CATALOG), []);
  assert.deepEqual(reconcileCart(undefined, TEST_CATALOG), []);
  assert.deepEqual(reconcileCart({ menuId: 'original', qty: 2 }, TEST_CATALOG), []);
  assert.deepEqual(reconcileCart('12345', TEST_CATALOG), []);
});

test('reconcileCart drops unknown IDs, wholesale/event IDs, and invalid qty (negative, zero, NaN, float, string)', () => {
  const raw = [
    { menuId: 'tidak-ada', qty: 2 },
    { menuId: 'bahan-grosir', qty: 3 },
    { menuId: 'pesanan-acara', qty: 10 },
    { menuId: 'original', qty: -2 },
    { menuId: 'original', qty: 0 },
    { menuId: 'original', qty: Number.NaN },
    { menuId: 'original', qty: 1.5 },
    { menuId: 'original', qty: '3' },
    null,
    'invalid-row',
    { menuId: 'original', qty: 2, option: 'Jumbo' },
  ];

  const items = reconcileCart(raw, TEST_CATALOG);
  assert.equal(items.length, 1);
  assert.equal(items[0].menuId, 'original');
  assert.equal(items[0].qty, 2);
  assert.equal(items[0].option, 'Jumbo');
  assert.equal(items[0].name, 'Kebab Original');
  assert.equal(items[0].verifiedPrice, 12000);
});

test('reconcileCart clamps qty > 20, merges duplicates, and ignores foreign extra fields', () => {
  const raw = JSON.stringify([
    { menuId: 'original', qty: 12, option: 'Reguler', hackedPrice: 1, foreignKey: true },
    { menuId: 'original', qty: 15, option: 'Reguler', extra: 'ignored' },
    { menuId: 'keju', qty: 99, option: 'OpsiAsing', name: 'Nama Palsu', price: 500 },
  ]);

  const items = reconcileCart(raw, TEST_CATALOG);
  assert.equal(items.length, 2);

  const original = items.find((i) => i.menuId === 'original');
  assert.ok(original);
  assert.equal(original.qty, MAX_CART_ITEM_QTY);
  assert.equal(original.name, 'Kebab Original');
  assert.equal(original.verifiedPrice, 12000);

  const keju = items.find((i) => i.menuId === 'keju');
  assert.ok(keju);
  assert.equal(keju.qty, MAX_CART_ITEM_QTY);
  assert.equal(keju.option, 'Reguler'); // invalid option falls back to catalog default
  assert.equal(keju.name, 'Kebab Keju'); // always hydrated from catalog
  assert.equal(keju.verifiedPrice, undefined);
});

test('serializeCart persists only menuId, qty, and valid option', () => {
  const items = reconcileCart([{ menuId: 'original', qty: 3, option: 'Jumbo', extra: 1 }], TEST_CATALOG);
  const persisted = serializeCart(items);
  assert.deepEqual(persisted, [{ menuId: 'original', qty: 3, option: 'Jumbo' }]);
});

test('summarizeCart computes total ONLY when every item has a verified price', () => {
  const allVerified = reconcileCart([{ menuId: 'original', qty: 3 }], TEST_CATALOG);
  assert.deepEqual(summarizeCart(allVerified), {
    totalItemCount: 3,
    allPricesVerified: true,
    verifiedTotalPrice: 36000,
  });

  const mixed = reconcileCart(
    [
      { menuId: 'original', qty: 2 },
      { menuId: 'keju', qty: 1 },
    ],
    TEST_CATALOG
  );
  assert.deepEqual(summarizeCart(mixed), {
    totalItemCount: 3,
    allPricesVerified: false,
    verifiedTotalPrice: null,
  });

  assert.deepEqual(summarizeCart([]), {
    totalItemCount: 0,
    allPricesVerified: false,
    verifiedTotalPrice: null,
  });
});
