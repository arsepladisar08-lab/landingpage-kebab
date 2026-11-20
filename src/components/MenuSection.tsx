import React, { useState, useRef, useEffect } from 'react';
import { Eye, Flame, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { MENU_VARIANTS, formatRupiah } from '../data/content';
import { resolveProductAsset } from '../data/productAssets';
import { useCart } from '../context/CartContext';
import { getVerifiedPrice, isCartEligibleVariant } from '../utils/cart';
import { MenuVariant, ServiceInquiryMode } from '../types';
import { ProductImage } from './ProductImage';
import {
  AllMenuIcon,
  KebabIcon,
  RotiMaryamIcon,
  MeatIngredientIcon,
  EventCateringIcon,
} from './CategoryIcons';

interface MenuSectionProps {
  onPreviewMenu: (item: MenuVariant) => void;
  onOpenServiceInquiry: (mode: ServiceInquiryMode, productName?: string) => void;
}

type CategoryTabId = 'all' | 'kebab' | 'snack' | 'wholesale' | 'event';

function matchesCategory(item: MenuVariant, tab: CategoryTabId): boolean {
  if (tab === 'all') return true;
  if (tab === 'kebab') return item.category === 'kebab';
  if (tab === 'snack') return item.category === 'snack';
  if (tab === 'wholesale') return item.category === 'wholesale';
  if (tab === 'event') return item.category === 'event';
  return true;
}

const FILTER_TABS: Array<{
  id: CategoryTabId;
  label: string;
  count: number;
  Icon: React.FC<{ className?: string }>;
}> = [
  {
    id: 'all',
    label: 'Semua',
    count: MENU_VARIANTS.length,
    Icon: AllMenuIcon,
  },
  {
    id: 'kebab',
    label: 'Kebab',
    count: MENU_VARIANTS.filter((i) => matchesCategory(i, 'kebab')).length,
    Icon: KebabIcon,
  },
  {
    id: 'snack',
    label: 'Roti Maryam',
    count: MENU_VARIANTS.filter((i) => matchesCategory(i, 'snack')).length,
    Icon: RotiMaryamIcon,
  },
  {
    id: 'wholesale',
    label: 'Daging & Bahan',
    count: MENU_VARIANTS.filter((i) => matchesCategory(i, 'wholesale')).length,
    Icon: MeatIngredientIcon,
  },
  {
    id: 'event',
    label: 'Acara',
    count: MENU_VARIANTS.filter((i) => matchesCategory(i, 'event')).length,
    Icon: EventCateringIcon,
  },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onPreviewMenu,
  onOpenServiceInquiry,
}) => {
  const { addItem, cartQuantities } = useCart();
  const [activeTab, setActiveTab] = useState<CategoryTabId>('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [lastAddedNotice, setLastAddedNotice] = useState<string>('');
  const timersRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      Object.values(timers).forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  const filteredItems = MENU_VARIANTS.filter((item) => matchesCategory(item, activeTab));

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
            Pilih varian
            <br />
            <em>kebabmu hari ini.</em>
          </h2>
        </div>
        <p>
          Tersedia kebab panggang siap santap dan roti maryam hangat yang bisa masuk keranjang, serta jalur konsultasi terpisah untuk bahan grosir dan pesanan acara.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-1.5 no-scrollbar">
          <div
            className="inline-flex p-1.5 bg-[#f5d328]/45 rounded-2xl border-2 border-[#2b1810] gap-1.5"
            role="group"
            aria-label="Filter kategori menu"
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
                  className={`inline-flex items-center gap-2 min-h-[44px] px-3.5 sm:px-4 py-2 text-xs font-extrabold rounded-xl whitespace-nowrap shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#a91d22] text-[#fffdf4] shadow-[2px_2px_0_#2b1810]'
                      : 'text-[#2b1810] hover:bg-[#fffdf4]'
                  }`}
                >
                  <TabIcon
                    className={`w-[18px] h-[18px] shrink-0 transition-transform duration-200 ${
                      isActive ? 'text-[#f5d328] scale-105' : 'text-[#8a1418]'
                    }`}
                  />
                  <span>{tab.label}</span>
                  <span
                    className={`tabular-nums text-[11px] font-black ${
                      isActive ? 'text-[#f5d328]/90' : 'text-[#6e4b3c]'
                    }`}
                  >
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="status"
          aria-live="polite"
          className="min-h-[24px] text-xs font-bold text-[#196b3e] flex items-center gap-1.5"
        >
          {lastAddedNotice && (
            <>
              <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{lastAddedNotice}</span>
            </>
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
            onClick={() => setActiveTab('all')}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#a91d22] text-[#fffdf4] text-xs font-extrabold border-2 border-[#2b1810]"
          >
            Tampilkan semua menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isAdded = Boolean(addedItems[item.id]);
            const inCartQty = cartQuantities[item.id] || 0;
            const cartEligible = isCartEligibleVariant(item);
            const verifiedPrice = getVerifiedPrice(item);
            const asset =
              item.image || resolveProductAsset(item.id, item.imageDummyAlt, item.type);

            return (
              <article
                key={item.id}
                className="group flex flex-col bg-[#fffdf4] rounded-2xl border-2 border-[#2b1810] shadow-[4px_4px_0_rgba(43,24,16,0.14)] hover:shadow-[6px_6px_0_#a91d22] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  className="relative block w-full text-left aspect-[4/3] bg-[#fdf4c7] overflow-hidden border-b-2 border-[#2b1810] p-0"
                  onClick={() => onPreviewMenu(item)}
                  aria-label={`Buka detail ${item.name}`}
                >
                  <ProductImage
                    asset={asset}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                    showPlaceholderTag={true}
                  />

                  <div className="absolute inset-0 bg-[#2b1810]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fffdf4] text-[#2b1810] border-2 border-[#2b1810] text-xs font-extrabold">
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
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#196b3e]">
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
                          className={`flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-black transition-all active:translate-y-0.5 border-2 border-[#2b1810] whitespace-nowrap ${
                            isAdded
                              ? 'bg-[#196b3e] text-[#ffffff]'
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
                          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black transition-all active:translate-y-0.5 border-2 border-[#2b1810] bg-[#fffdf4] text-[#8a1418] hover:bg-[#a91d22] hover:text-[#fffdf4] whitespace-nowrap"
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

      <div className="menu-snack-banner mt-12">
        <div className="snack-banner-left">
          <span className="eyebrow">Lengkapi Pesananmu</span>
          <h3>Roti Maryam Hangat &amp; Pasokan Grosir</h3>
          <p>
            Tambahkan kudapan roti maryam gurih/manis ke keranjang, atau gunakan jalur konsultasi khusus untuk bahan baku grosir dan pesanan acara.
          </p>
        </div>
        <div className="snack-banner-actions">
          <button
            type="button"
            className="button button-lime"
            onClick={() => {
              const maryam = MENU_VARIANTS.find((m) => m.id === 'maryam');
              if (maryam) {
                triggerAddToCart(maryam);
              }
            }}
          >
            Tambah Roti Maryam
          </button>
          <button
            type="button"
            className="button button-dark"
            onClick={() => onOpenServiceInquiry('wholesale', 'Bahan Baku Kebab Grosir')}
          >
            Konsultasi Bahan Grosir
          </button>
        </div>
      </div>
    </section>
  );
};
