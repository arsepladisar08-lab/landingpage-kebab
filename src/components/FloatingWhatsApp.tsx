import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/content';

interface FloatingWhatsAppProps {
  /** Hide mobile bottom WhatsApp bar while MobileCartBar is visible so they never overlap. */
  hideMobileBar?: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  hideMobileBar = false,
}) => (
  <>
    <a
      className="floating-wa"
      href={getWhatsAppLink('Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang produk dan harga terbaru.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Toko Kebab Al Firdaus via WhatsApp"
    >
      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>Chat kami</span>
    </a>

    {!hideMobileBar && (
      <div className="mobile-cta">
        <a
          className="btn btn-primary"
          href={getWhatsAppLink('Halo, Toko Kebab Al Firdaus. Saya ingin bertanya tentang produk dan harga terbaru.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Pesan via WhatsApp</span>
        </a>
      </div>
    )}
  </>
);
