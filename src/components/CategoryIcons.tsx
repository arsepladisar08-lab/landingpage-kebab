import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * Dominant culinary vector icons tailored for large 80%-scale category tiles.
 * Uses dual-tone currentColor fills + crisp strokes so each silhouette reads
 * cleanly on both active crimson and inactive warm-cream surfaces.
 */

/** Rolled kebab / shawarma wrap icon for "Kebab" tab */
export const KebabIcon: React.FC<IconProps> = ({ className = 'w-14 h-14' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Soft dual-tone wrap body fill */}
    <path
      d="M11 29.5 28.5 12c3.2-3.2 8.4-3.2 11.6 0 3.2 3.2 3.2 8.4 0 11.6L22.6 41.1c-2.2 2.2-5.8 2.2-8 0l-3.6-3.6c-2.2-2.2-2.2-5.8 0-8Z"
      fill="currentColor"
      fillOpacity="0.14"
    />
    {/* Crisp wrap tortilla collar fold */}
    <path d="M24.2 16.2c3.3 2.3 6.2 5.2 8.5 8.5" />
    {/* Lower parchment paper cuff */}
    <path
      d="M14.6 25.9 22.8 34.1 19 37.9c-1.8 1.8-4.7 1.8-6.5 0l-1.7-1.7c-1.8-1.8-1.8-4.7 0-6.5l3.8-3.8Z"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="none"
    />
    <path d="M15.8 24.7 24 32.9" />
    {/* Toasted grill marks */}
    <path d="M21 20.8l4.4 4.4" />
    <path d="M25.5 16.3l3.6 3.6" />
    {/* Leafy greens & filling peeking from top opening */}
    <path d="M29.5 10.6c1-2.4 3.5-3.9 6.1-3.2 1.1.3 2 1 2.6 1.9" />
    <path d="M38.2 18.8c2.2-1 3.5-3.4 2.8-5.9-.3-1-1-1.9-1.9-2.5" />
    {/* Aroma steam wisp */}
    <path d="M13 13c0-1.8 1.4-2.4 1.4-4.2" strokeWidth="2" />
    <path d="M18.5 10.5c0-1.6 1.3-2.2 1.3-3.8" strokeWidth="2" />
  </svg>
);

/** Circular flaky layered flatbread icon for "Roti Maryam" tab */
export const RotiMaryamIcon: React.FC<IconProps> = ({ className = 'w-14 h-14' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Warm layered disc */}
    <circle cx="24" cy="25" r="16.5" fill="currentColor" fillOpacity="0.14" />
    {/* Inner toasted ring */}
    <circle cx="24" cy="25" r="12.2" strokeDasharray="5 3.5" strokeWidth="1.9" />
    {/* Signature Roti Maryam spiral flaky dough layers */}
    <path d="M24 15.2c5.4 0 9.8 4.4 9.8 9.8 0 4.6-3.7 8.4-8.4 8.4-3.9 0-7.1-3.2-7.1-7.1 0-3.2 2.6-5.8 5.8-5.8 2.4 0 4.4 2 4.4 4.4 0 1.8-1.4 3.2-3.2 3.2-1.3 0-2.3-1-2.3-2.3" />
    {/* Warm steam wisps above bread */}
    <path d="M18 6.5c0-1.4 1.2-2 1.2-3.3" strokeWidth="2" />
    <path d="M24 5.5c0-1.4 1.2-2 1.2-3.3" strokeWidth="2" />
    <path d="M30 6.5c0-1.4 1.2-2 1.2-3.3" strokeWidth="2" />
  </svg>
);

/** Marbled beef / meat cut icon for "Daging & Bahan" (wholesale) tab */
export const MeatIngredientIcon: React.FC<IconProps> = ({ className = 'w-14 h-14' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Thick steak/meat cut outer silhouette */}
    <path
      d="M39.5 18.2c2.4 5.2.9 11.8-4.1 16-5.4 4.5-14 6.5-21.3 4.2-5.1-1.6-8.4-5.9-7.4-10.7.9-4 4.4-5.8 7.7-7.4 3.5-1.7 5.3-5 8.5-7.7 5.2-4.3 13.8-2.9 16.6 5.6Z"
      fill="currentColor"
      fillOpacity="0.16"
    />
    {/* Outer fat rim accent */}
    <path d="M10.4 31.8c4.2 3.4 11.4 4.4 17.5 2.5 5.4-1.6 9.5-5.6 10.6-10.3" strokeWidth="1.9" />
    {/* Signature marbling bone eyelet */}
    <circle cx="29.5" cy="21.5" r="4.3" fill="currentColor" fillOpacity="0.22" />
    <circle cx="29.5" cy="21.5" r="1.6" fill="currentColor" stroke="none" />
    {/* Marbling veins */}
    <path d="M14.5 28.5c3.2.8 6.8.3 9.8-1.4" strokeWidth="2" />
    <path d="M18.2 23.2c1.8.2 3.5-.3 5-1.3" strokeWidth="1.9" />
  </svg>
);

/** Serving cloche / catering platter icon for "Acara" (event) tab */
export const EventCateringIcon: React.FC<IconProps> = ({ className = 'w-14 h-14' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Top handle knob */}
    <path d="M24 14v-3" />
    <circle cx="24" cy="9.5" r="2.2" fill="currentColor" fillOpacity="0.22" />
    {/* Cloche serving dome */}
    <path
      d="M8.5 33a15.5 15.5 0 0 1 31 0Z"
      fill="currentColor"
      fillOpacity="0.15"
    />
    {/* Specular dome sheen */}
    <path d="M15.2 25.5a10 10 0 0 1 6.8-6.4" strokeWidth="2.1" />
    {/* Platter base */}
    <path d="M5.5 33h37" strokeWidth="2.6" />
    <path d="M10.5 38h27" strokeWidth="2.4" />
    {/* Festive accent sparkles */}
    <path d="M12 13l1.2-2.2L14.4 13l-1.2 2.2Z" fill="currentColor" stroke="none" />
    <path d="M35 12l1-1.8 1 1.8-1 1.8Z" fill="currentColor" stroke="none" />
  </svg>
);
