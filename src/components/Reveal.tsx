import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant = 'fade-up' | 'scale-in' | 'slide-left' | 'slide-right';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
  as?: 'div' | 'section' | 'article';
  immediate?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delayMs = 0,
  className = '',
  as = 'div',
  immediate = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (immediate) return true;
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
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible]);

  const Component = as;

  return (
    <Component
      ref={ref as React.RefObject<never>}
      data-reveal={variant}
      data-visible={isVisible ? 'true' : 'false'}
      className={`reveal-block reveal-${variant} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delayMs > 0 ? ({ '--reveal-delay': `${delayMs}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Component>
  );
};
