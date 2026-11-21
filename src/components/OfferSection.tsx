import React from 'react';
import { OFFER_ITEMS } from '../data/content';
import type { OfferItem, ServiceInquiryMode } from '../types';
import { AnimatedWords, AnimatedAccentWord } from './AnimatedText';
import { Reveal } from './Reveal';
import { getStaggerDelayMs } from '../utils/motion';

interface OfferSectionProps {
  onViewMenu: () => void;
  onOpenServiceInquiry: (mode: ServiceInquiryMode, productName?: string) => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({
  onViewMenu,
  onOpenServiceInquiry,
}) => {
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
            <AnimatedWords text="Satu dapur untuk" baseDelayMs={0} stepMs={60} />
            <br />
            <AnimatedAccentWord delayMs={180}>beragam kebutuhan.</AnimatedAccentWord>
          </h2>
        </div>
      </div>

      <div className="offer-grid">
        {OFFER_ITEMS.map((item, idx) => (
          <Reveal
            key={item.id}
            as="article"
            variant="fade-up"
            delayMs={getStaggerDelayMs(idx, 40, 90, 260)}
            className={`offer-card ${item.type === 'food' ? 'offer-featured' : ''}`}
          >
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
                <button
                  type="button"
                  className="card-link"
                  onClick={() =>
                    onOpenServiceInquiry(
                      item.type === 'event' ? 'event' : 'wholesale',
                      item.productName
                    )
                  }
                >
                  {item.actionText}
                </button>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
