import React from 'react';
import { getWhatsAppLink, PRODUCT_ITEMS } from '../data/content';

export const ProductSection: React.FC = () => (
  <section className="section products" id="produk" aria-labelledby="products-title">
    <div className="container">
      <div className="products-top">
        <div className="section-head">
          <div className="eyebrow">Katalog produk</div>
          <h2 id="products-title">Cari bahan yang kamu butuhkan.</h2>
          <p>Berikut kategori utama sebagai panduan awal. Tanyakan varian, ukuran kemasan, dan stok aktual sebelum memesan.</p>
        </div>
        <p className="price-note">Harga tidak dicantumkan karena bisa berubah. Tekan tombol di setiap kartu untuk menanyakan harga terbaru.</p>
      </div>
      <div className="product-grid">
        {PRODUCT_ITEMS.map((product, index) => {
          const message = `Halo, Toko Kebab Al Firdaus. Saya ingin bertanya / memesan produk berikut:\n\nProduk: ${product.message}\nJumlah: [isi jumlah]\nAlamat/kota tujuan: [isi alamat]\n\nMohon info harga, ketersediaan, dan ongkir. Terima kasih.`;
          return (
            <article className="product-card" key={product.id}>
              <div className="product-visual" aria-label={product.slotLabel}>
                <span className="product-icon" aria-hidden="true">{product.icon}</span>
                <span className="product-slot-label">{product.slotLabel}</span>
              </div>
              <div className="product-content">
                <span className="product-type">{product.type}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <a className="btn btn-red" href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" data-track={product.track}>
                  {index === 4 ? 'Minta Harga Grosir' : index === 5 ? 'Konsultasi Produk' : index === 2 ? 'Pesan Sekarang' : index === 3 ? 'Lihat Katalog' : 'Tanya Harga'} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="muted product-footnote">Catatan: ilustrasi kategori di atas merupakan penanda tempat foto, bukan foto produk. Ganti dengan foto asli daging kebab, tortilla, kebab frozen, dan kemasan sebelum publikasi.</p>
    </div>
  </section>
);
