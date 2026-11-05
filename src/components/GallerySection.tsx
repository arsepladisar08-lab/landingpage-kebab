import React from 'react';
import { BUSINESS_INFO } from '../data/content';

export const GallerySection: React.FC = () => (
  <section className="section gallery" id="galeri" aria-labelledby="gallery-title">
    <div className="container">
      <div className="section-head">
        <div className="eyebrow">Lihat produk lebih dekat</div>
        <h2 id="gallery-title">Foto asli lebih meyakinkan.</h2>
        <p>Kami tidak menggunakan foto stok sebagai pengganti produk toko. Sementara galeri disiapkan, lihat unggahan produk melalui Instagram.</p>
      </div>
      <div className="gallery-panel">
        <div className="gallery-feature">
          <div>
            <span className="eyebrow">Galeri produk</span>
            <div className="big-mark">Lihat produk, kemasan, dan update katalog.</div>
            <p>Galeri foto pada halaman ini perlu diisi dengan foto asli milik Toko Kebab Al Firdaus sebelum peluncuran.</p>
          </div>
          <a className="btn btn-dark" href={BUSINESS_INFO.instagramProductUrl} target="_blank" rel="noopener noreferrer" data-track="instagram_product_gallery">
            Lihat Instagram Produk <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="gallery-steps">
          <div className="gallery-step"><span aria-hidden="true">📸</span><strong>Foto bahan kebab</strong><small>Unggah daging kebab dan kulit tortilla.</small></div>
          <div className="gallery-step"><span aria-hidden="true">❄️</span><strong>Foto produk frozen</strong><small>Tampilkan produk dan kemasan aslinya.</small></div>
          <div className="gallery-step"><span aria-hidden="true">📦</span><strong>Foto pengemasan</strong><small>Gunakan foto pesanan yang nyata.</small></div>
          <div className="gallery-step"><span aria-hidden="true">🍽️</span><strong>Foto kebab tersaji</strong><small>Tampilkan ide sajian yang benar-benar dibuat.</small></div>
        </div>
      </div>
      <p className="gallery-caption">
        Instagram toko: <a href={BUSINESS_INFO.instagramStoreUrl} target="_blank" rel="noopener noreferrer"><strong>{BUSINESS_INFO.instagramStoreHandle}</strong></a>
        {' · '}Instagram produk: <a href={BUSINESS_INFO.instagramProductUrl} target="_blank" rel="noopener noreferrer"><strong>{BUSINESS_INFO.instagramProductHandle}</strong></a>
      </p>
    </div>
  </section>
);
