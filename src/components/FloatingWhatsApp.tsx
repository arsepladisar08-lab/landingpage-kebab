import React from 'react';
import { getWhatsAppLink } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappFloatingUrl = getWhatsAppLink('Halo Kebab Al Firdaus.');

  return (
    <a
      className="floating-wa"
      href={whatsappFloatingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Kebab Al Firdaus via WhatsApp"
    >
      <span className="wa-icon">✆</span>
      <span>Chat kami</span>
    </a>
  );
};
