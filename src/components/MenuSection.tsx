import React from 'react';
import { MENU_VARIANTS } from '../data/content';

interface MenuSectionProps {
  onSelectProduct: (productName: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectProduct }) => {
  // We showcase the 4 primary kebab food variants in this interactive grid
  const primaryVariants = MENU_VARIANTS.filter((v) =>
    ['original', 'keju', 'pedas', 'komplit'].includes(v.type)
  );

  const renderSvg = (type: string) => {
    switch (type) {
      case 'original':
        return (
          <svg viewBox="0 0 240 180" role="img" aria-label="Ilustrasi Kebab Original" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bread1" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#ffe8a1" />
                <stop offset="1" stopColor="#eab14f" />
              </linearGradient>
            </defs>
            <ellipse cx="124" cy="143" rx="75" ry="12" fill="#171717" opacity=".14" />
            <path d="M52 37 Q104 8 183 35 L147 144 Q94 162 43 117Z" fill="url(#bread1)" stroke="#1c1b18" strokeWidth="4" strokeLinejoin="round" />
            <path d="M55 44 Q112 23 175 40 L164 64 Q110 47 48 67Z" fill="#72a84c" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M49 64 Q107 45 169 63 L157 83 Q101 66 44 86Z" fill="#b51f24" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M44 85 Q103 65 161 84 L151 103 Q99 86 39 106Z" fill="#704020" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M42 37 Q100 10 183 35" fill="none" stroke="#fff4cf" strokeWidth="6" strokeLinecap="round" />
            <path d="M72 42 l-7 11 M101 34 l-6 12 M133 33 l-5 12 M93 118 l-8 12 M124 111 l-6 13" stroke="#c98b37" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'keju':
        return (
          <svg viewBox="0 0 240 180" role="img" aria-label="Ilustrasi Kebab Keju" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bread2" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#fff0b3" />
                <stop offset="1" stopColor="#e6a84a" />
              </linearGradient>
            </defs>
            <ellipse cx="122" cy="145" rx="76" ry="12" fill="#171717" opacity=".14" />
            <path d="M52 37 Q104 8 183 35 L147 144 Q94 162 43 117Z" fill="url(#bread2)" stroke="#1c1b18" strokeWidth="4" strokeLinejoin="round" />
            <path d="M55 44 Q112 23 175 40 L164 64 Q110 47 48 67Z" fill="#64a64c" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M49 64 Q107 45 169 63 L157 83 Q101 66 44 86Z" fill="#c52728" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M44 84 Q103 65 161 84 L151 103 Q99 86 39 106Z" fill="#78451f" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M46 72 Q102 55 165 73 L153 92 Q105 78 42 94Z" fill="#ffd64e" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M42 37 Q100 10 183 35" fill="none" stroke="#fff7d7" strokeWidth="6" strokeLinecap="round" />
            <path d="M72 42 l-7 11 M101 34 l-6 12 M133 33 l-5 12 M93 118 l-8 12 M124 111 l-6 13" stroke="#c98b37" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'pedas':
        return (
          <svg viewBox="0 0 240 180" role="img" aria-label="Ilustrasi Kebab Pedas" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bread3" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#ffebad" />
                <stop offset="1" stopColor="#e3a34b" />
              </linearGradient>
            </defs>
            <ellipse cx="122" cy="145" rx="76" ry="12" fill="#171717" opacity=".14" />
            <path d="M52 37 Q104 8 183 35 L147 144 Q94 162 43 117Z" fill="url(#bread3)" stroke="#1c1b18" strokeWidth="4" strokeLinejoin="round" />
            <path d="M55 44 Q112 23 175 40 L164 64 Q110 47 48 67Z" fill="#70a64a" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M49 64 Q107 45 169 63 L157 83 Q101 66 44 86Z" fill="#b91520" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M44 85 Q103 65 161 84 L151 103 Q99 86 39 106Z" fill="#7c381d" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M63 75 l8 6 -7 5 10 6 -11 4 M111 66 l8 6 -7 5 10 6 -11 4 M143 84 l8 6 -7 5" fill="none" stroke="#ff5946" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M42 37 Q100 10 183 35" fill="none" stroke="#fff4cf" strokeWidth="6" strokeLinecap="round" />
            <path d="M72 42 l-7 11 M101 34 l-6 12 M133 33 l-5 12 M93 118 l-8 12 M124 111 l-6 13" stroke="#c98b37" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'komplit':
      default:
        return (
          <svg viewBox="0 0 240 180" role="img" aria-label="Ilustrasi Kebab Komplit" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bread4" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#fff0af" />
                <stop offset="1" stopColor="#dfa047" />
              </linearGradient>
            </defs>
            <ellipse cx="122" cy="145" rx="76" ry="12" fill="#171717" opacity=".14" />
            <path d="M52 37 Q104 8 183 35 L147 144 Q94 162 43 117Z" fill="url(#bread4)" stroke="#1c1b18" strokeWidth="4" strokeLinejoin="round" />
            <path d="M55 44 Q112 23 175 40 L164 64 Q110 47 48 67Z" fill="#71a94b" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M49 64 Q107 45 169 63 L157 83 Q101 66 44 86Z" fill="#c81d27" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M44 85 Q103 65 161 84 L151 103 Q99 86 39 106Z" fill="#75401e" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M48 72 Q101 56 165 73 L153 92 Q105 78 42 94Z" fill="#ffd94a" stroke="#1c1b18" strokeWidth="2.5" />
            <path d="M42 37 Q100 10 183 35" fill="none" stroke="#fff5d1" strokeWidth="6" strokeLinecap="round" />
            <path d="M72 42 l-7 11 M101 34 l-6 12 M133 33 l-5 12 M93 118 l-8 12 M124 111 l-6 13" stroke="#c98b37" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M179 37 l4 -12 4 12 12 -2 -9 8 4 12 -11 -7 -10 7 4 -12 -9 -8Z" fill="#ffdd00" stroke="#1c1b18" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <section className="menu-variants-section section-pad" id="menu-varian">
      <div className="section-heading">
        <div>
          <div className="section-kicker">INSPIRASI MENU FAVORIT</div>
          <h2>
            Pilih mood<br />
            <em>kebabmu.</em>
          </h2>
        </div>
        <p>
          Mulai dari rasa klasik, lumuran keju gurih, hingga bumbu pedas mantap. Klik untuk langsung
          memesan atau merangkum porsi ke WhatsApp.
        </p>
      </div>

      <div className="menu-variants-grid">
        {primaryVariants.map((item) => (
          <article key={item.id} className="menu-variant-card">
            <div className="variant-art-box">
              <span className="variant-tag-pill">{item.tag}</span>
              {renderSvg(item.type)}
            </div>

            <div className="variant-card-body">
              <div className="variant-badge">{item.badge}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className="variant-card-footer">
                <span className="order-hint">Tanya ketersediaan</span>
                <button
                  type="button"
                  className="variant-order-btn"
                  onClick={() => onSelectProduct(item.name)}
                  aria-label={`Pesan ${item.name}`}
                >
                  Pesan <span>↗</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Roti Maryam & Wholesale Quick Banner */}
      <div className="menu-snack-banner">
        <div className="snack-banner-left">
          <span className="eyebrow" style={{ color: 'var(--orange)' }}>
            JUGA TERSEDIA
          </span>
          <h3>Roti Maryam Hangat & Bahan Kebab Grosir</h3>
          <p>
            Selain kebab siap santap, kamu juga bisa memesan roti maryam lezat, paket bahan baku untuk
            usaha, atau porsi catering untuk acara kumpul dan syukuran di Sidoarjo.
          </p>
        </div>
        <div className="snack-banner-actions">
          <button
            type="button"
            className="button button-lime"
            onClick={() => onSelectProduct('Roti Maryam Gurih / Manis')}
          >
            Pesan Roti Maryam <span>↗</span>
          </button>
          <button
            type="button"
            className="button button-dark"
            onClick={() => onSelectProduct('Bahan Baku Kebab Grosir')}
          >
            Tanya Bahan Grosir <span>↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};
