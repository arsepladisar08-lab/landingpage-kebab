import React from 'react';
import { OFFER_ITEMS, getWhatsAppLink } from '../data/content';
import type { OfferItem } from '../types';

interface OfferSectionProps {
  onViewMenu: () => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onViewMenu }) => {
  const renderVisual = (type: OfferItem['type']) => {
    if (type === 'food') {
      return (
        <div className="offer-visual food-visual" aria-hidden="true">
          <div className="visual-orbit" />
          <div className="mini-wrap">
            <i />
            <b />
            <span />
          </div>
        </div>
      );
    }
    if (type === 'supply') {
      return (
        <div className="offer-visual supply-visual" aria-hidden="true">
          <div className="supply-box">
            <span>KEBAB</span>
            <b>SUPPLY</b>
            <i>MEDAENG · SIDOARJO</i>
          </div>
        </div>
      );
    }
    return (
      <div className="offer-visual event-visual" aria-hidden="true">
        <div className="event-disc">
          <span>PAKET</span>
          <b>ACARA</b>
          <i>ARISAN · HAJATAN · KANTOR</i>
        </div>
      </div>
    );
  };

  return (
    <section className="offer section-pad" id="pilihan" aria-labelledby="pilihan-title">
      <div className="section-heading">
        <div>
          <div className="section-kicker">03 / Layanan Al Firdaus</div>
          <h2 id="pilihan-title">
            Satu dapur untuk<br />
            <em>beragam kebutuhan.</em>
          </h2>
        </div>
        <p>
          Fokus utama kami adalah kebab hangat siap santap dan kemasan frozen, dilengkapi pasokan bahan usaha serta pesanan acara.
        </p>
      </div>

      <div className="offer-grid">
        {OFFER_ITEMS.map((item) => (
          <article key={item.id} className={`offer-card ${item.type === 'food' ? 'offer-featured' : ''}`}>
            <div className="offer-number">{item.code}</div>
            {renderVisual(item.type)}
            <div className="offer-info">
              <div className="offer-tag">{item.tag}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.type === 'food' ? (
                <button type="button" className="card-link" onClick={onViewMenu}>
                  {item.actionText}
                </button>
              ) : (
                <a
                  href={getWhatsAppLink(item.whatsappMessage || 'Halo Kebab Al Firdaus, saya ingin bertanya tentang layanan ini.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  {item.actionText}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="data-note">
        Ketersediaan stok harian, harga paket grosir, dan jadwal pengantaran dikonfirmasi langsung melalui admin WhatsApp sebelum transaksi.
      </p>
    </section>
  );
};
