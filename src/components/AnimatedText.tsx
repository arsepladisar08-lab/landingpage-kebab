import React, { useEffect, useRef, useState } from 'react';
import { getNextRotatingIndex, getStaggerDelayMs, splitWordsForReveal } from '../utils/motion';

interface AnimatedWordsProps {
  text: string;
  baseDelayMs?: number;
  stepMs?: number;
  className?: string;
  interactiveHover?: boolean;
  immediate?: boolean;
}

/**
 * Splits a headline phrase into masked word spans that slide up smoothly
 * when entering the viewport, with optional subtle hover micro-lift per word.
 */
export const AnimatedWords: React.FC<AnimatedWordsProps> = ({
  text,
  baseDelayMs = 0,
  stepMs = 60,
  className = '',
  interactiveHover = true,
  immediate = false,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (immediate) return true;
    if (typeof window === 'undefined') return true;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true;
    if (typeof IntersectionObserver === 'undefined') return true;
    return false;
  });

  useEffect(() => {
    if (isVisible) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  const words = splitWordsForReveal(text);

  return (
    <span
      ref={containerRef}
      className={`animated-words ${isVisible ? 'is-visible' : ''} ${className}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <span className="animated-word-mask" aria-hidden="true">
            <span
              className={`animated-word-inner ${interactiveHover ? 'animated-word-hover' : ''}`}
              style={
                {
                  '--word-delay': `${getStaggerDelayMs(index, baseDelayMs, stepMs, 480)}ms`,
                } as React.CSSProperties
              }
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
};

interface AnimatedAccentWordProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

/**
 * Editorial italic emphasis with an animated drawn brush underline
 * and interactive hover lift micro-interaction.
 */
export const AnimatedAccentWord: React.FC<AnimatedAccentWordProps> = ({
  children,
  delayMs = 220,
  className = '',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true;
    if (typeof IntersectionObserver === 'undefined') return true;
    return false;
  });

  useEffect(() => {
    if (isVisible) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  const words = typeof children === 'string' ? splitWordsForReveal(children) : null;

  return (
    <em
      ref={ref}
      className={`animated-accent-phrase ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {words ? (
        words.map((word, index) => (
          <React.Fragment key={`${word}-${index}`}>
            <span
              className="animated-accent-word"
              style={{ '--accent-delay': `${delayMs + index * 90}ms` } as React.CSSProperties}
            >
              <span className="animated-accent-text">{word}</span>
              <span className="animated-accent-underline" aria-hidden="true" />
            </span>
            {index < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))
      ) : (
        <span
          className="animated-accent-word"
          style={{ '--accent-delay': `${delayMs}ms` } as React.CSSProperties}
        >
          <span className="animated-accent-text">{children}</span>
          <span className="animated-accent-underline" aria-hidden="true" />
        </span>
      )}
    </em>
  );
};

interface RotatingTextProps {
  phrases: readonly string[];
  intervalMs?: number;
  className?: string;
}

/**
 * Smooth vertical slot-roller text effect that cycles through phrases
 * with pause-on-hover and full prefers-reduced-motion compliance.
 */
export const RotatingText: React.FC<RotatingTextProps> = ({
  phrases,
  intervalMs = 2800,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (phrases.length <= 1 || isPaused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => getNextRotatingIndex(prev, phrases.length));
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [phrases.length, intervalMs, isPaused, reducedMotion]);

  if (phrases.length === 0) return null;

  return (
    <span
      data-testid="rotating-text"
      data-active-index={activeIndex}
      className={`rotating-text-shell ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <span className="rotating-text-sizer" aria-hidden="true">
        {phrases.reduce((longest, curr) => (curr.length > longest.length ? curr : longest), phrases[0])}
      </span>
      <span key={activeIndex} className="rotating-text-active" aria-live="off">
        {phrases[activeIndex]}
      </span>
    </span>
  );
};
