import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Camera,
} from 'lucide-react';
import { PROMO_BANNER_ITEMS, MENU_VARIANTS, getWhatsAppLink } from '../data/content';
import { PromoBannerItem } from '../types';

export const PromoGalleryBanner: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const displayItems = PROMO_BANNER_ITEMS.filter((item) => item.type === 'gallery');

  // Animate only when motion is allowed and the gallery is visible on screen.
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let isIntersecting = true;
    let isDocumentVisible = document.visibilityState === 'visible';
    const scrollSpeed = 0.45;

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    });
    observer.observe(scrollContainer);

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const step = () => {
      if (!isPaused && !isPressing && isIntersecting && isDocumentVisible && scrollContainer) {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (maxScroll > 0) {
          scrollContainer.scrollLeft =
            scrollContainer.scrollLeft >= maxScroll - 1
              ? 0
              : scrollContainer.scrollLeft + scrollSpeed;
        }
      }
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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

    if (item.type === 'promo') {
      const linkedVariant = MENU_VARIANTS.find((variant) => variant.name === item.linkedProductName);
      const inquiryTarget = linkedVariant?.name || item.title;
      const url = getWhatsAppLink(
        `Halo Kebab Al Firdaus, saya ingin bertanya tentang ${inquiryTarget}. Mohon info harga, ketentuan, dan ketersediaan terbaru.`
      );
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    document.getElementById('menu-varian')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative bg-[#1c1b18] text-[#f3efe5] py-8 border-y-2 border-[#d5f264]/40 overflow-hidden select-none"
      aria-label="Galeri menu Kebab Al Firdaus"
    >
      {/* Background Accent Subtle Glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#d5f264]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#ec6c3b]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Control Bar */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#d5f264] animate-ping" />
          <span className="text-xs font-black uppercase tracking-widest text-[#d5f264] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ec6c3b]" />
            GALERI MENU & KUDAPAN
          </span>
          <span className="text-[11px] text-[#9e998c] hidden md:inline">
            · Geser untuk melihat pilihan menu
          </span>
        </div>

        {/* Interactive Play/Pause & Direction Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTogglePause}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              isPaused
                ? 'bg-[#d5f264] text-[#1c1b18] border-[#d5f264] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
            }`}
            aria-label={isPaused ? 'Lanjutkan banner berjalan' : 'Jeda banner berjalan'}
            title="Klik untuk menjeda atau melanjutkan gerakan banner"
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Lanjutkan Gerak</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 fill-current text-[#d5f264]" />
                <span>Jeda Otomatis</span>
              </>
            )}
          </button>

          <div className="inline-flex rounded-full bg-white/10 p-0.5 border border-white/15">
            <button
              type="button"
              onClick={() => handleManualScroll('left')}
              className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              aria-label="Geser ke kiri"
              title="Geser ke kiri"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleManualScroll('right')}
              className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              aria-label="Geser ke kanan"
              title="Geser ke kanan"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-scrolling Track Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto py-2 px-4 sm:px-6 cursor-grab active:cursor-grabbing no-scrollbar scroll-smooth"
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => setIsPressing(false)}
        onMouseLeave={() => setIsPressing(false)}
        onTouchStart={() => setIsPressing(true)}
        onTouchEnd={() => setIsPressing(false)}
        title="Geser untuk melihat pilihan menu; gunakan tombol jeda untuk menghentikan gerak otomatis"
      >
        {displayItems.map((item) => (
          <article
              key={item.id}
              className="flex-none w-[310px] sm:w-[360px] md:w-[390px] rounded-2xl p-5 border border-white/15 bg-gradient-to-br from-[#26211e] via-[#1f1c19] to-[#171614] shadow-sm flex flex-col justify-between"
            >
              {/* Card Header: Tag & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#d5f264] text-[#1c1b18]"
                >
                  <Camera className="w-3 h-3" />
                  {item.tag}
                </span>

                {item.badge && (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d5f264] border border-[#d5f264]/40 px-2 py-0.5 rounded-md bg-[#d5f264]/10">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 my-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#b8b3a7] leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              {/* Highlight / Promo Price / Action Pill */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div>

                </div>

                <button
                  type="button"
                  onClick={(e) => handleCardAction(item, e)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all active:scale-95 shadow-xs bg-white/15 text-white hover:bg-white/25 border border-white/20"
                  aria-label={`Lihat menu terkait ${item.title}`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Lihat menu</span>
                </button>
              </div>
          </article>
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-3 flex items-center justify-between text-[11px] text-[#8e8a7f]">
        <span>
          💡 <em>Geser galeri untuk melihat pilihan lainnya. Gerakan otomatis dapat dijeda.</em>
        </span>
        <span className="hidden sm:inline">
          Status: <strong className="text-[#d5f264]">{isPaused ? 'Jeda (Diam)' : 'Berjalan'}</strong>
        </span>
      </div>
    </section>
  );
};
