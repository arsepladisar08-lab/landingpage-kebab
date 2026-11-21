import { MenuVariant } from '../types';

export type CategoryTabId = 'kebab' | 'snack' | 'wholesale' | 'event';

export const DEFAULT_CATEGORY_TAB: CategoryTabId = 'kebab';

export const MENU_CATEGORY_IDS: readonly CategoryTabId[] = [
  'kebab',
  'snack',
  'wholesale',
  'event',
] as const;

export function matchesMenuCategory(item: MenuVariant, tab: CategoryTabId): boolean {
  return item.category === tab;
}

export function splitWordsForReveal(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function getStaggerDelayMs(
  index: number,
  baseDelayMs = 0,
  stepMs = 55,
  maxDelayMs = 420
): number {
  const safeIndex = Math.max(0, Math.floor(index));
  const raw = Math.max(0, baseDelayMs) + safeIndex * Math.max(0, stepMs);
  return Math.min(raw, Math.max(baseDelayMs, maxDelayMs));
}

export function getNextRotatingIndex(current: number, total: number): number {
  if (total <= 1) return 0;
  const normalized = ((Math.floor(current) % total) + total) % total;
  return (normalized + 1) % total;
}
