export type ShowcaseMedia =
  | {
      id: string;
      type: 'image';
      src: string;
      alt: string;
      fit?: 'cover' | 'contain';
      poster?: never;
    }
  | {
      id: string;
      type: 'video';
      src: string;
      alt: string;
      poster?: string;
      fit?: 'cover' | 'contain';
    };

/**
 * Media-only carousel directly below the main hero.
 *
 * Add approved product photos/videos under public/assets/showcase and register
 * each file here. Do not add captions, promotional copy, prices, or CTAs.
 */
export const SHOWCASE_MEDIA: ShowcaseMedia[] = [
  {
    id: 'alfirdaus-packaging',
    type: 'image',
    src: '/assets/aistudio/visual_identitas_Kebab_Al_Firdaus_a36c5ca9.jpg',
    alt: 'Visual kemasan Kebab Al Firdaus',
    fit: 'contain',
  },
];
