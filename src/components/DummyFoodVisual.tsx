import React from 'react';
import { Camera } from 'lucide-react';

interface DummyFoodVisualProps {
  type: string;
  className?: string;
  alt?: string;
  showBadge?: boolean;
}

export const DummyFoodVisual: React.FC<DummyFoodVisualProps> = ({
  type,
  className = '',
  alt = 'Foto Menu Kebab Al Firdaus',
  showBadge = true,
}) => {
  const renderVisual = () => {
    switch (type) {
      case 'original':
        return (
          <svg viewBox="0 0 320 200" className="w-full h-full object-cover" role="img" aria-label={alt}>
            <defs>
              <linearGradient id="orig-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8f4eb" />
                <stop offset="100%" stopColor="#ebe1cf" />
              </linearGradient>
              <linearGradient id="tortilla-orig" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#fff2c2" />
                <stop offset="50%" stopColor="#f3ca76" />
                <stop offset="100%" stopColor="#d89b3f" />
              </linearGradient>
              <linearGradient id="meat-orig" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7a3f1b" />
                <stop offset="100%" stopColor="#54250e" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#orig-bg)" />
            {/* Subtle cutting board / plate shadow */}
            <ellipse cx="160" cy="165" rx="110" ry="16" fill="#1c1b18" opacity="0.12" />
            {/* Kebab Wrap Body */}
            <path
              d="M70 55 C130 25, 200 45, 245 70 L205 160 C155 178, 90 162, 60 125 Z"
              fill="url(#tortilla-orig)"
              stroke="#1c1b18"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Fresh Lettuce Leaves */}
            <path
              d="M85 64 Q145 38, 220 62 L208 85 Q145 68, 80 88 Z"
              fill="#6ea33e"
              stroke="#1c1b18"
              strokeWidth="2.5"
            />
            {/* Fresh Tomato / Sauce */}
            <path
              d="M78 86 Q140 68, 212 84 L200 102 Q138 88, 72 104 Z"
              fill="#cc272b"
              stroke="#1c1b18"
              strokeWidth="2.5"
            />
            {/* Juicy Sliced Kebab Meat */}
            <path
              d="M72 105 Q135 88, 196 103 L186 122 Q130 108, 68 123 Z"
              fill="url(#meat-orig)"
              stroke="#1c1b18"
              strokeWidth="2.5"
            />
            {/* Mayo Drizzle Accent */}
            <path
              d="M90 76 Q115 88, 140 76 T190 78"
              fill="none"
              stroke="#fffbe8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Grill Marks */}
            <g stroke="#9e661c" strokeWidth="3.5" strokeLinecap="round" opacity="0.8">
              <line x1="105" y1="52" x2="95" y2="72" />
              <line x1="145" y1="46" x2="135" y2="68" />
              <line x1="185" y1="55" x2="175" y2="76" />
              <line x1="130" y1="136" x2="120" y2="154" />
              <line x1="168" y1="130" x2="158" y2="150" />
            </g>
          </svg>
        );

      case 'keju':
        return (
          <svg viewBox="0 0 320 200" className="w-full h-full object-cover" role="img" aria-label={alt}>
            <defs>
              <linearGradient id="keju-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff8e6" />
                <stop offset="100%" stopColor="#f5e6be" />
              </linearGradient>
              <linearGradient id="tortilla-keju" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#fff5cb" />
                <stop offset="50%" stopColor="#f7d079" />
                <stop offset="100%" stopColor="#dea344" />
              </linearGradient>
              <linearGradient id="cheese-melt" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#ffe653" />
                <stop offset="100%" stopColor="#f5b800" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#keju-bg)" />
            <ellipse cx="160" cy="165" rx="110" ry="16" fill="#1c1b18" opacity="0.12" />
            <path
              d="M70 55 C130 25, 200 45, 245 70 L205 160 C155 178, 90 162, 60 125 Z"
              fill="url(#tortilla-keju)"
              stroke="#1c1b18"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Salad & Meat */}
            <path d="M85 64 Q145 38, 220 62 L208 85 Q145 68, 80 88 Z" fill="#6ba53b" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M78 86 Q140 68, 212 84 L200 102 Q138 88, 72 104 Z" fill="#cf272b" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M72 105 Q135 88, 196 103 L186 122 Q130 108, 68 123 Z" fill="#693414" stroke="#1c1b18" strokeWidth="2.5" />
            {/* Melted Cheese Flowing */}
            <path
              d="M70 94 Q110 82, 160 92 Q180 97, 215 88 L206 112 Q170 124, 130 114 Q95 106, 68 114 Z"
              fill="url(#cheese-melt)"
              stroke="#1c1b18"
              strokeWidth="2.5"
            />
            {/* Dripping Cheese Drop */}
            <path d="M148 114 C148 128, 162 128, 162 114 Z" fill="#f5b800" stroke="#1c1b18" strokeWidth="2" />
            {/* Grill Marks */}
            <g stroke="#9e661c" strokeWidth="3.5" strokeLinecap="round" opacity="0.8">
              <line x1="105" y1="52" x2="95" y2="72" />
              <line x1="145" y1="46" x2="135" y2="68" />
              <line x1="185" y1="55" x2="175" y2="76" />
              <line x1="130" y1="136" x2="120" y2="154" />
            </g>
          </svg>
        );

      case 'pedas':
        return (
          <svg viewBox="0 0 320 200" className="w-full h-full object-cover" role="img" aria-label={alt}>
            <defs>
              <linearGradient id="pedas-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdf0eb" />
                <stop offset="100%" stopColor="#fce1d6" />
              </linearGradient>
              <linearGradient id="tortilla-pedas" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#ffebbe" />
                <stop offset="50%" stopColor="#f4bf6c" />
                <stop offset="100%" stopColor="#d38b30" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#pedas-bg)" />
            <ellipse cx="160" cy="165" rx="110" ry="16" fill="#1c1b18" opacity="0.12" />
            <path
              d="M70 55 C130 25, 200 45, 245 70 L205 160 C155 178, 90 162, 60 125 Z"
              fill="url(#tortilla-pedas)"
              stroke="#1c1b18"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Fillings */}
            <path d="M85 64 Q145 38, 220 62 L208 85 Q145 68, 80 88 Z" fill="#699e38" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M78 86 Q140 68, 212 84 L200 102 Q138 88, 72 104 Z" fill="#d91d1e" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M72 105 Q135 88, 196 103 L186 122 Q130 108, 68 123 Z" fill="#662f11" stroke="#1c1b18" strokeWidth="2.5" />
            {/* Chili Sauce Spatter Zigzag */}
            <path
              d="M80 78 L95 86 L86 96 L108 102 L98 114 M132 70 L146 80 L136 92 L154 98 L144 110 M175 78 L190 88 L180 98"
              fill="none"
              stroke="#ea2b1f"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Chili Icon Sparkle */}
            <path d="M228 42 Q238 28, 248 38 Q252 50, 240 54 Q230 52, 228 42 Z" fill="#d91d1e" stroke="#1c1b18" strokeWidth="2" />
            <path d="M248 38 Q255 30, 260 28" fill="none" stroke="#487a27" strokeWidth="2.5" strokeLinecap="round" />
            {/* Grill Marks */}
            <g stroke="#9e661c" strokeWidth="3.5" strokeLinecap="round" opacity="0.8">
              <line x1="105" y1="52" x2="95" y2="72" />
              <line x1="145" y1="46" x2="135" y2="68" />
              <line x1="185" y1="55" x2="175" y2="76" />
              <line x1="130" y1="136" x2="120" y2="154" />
            </g>
          </svg>
        );

      case 'komplit':
        return (
          <svg viewBox="0 0 320 200" className="w-full h-full object-cover" role="img" aria-label={alt}>
            <defs>
              <linearGradient id="komplit-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdfbe6" />
                <stop offset="100%" stopColor="#f7eec5" />
              </linearGradient>
              <linearGradient id="tortilla-komplit" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#fff4cc" />
                <stop offset="50%" stopColor="#f8cd74" />
                <stop offset="100%" stopColor="#db9732" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#komplit-bg)" />
            <ellipse cx="160" cy="165" rx="110" ry="16" fill="#1c1b18" opacity="0.12" />
            {/* Jumbo Size Wrap */}
            <path
              d="M62 50 C125 18, 208 38, 255 65 L212 165 C158 184, 85 166, 52 125 Z"
              fill="url(#tortilla-komplit)"
              stroke="#1c1b18"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Abundant Layers */}
            <path d="M80 60 Q145 34, 230 58 L218 80 Q145 62, 75 82 Z" fill="#6aa038" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M72 82 Q140 62, 222 78 L210 98 Q138 82, 66 100 Z" fill="#d02528" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M66 100 Q135 80, 206 98 L196 118 Q130 100, 60 120 Z" fill="#ffd445" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M60 120 Q130 102, 194 118 L184 136 Q125 120, 56 138 Z" fill="#693414" stroke="#1c1b18" strokeWidth="2.5" />
            {/* Double Sauce Streaks */}
            <path d="M85 70 Q115 84, 150 72 T210 74" fill="none" stroke="#fffce8" strokeWidth="4" strokeLinecap="round" />
            <path d="M92 90 Q122 104, 158 92 T205 94" fill="none" stroke="#e0282b" strokeWidth="3.5" strokeLinecap="round" />
            {/* Star badge in corner */}
            <path
              d="M245 42 L250 30 L256 42 L268 40 L259 48 L263 60 L251 52 L240 59 L244 48 L235 40 Z"
              fill="#fed130"
              stroke="#1c1b18"
              strokeWidth="2"
            />
            {/* Grill Marks */}
            <g stroke="#9e661c" strokeWidth="3.5" strokeLinecap="round" opacity="0.8">
              <line x1="100" y1="48" x2="90" y2="68" />
              <line x1="145" y1="42" x2="135" y2="64" />
              <line x1="190" y1="50" x2="180" y2="72" />
            </g>
          </svg>
        );

      case 'maryam':
        return (
          <svg viewBox="0 0 320 200" className="w-full h-full object-cover" role="img" aria-label={alt}>
            <defs>
              <linearGradient id="maryam-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#faf5eb" />
                <stop offset="100%" stopColor="#ede3d0" />
              </linearGradient>
              <linearGradient id="maryam-bread" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff8db" />
                <stop offset="50%" stopColor="#f3c973" />
                <stop offset="100%" stopColor="#cf9137" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#maryam-bg)" />
            <ellipse cx="160" cy="155" rx="105" ry="18" fill="#1c1b18" opacity="0.12" />
            {/* Round Swirled Layered Roti Canai / Maryam */}
            <ellipse cx="160" cy="110" rx="90" ry="48" fill="url(#maryam-bread)" stroke="#1c1b18" strokeWidth="3.5" />
            {/* Inner Spiral Flaky Texture */}
            <path
              d="M100 110 C100 85, 140 75, 175 75 C210 75, 235 95, 230 118 C225 140, 185 148, 145 142 C115 138, 115 118, 140 108 C165 98, 195 106, 185 120"
              fill="none"
              stroke="#af7122"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Golden Toasted Spots */}
            <circle cx="130" cy="100" r="9" fill="#995f19" opacity="0.6" />
            <circle cx="185" cy="115" r="12" fill="#995f19" opacity="0.6" />
            <circle cx="155" cy="125" r="7" fill="#995f19" opacity="0.5" />
            <circle cx="210" cy="105" r="8" fill="#995f19" opacity="0.5" />
            {/* Steam Wafts */}
            <path d="M140 50 Q132 40, 142 32 M160 48 Q152 36, 164 26 M180 52 Q174 42, 182 34" fill="none" stroke="#77746b" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          </svg>
        );

      case 'bahan-grosir':
      case 'wholesale':
        return (
          <svg viewBox="0 0 320 200" className="w-full h-full object-cover" role="img" aria-label={alt}>
            <defs>
              <linearGradient id="box-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3efe5" />
                <stop offset="100%" stopColor="#ded5c2" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#box-bg)" />
            <ellipse cx="160" cy="165" rx="100" ry="16" fill="#1c1b18" opacity="0.12" />
            {/* Supply Carton / Wholesale Box */}
            <polygon points="100,75 160,50 220,75 160,100" fill="#e2c082" stroke="#1c1b18" strokeWidth="3" />
            <polygon points="100,75 160,100 160,155 100,130" fill="#c9a25b" stroke="#1c1b18" strokeWidth="3" />
            <polygon points="160,100 220,75 220,130 160,155" fill="#dfb974" stroke="#1c1b18" strokeWidth="3" />
            {/* Tape & Stamp */}
            <path d="M150 54 L170 96 L170 155 L150 155 Z" fill="#d5f264" opacity="0.8" stroke="#1c1b18" strokeWidth="1.5" />
            <text x="115" y="115" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#1c1b18" letterSpacing="1">GROSIR</text>
            <text x="175" y="115" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#1c1b18" letterSpacing="1">BAHAN</text>
            {/* Tortilla Stack Icon next to box */}
            <ellipse cx="235" cy="145" rx="35" ry="14" fill="#fff1c0" stroke="#1c1b18" strokeWidth="2.5" />
            <ellipse cx="235" cy="140" rx="35" ry="14" fill="#fff7d6" stroke="#1c1b18" strokeWidth="2.5" />
            <ellipse cx="235" cy="135" rx="35" ry="14" fill="#fff9e6" stroke="#1c1b18" strokeWidth="2.5" />
          </svg>
        );

      case 'pesanan-acara':
      case 'event':
      default:
        return (
          <svg viewBox="0 0 320 200" className="w-full h-full object-cover" role="img" aria-label={alt}>
            <defs>
              <linearGradient id="event-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f7f2ea" />
                <stop offset="100%" stopColor="#e3dac6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#event-bg)" />
            <ellipse cx="160" cy="165" rx="110" ry="16" fill="#1c1b18" opacity="0.12" />
            {/* Catering Platter with multiple wraps */}
            <ellipse cx="160" cy="135" rx="100" ry="32" fill="#ffffff" stroke="#1c1b18" strokeWidth="3" />
            {/* Wrap 1 */}
            <path d="M100 115 L150 95 L145 135 L95 140 Z" fill="#f4cb76" stroke="#1c1b18" strokeWidth="2.5" />
            <circle cx="120" cy="115" r="8" fill="#699e38" />
            <circle cx="132" cy="112" r="7" fill="#cf272b" />
            {/* Wrap 2 */}
            <path d="M140 100 L195 85 L188 128 L135 135 Z" fill="#ffd47d" stroke="#1c1b18" strokeWidth="2.5" />
            <circle cx="162" cy="105" r="8" fill="#ffdb4d" />
            <circle cx="174" cy="100" r="7" fill="#693414" />
            {/* Wrap 3 */}
            <path d="M185 110 L230 100 L220 138 L175 140 Z" fill="#f4cb76" stroke="#1c1b18" strokeWidth="2.5" />
            <circle cx="205" cy="115" r="7" fill="#d02528" />
            {/* Decorative Stars / Confetti for Event */}
            <path d="M75 55 L82 62 L90 55 L82 48 Z" fill="#ec6c3b" />
            <path d="M245 55 L252 62 L260 55 L252 48 Z" fill="#d5f264" stroke="#1c1b18" strokeWidth="1" />
            <text x="160" y="55" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fontWeight="900" fill="#1c1b18" letterSpacing="2">PAKET ACARA</text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden group select-none ${className}`}>
      {renderVisual()}

      {showBadge && (
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-white/90 text-[#1c1b18] border border-black/10 shadow-xs transition-transform duration-200 group-hover:scale-105"
          title="Placeholder gambar siap diganti dengan file foto produk kamu"
        >
          <Camera className="w-3 h-3 text-[#ec6c3b]" />
          <span>Foto Siap Ganti</span>
        </div>
      )}
    </div>
  );
};
