import React from 'react';

interface WholesaleSectionProps { onOpenWholesale: () => void; }

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({ onOpenWholesale }) => (
  <section className="wholesale" id="grosir">
    <div className="wholesale-pattern" aria-hidden="true">AF AF AF AF AF AF AF AF</div>
    <div className="wholesale-inner">
      <div className="section-kicker light">LAYANAN TAMBAHAN · UNTUK USAHA</div>
      <h2>Punya rencana<br />jualan kebab?</h2>
      <p>Untuk warung, reseller, atau pelaku usaha kuliner, konsultasikan kebutuhan bahan kebab, jumlah perkiraan, dan pola pasokan yang kamu perlukan.</p>
      <button type="button" className="button button-dark" onClick={onOpenWholesale}>Konsultasi bahan grosir <span>↗</span></button>
    </div>
    <div className="wholesale-side">
      <div className="big-asterisk">✳</div>
      <div className="side-caption">LOCAL BUSINESS<br />GROWS TOGETHER.</div>
    </div>
  </section>
);
