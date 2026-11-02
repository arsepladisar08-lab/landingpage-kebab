import React from 'react';
import { OFFER_ITEMS, getWhatsAppLink } from '../data/content';
import { OfferItem } from '../types';

export const OfferSection: React.FC = () => {
  const renderVisual = (type: OfferItem['type']) => {
    switch (type) {
      case 'food':
        return (
          <div className="offer-visual food-visual">
            <div className="visual-orbit" />
            <div className="mini-wrap">
              <i />
              <b />
              <span />
            </div>
            <span className="visual-spark">✳</span>
          </div>
        );
      case 'supply':
        return (
          <div className="offer-visual supply-visual">
            <div className="supply-box">
              <span>KEBAB</span>
              <b>SUPPLY</b>
              <i>EST. LOCAL</i>
            </div>
            <div className="supply-spark">✳</div>
          </div>
        );
      case 'event':
        return (
          <div className="offer-visual event-visual">
            <div className="event-disc">
              <span>LET'S</span>
              <b>GATHER</b>
              <i>GOOD FOOD FOR GOOD MOMENTS</i>
            </div>
            <div className="event-star">✳</div>
          </div>
        );
    }
  };

  return (
    <section className="offer section-pad" id="pilihan">
      <div className="section-heading">
        <div>
          <div className="section-kicker">02 / PILIHAN AL FIRDAUS</div>
          <h2>
            Ada yang bisa<br />
            <em>kamu nikmati.</em>
          </h2>
        </div>
        <p>Satu tempat, beberapa cara untuk memenuhi kebutuhan kebab dan kudapanmu.</p>
      </div>

      <div className="offer-grid">
        {OFFER_ITEMS.map((item) => (
          <article
            key={item.id}
            className={`offer-card ${item.type === 'food' ? 'offer-featured' : ''}`}
          >
            <div className="offer-number">{item.code}</div>
            {renderVisual(item.type)}
            <div className="offer-info">
              <div className="offer-tag">{item.tag}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a
                href={getWhatsAppLink(item.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                {item.actionText} <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="data-note">
        Pilihan produk, ketersediaan, harga, dan ketentuan pemesanan dapat berubah. Konfirmasi
        langsung melalui WhatsApp.
      </p>
    </section>
  );
};
