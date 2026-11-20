import React, { useState, useRef } from 'react';
import { X, Flame, CheckCircle2, ChefHat, ShoppingBag, Check } from 'lucide-react';
import { MenuVariant } from '../types';
import { DummyFoodVisual } from './DummyFoodVisual';
import { formatRupiah } from '../data/content';
import { useModalFocusTrap } from '../utils/useModalFocusTrap';

interface MenuDetailModalProps {
  item: MenuVariant | null;
  onClose: () => void;
  onAddToCart?: (item: MenuVariant) => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useModalFocusTrap(Boolean(item), onClose, dialogRef, closeBtnRef);

  if (!item) return null;

  const spiceMeter = () => {
    const level = item.spiceLevel ?? 1;
    if (level === 0) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#196b3e] bg-[#fffdf4] px-2.5 py-1 rounded-lg border border-[#196b3e]">
          Tidak Pedas · Ramah Anak
        </span>
      );
    }
    return (
      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2b1810] bg-[#f5d328]/70 px-2.5 py-1 rounded-lg border border-[#2b1810]/35">
        <span className="flex items-center text-[#8a1418]" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <Flame
              key={i}
              className={`w-3.5 h-3.5 ${
                i < level ? 'fill-[#8a1418] text-[#8a1418]' : 'text-[#2b1810]/30'
              }`}
            />
          ))}
        </span>
        <span>
          {level === 1 ? 'Pedas Sedang (Standar)' : level === 2 ? 'Pedas Nendang' : 'Ekstra Pedas Mantap'}
        </span>
      </div>
    );
  };

  return (
    <div
      className="modal-backdrop show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-detail-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="menu-detail-dialog max-w-xl w-[94%] bg-[#fffdf4] rounded-2xl border-2 border-[#2b1810] shadow-[8px_10px_0_#a91d22] overflow-hidden p-0 my-auto"
      >
        <div className="relative aspect-[16/9] w-full bg-[#fdf4c7] border-b-2 border-[#2b1810] overflow-hidden">
          <DummyFoodVisual
            type={item.type === 'custom' ? item.id : item.type}
            alt={item.imageDummyAlt || item.name}
            className="w-full h-full"
            showBadge={true}
          />

          <button
            ref={closeBtnRef}
            type="button"
            className="absolute top-3 right-3 w-11 h-11 rounded-xl bg-[#fffdf4] hover:bg-[#a91d22] text-[#2b1810] hover:text-[#fffdf4] flex items-center justify-center border-2 border-[#2b1810] transition-colors"
            onClick={onClose}
            aria-label="Tutup detail menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-black bg-[#a91d22] text-[#f5d328] border border-[#2b1810]">
              {item.badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold bg-[#fffdf4] text-[#2b1810] border border-[#2b1810]">
              {item.tag}
            </span>
          </div>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#8a1418] tracking-wide mb-1">
              <ChefHat className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Detail Menu Al Firdaus · Maknyus Banget</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 id="menu-detail-title" className="text-2xl font-black text-[#2b1810] tracking-tight m-0">
                {item.name}
              </h2>
              {item.price && (
                <span className="text-sm font-black text-[#2b1810] bg-[#f5d328] px-3 py-1 rounded-lg border-2 border-[#2b1810] self-start sm:self-auto">
                  {item.priceDisplay || formatRupiah(item.price)}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-[#543729] leading-relaxed mb-0">
              {item.description}
            </p>
          </div>

          <div className="bg-[#fdf4c7] rounded-xl p-3.5 border-2 border-[#2b1810]/25 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-extrabold text-[#2b1810] tracking-wide flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#8a1418]" aria-hidden="true" />
                Karakter Rasa
              </span>
              {spiceMeter()}
            </div>
            <p className="text-xs text-[#4f3327] font-medium leading-relaxed m-0">
              {item.flavorProfile || 'Racikan gurih khas Al Firdaus dengan bahan higienis dan porsi memuaskan.'}
            </p>
          </div>

          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#2b1810] mb-2">
                Komposisi &amp; Sajian Utama
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none p-0 m-0">
                {item.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-[#2b1810]/25 text-xs text-[#2b1810]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#196b3e] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-semibold">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.portionInfo && (
            <div className="text-xs text-[#543729] flex flex-wrap items-center gap-1.5 border-t border-dashed border-[#2b1810]/25 pt-3">
              <span className="font-extrabold text-[#8a1418]">Catatan porsi:</span>
              <span>{item.portionInfo}</span>
            </div>
          )}

          <div className="pt-2">
            {onAddToCart && (
              <button
                type="button"
                onClick={() => {
                  onAddToCart(item);
                  setJustAdded(true);
                  setTimeout(() => setJustAdded(false), 1800);
                }}
                className={`w-full min-h-[48px] inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-black text-sm tracking-wide transition-colors border-2 border-[#2b1810] shadow-[3px_3px_0_#2b1810] active:translate-y-0.5 ${
                  justAdded
                    ? 'bg-[#196b3e] text-white'
                    : 'bg-[#f5d328] text-[#2b1810] hover:bg-[#a91d22] hover:text-[#fffdf4]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Dimasukkan ke Keranjang</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                    <span>+ Masukkan ke Keranjang</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
