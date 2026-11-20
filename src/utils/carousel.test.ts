import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextSlideIndex,
  getPrevSlideIndex,
  evaluateSwipeDirection,
  shouldShowCarouselControls,
  shouldAutoplayCarousel,
} from './carousel';

test('getNextSlideIndex wraps around cleanly for multiple slides and stays 0 for single slide', () => {
  assert.equal(getNextSlideIndex(0, 1), 0);
  assert.equal(getNextSlideIndex(0, 3), 1);
  assert.equal(getNextSlideIndex(2, 3), 0);
});

test('getPrevSlideIndex wraps around cleanly for multiple slides and stays 0 for single slide', () => {
  assert.equal(getPrevSlideIndex(0, 1), 0);
  assert.equal(getPrevSlideIndex(0, 3), 2);
  assert.equal(getPrevSlideIndex(2, 3), 1);
});

test('evaluateSwipeDirection respects minimum swipe threshold', () => {
  assert.equal(evaluateSwipeDirection(-15), null);
  assert.equal(evaluateSwipeDirection(25), null);
  assert.equal(evaluateSwipeDirection(-60), 'next');
  assert.equal(evaluateSwipeDirection(60), 'prev');
});

test('shouldShowCarouselControls hides navigation when 0 or 1 slide exists', () => {
  assert.equal(shouldShowCarouselControls(0), false);
  assert.equal(shouldShowCarouselControls(1), false);
  assert.equal(shouldShowCarouselControls(2), true);
  assert.equal(shouldShowCarouselControls(4), true);
});

test('shouldAutoplayCarousel disables autoplay on single slide, interaction, pause, or reduced motion', () => {
  assert.equal(
    shouldAutoplayCarousel({
      totalSlides: 1,
      isInteracting: false,
      prefersReducedMotion: false,
      isUserPaused: false,
    }),
    false
  );
  assert.equal(
    shouldAutoplayCarousel({
      totalSlides: 3,
      isInteracting: true,
      prefersReducedMotion: false,
      isUserPaused: false,
    }),
    false
  );
  assert.equal(
    shouldAutoplayCarousel({
      totalSlides: 3,
      isInteracting: false,
      prefersReducedMotion: true,
      isUserPaused: false,
    }),
    false
  );
  assert.equal(
    shouldAutoplayCarousel({
      totalSlides: 3,
      isInteracting: false,
      prefersReducedMotion: false,
      isUserPaused: true,
    }),
    false
  );
  assert.equal(
    shouldAutoplayCarousel({
      totalSlides: 3,
      isInteracting: false,
      prefersReducedMotion: false,
      isUserPaused: false,
    }),
    true
  );
});
