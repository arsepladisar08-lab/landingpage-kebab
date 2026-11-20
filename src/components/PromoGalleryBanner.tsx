import React, { useState, useRef, useEffect } from 'react';
import {
  Flame,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Camera,
} from 'lucide-react';
import { PROMO_BANNER_ITEMS, formatRupiah, MENU_VARIANTS } from '../data/content';
import { PromoBannerItem } from '../types';

interface PromoGalleryBannerProps {
  onAddToCart?: (item: {
    menuId: string;
    name: string;
    tag: string;
    price: number;
    portionOption?: string;
  }) => void;
  onOpenCart?: () => void;
}

export const PromoGalleryBanner: React.FC<PromoGalleryBannerProps> = ({
  onAddToCart,
  onOpenCart,
}) => {
  // Respect prefers-reduced-motion so motion-sensitive users start with the banner paused.
  const [isPaused, setIsPaused] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isPressing, setIsPressing] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Triple the item list to loop scrollLeft cleanly without visible jumps.
  const displayItems = [...PROMO_BANNER_ITEMS, ...PROMO_BANNER_ITEMS, ...PROMO_BANNER_ITEMS];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.65;

    const step = () => {
      if (!isPaused && !isPressing && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        const singleSetWidth = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= singleSetWidth * 2) {
          scrollContainer.scrollLeft -= singleSetWidth;
        }
      }
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, isPressing]);

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    setIsPaused(true);
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCardAction = (item: PromoBannerItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.actionText === 'Lihat Menu') {
      document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (item.linkedProductName && onAddToCart) {
      const match = MENU_VARIANTS.find((v) => v.name === item.linkedProductName);
      onAddToCart({
        menuId: match?.id || item.id,
        name: item.title,
        tag: item.tag,
        price: item.price || match?.price || 15000,
        portionOption: item.badge,
      });
      if (onOpenCart) {
        onOpenCart();
      }
    } else {
      document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative bg-[#871418] text-[#fffdf4] py-8 border-b-4 border-[#f5d328] overflow-hidden select-none"
      aria-label="Banner Promosi dan Galeri Kebab Al Firdaus"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-black tracking-wider uppercase text-[#f5d328] flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#f5d328]" aria-hidden="true" />
            Promosi &amp; Galeri Sajian
          </span>
          <span className="text-xs text-[#fce8e8] hidden md:inline">
            · Klik atau tekan banner untuk berhenti
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleTogglePause}
            aria-pressed={isPaused}
            className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs font-extrabold transition-colors border-2 ${
              isPaused
                ? 'bg-[#f5d328] text-[#2b1810] border-[#2b1810]'
                : 'bg-[#2b1810] text-[#fffdf4] hover:bg-[#462619] border-[#f5d328]'
            }`}
            aria-label={isPaused ? 'Lanjutkan gerakan banner' : 'Jeda gerakan banner'}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                <span>Lanjutkan</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 fill-current text-[#f5d328]" aria-hidden="true" />
                <span>Jeda</span>
              </>
            )}
          </button>

          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleManualScroll('left')}
              className="w-11 h-11 rounded-xl bg-[#2b1810] hover:bg-[#f5d328] text-[#fffdf4] hover:text-[#2b1810] border-2 border-[#f5d328] flex items-center justify-center transition-colors"
              aria-label="Geser banner ke kiri"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleManualScroll('right')}
              className="w-11 h-11 rounded-xl bg-[#2b1810] hover:bg-[#f5d328] text-[#fffdf4] hover:text-[#2b1810] border-2 border-[#f5d328] flex items-center justify-center transition-colors"
              aria-label="Geser banner ke kanan"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-hidden py-2 px-4 sm:px-6 no-scrollbar scroll-smooth"
        onPointerDown={() => setIsPressing(true)}
        onPointerUp={() => setIsPressing(false)}
        onPointerCancel={() => setIsPressing(false)}
        onPointerLeave={() => setIsPressing(false)}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button, a')) return;
          setIsPaused((prev) => !prev);
        }}
      >
        {displayItems.map((item, index) => {
          const isPromo = item.type === 'promo';
          return (
            <article
              key={`${item.id}-${index}`}
              className={`flex-none w-[290px] sm:w-[350px] md:w-[380px] rounded-2xl p-5 border-2 transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between ${
                isPromo
                  ? 'bg-[#fffdf4] text-[#2b1810] border-[#2b1810] shadow-[4px_4px_0_#2b1810]'
                  : 'bg-[#2b1810] text-[#fffdf4] border-[#f5d328] shadow-[4px_4px_0_rgba(0,0,0,0.3)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black border ${
                    isPromo
                      ? 'bg-[#a91d22] text-[#fffdf4] border-[#2b1810]'
                      : 'bg-[#f5d328] text-[#2b1810] border-[#2b1810]'
                  }`}
                >
                  {isPromo ? (
                    <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  {item.tag}
                </span>

                {item.badge && (
                  <span
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md border ${
                      isPromo
                        ? 'text-[#8a1418] border-[#8a1418]/35 bg-[#fdf5d2]'
                        : 'text-[#f5d328] border-[#f5d328]/50 bg-[#3c2217]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="space-y-1.5 my-2">
                <h3
                  className={`text-base sm:text-lg font-black tracking-tight leading-snug ${
                    isPromo ? 'text-[#2b1810]' : 'text-[#fffdf4]'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed line-clamp-2 ${
                    isPromo ? 'text-[#543729]' : 'text-[#e6d5c3]'
                  }`}
                >
                  {item.subtitle}
                </p>
              </div>

              <div
                className={`mt-4 pt-3 border-t flex items-center justify-between gap-3 ${
                  isPromo ? 'border-[#2b1810]/15' : 'border-white/20'
                }`}
              >
                <div className="min-w-0">
                  {item.price && (
                    <div
                      className={`text-sm font-black ${
                        isPromo ? 'text-[#8a1418]' : 'text-[#f5d328]'
                      }`}
                    >
                      {formatRupiah(item.price)}
                    </div>
                  )}
                  {item.highlightText && (
                    <span
                      className={`text-xs font-bold block ${
                        isPromo ? 'text-[#196b3e]' : 'text-[#f5d328]'
                      }`}
                    >
                      {item.highlightText}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => handleCardAction(item, e)}
                  className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors active:translate-y-0.5 border-2 shrink-0 ${
                    isPromo
                      ? 'bg-[#f5d328] text-[#2b1810] border-[#2b1810] hover:bg-[#a91d22] hover:text-[#fffdf4]'
                      : 'bg-[#a91d22] text-[#fffdf4] border-[#f5d328] hover:bg-[#f5d328] hover:text-[#2b1810]'
                  }`}
                  aria-label={`${item.actionText} - ${item.title}`}
                >
                  {isPromo && <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{item.actionText || 'Pesan'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#fce8e8]">
        <span>
          Klik atau tahan pada kartu untuk menghentikan gerakan banner saat membaca.
        </span>
        <span aria-live="polite">
          Status: <strong className="text-[#f5d328]">{isPaused ? 'Dijeda' : 'Berjalan otomatis'}</strong>
        </span>
      </div>
    </section>
  );
};
