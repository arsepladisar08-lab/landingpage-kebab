import React from 'react';
import { BUSINESS_INFO } from '../data/content';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <a className="brand footer-brand" href="#top">
        <span className="brand-mark">AF</span>
        <span className="brand-copy">
          <strong>{BUSINESS_INFO.name}</strong>
          <small>{BUSINESS_INFO.subName}</small>
        </span>
      </a>
      <span>LOCAL TASTE. GOOD MOMENTS.</span>
      <span>
        © <span id="year">{currentYear}</span> KEBAB {BUSINESS_INFO.name} · SIDOARJO
      </span>
    </footer>
  );
};
