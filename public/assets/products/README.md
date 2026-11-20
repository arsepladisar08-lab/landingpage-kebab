# Panduan Aset Foto Produk — Kebab Al Firdaus

Letakkan foto produk asli Kebab Al Firdaus di folder ini (`public/assets/products/`), lalu aktifkan path-nya pada `src/data/productAssets.ts`.

## Spesifikasi Foto yang Direkomendasikan
- **Rasio**: `4:3` (landscape ringan agar konsisten di Hero, Katalog, Detail Menu, dan Keranjang)
- **Resolusi ideal**: `800 x 600 px` atau `1200 x 900 px`
- **Format utama**: `.webp` (disarankan, ukuran `< 150 KB` per foto) dengan opsi cadangan `.jpg`

## Daftar Foto yang Dibutuhkan (Sesuai Data Produk Aktif)

| ID Produk | Nama Produk | Nama File Target | Status Saat Ini |
| :--- | :--- | :--- | :--- |
| `original` | Kebab Original | `kebab-original.webp` / `.jpg` | Belum tersedia (pakai ilustrasi fallback) |
| `keju` | Kebab Keju | `kebab-keju.webp` / `.jpg` | Belum tersedia (pakai ilustrasi fallback) |
| `pedas` | Kebab Pedas | `kebab-pedas.webp` / `.jpg` | Belum tersedia (pakai ilustrasi fallback) |
| `komplit` | Kebab Komplit | `kebab-komplit.webp` / `.jpg` | Belum tersedia (pakai ilustrasi fallback) |
| `maryam` | Roti Maryam Gurih / Manis | `roti-maryam.webp` / `.jpg` | Belum tersedia (pakai ilustrasi fallback) |
| `bahan-grosir` | Bahan Baku Kebab Grosir | `bahan-grosir.webp` / `.jpg` | Belum tersedia (pakai ilustrasi fallback) |
| `pesanan-acara` | Paket Pesanan Acara / Hajatan | `pesanan-acara.webp` / `.jpg` | Belum tersedia (pakai ilustrasi fallback) |

## Cara Mengaktifkan Foto Asli
1. Salin file foto ke folder `public/assets/products/` dengan nama file di tabel di atas.
2. Buka `src/data/productAssets.ts` dan isi properti `src` (dan `webpSrc` jika ada), misalnya:
   ```ts
   original: {
     src: '/assets/products/kebab-original.jpg',
     webpSrc: '/assets/products/kebab-original.webp',
     ...
   }
   ```
3. Jika suatu saat file foto gagal dimuat, komponen `ProductImage` otomatis menampilkan ilustrasi fallback tanpa merusak tata letak.
