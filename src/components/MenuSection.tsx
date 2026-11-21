import React, { useState, useRef, useEffect } from 'react';
import { Eye, Flame, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { MENU_VARIANTS, formatRupiah } from '../data/content';
import { resolveProductAsset } from '../data/productAssets';
import { useCart } from '../context/CartContext';
import { getVerifiedPrice, isCartEligibleVariant } from '../utils/cart';
import {
  CategoryTabId,
  DEFAULT_CATEGORY_TAB,
  getStaggerDelayMs,
  matchesMenuCategory,
} from '../utils/motion';
import { MenuVariant, ServiceInquiryMode } from '../types';
import { ProductImage } from './ProductImage';
import { AnimatedWords, AnimatedAccentWord } from './AnimatedText';
import {
  KebabIcon,
  RotiMaryamIcon,
  MeatIngredientIcon,
  EventCateringIcon,
} from './CategoryIcons';

interface MenuSectionProps {
  onPreviewMenu: (item: MenuVariant) => void;
  onOpenServiceInquiry: (mode: ServiceInquiryMode, productName?: string) => void;
}

const FILTER_TABS: Array<{
  id: CategoryTabId;
  label: string;
  count: number;
  Icon: React.FC<{ className?: string }>;
}> = [
  {
    id: 'kebab',
    label: 'Kebab',
    count: MENU_VARIANTS.filter((i) => matchesMenuCategory(i, 'kebab')).length,
    Icon: KebabIcon,
  },
  {
    id: 'snack',
    label: 'Roti Maryam',
    count: MENU_VARIANTS.filter((i) => matchesMenuCategory(i, 'snack')).length,
    Icon: RotiMaryamIcon,
  },
  {
    id: 'wholesale',
    label: 'Daging & Bahan',
    count: MENU_VARIANTS.filter((i) => matchesMenuCategory(i, 'wholesale')).length,
    Icon: MeatIngredientIcon,
  },
  {
    id: 'event',
    label: 'Acara',
    count: MENU_VARIANTS.filter((i) => matchesMenuCategory(i, 'event')).length,
    Icon: EventCateringIcon,
  },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onPreviewMenu,
  onOpenServiceInquiry,
}) => {
  const { addItem, cartQuantities } = useCart();
  const [activeTab, setActiveTab] = useState<CategoryTabId>(DEFAULT_CATEGORY_TAB);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [lastAddedNotice, setLastAddedNotice] = useState<string>('');
  const timersRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      Object.values(timers).forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  const filteredItems = MENU_VARIANTS.filter((item) => matchesMenuCategory(item, activeTab));

  const triggerAddToCart = (item: MenuVariant) => {
    const added = addItem(item);
    if (!added) return;

    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setLastAddedNotice(`${item.name} ditambahkan ke keranjang.`);

    if (timersRef.current[item.id]) {
      window.clearTimeout(timersRef.current[item.id]);
    }
    timersRef.current[item.id] = window.setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1600);
  };

  return (
    <section
      className="menu-variants-section section-pad"
      id="menu-varian"
      aria-labelledby="menu-varian-title"
    >
      <div className="section-heading">
        <div>
          <div className="section-kicker">02 / Pilihan Menu &amp; Kudapan</div>
          <h2 id="menu-varian-title">
            <AnimatedWords text="Pilih varian" baseDelayMs={0} stepMs={60} />
            <br />
            <AnimatedAccentWord delayMs={180}>kebabmu hari ini.</AnimatedAccentWord>
          </h2>
        </div>
      </div>

      {/* Dominant-Icon Category Selector (~80% icon focus, title centered underneath) */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-9">
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 w-full max-w-[920px]"
          role="group"
          aria-label="Filter kategori menu"
          data-testid="category-icon-tabs"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.Icon;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex flex-col items-center justify-between min-h-[154px] sm:min-h-[178px] p-2.5 sm:p-3 rounded-2xl border-2 border-[#2b1810] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-0.5 active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#a91d22] text-[#fffdf4] shadow-[5px_5px_0_#2b1810] -translate-y-1'
                    : 'bg-[#fdf5d2] text-[#2b1810] hover:bg-[#fffdf4] hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(43,24,16,0.22)]'
                }`}
              >
                <span
                  className={`absolute top-2 right-2 z-10 tabular-nums text-[10px] font-black leading-none px-1.5 py-0.5 rounded-md border ${
                    isActive
                      ? 'bg-[#2b1810] text-[#f5d328] border-[#f5d328]/40'
                      : 'bg-[#fffdf4] text-[#8a1418] border-[#2b1810]/25'
                  }`}
                >
                  {tab.count}
                </span>

                <span
                  className={`flex-1 w-full flex items-center justify-center rounded-xl transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#7d1216]/65 text-[#f5d328]'
                      : 'bg-[#f5d328]/40 text-[#8a1418] group-hover:bg-[#f5d328]/60'
                  }`}
                >
                  <TabIcon
                    key={isActive ? `${tab.id}-active` : tab.id}
                    className={`w-[82px] h-[82px] sm:w-[100px] sm:h-[100px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'category-tile-icon-active scale-105'
                        : 'group-hover:scale-110 group-hover:-rotate-3'
                    }`}
                  />
                </span>

                <span className="w-full pt-2 pb-0.5 text-center text-[13px] sm:text-[14px] font-black tracking-tight leading-none whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="status"
          aria-live="polite"
          className="min-h-[24px] text-xs font-bold text-[#196b3e] flex items-center gap-1.5"
        >
          {lastAddedNotice && (
            <span className="inline-flex items-center gap-1.5 cart-badge-pop">
              <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{lastAddedNotice}</span>
            </span>
          )}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="bg-[#fffdf4] border-2 border-[#2b1810] rounded-2xl p-8 text-center space-y-3">
          <p className="text-sm font-bold text-[#2b1810] m-0">
            Belum ada menu pada kategori ini.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab(DEFAULT_CATEGORY_TAB)}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#a91d22] text-[#fffdf4] text-xs font-extrabold border-2 border-[#2b1810]"
          >
            Kembali ke kategori Kebab
          </button>
        </div>
      ) : (
        <div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {filteredItems.map((item, idx) => {
            const isAdded = Boolean(addedItems[item.id]);
            const inCartQty = cartQuantities[item.id] || 0;
            const cartEligible = isCartEligibleVariant(item);
            const verifiedPrice = getVerifiedPrice(item);
            const asset =
              item.image || resolveProductAsset(item.id, item.imageDummyAlt, item.type);

            return (
              <article
                key={item.id}
                style={
                  {
                    '--card-delay': `${getStaggerDelayMs(idx, 20, 55, 240)}ms`,
                  } as React.CSSProperties
                }
                className="menu-card-enter group flex flex-col bg-[#fffdf4] rounded-2xl border-2 border-[#2b1810] shadow-[4px_4px_0_rgba(43,24,16,0.14)] hover:shadow-[7px_7px_0_#a91d22] hover:-translate-y-1 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
              >
                <button
                  type="button"
                  className="relative block w-full text-left aspect-[4/3] bg-[#fdf4c7] overflow-hidden border-b-2 border-[#2b1810] p-0"
                  onClick={() => onPreviewMenu(item)}
                  aria-label={`Buka detail ${item.name}`}
                >
                  <ProductImage
                    asset={asset}
                    className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    showPlaceholderTag={true}
                  />

                  <div className="absolute inset-0 bg-[#2b1810]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fffdf4] text-[#2b1810] border-2 border-[#2b1810] text-xs font-extrabold translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                      <Eye className="w-3.5 h-3.5 text-[#a91d22]" aria-hidden="true" />
                      Lihat Detail
                    </span>
                  </div>
                </button>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-bold text-[#6e4b3c]">
                      <span className="text-[#8a1418] font-extrabold">{item.tag}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.badge}</span>
                      {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 text-[#8a1418] font-extrabold">
                            <Flame className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                            <span>Pedas Lv. {item.spiceLevel}</span>
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-black text-[#2b1810] leading-snug group-hover:text-[#a91d22] transition-colors m-0">
                        {item.name}
                      </h3>
                      {verifiedPrice !== undefined ? (
                        <span className="text-base font-black text-[#8a1418] tabular-nums whitespace-nowrap shrink-0">
                          {item.priceDisplay || formatRupiah(verifiedPrice)}
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-[#6e4b3c] whitespace-nowrap shrink-0">
                          Harga via WA
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[#4f3327] line-clamp-2 leading-relaxed m-0">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-[#2b1810]/15">
                    {cartEligible && inCartQty > 0 && (
                      <div
                        key={inCartQty}
                        className="flex items-center gap-1.5 text-xs font-extrabold text-[#196b3e] cart-badge-pop"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{inCartQty} porsi di keranjang</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onPreviewMenu(item)}
                        className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-extrabold text-[#2b1810] bg-[#fdf4c7] hover:bg-[#f5d328] border border-[#2b1810]/45 active:translate-y-0.5 transition-all inline-flex items-center justify-center gap-1.5 shrink-0"
                        aria-label={`Lihat detail ${item.name}`}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8a1418]" aria-hidden="true" />
                        <span>Detail</span>
                      </button>

                      {cartEligible ? (
                        <button
                          type="button"
                          onClick={() => triggerAddToCart(item)}
                          className={`flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-black transition-all duration-200 active:scale-[0.97] border-2 border-[#2b1810] whitespace-nowrap ${
                            isAdded
                              ? 'bg-[#196b3e] text-[#ffffff] cart-badge-pop'
                              : 'bg-[#f5d328] text-[#2b1810] hover:bg-[#a91d22] hover:text-[#fffdf4]'
                          }`}
                          aria-label={`Tambah ${item.name} ke keranjang`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                              <span>Ditambahkan</span>
                            </>
                          ) : (
                            <span>+ Keranjang</span>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenServiceInquiry(
                              item.category === 'event' ? 'event' : 'wholesale',
                              item.name
                            )
                          }
                          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black transition-all duration-200 active:scale-[0.97] border-2 border-[#2b1810] bg-[#fffdf4] text-[#8a1418] hover:bg-[#a91d22] hover:text-[#fffdf4] whitespace-nowrap"
                          aria-label={`Konsultasi ${item.name}`}
                        >
                          <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>
                            {item.category === 'event' ? 'Konsultasi Acara' : 'Konsultasi Grosir'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
};
