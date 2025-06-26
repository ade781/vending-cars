```mermaid
graph TD
    Node1[Awal Fungsi] --> Node2{Pilihan Valid?}
    Node2 -- True --> Node3[Ambil Data Mobil]
    Node2 -- False --> Node7[Error: Pilihan Tdk Valid]
    Node3 --> Node4{Saldo Cukup?}
    Node4 -- True --> Node5[OK: Transaksi Berhasil]
    Node4 -- False --> Node6[Gagal: Saldo Kurang]
    Node5 --> Node8[Akhir Fungsi]
    Node6 --> Node8
    Node7 --> Node8
