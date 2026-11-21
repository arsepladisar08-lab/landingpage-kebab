import React from 'react';
import { AnimatedWords } from './AnimatedText';
import { Reveal } from './Reveal';

export const QuoteBand: React.FC = () => (
  <section className="quote-band" aria-label="Pesan merek Kebab Al Firdaus">
    <Reveal variant="scale-in">
      <div className="quote-mark" aria-hidden="true">“</div>
    </Reveal>
    <blockquote>
      <AnimatedWords
        text="Rasa yang baik, hubungan yang dekat, dan usaha yang tumbuh bersama."
        baseDelayMs={40}
        stepMs={45}
      />
    </blockquote>
    <Reveal variant="fade-up" delayMs={260}>
      <span>KEBAB AL FIRDAUS · MAKNYUS BANGET · MEDAENG</span>
    </Reveal>
  </section>
);
