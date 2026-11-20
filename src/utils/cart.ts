import { CartItem, MenuVariant, PersistedCartEntry } from '../types';

export const CART_STORAGE_KEY = 'kebab-cart-v1';
export const MIN_CART_ITEM_QTY = 1;
export const MAX_CART_ITEM_QTY = 20;

export function isCartEligibleVariant(variant: MenuVariant): boolean {
  if (variant.category === 'wholesale' || variant.category === 'event') {
    return false;
  }
  if (variant.kind === 'wholesale' || variant.kind === 'event') {
    return false;
  }
  return true;
}

export function getVerifiedPrice(variant: MenuVariant): number | undefined {
  if (
    variant.priceVerified === true &&
    typeof variant.price === 'number' &&
    Number.isFinite(variant.price) &&
    variant.price > 0
  ) {
    return variant.price;
  }
  return undefined;
}

export function getDefaultOption(variant: MenuVariant): string {
  if (variant.validOptions && variant.validOptions.length > 0) {
    return variant.validOptions[0];
  }
  return variant.category === 'snack' ? 'Siap Santap' : 'Reguler';
}

export function resolveValidOption(variant: MenuVariant, requested?: unknown): string {
  const defaultOption = getDefaultOption(variant);
  if (typeof requested !== 'string') {
    return defaultOption;
  }
  const trimmed = requested.trim();
  if (!trimmed) {
    return defaultOption;
  }
  if (variant.validOptions && variant.validOptions.length > 0) {
    return variant.validOptions.includes(trimmed) ? trimmed : defaultOption;
  }
  return defaultOption;
}

export function makeCartItemId(menuId: string, option: string): string {
  return `${menuId}::${option}`;
}

export function clampCartQty(qty: number): number {
  return Math.min(MAX_CART_ITEM_QTY, Math.max(MIN_CART_ITEM_QTY, qty));
}

/**
 * Pure cart reconciler:
 * - Safely parses JSON string input (try/catch) without crashing.
 * - Rejects non-arrays, unknown menu IDs, non-cart-eligible (wholesale/event) IDs,
 *   and invalid/non-integer/<=0/NaN quantities.
 * - Clamps integer quantities to 1..20.
 * - Ignores unknown/foreign properties on valid item objects.
 * - Merges duplicate (menuId + valid option) entries and hydrates name/price from catalog.
 */
export function reconcileCart(raw: unknown, catalog: MenuVariant[]): CartItem[] {
  let parsed: unknown = raw;

  if (typeof raw === 'string') {
    if (!raw.trim()) return [];
    try {
      parsed = JSON.parse(raw);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  const catalogById = new Map<string, MenuVariant>();
  for (const variant of catalog) {
    if (isCartEligibleVariant(variant)) {
      catalogById.set(variant.id, variant);
    }
  }

  const mergedById = new Map<string, CartItem>();

  for (const entry of parsed) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      continue;
    }

    const record = entry as Record<string, unknown>;
    const rawMenuId = record.menuId;
    if (typeof rawMenuId !== 'string' || !rawMenuId.trim()) {
      continue;
    }

    const catalogItem = catalogById.get(rawMenuId);
    if (!catalogItem) {
      continue;
    }

    const rawQty = record.qty;
    if (
      typeof rawQty !== 'number' ||
      !Number.isFinite(rawQty) ||
      !Number.isInteger(rawQty) ||
      rawQty < MIN_CART_ITEM_QTY
    ) {
      continue;
    }

    const clampedQty = clampCartQty(rawQty);
    const validOption = resolveValidOption(catalogItem, record.option);
    const cartItemId = makeCartItemId(catalogItem.id, validOption);
    const verifiedPrice = getVerifiedPrice(catalogItem);

    const existing = mergedById.get(cartItemId);
    if (existing) {
      mergedById.set(cartItemId, {
        ...existing,
        qty: clampCartQty(existing.qty + clampedQty),
      });
    } else {
      mergedById.set(cartItemId, {
        id: cartItemId,
        menuId: catalogItem.id,
        name: catalogItem.name,
        tag: catalogItem.tag,
        type: catalogItem.type,
        option: validOption,
        qty: clampedQty,
        verifiedPrice,
        priceDisplay: verifiedPrice !== undefined ? catalogItem.priceDisplay : undefined,
      });
    }
  }

  return Array.from(mergedById.values());
}

export function serializeCart(items: CartItem[]): PersistedCartEntry[] {
  return items.map((item) => ({
    menuId: item.menuId,
    qty: clampCartQty(item.qty),
    option: item.option,
  }));
}

export interface CartSummary {
  totalItemCount: number;
  allPricesVerified: boolean;
  verifiedTotalPrice: number | null;
}

export function summarizeCart(items: CartItem[]): CartSummary {
  const totalItemCount = items.reduce((sum, item) => sum + item.qty, 0);
  if (items.length === 0) {
    return {
      totalItemCount: 0,
      allPricesVerified: false,
      verifiedTotalPrice: null,
    };
  }

  const allPricesVerified = items.every(
    (item) => typeof item.verifiedPrice === 'number' && Number.isFinite(item.verifiedPrice) && item.verifiedPrice > 0
  );

  if (!allPricesVerified) {
    return {
      totalItemCount,
      allPricesVerified: false,
      verifiedTotalPrice: null,
    };
  }

  const verifiedTotalPrice = items.reduce(
    (sum, item) => sum + (item.verifiedPrice as number) * item.qty,
    0
  );

  return {
    totalItemCount,
    allPricesVerified: true,
    verifiedTotalPrice,
  };
}
