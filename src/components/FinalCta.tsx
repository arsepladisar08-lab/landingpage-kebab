import React from 'react';
import { getWhatsAppLink } from '../data/content';
import { AnimatedWords, AnimatedAccentWord } from './AnimatedText';
import { Reveal } from './Reveal';

export const FinalCta: React.FC = () => (
  <section className="final-cta" aria-labelledby="final-cta-title">
    <div className="section-kicker light">Lagi Ingin Kebab?</div>
    <h2 id="final-cta-title">
      <AnimatedWords text="Yuk, mulai" baseDelayMs={0} stepMs={60} />
      <br />
      <AnimatedAccentWord delayMs={180}>pesan hari ini.</AnimatedAccentWord>
    </h2>
    <Reveal variant="scale-in" delayMs={180}>
      <a
        href={getWhatsAppLink('Halo Kebab Al Firdaus, saya mau pesan kebab sekarang.')}
        target="_blank"
        rel="noopener noreferrer"
        className="button button-lime"
      >
        Pesan Kebab via WhatsApp
      </a>
    </Reveal>
  </section>
);
