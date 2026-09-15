# KarsaTech Solution Website

Website statis percetakan ID Card PVC Custom untuk **KarsaTech Solution** —
melayani **Ciseeng, Kabupaten Bogor dan sekitarnya**.

Dibangun dengan **HTML5, CSS3, dan JavaScript Vanilla**. Tidak membutuhkan
server, framework, atau database, sehingga 100% kompatibel dengan **GitHub Pages**.

## Struktur

```
/
├── index.html          # Halaman utama (hero, produk, harga, gallery, dll)
├── blog.html           # Halaman daftar artikel blog
├── blog/               # Artikel blog SEO
├── style.css           # Semua styling (CSS variables, mobile-first)
├── script.js           # Kalkulator, gallery, lightbox, slider, FAQ, dll
├── config.js           # Semua konfigurasi yang sering berubah
├── images/             # Logo, hero, gallery, dan gambar produk
├── sitemap.xml
├── robots.txt
├── favicon.svg
└── README.md
```

## Cara Menjalankan

Langsung buka **`index.html`** di browser. Tidak perlu `npm install`, server,
atau build.

## Cara Mengubah Nomor WhatsApp

Buka **`config.js`**, isi kolom `whatsapp` dengan nomor dalam format
internasional tanpa tanda `+`, contoh:

```js
whatsapp: "6281234567890",
```

Semua tombol WhatsApp di website otomatis menggunakan nomor ini. Jika kolom
dikosongkan, tombol akan menampilkan peringatan agar `config.js` diisi.

## Cara Mengubah Harga

Edit array `priceTiers` di **`config.js`**. Format:

```js
priceTiers: [
  { min: 1, max: 9, price: 10000 },
  { min: 10, max: 24, price: 9500 },
  { min: 50, max: 99, price: 8500 },
  { min: 500, max: null, price: 0 } // 0 => Hubungi Kami
],
```

Tabel harga, kalkulator, dan estimasi grosir di halaman beranda mengikuti
konfigurasi ini secara otomatis.

## Cara Mengganti Logo

Ganti file **`images/logo.png`** (disarankan ukuran 512x512 px, transparan).
Ukuran logo di tampilkan 40x40 px.

## Cara Menambah Gallery

1. Tambahkan gambar ke folder **`images/gallery/`**.
2. Tambahkan satu objek di array `GALLERY` pada **`script.js`**:

```js
{ id: 13, title: "Nama Produk", cat: "sekolah", catLabel: "Sekolah",
  desc: "Deskripsi singkat.", img: "./images/gallery/id-card-13.jpg" }
```

Kategori (`cat`) yang tersedia: `sekolah`, `karyawan`, `panitia`,
`komunitas`, `event`, `custom`.

## Gambar Produk

Gambar di **`images/`** saat ini masih berupa **placeholder** yang dibuat
programmatically agar website tetap tampil profesional. Ganti dengan foto
produk asli Anda sebelum dipublikasikan. Jika suatu gambar gagal dimuat,
website otomatis menampilkan placeholder bertuliskan **KarsaTech Solution**
dan nama produk.

## Testimoni

Testimoni di **`config.js`** saat ini berisi data **contoh/demo** yang diberi
label. Ganti dengan testimoni pelanggan asli. Untuk menyembunyikan seluruh
section testimoni, set `testimonialsEnabled: false`.

## SEO yang Perlu Diperbarui

Sebelum deploy, ganti nilai `https://username.github.io/karsatech-solution/`
di:

- `canonical` dan Open Graph pada semua file HTML
- JSON-LD `LocalBusiness` di `index.html`
- `sitemap.xml`
- `robots.txt`

Ganti juga `https://username.github.io/karsatech-solution` dengan nama
repository asli Anda.

## Cara Deploy GitHub Pages

1. Buat repository baru di GitHub (misalnya `karsatech-solution`).
2. Upload semua file website ke repository (bisa via `git push`).
3. Buka **Settings** repository.
4. Pilih menu **Pages** di bagian kiri.
5. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
6. Pilih branch **main** dan folder **/ (root)**.
7. Klik **Save**.

Website akan online di `https://usernamegithub.github.io/karsatech-solution/`
dalam beberapa menit.

## Lisensi

Proyek untuk keperluan KarsaTech Solution. Silakan dikembangkan sesuai kebutuhan.