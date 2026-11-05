import React from 'react';

interface FinalCtaProps { onOpenOrder: () => void; }

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenOrder }) => (
  <section className="final-cta">
    <div className="final-asterisk">✳</div>
    <div className="section-kicker light">LAGI INGIN KEBAB?</div>
    <h2>Yuk, mulai<br /><em>pesan hari ini.</em></h2>
    <p>Pilih varian kebab favoritmu dan kirim rangkuman pesanan melalui WhatsApp.</p>
    <button type="button" className="button button-lime" onClick={onOpenOrder}>Pesan Kebab Sekarang <span>↗</span></button>
  </section>
);
