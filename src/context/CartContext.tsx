import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, MenuVariant } from '../types';
import { MENU_VARIANTS } from '../data/content';
import {
  CART_STORAGE_KEY,
  MAX_CART_ITEM_QTY,
  clampCartQty,
  getVerifiedPrice,
  isCartEligibleVariant,
  makeCartItemId,
  reconcileCart,
  resolveValidOption,
  serializeCart,
  summarizeCart,
} from '../utils/cart';

interface CartContextValue {
  items: CartItem[];
  totalItemCount: number;
  allPricesVerified: boolean;
  verifiedTotalPrice: number | null;
  cartQuantities: Record<string, number>;
  addItem: (variant: MenuVariant, option?: string) => boolean;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadInitialCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return reconcileCart(raw, MENU_VARIANTS);
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart);

  useEffect(() => {
    try {
      const minimal = serializeCart(items);
      if (minimal.length === 0) {
        window.localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimal));
      }
    } catch {
      // Storage may be blocked in private browsing or restricted iframes.
    }
  }, [items]);

  const addItem = useCallback((variant: MenuVariant, option?: string): boolean => {
    if (!isCartEligibleVariant(variant)) {
      return false;
    }

    const validOption = resolveValidOption(variant, option);
    const cartItemId = makeCartItemId(variant.id, validOption);
    const verifiedPrice = getVerifiedPrice(variant);

    setItems((prev) => {
      const idx = prev.findIndex((item) => item.id === cartItemId);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          name: variant.name,
          tag: variant.tag,
          verifiedPrice,
          priceDisplay: verifiedPrice !== undefined ? variant.priceDisplay : undefined,
          qty: clampCartQty(copy[idx].qty + 1),
        };
        return copy;
      }

      const nextItem: CartItem = {
        id: cartItemId,
        menuId: variant.id,
        name: variant.name,
        tag: variant.tag,
        type: variant.type,
        option: validOption,
        qty: 1,
        verifiedPrice,
        priceDisplay: verifiedPrice !== undefined ? variant.priceDisplay : undefined,
      };
      return [...prev, nextItem];
    });

    return true;
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    if (!Number.isInteger(delta) || delta === 0) return;

    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const nextQty = item.qty + delta;
          if (nextQty <= 0) return null;
          return {
            ...item,
            qty: Math.min(MAX_CART_ITEM_QTY, nextQty),
          };
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const summary = useMemo(() => summarizeCart(items), [items]);

  const cartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of items) {
      map[item.menuId] = (map[item.menuId] || 0) + item.qty;
    }
    return map;
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItemCount: summary.totalItemCount,
      allPricesVerified: summary.allPricesVerified,
      verifiedTotalPrice: summary.verifiedTotalPrice,
      cartQuantities,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, summary, cartQuantities, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
