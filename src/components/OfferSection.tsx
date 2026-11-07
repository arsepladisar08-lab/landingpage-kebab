import React from 'react';
import { OFFER_ITEMS, getWhatsAppLink } from '../data/content';
import type { OfferItem } from '../types';

interface OfferSectionProps {
  onViewMenu: () => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onViewMenu }) => {
  const renderVisual = (type: OfferItem['type']) => {
    if (type === 'food') return (
      <div className="offer-visual food-visual">
        <div className="visual-orbit" /><div className="mini-wrap"><i /><b /><span /></div><span className="visual-spark">✳</span>
      </div>
    );
    if (type === 'supply') return (
      <div className="offer-visual supply-visual">
        <div className="supply-box"><span>KEBAB</span><b>SUPPLY</b><i>EST. LOCAL</i></div><div className="supply-spark">✳</div>
      </div>
    );
    return (
      <div className="offer-visual event-visual">
        <div className="event-disc"><span>LET'S</span><b>GATHER</b><i>GOOD FOOD FOR GOOD MOMENTS</i></div><div className="event-star">✳</div>
      </div>
    );
  };

  return (
    <section className="offer section-pad" id="pilihan">
      <div className="section-heading">
        <div><div className="section-kicker">LAYANAN AL FIRDAUS</div><h2>Ada yang bisa<br /><em>kamu nikmati.</em></h2></div>
        <p>Fokus utama kami adalah kebab siap santap. Ada juga pilihan kudapan dan layanan untuk kebutuhan tertentu.</p>
      </div>
      <div className="offer-grid">
        {OFFER_ITEMS.map((item) => (
          <article key={item.id} className={'offer-card ' + (item.type === 'food' ? 'offer-featured' : '')}>
            <div className="offer-number">{item.code}</div>
            {renderVisual(item.type)}
            <div className="offer-info">
              <div className="offer-tag">{item.tag}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.type === 'food' ? (
                <button type="button" className="card-link" onClick={onViewMenu}>
                  {item.actionText} <span>↗</span>
                </button>
              ) : (
                <a
                  href={getWhatsAppLink(item.whatsappMessage || 'Halo Kebab Al Firdaus, saya ingin bertanya tentang layanan ini.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  {item.actionText} <span>↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="data-note">Menu, harga, stok, minimum pesanan, dan opsi pengiriman dapat berubah. Konfirmasi langsung dengan admin sebelum transaksi.</p>
    </section>
  );
};
