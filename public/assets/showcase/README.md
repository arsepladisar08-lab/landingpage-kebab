# Visual Showcase Media

The Visual Showcase carousel is rendered directly below the main hero.

Add approved Al Firdaus product photos and videos to this folder, then register each file in `src/data/showcase.ts`.

Example image:

```ts
{
  id: 'kebab-original',
  type: 'image',
  src: '/assets/showcase/kebab-original.webp',
  alt: 'Kebab Original Al Firdaus',
  fit: 'cover',
}
```

Example video:

```ts
{
  id: 'grill-process',
  type: 'video',
  src: '/assets/showcase/grill-process.mp4',
  poster: '/assets/showcase/grill-process-poster.webp',
  alt: 'Proses memanggang kebab Al Firdaus',
  fit: 'cover',
}
```

Guidelines:
- Use only media approved by the business owner and representative of the actual products.
- Prefer landscape media around 16:9. A 3:2 image also works.
- Keep videos short, muted, and compressed for mobile delivery.
- Do not add headings, captions, badges, prices, promotional copy, or CTA content to the carousel.
- The carousel supports touch swipe, mouse drag, arrow navigation, pagination, and optional autoplay.
- Autoplay is disabled for visitors who request reduced motion and pauses while the carousel is hovered or focused.
