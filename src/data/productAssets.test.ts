import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCT_ASSETS, resolveProductAsset, hasRealProductPhoto } from './productAssets';
import { MENU_VARIANTS } from './content';

test('every MENU_VARIANTS item has a matching asset entry with 4:3 dimensions and placeholder photo URL', () => {
  for (const variant of MENU_VARIANTS) {
    const asset = PRODUCT_ASSETS[variant.id];
    assert.ok(asset, `Missing PRODUCT_ASSETS entry for ${variant.id}`);
    assert.equal(asset.width / asset.height, 4 / 3);
    assert.match(asset.expectedFile, /^\/assets\/products\/.+\.webp$/);
    assert.ok(asset.src && asset.src.startsWith('https://'), `Expected HTTPS placeholder photo for ${variant.id}`);
    assert.equal(asset.isPlaceholder, true);
  }
});

test('resolveProductAsset returns fallback descriptor for unknown product IDs', () => {
  const unknown = resolveProductAsset('custom-item', 'Alt Khusus', 'original');
  assert.equal(unknown.src, null);
  assert.equal(unknown.fallbackType, 'original');
  assert.equal(unknown.alt, 'Alt Khusus');
  assert.equal(hasRealProductPhoto(unknown), false);
});

test('hasRealProductPhoto distinguishes populated photo paths from null fallbacks', () => {
  assert.equal(hasRealProductPhoto(PRODUCT_ASSETS.original), true);
  assert.equal(
    hasRealProductPhoto({
      ...PRODUCT_ASSETS.original,
      src: null,
      webpSrc: null,
    }),
    false
  );
});
