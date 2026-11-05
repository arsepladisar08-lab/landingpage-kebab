import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const FloatingWhatsApp: React.FC = () => (
  <>
    <a className="floating-wa" href={getWhatsAppLink('Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang produk dan harga terbaru.')} target="_blank" rel="noopener noreferrer" aria-label="Chat Toko Kebab Al Firdaus via WhatsApp">
      <span aria-hidden="true">✆</span><span>Chat kami</span>
    </a>
    <div className="mobile-cta">
      <a className="btn btn-primary" href={getWhatsAppLink('Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang produk dan harga terbaru.')} target="_blank" rel="noopener noreferrer">
        Pesan via WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </div>
  </>
);
