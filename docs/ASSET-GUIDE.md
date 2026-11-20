# Panduan Aset Media — Kebab Al Firdaus

Dokumen ini menjadi acuan teknis untuk menyiapkan, menamai, dan mengoptimalkan seluruh aset foto serta video Kebab Al Firdaus sebelum ditambahkan ke repository.

> **Catatan:** Kompresi gambar/video dilakukan secara manual oleh tim atau owner sebelum file dimasukkan ke folder `public/assets/` (misalnya dengan Squoosh, cwebp, atau HandBrake). Aplikasi hanya menerapkan dimensi eksplisit (`width`/`height` dan `aspect-ratio`), `loading="lazy"`, serta `decoding="async"` di sisi kode.

---

## 1. Spesifikasi Teknis per Kategori Aset

| Kategori Aset | Folder Tujuan | Rasio | Ukuran Maksimal | Format Utama (+ Fallback) | Target Ukuran File |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Foto Varian Produk** | `public/assets/products/` | `4:3` | `800 x 600 px` | `.webp` (opsional `.jpg` fallback) | `<= 120 KB` per foto |
| **Foto Showcase Carousel** | `public/assets/showcase/` | `16:9` | `1600 x 900 px` | `.webp` | `<= 220 KB` per foto |
| **Video Pendek Showcase** | `public/assets/showcase/` | `16:9` | `1280 x 720 px` (`<= 10 dtk`) | `.mp4` (H.264, tanpa audio) + poster `.webp` | `<= 3 MB` (maks `5 MB`) |
| **Gambar Open Graph (`og:image`)** | `public/brand/` | `1.91:1` | `1200 x 630 px` | `.jpg` atau `.png` | `<= 250 KB` |
| **Foto Kemasan / Hero Utama** | `public/assets/aistudio/` atau `public/brand/` | `1:1` / `4:3` | `<= 900 px` sisi terpanjang | `.webp` / `.jpg` | `<= 150 KB` |

### Aturan Penamaan File
- Gunakan huruf kecil seluruhnya, angka, dan tanda hubung (`kebab-case`).
- Jangan gunakan spasi, huruf kapital, atau karakter khusus.
- Contoh benar: `kebab-original.webp`, `showcase-panggang-01.webp`, `showcase-grill-01.mp4`.
- Contoh hindari: `Foto Kebab (1).JPG`, `IMG_20260401.png`.

### Standar Performa di Kode
- Seluruh `<img>` wajib memiliki `width` dan `height` eksplisit (atau kontainer ber-`aspect-ratio` tetap) agar bebas *Cumulative Layout Shift (CLS)*.
- Hanya gambar utama di **Hero** yang memakai `loading="eager"` dan `fetchpriority="high"`. Seluruh gambar lain memakai `loading="lazy"` dan `decoding="async"`.
- Seluruh `<video>` di `VisualShowcaseCarousel` wajib `preload="metadata"`, `muted`, `playsInline`, `poster`, dan tidak autoplay saat `prefers-reduced-motion: reduce`.

---

## 2. Daftar Aset yang Sudah Tersedia (Terverifikasi Lokal)

| File | Dimensi | Penggunaan Saat Ini |
| :--- | :--- | :--- |
| `public/assets/aistudio/visual_identitas_Kebab_Al_Firdaus_a36c5ca9.jpg` | `644 x 643 px` | Kartu utama Hero, Slide #1 `VisualShowcaseCarousel`, dan `og:image` sementara |
| `public/brand/kebab-al-firdaus-logo.webp` | Ikon merek | `apple-touch-icon` di `index.html` |
| `public/favicon.svg` | `64 x 64` vektor | Favicon tab browser |

---

## 3. Daftar Aset yang Masih Dibutuhkan dari Owner

### A. Foto Produk Katalog (7 file, rasio `4:3`, `800 x 600 px`)
Setelah file disimpan ke `public/assets/products/`, daftarkan path `src` dan `webpSrc` di `src/data/productAssets.ts`:

1. `kebab-original.webp` — Foto asli **Kebab Original** (disarankan potongan serong memperlihatkan isian daging dan sayuran).
2. `kebab-keju.webp` — Foto asli **Kebab Keju** (memperlihatkan saus/lumuran keju).
3. `kebab-pedas.webp` — Foto asli **Kebab Pedas** (memperlihatkan saus sambal/cabai).
4. `kebab-komplit.webp` — Foto asli **Kebab Komplit** (porsi jumbo dengan isian lengkap).
5. `roti-maryam.webp` — Foto asli **Roti Maryam Gurih / Manis**.
6. `bahan-grosir.webp` — Foto asli paket **Bahan Baku Kebab Grosir** (kulit tortilla, daging kebab, saus).
7. `pesanan-acara.webp` — Foto asli kemasan kotak **Paket Pesanan Acara / Hajatan**.

### B. Media Tambahan untuk `VisualShowcaseCarousel` (minimal 2–4 item, rasio `16:9`)
Setelah file disimpan ke `public/assets/showcase/`, tambahkan entri baru pada `SHOWCASE_MEDIA` di `src/data/showcaseMedia.ts` (navigasi panah, indikator, swipe, dan autoplay otomatis aktif jika `>= 2` media):

1. `showcase-grill-01.webp` — Proses pemanggangan kebab hangat di outlet.
2. `showcase-closeup-02.webp` — Close-up potongan kebab hangat siap santap.
3. `showcase-frozen-03.webp` — Kemasan frozen Kebab Al Firdaus (isi 5, 6, 10).
4. *(Opsional)* `showcase-grill-clip.mp4` + `showcase-grill-poster.webp` — Video pendek 5–8 detik tanpa audio proses memanggang kebab.

### C. Banner Sosial Media (`og:image`)
1. `public/brand/og-kebab-al-firdaus.jpg` (`1200 x 630 px`, rasio `1.91:1`) — Menggantikan foto kemasan persegi sementara agar preview link WhatsApp/Facebook/X tampil proporsional tanpa terpotong.
