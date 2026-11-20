export const SWIPE_THRESHOLD_PX = 40;

export function getNextSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 1) return 0;
  return (currentIndex + 1) % totalSlides;
}

export function getPrevSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 1) return 0;
  return (currentIndex - 1 + totalSlides) % totalSlides;
}

export function evaluateSwipeDirection(
  deltaX: number,
  threshold: number = SWIPE_THRESHOLD_PX
): 'next' | 'prev' | null {
  if (Math.abs(deltaX) < threshold) return null;
  return deltaX < 0 ? 'next' : 'prev';
}

export function shouldShowCarouselControls(totalSlides: number): boolean {
  return totalSlides > 1;
}

export function shouldAutoplayCarousel(params: {
  totalSlides: number;
  isInteracting: boolean;
  prefersReducedMotion: boolean;
  isUserPaused: boolean;
}): boolean {
  if (params.totalSlides <= 1) return false;
  if (params.prefersReducedMotion) return false;
  if (params.isInteracting) return false;
  if (params.isUserPaused) return false;
  return true;
}
