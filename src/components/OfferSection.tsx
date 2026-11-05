import React from 'react';
import { OFFER_ITEMS } from '../data/content';
import type { OfferItem } from '../types';

interface OfferSectionProps {
  onSelectProduct: (productName: string) => void;
  onViewMenu: () => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onSelectProduct, onViewMenu }) => {
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
              <button type="button" className="card-link" onClick={() => item.type === 'food' ? onViewMenu() : onSelectProduct(item.productName)}>
                {item.actionText} <span>↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="data-note">Menu, harga, stok, minimum pesanan, dan opsi pengiriman dapat berubah. Konfirmasi langsung dengan admin sebelum transaksi.</p>
    </section>
  );
};
