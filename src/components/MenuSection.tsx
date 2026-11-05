import React from 'react';
import { MENU_VARIANTS } from '../data/content';

interface MenuSectionProps { onSelectProduct: (productName: string) => void; }

const KebabArtwork: React.FC<{ variant: string }> = ({ variant }) => {
  const hasCheese = variant === 'keju' || variant === 'komplit';
  const isSpicy = variant === 'pedas';
  const isSpecial = variant === 'komplit';
  const gradientId = 'bread-' + variant;

  return (
    <svg viewBox="0 0 240 180" role="img" aria-label={'Ilustrasi Kebab ' + variant} xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff0b3" /><stop offset="1" stopColor="#dfa047" /></linearGradient></defs>
      <ellipse cx="122" cy="145" rx="76" ry="12" fill="#171717" opacity=".14" />
      <path d="M52 37 Q104 8 183 35 L147 144 Q94 162 43 117Z" fill={'url(#' + gradientId + ')'} stroke="#1c1b18" strokeWidth="4" strokeLinejoin="round" />
      <path d="M55 44 Q112 23 175 40 L164 64 Q110 47 48 67Z" fill="#70a64a" stroke="#1c1b18" strokeWidth="2.5" />
      <path d="M49 64 Q107 45 169 63 L157 83 Q101 66 44 86Z" fill="#bd2528" stroke="#1c1b18" strokeWidth="2.5" />
      <path d="M44 85 Q103 65 161 84 L151 103 Q99 86 39 106Z" fill="#77401f" stroke="#1c1b18" strokeWidth="2.5" />
      {hasCheese ? <path d="M46 72 Q102 55 165 73 L153 92 Q105 78 42 94Z" fill="#ffd64e" stroke="#1c1b18" strokeWidth="2.5" /> : null}
      {isSpicy ? <path d="M63 75 l8 6 -7 5 10 6 -11 4 M111 66 l8 6 -7 5 10 6 -11 4 M143 84 l8 6 -7 5" fill="none" stroke="#ff5946" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /> : null}
      <path d="M42 37 Q100 10 183 35" fill="none" stroke="#fff4cf" strokeWidth="6" strokeLinecap="round" />
      <path d="M72 42 l-7 11 M101 34 l-6 12 M133 33 l-5 12 M93 118 l-8 12 M124 111 l-6 13" stroke="#c98b37" strokeWidth="3.5" strokeLinecap="round" />
      {isSpecial ? <path d="M179 37 l4 -12 4 12 12 -2 -9 8 4 12 -11 -7 -10 7 4 -12 -9 -8Z" fill="#ffdd00" stroke="#1c1b18" strokeWidth="2" /> : null}
    </svg>
  );
};

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectProduct }) => {
  const primaryVariants = MENU_VARIANTS.filter((item) => ['original', 'keju', 'pedas', 'komplit'].includes(item.type));

  return (
    <section className="menu-variants-section section-pad" id="menu-varian">
      <div className="section-heading">
        <div>
          <div className="section-kicker">MENU UTAMA · KEBAB SIAP SANTAP</div>
          <h2>Pilih mood<br /><em>kebabmu.</em></h2>
        </div>
        <p>Mulai dari rasa klasik, keju gurih, sampai sensasi pedas. Pilih varian, atur jumlah porsi, lalu lanjutkan pesanan lewat WhatsApp.</p>
      </div>
      <div className="menu-variants-grid">
        {primaryVariants.map((item) => (
          <article key={item.id} className="menu-variant-card">
            <div className="variant-art-box">
              <span className="variant-tag-pill">{item.tag}</span>
              <KebabArtwork variant={item.type} />
            </div>
            <div className="variant-card-body">
              <div className="variant-badge">{item.badge}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="variant-card-footer">
                <span className="order-hint">Harga & stok via admin</span>
                <button type="button" className="variant-order-btn" onClick={() => onSelectProduct(item.name)} aria-label={'Pesan ' + item.name}>
                  Pesan <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="menu-snack-banner">
        <div className="snack-banner-left">
          <span className="eyebrow" style={{ color: 'var(--orange)' }}>JUGA TERSEDIA</span>
          <h3>Roti Maryam, Bahan Grosir & Pesanan Acara</h3>
          <p>Kebab siap santap tetap menjadi menu utama Al Firdaus. Untuk kebutuhan tambahan, kamu juga bisa menanyakan roti maryam, pasokan bahan kebab untuk usaha, atau pesanan dalam jumlah besar untuk acara.</p>
        </div>
        <div className="snack-banner-actions">
          <button type="button" className="button button-lime" onClick={() => onSelectProduct('Roti Maryam Gurih / Manis')}>Pesan Roti Maryam <span>↗</span></button>
          <button type="button" className="button button-dark" onClick={() => onSelectProduct('Bahan Baku Kebab Grosir')}>Tanya Bahan Grosir <span>↗</span></button>
          <button type="button" className="button button-dark" onClick={() => onSelectProduct('Paket Pesanan Acara / Hajatan')}>Pesanan Acara <span>↗</span></button>
        </div>
      </div>
    </section>
  );
};
