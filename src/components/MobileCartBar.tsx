import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../data/content';

interface MobileCartBarProps {
  isCartOpen: boolean;
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({ isCartOpen, onOpenCart }) => {
  const { totalItemCount, allPricesVerified, verifiedTotalPrice } = useCart();

  if (totalItemCount === 0 || isCartOpen) {
    return null;
  }

  return (
    <aside
      data-testid="mobile-cart-bar"
      aria-label="Ringkasan keranjang pesanan"
      className="mobile-cart-bar md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#f5d328] border-t-2 border-[#2b1810] shadow-[0_-6px_20px_rgba(43,24,16,0.2)]"
    >
      <div className="px-3.5 pt-2.5 flex items-center justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#a91d22] text-[#f5d328] border border-[#2b1810] text-[11px] font-black tabular-nums shrink-0">
              {totalItemCount}
            </span>
            <span className="text-xs font-black text-[#2b1810] whitespace-nowrap">
              {totalItemCount} item
            </span>
            {allPricesVerified && verifiedTotalPrice !== null && (
              <span className="text-xs font-black text-[#8a1418] tabular-nums truncate">
                · {formatRupiah(verifiedTotalPrice)}
              </span>
            )}
          </div>
          {!(allPricesVerified && verifiedTotalPrice !== null) && (
            <p className="text-[11px] font-bold text-[#4f3327] leading-snug mt-0.5 mb-0">
              Harga dikonfirmasi admin via WhatsApp
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#a91d22] hover:bg-[#7d1216] text-[#fffdf4] border-2 border-[#2b1810] text-xs font-black shadow-[3px_3px_0_#2b1810] active:translate-y-0.5 transition-all shrink-0"
          aria-label={`Buka keranjang pesanan, ${totalItemCount} item`}
        >
          <ShoppingBag className="w-4 h-4 text-[#f5d328] shrink-0" aria-hidden="true" />
          <span>Keranjang</span>
        </button>
      </div>
    </aside>
  );
};
