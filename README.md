# Vending Cars

Aplikasi web sederhana bertema **mesin vending mobil**. Pengguna dapat memilih mobil, memasukkan saldo, lalu melakukan simulasi pembelian. Mobil yang berhasil dibeli akan masuk ke daftar **garasi**.

## Fitur Utama

- Menampilkan daftar mobil beserta harga.
- Memilih satu mobil sebelum transaksi.
- Input saldo dengan validasi angka.
- Simulasi transaksi:
  - Berhasil jika saldo cukup (menampilkan sisa saldo).
  - Gagal jika saldo kurang (menampilkan kekurangan dana).
- Menyimpan daftar mobil yang sudah dibeli pada sesi berjalan (ditampilkan di panel garasi).
- Modal notifikasi sukses/gagal dan efek confetti saat transaksi berhasil.

## Teknologi yang Digunakan

Project ini menggunakan frontend statis tanpa framework:

- **HTML5** (`index.html`)
- **CSS3** (`style.css`)
- **JavaScript Vanilla** (`script.js`)

## Cara Menjalankan Project

Karena ini proyek statis, tidak perlu instalasi dependency.

1. Clone repository:

   ```bash
   git clone https://github.com/ade781/vending-cars.git
   cd vending-cars
   ```

2. Jalankan aplikasi:
   - Buka file `index.html` langsung di browser, **atau**
   - Jalankan dengan static server lokal (opsional) agar proses pengembangan lebih nyaman.

## Struktur Project

```text
vending-cars/
├── index.html   # Struktur halaman utama
├── style.css    # Styling antarmuka
├── script.js    # Logika aplikasi dan transaksi
└── flow.md      # Diagram alur transaksi (Mermaid)
```

## Kontribusi

Kontribusi terbuka untuk perbaikan tampilan, UX, atau logika aplikasi.

1. Fork repository ini.
2. Buat branch baru untuk perubahan Anda.
3. Commit perubahan dengan pesan yang jelas.
4. Buka Pull Request ke branch `master`.

Pastikan perubahan tetap menjaga fungsi yang sudah ada.
