# File: vending_machine_v3.py

# --- Data mobil diperbanyak ---
CARS_AVAILABLE = {
    '1': {'nama': 'City Car Listrik', 'harga': 450000000},
    '2': {'nama': 'Sedan Klasik', 'harga': 500000000},
    '3': {'nama': 'Pickup 4x4 Diesel', 'harga': 650000000},
    '4': {'nama': 'SUV Keluarga 7-Seater', 'harga': 750000000},
    '5': {'nama': 'MPV Premium Hybrid', 'harga': 900000000},
    '6': {'nama': 'Mobil Sport Turbo V6', 'harga': 1200000000},
    # Hati-hati dengan jumlah nol :)
    '7': {'nama': 'Supercar V12', 'harga': 55000000000}
}


def tampilkan_daftar_mobil():
    """Menampilkan daftar mobil yang tersedia, termasuk opsi keluar."""
    print("\n" + "="*45)
    print("SELAMAT DATANG DI VENDING MACHINE MOBIL MEWAH")
    print("="*45)
    print("Silakan pilih mobil Anda:")
    for key, car in CARS_AVAILABLE.items():
        # Format harga agar mudah dibaca, dengan lebar kolom yang rapi
        print(f"[{key}] {car['nama']:<25} - Rp{car['harga']:,}")
    print("-" * 45)
    print("[0] Keluar dari program")
    print("="*45)


def proses_transaksi(pilihan_mobil: str, saldo_pengguna: int):
    """
    Fungsi ini tidak perlu diubah. Logikanya solid dan mengembalikan status
    yang jelas untuk ditindaklanjuti oleh fungsi main().
    """
    if pilihan_mobil in CARS_AVAILABLE:
        mobil_dipilih = CARS_AVAILABLE[pilihan_mobil]
        harga_mobil = mobil_dipilih['harga']

        print(f"\nAnda memilih: {mobil_dipilih['nama']}")
        print(f"Harga: Rp{harga_mobil:,}")
        print(f"Saldo Anda: Rp{saldo_pengguna:,}")

        if saldo_pengguna >= harga_mobil:
            kembalian = saldo_pengguna - harga_mobil
            print("\n[TRANSAKSI BERHASIL!]")
            print(f"Selamat! Anda telah membeli {mobil_dipilih['nama']}.")
            print(f"Sisa saldo Anda (kembalian): Rp{kembalian:,}")
            return "Transaksi Berhasil"  # <-- Return value kunci
        else:
            kekurangan = harga_mobil - saldo_pengguna
            print("\n[TRANSAKSI GAGAL!]")
            print("Maaf, saldo Anda tidak mencukupi.")
            print(f"Kekurangan dana sebesar: Rp{kekurangan:,}")
            return "Transaksi Gagal: Saldo tidak cukup"  # <-- Return value kunci
    else:
        print("\n[ERROR] Pilihan mobil tidak valid.")
        return "Error: Pilihan tidak valid"


def main():
    """
    Fungsi utama yang diubah untuk keluar dari loop setelah transaksi sukses.
    """
    while True:
        tampilkan_daftar_mobil()

        pilihan = input("Masukkan nomor pilihan Anda: ")

        if pilihan == '0':
            print("\nTerima kasih telah menggunakan layanan kami. Sampai jumpa!")
            break

        if pilihan not in CARS_AVAILABLE:
            print(f"\n[ERROR] Pilihan '{pilihan}' tidak ada dalam daftar.")
            input("Tekan Enter untuk kembali ke menu utama...")
            continue

        try:
            saldo_str = input(f"Masukkan jumlah saldo Anda (hanya angka): ")
            saldo = int(saldo_str)
        except ValueError:
            print("\n[ERROR] Input saldo harus berupa angka yang valid.")
            input("Tekan Enter untuk kembali ke menu utama...")
            continue

        # --- Bagian Logika yang Diubah ---
        # 1. Tangkap hasil dari fungsi proses_transaksi
        hasil = proses_transaksi(pilihan, saldo)

        # 2. Cek hasilnya. Jika "Transaksi Berhasil", keluar dari loop.
        if hasil == "Transaksi Berhasil":
            break

        # 3. Jika tidak berhasil (gagal/error), program akan lanjut ke sini.
        #    Beri jeda agar pengguna bisa membaca pesan sebelum loop berulang.
        input("\nTekan Enter untuk kembali ke menu utama...")


if __name__ == "__main__":
    main()
