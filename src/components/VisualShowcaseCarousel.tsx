import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SHOWCASE_MEDIA } from '../data/showcase';

interface ShowcaseVideoProps {
  src: string;
  poster?: string;
  alt: string;
  fit?: 'cover' | 'contain';
  active: boolean;
  reducedMotion: boolean;
}

const ShowcaseVideo: React.FC<ShowcaseVideoProps> = ({
  src,
  poster,
  alt,
  fit = 'cover',
  active,
  reducedMotion,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active || reducedMotion) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise) {
      void playPromise.catch(() => {
        // Autoplay may be blocked by the browser. The media remains available as a poster.
      });
    }

    return () => video.pause();
  }, [active, reducedMotion, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      aria-label={alt}
      className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
      muted
      loop
      playsInline
      preload={active ? 'metadata' : 'none'}
    />
  );
};

export const VisualShowcaseCarousel: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number } | null>(null);
  const interactionTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const mediaCount = SHOWCASE_MEDIA.length;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(query.matches);
    query.addEventListener?.('change', updatePreference);
    return () => query.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => () => {
    if (interactionTimerRef.current !== null) {
      window.clearTimeout(interactionTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (mediaCount < 2 || prefersReducedMotion || isHovered || hasFocus || isInteracting) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % mediaCount);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [hasFocus, isHovered, isInteracting, mediaCount, prefersReducedMotion]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || mediaCount < 2) return;

    viewport.scrollTo({
      left: viewport.clientWidth * activeIndex,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [activeIndex, mediaCount, prefersReducedMotion]);

  if (mediaCount === 0) return null;

  const goToSlide = (index: number) => {
    setActiveIndex((index + mediaCount) % mediaCount);
  };

  const pauseAutoplayBriefly = () => {
    setIsInteracting(true);
    if (interactionTimerRef.current !== null) {
      window.clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = window.setTimeout(() => {
      setIsInteracting(false);
      interactionTimerRef.current = null;
    }, 3000);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    if (viewport.clientWidth === 0 || mediaCount < 2) return;

    const nextIndex = Math.round(viewport.scrollLeft / viewport.clientWidth);
    const boundedIndex = Math.min(mediaCount - 1, Math.max(0, nextIndex));
    setActiveIndex((current) => current === boundedIndex ? current : boundedIndex);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pauseAutoplayBriefly();

    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    if ((event.target as HTMLElement).closest('button')) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.currentTarget.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setIsDragging(false);
    pauseAutoplayBriefly();
  };

  return (
    <section
      className="visual-showcase relative w-full overflow-hidden bg-[#2b1810]"
      aria-label="Galeri visual Kebab Al Firdaus"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHasFocus(false);
        }
      }}
    >
      <div
        ref={viewportRef}
        className={`flex w-full overflow-x-auto snap-x snap-mandatory overscroll-x-contain no-scrollbar select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        style={{
          touchAction: 'pan-x pan-y',
          scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
        }}
      >
        {SHOWCASE_MEDIA.map((media, index) => (
          <div
            key={media.id}
            className="relative h-[54vw] min-h-[220px] max-h-[620px] w-full flex-none snap-start overflow-hidden bg-[#2b1810] sm:h-[42vw] lg:h-[38vw]"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} dari ${mediaCount}`}
          >
            {media.type === 'image' ? (
              <img
                src={media.src}
                alt={media.alt}
                className={`h-full w-full select-none ${media.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            ) : (
              <ShowcaseVideo
                src={media.src}
                poster={media.poster}
                alt={media.alt}
                fit={media.fit}
                active={index === activeIndex}
                reducedMotion={prefersReducedMotion}
              />
            )}
          </div>
        ))}
      </div>

      {mediaCount > 1 && (
        <>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6 sm:h-12 sm:w-12"
            aria-label="Media sebelumnya"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:h-12 sm:w-12"
            aria-label="Media berikutnya"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
            {SHOWCASE_MEDIA.map((media, index) => (
              <button
                key={media.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`pointer-events-auto h-2.5 rounded-full border border-white/80 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${activeIndex === index ? 'w-7 bg-white' : 'w-2.5 bg-black/30'}`}
                aria-label={`Tampilkan slide ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
