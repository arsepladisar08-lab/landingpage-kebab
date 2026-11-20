import React from 'react';

interface IconProps {
  className?: string;
}

/** Full menu / platter grid icon for "Semua" tab */
export const AllMenuIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
  </svg>
);

/** Rolled kebab / shawarma wrap icon for "Kebab" tab */
export const KebabIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Diagonal rolled wrap body */}
    <path d="M5.2 14.3 13.8 5.7c1.6-1.6 4.2-1.6 5.8 0 1.6 1.6 1.6 4.2 0 5.8L11 20.1c-1.1 1.1-2.9 1.1-4 0l-1.8-1.8c-1.1-1.1-1.1-2.9 0-4Z" />
    {/* Tortilla wrap fold seam */}
    <path d="M12.3 7.2c1.6 1.2 3.1 2.7 4.3 4.3" />
    {/* Grill marks on toasted tortilla */}
    <path d="M9.6 12.2l2.2 2.2" />
    <path d="M7.6 14.2l2.2 2.2" />
    {/* Lettuce & filling peeking from top opening */}
    <path d="M15.6 4.5c.6-1 1.8-1.4 2.8-.9" />
    <path d="M19.5 8.4c1-.6 1.4-1.8.9-2.8" />
  </svg>
);

/** Circular flaky layered flatbread icon for "Roti Maryam" tab */
export const RotiMaryamIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Outer flatbread disc */}
    <circle cx="12" cy="12" r="9" />
    {/* Spiral layered dough fold */}
    <path d="M12 6.5c3 0 5.5 2.5 5.5 5.5 0 2.6-2.1 4.7-4.7 4.7-2.2 0-4-1.8-4-4 0-1.8 1.5-3.3 3.3-3.3 1.4 0 2.5 1.1 2.5 2.5 0 1-.8 1.8-1.8 1.8-.7 0-1.3-.6-1.3-1.3" />
  </svg>
);

/** Cut of beef / meat slice icon for "Daging & Bahan" (wholesale) tab */
export const MeatIngredientIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Marbled meat cut silhouette */}
    <path d="M19.4 9.2c1.1 2.5.4 5.7-2 7.7-2.6 2.2-6.8 3.2-10.3 2.1-2.5-.8-4.1-2.9-3.6-5.2.4-1.9 2.1-2.8 3.7-3.6 1.7-.8 2.6-2.4 4.1-3.7 2.5-2.1 6.7-1.4 8.1 2.7Z" />
    {/* Inner marbling / bone ring */}
    <circle cx="14.5" cy="11.2" r="2.1" />
    {/* Texture streak */}
    <path d="M7.5 15.2c1.6.4 3.4.2 5-.6" />
  </svg>
);

/** Serving cloche / catering platter icon for "Acara" (event) tab */
export const EventCateringIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Cloche top knob */}
    <path d="M12 6V4.5" />
    <circle cx="12" cy="4" r="0.8" fill="currentColor" />
    {/* Dome lid */}
    <path d="M4 17a8 8 0 0 1 16 0" />
    {/* Serving tray */}
    <path d="M2.5 17h19" />
    <path d="M5.5 20h13" />
    {/* Subtle dome sheen */}
    <path d="M8.5 11.5a4.5 4.5 0 0 1 2.5-1.8" />
  </svg>
);
