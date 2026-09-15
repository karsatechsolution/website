// ============================================================
// KarsaTech Solution - Konfigurasi Terpusat
// Ubah nilai di file ini saja, semua bagian website akan
// mengikuti secara otomatis.
// ============================================================

const CONFIG = {
  businessName: "KarsaTech Solution",
  tagline: "Percetakan ID Card PVC Custom",

  // Nomor WhatsApp dalam format internasional tanpa tanda +.
  // Contoh untuk 0812xxxxxxx dari Indonesia: "62812xxxxxxx"
  // KOSONGKAN jika belum ada, tombol WhatsApp akan tetap aman.
  whatsapp: "",

  tiktok: "https://www.tiktok.com/@karsatech.solutio",
  tiktokUser: "@karsatech.solutio",

  // URL Google Business / Google Maps. KOSONGKAN jika belum ada,
  // tombol "Lihat Google Business" otomatis disembunyikan.
  googleBusiness: "",

  location: "Ciseeng, Kabupaten Bogor",
  serviceArea: "Ciseeng, Kabupaten Bogor dan sekitarnya",

  // Harga per kartu berdasarkan jumlah pesanan.
  // price: 0 => Hubungi Kami.
  priceTiers: [
    { min: 1, max: 9, price: 10000 },
    { min: 10, max: 24, price: 9500 },
    { min: 25, max: 49, price: 9000 },
    { min: 50, max: 99, price: 8500 },
    { min: 100, max: 199, price: 8000 },
    { min: 200, max: 499, price: 7500 },
    { min: 500, max: null, price: 0 }
  ],

  // Tampilkan section testimoni. Saat testimoni asli sudah ada,
  // isi array testimonials di bawah. Jika testimonialsEnabled false
  // maka section tidak ditampilkan sama sekali.
  testimonialsEnabled: true,

  // CONTOH/DEMO untuk keperluan tampilan. Ganti dengan testimoni asli
  // sebelum website dipublikasikan. Setiap item: name, category,
  // rating (1-5), text.
  testimonials: [
    {
      name: "Contoh: Ibu Sari (Pihak Sekolah)",
      category: "Sekolah",
      rating: 5,
      text: "Contoh keterangan. Ganti teks ini dengan testimoni asli dari pelanggan.",
      demo: true
    },
    {
      name: "Contoh: Mas Rizky (Panitia Event)",
      category: "Event",
      rating: 5,
      text: "Contoh keterangan. Ganti teks ini dengan testimoni asli dari pelanggan.",
      demo: true
    },
    {
      name: "Contoh: Bu Dewi (Kantor)",
      category: "Kantor",
      rating: 4,
      text: "Contoh keterangan. Ganti teks ini dengan testimoni asli dari pelanggan.",
      demo: true
    }
  ],

  priceNote:
    "Harga dapat disesuaikan berdasarkan spesifikasi, desain, finishing, dan jumlah pesanan."
};