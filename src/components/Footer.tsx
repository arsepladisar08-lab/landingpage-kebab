import React from 'react';
import { BUSINESS_INFO } from '../data/content';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-copy">
        © {new Date().getFullYear()} {BUSINESS_INFO.name}. Maknyus Banget!<br />
        Halaman informasi produk dan pemesanan.
      </div>
      <div className="footer-links">
        <a href="#produk">Produk</a><a href="#grosir">Harga Grosir</a><a href="#faq">FAQ</a><a href="#kontak">Kontak</a>
      </div>
    </div>
  </footer>
);
