import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const FinalCta: React.FC = () => (
  <section className="final-cta" aria-labelledby="final-cta-title">
    <div className="section-kicker light">Lagi Ingin Kebab?</div>
    <h2 id="final-cta-title">
      Yuk, mulai<br />
      <em>pesan hari ini.</em>
    </h2>
    <p>Pilih varian kebab favoritmu dan kirim rangkuman pesanan langsung lewat WhatsApp.</p>
    <a
      href={getWhatsAppLink('Halo Kebab Al Firdaus, saya mau pesan kebab sekarang.')}
      target="_blank"
      rel="noopener noreferrer"
      className="button button-lime"
    >
      Pesan Kebab via WhatsApp
    </a>
  </section>
);
