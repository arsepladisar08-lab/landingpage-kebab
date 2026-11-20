import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ShowcaseMediaItem } from '../types';
import {
  getNextSlideIndex,
  getPrevSlideIndex,
  evaluateSwipeDirection,
  shouldShowCarouselControls,
  shouldAutoplayCarousel,
} from '../utils/carousel';

interface VisualShowcaseCarouselProps {
  items: ShowcaseMediaItem[];
  autoplayIntervalMs?: number;
}

export const VisualShowcaseCarousel: React.FC<VisualShowcaseCarouselProps> = ({
  items,
  autoplayIntervalMs = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [failedMediaIds, setFailedMediaIds] = useState<Record<string, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const dragStartXRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const validItems = useMemo(
    () => items.filter((item) => Boolean(item.src) && !failedMediaIds[item.id]),
    [items, failedMediaIds]
  );
  const totalSlides = validItems.length;
  const safeIndex = totalSlides > 0 ? activeIndex % totalSlides : 0;
  const showControls = shouldShowCarouselControls(totalSlides);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const pauseAutoplayTemporarily = useCallback(() => {
    setIsUserPaused(true);
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setIsUserPaused(false);
    }, autoplayIntervalMs * 2);
  }, [autoplayIntervalMs]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => getNextSlideIndex(prev, totalSlides));
    pauseAutoplayTemporarily();
  }, [totalSlides, pauseAutoplayTemporarily]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => getPrevSlideIndex(prev, totalSlides));
    pauseAutoplayTemporarily();
  }, [totalSlides, pauseAutoplayTemporarily]);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index);
      pauseAutoplayTemporarily();
    },
    [pauseAutoplayTemporarily]
  );

  useEffect(() => {
    const canAutoplay = shouldAutoplayCarousel({
      totalSlides,
      isInteracting,
      prefersReducedMotion,
      isUserPaused,
    });
    if (!canAutoplay) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => getNextSlideIndex(prev, totalSlides));
    }, autoplayIntervalMs);

    return () => window.clearInterval(timer);
  }, [totalSlides, isInteracting, prefersReducedMotion, isUserPaused, autoplayIntervalMs]);

  useEffect(() => {
    validItems.forEach((item, index) => {
      if (item.type !== 'video') return;
      const videoEl = videoRefs.current[item.id];
      if (!videoEl) return;

      if (index === safeIndex && !prefersReducedMotion) {
        videoEl.play().catch(() => {
          // Autoplay may be blocked by browser policy until user interacts.
        });
      } else {
        videoEl.pause();
      }
    });
  }, [safeIndex, validItems, prefersReducedMotion]);

  if (totalSlides === 0) {
    return null;
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!showControls) return;
    if ((e.target as HTMLElement).closest('button')) return;
    dragStartXRef.current = e.clientX;
    setIsInteracting(true);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!showControls || dragStartXRef.current === null) {
      setIsInteracting(false);
      return;
    }
    const deltaX = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;
    setIsInteracting(false);

    const swipe = evaluateSwipeDirection(deltaX);
    if (swipe === 'next') goNext();
    if (swipe === 'prev') goPrev();
  };

  const handlePointerCancel = () => {
    dragStartXRef.current = null;
    setIsInteracting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!showControls) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  return (
    <section
      id="galeri-visual"
      data-testid="visual-showcase-carousel"
      className="relative w-full bg-[#24130d] border-b-4 border-[#f5d328] overflow-hidden select-none"
      aria-roledescription="carousel"
      aria-label="Galeri visual Kebab Al Firdaus"
      tabIndex={showControls ? 0 : undefined}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={() => setIsInteracting(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`relative w-full overflow-hidden ${
          showControls ? 'touch-pan-y cursor-grab active:cursor-grabbing' : ''
        }`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none will-change-transform"
          style={{ transform: `translate3d(-${safeIndex * 100}%, 0, 0)` }}
        >
          {validItems.map((item, index) => {
            const isContain = item.fit === 'contain' || item.width / item.height < 1.25;
            const isActive = index === safeIndex;

            return (
              <div
                key={item.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} dari ${totalSlides}`}
                aria-hidden={!isActive}
                className="relative flex-none w-full h-[280px] sm:h-[360px] lg:h-[440px] bg-[#24130d] flex items-center justify-center overflow-hidden"
              >
                {item.type === 'video' ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[item.id] = el;
                    }}
                    src={item.src}
                    poster={item.poster}
                    width={item.width}
                    height={item.height}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={item.alt}
                    onError={() =>
                      setFailedMediaIds((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className={`w-full h-full ${
                      isContain ? 'object-contain' : 'object-cover'
                    }`}
                  />
                ) : isContain ? (
                  <>
                    <img
                      src={item.src}
                      alt=""
                      aria-hidden="true"
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-35 pointer-events-none"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#24130d]/85 via-[#24130d]/35 to-[#24130d]/85 pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="relative z-10 h-full py-5 sm:py-6 px-4 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedMediaIds((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="max-h-full max-w-full w-auto h-full object-contain rounded-2xl border-2 border-[#f5d328]/35 drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                      />
                    </div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedMediaIds((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className="w-full h-full object-cover block"
                  />
                )}
              </div>
            );
          })}
        </div>

        {showControls && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Slide sebelumnya"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2b1810]/85 hover:bg-[#a91d22] text-[#fffdf4] border-2 border-[#f5d328] flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Slide berikutnya"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2b1810]/85 hover:bg-[#a91d22] text-[#fffdf4] border-2 border-[#f5d328] flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>

            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#2b1810]/75 px-3 py-1.5 rounded-full"
              role="tablist"
              aria-label="Pilih slide"
            >
              {validItems.map((item, index) => {
                const isCurrent = index === safeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Tampilkan slide ${index + 1}`}
                    onClick={() => goToSlide(index)}
                    className="min-w-[28px] min-h-[28px] flex items-center justify-center p-1"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-200 ${
                        isCurrent ? 'w-7 bg-[#f5d328]' : 'w-2 bg-[#fffdf4]/60 hover:bg-[#fffdf4]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
