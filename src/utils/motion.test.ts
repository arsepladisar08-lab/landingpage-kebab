import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_CATEGORY_TAB,
  MENU_CATEGORY_IDS,
  matchesMenuCategory,
  splitWordsForReveal,
  getStaggerDelayMs,
  getNextRotatingIndex,
} from './motion';
import { MENU_VARIANTS } from '../data/content';

test('menu categories omit "all" and default to "kebab" while covering every catalog item', () => {
  assert.equal(DEFAULT_CATEGORY_TAB, 'kebab');
  assert.deepEqual(MENU_CATEGORY_IDS, ['kebab', 'snack', 'wholesale', 'event']);
  assert.equal((MENU_CATEGORY_IDS as readonly string[]).includes('all'), false);

  const kebabItems = MENU_VARIANTS.filter((item) => matchesMenuCategory(item, 'kebab'));
  const snackItems = MENU_VARIANTS.filter((item) => matchesMenuCategory(item, 'snack'));
  const wholesaleItems = MENU_VARIANTS.filter((item) => matchesMenuCategory(item, 'wholesale'));
  const eventItems = MENU_VARIANTS.filter((item) => matchesMenuCategory(item, 'event'));

  assert.equal(kebabItems.length, 4);
  assert.equal(snackItems.length, 1);
  assert.equal(wholesaleItems.length, 1);
  assert.equal(eventItems.length, 1);
  assert.equal(
    kebabItems.length + snackItems.length + wholesaleItems.length + eventItems.length,
    MENU_VARIANTS.length
  );
});

test('splitWordsForReveal normalizes whitespace into non-empty word tokens', () => {
  assert.deepEqual(splitWordsForReveal('  Gigit   hangatnya. '), ['Gigit', 'hangatnya.']);
  assert.deepEqual(splitWordsForReveal('   '), []);
});

test('getStaggerDelayMs caps stagger delay cleanly and handles edge values', () => {
  assert.equal(getStaggerDelayMs(0, 40, 50, 300), 40);
  assert.equal(getStaggerDelayMs(3, 40, 50, 300), 190);
  assert.equal(getStaggerDelayMs(20, 40, 50, 300), 300);
  assert.equal(getStaggerDelayMs(-2, 40, 50, 300), 40);
});

test('getNextRotatingIndex cycles cleanly across rotating text phrases', () => {
  assert.equal(getNextRotatingIndex(0, 4), 1);
  assert.equal(getNextRotatingIndex(3, 4), 0);
  assert.equal(getNextRotatingIndex(0, 1), 0);
  assert.equal(getNextRotatingIndex(0, 0), 0);
});
