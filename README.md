# Vending Cars

Aplikasi web sederhana bertema **vending machine mobil** untuk mensimulasikan pembelian mobil berdasarkan saldo pengguna.

## Fitur Utama

- Menampilkan daftar mobil beserta harga.
- Memilih mobil yang ingin dibeli.
- Validasi saldo saat transaksi:
  - memberi notifikasi sukses jika saldo cukup,
  - memberi notifikasi gagal jika saldo tidak cukup.
- Menampilkan sisa saldo setelah transaksi berhasil.
- Menambahkan mobil yang dibeli ke bagian **Garasi Anda**.
- Efek visual confetti saat transaksi berhasil.

## Teknologi yang Digunakan

- **HTML5** (`index.html`)
- **CSS3** (`style.css`)
- **JavaScript Vanilla** (`script.js`)
- Diagram alur sederhana di `flow.md` (Mermaid)

## Cara Menjalankan

Karena ini proyek frontend statis, tidak membutuhkan proses build khusus.

1. Clone repository:
   ```bash
   git clone https://github.com/ade781/vending-cars.git
   ```
2. Masuk ke folder project:
   ```bash
   cd vending-cars
   ```
3. Buka `index.html` langsung di browser.

Opsional (disarankan agar konsisten): jalankan server lokal sederhana, misalnya dengan Python:

```bash
python -m http.server 8000
```

Lalu akses `http://localhost:8000`.

## Struktur Singkat

```text
vending-cars/
├── index.html   # Struktur halaman utama
├── style.css    # Seluruh styling tampilan
├── script.js    # Logika data mobil dan transaksi
├── flow.md      # Diagram alur transaksi (Mermaid)
└── README.md
```

## Kontribusi

Kontribusi terbuka melalui pull request:

1. Fork repository ini.
2. Buat branch fitur/perbaikan.
3. Lakukan perubahan yang terfokus dan jelas.
4. Pastikan perubahan tidak merusak fungsi yang ada.
5. Kirim pull request ke branch `master`.

---

Jika menemukan bug atau ide pengembangan, silakan buka issue di repository ini.
