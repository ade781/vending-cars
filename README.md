# Vending Cars — Dashboard Showroom Mobil

Aplikasi web statis untuk simulasi pembelian mobil dari mesin vending virtual dengan tampilan showroom modern. Pengguna dapat memilih mobil, memasukkan saldo, menjalankan transaksi, lalu melihat hasil pembelian di panel garasi.

## Fitur Utama

- Daftar mobil dengan harga dalam format Rupiah.
- Seleksi mobil dengan status visual terpilih.
- Input saldo pengguna dan validasi nominal.
- Simulasi pembelian dengan hasil:
  - **Berhasil** jika saldo cukup (termasuk sisa saldo).
  - **Gagal** jika saldo kurang (termasuk kekurangan dana).
- Modal feedback transaksi (success/error).
- Efek confetti saat transaksi berhasil.
- Garasi pembelian yang menampilkan riwayat mobil yang berhasil dibeli.
- Fallback gambar ketika sumber gambar eksternal gagal dimuat.

## Cara Menjalankan

Karena proyek ini tanpa build tool, aplikasi dapat dijalankan langsung:

1. Clone repository.
2. Buka file `index.html` di browser.

Opsional untuk pengalaman lokal yang lebih stabil (terutama CORS pada beberapa browser):

- Jalankan server statis sederhana dari root proyek (misal `python -m http.server`), lalu akses melalui browser.

## Contoh Penggunaan

1. Pilih satu mobil pada katalog.
2. Isi saldo, contoh: `1000000000`.
3. Klik tombol **Beli Sekarang**.
4. Lihat hasil transaksi pada modal:
   - Jika berhasil, cek mobil yang masuk ke panel garasi.
   - Jika gagal, lihat nominal kekurangan saldo.

## Alur Transaksi Singkat

1. Render daftar mobil.
2. Pengguna memilih mobil.
3. Pengguna memasukkan saldo.
4. Sistem memvalidasi input saldo.
5. Sistem membandingkan saldo dengan harga mobil:
   - Saldo cukup → transaksi berhasil, tampil confetti, mobil masuk garasi.
   - Saldo kurang → transaksi gagal, tampil info kekurangan.

Detail diagram alur tersedia di `flow.md`.

## Struktur File

```text
.
├── index.html   # Struktur halaman utama
├── style.css    # Seluruh styling antarmuka
├── script.js    # Logika interaksi dan transaksi
├── flow.md      # Diagram alur transaksi (Mermaid)
└── README.md    # Dokumentasi proyek
```

## Teknologi

- HTML5
- CSS3 (layout responsif, animasi, state visual)
- JavaScript Vanilla (DOM API)
- Font eksternal dari Google Fonts

## Catatan Aset Gambar Eksternal

- Sebagian gambar mobil berasal dari URL eksternal.
- Ketersediaan gambar bergantung pada server sumber masing-masing.
- Aplikasi menyediakan fallback placeholder saat gambar gagal dimuat.

## Pengembangan Lanjutan (Saran)

- Menambahkan penyimpanan lokal (Local Storage) untuk riwayat garasi.
- Menambahkan filter/sort daftar mobil (harga, kategori).
- Menambahkan pencarian mobil berdasarkan nama.
- Menambahkan indikator validasi input real-time.
- Menambahkan unit test sederhana untuk fungsi format dan validasi.

## Kredit

- Pengembang: **ADE7**
- Inspirasi antarmuka: konsep vending machine + dashboard showroom modern.
