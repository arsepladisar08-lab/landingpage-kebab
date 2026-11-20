import React from 'react';
import { ServiceInquiryMode } from '../types';

interface WholesaleSectionProps {
  onOpenServiceInquiry: (mode: ServiceInquiryMode, productName?: string) => void;
}

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({
  onOpenServiceInquiry,
}) => (
  <section className="wholesale" id="grosir" aria-labelledby="grosir-title">
    <div className="wholesale-pattern" aria-hidden="true">AF AF AF AF AF AF AF AF</div>
    <div className="wholesale-inner">
      <div className="section-kicker light">04 / Pasokan Usaha &amp; Reseller</div>
      <h2 id="grosir-title">
        Punya rencana<br />jualan kebab?
      </h2>
      <p>
        Untuk warung, gerobak kebab, reseller frozen, atau pelaku usaha kuliner di Sidoarjo dan Surabaya, konsultasikan jenis bahan, jumlah perkiraan, satuan, dan jadwal pasokan bersama kami.
      </p>
      <button
        type="button"
        onClick={() => onOpenServiceInquiry('wholesale', 'Bahan Baku Kebab Grosir')}
        className="button button-dark"
      >
        Konsultasi bahan grosir
      </button>
    </div>

    <div className="wholesale-side">
      <div className="wholesale-spec-card">
        <span className="wholesale-spec-kicker">Pilihan Pasokan Rutin</span>
        <ul>
          <li>Kulit tortilla berbagai diameter</li>
          <li>Daging kebab olahan siap panggang</li>
          <li>Kebab frozen isi 5, 6, dan 10 untuk reseller</li>
          <li>Saus sambal, mayones, dan kemasan kebab</li>
        </ul>
      </div>
    </div>
  </section>
);
