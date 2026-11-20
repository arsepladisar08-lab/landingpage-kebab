# Panduan Media Visual Showcase Carousel

Letakkan foto atau video murni (tanpa teks promo menumpuk) untuk `VisualShowcaseCarousel` di folder ini (`public/assets/showcase/`), lalu daftarkan pada `src/data/showcaseMedia.ts`.

## Spesifikasi Media yang Direkomendasikan
- **Foto Landscape**: rasio `16:9` atau `21:9` (`1600 x 900 px`), format `.webp` / `.jpg` (`< 250 KB`), set `fit: 'cover'`.
- **Video Singkat**: rasio `16:9`, durasi `5-15 detik`, format `.mp4` (H.264, tanpa audio/muted, `< 4 MB`), lengkapi `poster` gambar pertama.
- **Foto Rasio Persegi/Khusus**: set `fit: 'contain'` agar ditampilkan proporsional tanpa terpotong.

## Media yang Disarankan untuk Diisi
1. `proses-panggang-kebab.mp4` (atau `.webp`): cuplikan daging kebab dan tortilla dipanggang hangat.
2. `close-up-kebab-keju.webp`: foto close-up potongan kebab dan lumuran saus.
3. `kemasan-frozen-isi-5-6-10.webp`: foto deretan kemasan frozen siap simpan.
4. `outlet-medaeng-kulon.webp`: foto suasana outlet Kebab Al Firdaus di Medaeng Kulon.

Catatan: Saat hanya 1 media tersedia, `VisualShowcaseCarousel` otomatis menampilkannya secara proporsional tanpa panah dan indikator slide. Begitu 2+ media ditambahkan ke `src/data/showcaseMedia.ts`, navigasi panah, indikator, swipe, dan autoplay otomatis aktif.
