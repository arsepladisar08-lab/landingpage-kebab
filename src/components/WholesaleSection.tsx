import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const WholesaleSection: React.FC = () => {
  const whatsappWholesaleUrl = getWhatsAppLink(
    'Halo Al Firdaus, saya sedang mencari bahan kebab untuk usaha. Boleh konsultasi?'
  );

  return (
    <section className="wholesale" id="grosir">
      <div className="wholesale-pattern" aria-hidden="true">
        AF AF AF AF AF AF AF AF
      </div>
      <div className="wholesale-inner">
        <div className="section-kicker light">03 / PUNYA RENCANA JUALAN?</div>
        <h2>
          Mulai dari bahan<br />
          yang tepat.
        </h2>
        <p>
          Kalau kamu pelaku usaha atau sedang merintis jualan kebab, ceritakan kebutuhanmu. Tanyakan
          ketersediaan bahan, pembelian grosir, dan opsi yang sesuai dengan rencanamu.
        </p>
        <a
          className="button button-dark"
          href={whatsappWholesaleUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Konsultasi kebutuhan usaha <span>↗</span>
        </a>
      </div>
      <div className="wholesale-side">
        <div className="big-asterisk">✳</div>
        <div className="side-caption">
          LOCAL BUSINESS<br />
          GROWS TOGETHER.
        </div>
      </div>
    </section>
  );
};
