# PRD Website E-commerce Pisang Royal Pringgodani

Nov 19, 2026 · @Muhammad Fauzi

Website ini membuat pelanggan bisa melihat 5 menu pisang kembung, memilih rasa (boleh mix) dan topping, lalu memesan lewat WhatsApp atau Shopee hanya dengan beberapa ketukan.

## 1. Ringkasan dan tujuan

Pisang Royal Pringgodani membutuhkan etalase online yang mengubah pengunjung menjadi pesanan tanpa harus bertanya "menunya apa saja?" lewat chat. Website ini menampilkan menu, membiarkan pelanggan memilih satu atau lebih rasa serta topping, lalu mengirim pesanan yang sudah rapi ke WhatsApp toko atau mengarahkan pelanggan ke Shopee.

**Tujuan produk**

- Menampilkan 5 varian menu lengkap dengan foto dan harga di halaman Beranda dan Menu.
- Membiarkan pelanggan mencampur rasa dan memilih topping, dengan harga yang terhitung otomatis dan tidak salah.
- Mengirim pesanan terformat ke WhatsApp +62 877-0002-5038 dalam satu ketukan.
- Menyediakan jalur alternatif ke toko Shopee bagi pelanggan yang ingin memesan lewat aplikasi itu.
- Tampil hangat dengan nuansa kuning kalem dan nyaman dibuka dari HP.

**Masalah yang dituju (asumsi, mohon dikonfirmasi pemilik):** pelanggan sering menanyakan menu, harga, dan aturan mix rasa secara berulang; pesanan lewat chat bebas format sehingga mudah terlewat atau salah dicatat.

**Fakta dasar toko**

| Item | Isi |
| --- | --- |
| Nama toko | Pisang Royal Pringgodani |
| Produk | Pisang kembung, 5 varian menu |
| WhatsApp | +62 877-0002-5038 |
| Shopee | [Halaman toko di Shopee](https://shopee.co.id/universal-link/now-food/shop/20437367?deep_and_deferred=1&shareChannel=copy_link) |
| Nuansa visual | Kuning kalem |
| Sumber data | Diberikan langsung oleh pemilik toko |

## 2. Pengguna dan kebutuhan

Pengguna utama adalah pelanggan yang membuka website dari HP, biasanya lewat tautan di WhatsApp atau media sosial, dan ingin tahu menu, harga, serta cara memesan secepat mungkin. Persona berikut adalah asumsi awal untuk memandu keputusan desain.

| Persona | Kebutuhan utama | Perilaku yang diasumsikan |
| --- | --- | --- |
| Pelanggan baru | Melihat menu, foto, dan harga tanpa bertanya; paham bahwa rasa bisa di-mix | Membuka dari HP, menggulir cepat, memutuskan dalam hitungan menit |
| Pelanggan langganan | Memesan ulang kombinasi favorit dengan sedikit ketukan | Langsung ke menu, memilih rasa dan topping yang sama |
| Pemesan acara atau kantor | Memesan banyak porsi dengan catatan khusus | Mengisi jumlah besar dan catatan, lalu menegosiasikan lewat WhatsApp |
| Pemilik toko | Menerima pesanan yang jelas di WhatsApp; mengubah harga atau ketersediaan sendiri | Membalas pesanan dari HP, tidak ingin mengurus server |

**Cerita pengguna utama**

1. Sebagai pelanggan, saya ingin melihat semua menu beserta harganya di satu halaman, agar saya bisa memilih tanpa bertanya.
2. Sebagai pelanggan, saya ingin memilih lebih dari satu rasa dalam satu porsi, agar saya bisa mencoba kombinasi yang saya suka dengan harga tetap Rp20.000.
3. Sebagai pelanggan, saya ingin memilih topping (Oreo, keju, choco chips, meises, sprinkle), agar pisang saya sesuai selera.
4. Sebagai pelanggan, saya ingin memesan lewat WhatsApp dengan pesan yang sudah terisi otomatis, agar tidak perlu mengetik ulang.
5. Sebagai pelanggan, saya ingin pilihan memesan lewat Shopee, agar bisa memakai cara bayar dan pelacakan di aplikasi itu.
6. Sebagai pemilik toko, saya ingin pesanan masuk dengan format seragam, agar mudah dicatat dan diproses.

## 3. Lingkup rilis pertama (v1)

Rilis pertama berfokus pada etalase menu dan pemesanan lewat WhatsApp serta Shopee, tanpa backend dan tanpa pembayaran online, supaya bisa tayang cepat dan murah dirawat.

**Masuk lingkup v1**

- Website 10 halaman ringan: Beranda, Menu, Detail Menu, Keranjang, Checkout, Pesanan Terkirim, Kontak, Tentang, Privasi, dan 404 (lihat bagian 8).
- Tampilan katalog 5 menu dengan foto, nama, dan harga.
- Kustomisasi pesanan: pilih rasa (boleh mix), topping, jumlah, dan catatan.
- Keranjang belanja dan checkout yang menghasilkan pesan WhatsApp terformat.
- Tombol ke toko Shopee dan tombol WhatsApp.
- SEO dasar, berbagi tautan yang rapi, dan analitik dasar.

**Di luar lingkup v1**

- Payment gateway atau QRIS terintegrasi.
- Akun pelanggan dan riwayat pesanan.
- Perhitungan ongkos kirim otomatis.
- Stok real-time dan pelacakan status pesanan.
- Panel admin (direncanakan v2; di v1 data menu diubah lewat satu berkas data).
- Voucher, poin, dan program loyalitas.

## 4. Katalog menu dan harga

Toko menjual 5 varian pisang kembung dengan harga Rp17.000 sampai Rp20.000 per porsi, dan semua harga sudah termasuk topping pilihan.

| No | Menu | Harga per porsi | ID data | Foto yang dibutuhkan |
| --- | --- | --- | --- | --- |
| 1 | Pisang Kembung Coklat | Rp20.000 | `coklat` | Pisang kembung dengan coklat yang meleleh |
| 2 | Pisang Kembung Stroberi | Rp20.000 | `stroberi` | Pisang kembung dengan saus atau irisan stroberi |
| 3 | Pisang Kembung Matcha | Rp20.000 | `matcha` | Pisang kembung dengan nuansa hijau matcha |
| 4 | Pisang Kembung Tiramisu | Rp20.000 | `tiramisu` | Pisang kembung dengan taburan kakao ala tiramisu |
| 5 | Pisang Kembung ORI | Rp17.000 | `ori` | Pisang kembung polos keemasan |

Urutan tampil di website mengikuti urutan tabel ini. Harga dan ketersediaan tiap menu disimpan di satu berkas data (lihat bagian 12) agar pemilik bisa mengubahnya tanpa menyentuh desain.

## 5. Aturan mix rasa, topping, dan harga

Satu porsi bisa berisi satu rasa atau campuran rasa, dan harga mix tetap Rp20.000 karena ukuran porsinya sama; topping sudah termasuk dan tidak menambah harga.

**Aturan pesanan**

1. Pelanggan wajib memilih minimal 1 rasa per porsi dari lima varian: Coklat, Stroberi, Matcha, Tiramisu, ORI.
2. Jika pelanggan memilih lebih dari 1 rasa, porsi tersebut otomatis berlabel "Mix".
3. Topping yang tersedia: Oreo, Keju, Choco chips, Meises, Sprinkle. Pelanggan boleh juga memilih tanpa topping.
4. Topping tidak mengubah harga.
5. Harga per porsi Rp17.000 hanya jika rasa yang dipilih ORI saja; selain itu Rp20.000, termasuk semua mix.
6. Total pesanan = jumlah porsi dikali harga per porsi, dijumlahkan untuk semua porsi di keranjang.
7. Batas jumlah rasa per porsi dan batas jumlah topping per porsi disimpan sebagai pengaturan. Nilai awal sementara: maksimal 2 rasa dan maksimal 2 topping (asumsi, menunggu konfirmasi pemilik; lihat bagian 15).

**Contoh perhitungan**

| Pilihan pelanggan | Harga per porsi | Jumlah | Subtotal |
| --- | --- | --- | --- |
| Coklat saja + Oreo | Rp20.000 | 1 | Rp20.000 |
| Coklat + Matcha (Mix) + Keju + Sprinkle | Rp20.000 | 2 | Rp40.000 |
| ORI saja + Meises | Rp17.000 | 1 | Rp17.000 |
| ORI + Stroberi (Mix) + Choco chips | Rp20.000 | 1 | Rp20.000 |
| Tiramisu saja tanpa topping | Rp20.000 | 3 | Rp60.000 |

## 6. Kebutuhan fungsional

Delapan fitur wajib (P0) membentuk alur pesan dari melihat menu sampai pesan terkirim; fitur P1 melengkapi rilis pertama dan P2 menyusul setelahnya.

| ID | Fitur | Deskripsi | Prioritas | Kriteria penerimaan |
| --- | --- | --- | --- | --- |
| FR-01 | Tampilan menu | Kartu untuk tiap menu berisi foto, nama, harga, dan tombol Pesan | P0 | Kelima menu tampil sesuai urutan data; harga cocok dengan berkas data; foto dimuat tanpa menggeser tata letak |
| FR-02 | Kustomisasi pesanan | Panel (sheet di HP, modal di desktop) untuk memilih rasa, topping, jumlah, dan catatan | P0 | Panel terbuka dari tombol Pesan; menu yang diklik sudah terpilih sebagai rasa awal; tombol Tambah ke keranjang nonaktif jika belum ada rasa |
| FR-03 | Mix rasa | Pelanggan memilih lebih dari 1 rasa per porsi | P0 | Memilih 2 rasa menampilkan label Mix dan harga Rp20.000; melebihi batas rasa menampilkan pesan jelas |
| FR-04 | Pilihan topping | Lima topping berbentuk chip yang bisa dipilih atau dilepas | P0 | Topping tidak mengubah harga; melebihi batas topping menampilkan pesan jelas; boleh tanpa topping |
| FR-05 | Keranjang | Tambah, ubah jumlah, hapus, dan lihat subtotal serta total | P0 | Total selalu sesuai aturan bagian 5; isi keranjang bertahan setelah halaman dimuat ulang |
| FR-06 | Checkout ke WhatsApp | Formulir singkat (nama, ambil atau antar, alamat bila antar, catatan) lalu membuka WhatsApp dengan pesan terisi | P0 | Tombol membuka tautan wa.me ke 6287700025038 dengan isi pesan sesuai template lampiran; karakter khusus terkode benar |
| FR-07 | Tautan Shopee | Tombol Pesan via Shopee di header, bagian CTA, dan keranjang | P0 | Membuka halaman toko Shopee di tab baru dengan rel noopener |
| FR-08 | Info toko dan kontak | Halaman Kontak berisi WhatsApp, Shopee, alamat, dan jam buka | P0 | Semua data berasal dari berkas konfigurasi; nomor bisa diketuk untuk membuka WhatsApp |
| FR-09 | Tombol WhatsApp mengambang | Tombol tetap di sudut layar | P1 | Terlihat di semua bagian, tidak menutupi tombol utama keranjang |
| FR-10 | Penanda menu habis | Menu bisa ditandai Habis di berkas data | P1 | Menu Habis tampil redup dan tidak bisa dipesan |
| FR-11 | SEO dan berbagi tautan | Judul, deskripsi, gambar pratinjau, dan data terstruktur | P1 | Tautan di WhatsApp dan media sosial menampilkan pratinjau berisi nama toko dan foto |
| FR-12 | Analitik | Pencatatan peristiwa utama (bagian 13) | P1 | Peristiwa muncul di dasbor analitik dalam 24 jam |
| FR-13 | Penanda menu favorit | Lencana Favorit atau Terlaris pada menu tertentu | P2 | Lencana diatur dari berkas data |
| FR-14 | Panel admin | Mengubah harga, foto, dan ketersediaan tanpa menyunting berkas | P2 | Pemilik bisa memperbarui harga tanpa bantuan pengembang |

## 7. Alur pemesanan

Pelanggan memesan lewat satu alur lurus dari memilih menu sampai pesan terbuka di WhatsApp atau halaman toko terbuka di Shopee; website tidak memproses pembayaran.

&#91;embedded content: alur pemesanan - dari pilih menu sampai WhatsApp atau Shopee\]

**Aturan alur**

- WhatsApp adalah jalur utama; Shopee adalah jalur alternatif yang bisa dibuka dari Beranda, Menu, dan Keranjang.
- Tombol Tambah ke keranjang nonaktif sampai minimal 1 rasa dipilih.
- Keranjang tersimpan di perangkat pelanggan, bukan di server.
- Website tidak bisa memastikan pesan WhatsApp benar-benar terkirim; pesanan resmi baru ada setelah toko membalas di WhatsApp.

## 8. Struktur halaman dan sitemap

Website terdiri dari 10 halaman ringan yang dibuat mobile-first: Beranda merangkum seluruh isi toko, sedangkan halaman lain menangani menu, pemesanan, dan informasi pendukung.

&#91;embedded content: sitemap - 9 halaman dan dua pintu pesan\]

Beranda menjadi pusat navigasi; pemesanan mengalir dari Menu atau Keranjang ke Checkout lalu ke WhatsApp. Halaman 404 tidak digambar.

**Daftar halaman**

| No | Halaman | URL | Tujuan | Prioritas |
| --- | --- | --- | --- | --- |
| 1 | Beranda | `/` | Memperkenalkan toko, menampilkan menu unggulan, mengajak memesan | P0 |
| 2 | Menu | `/menu` | Katalog lengkap 5 menu beserta aturan mix dan topping | P0 |
| 3 | Detail Menu | `/menu/[id]` (contoh `/menu/coklat`) | Foto besar, kustomisasi rasa dan topping, tambah ke keranjang; bisa dibagikan lewat tautan | P0 |
| 4 | Keranjang | `/keranjang` | Meninjau dan mengubah pesanan, melihat total | P0 |
| 5 | Checkout | `/checkout` | Mengisi data pemesan lalu mengirim pesanan ke WhatsApp | P0 |
| 6 | Pesanan Terkirim | `/pesanan-terkirim` | Petunjuk setelah WhatsApp dibuka, tombol cadangan | P0 |
| 7 | Kontak | `/kontak` | WhatsApp, Shopee, alamat, jam buka | P0 |
| 8 | Tentang | `/tentang` | Cerita singkat toko dan keunggulan produk | P1 |
| 9 | Privasi | `/privasi` | Kebijakan privasi singkat | P1 |
| 10 | Tidak Ditemukan | halaman 404 | Mengarahkan kembali ke Menu dan Beranda | P1 |

**Komponen yang tampil di banyak halaman**

| Komponen | Isi dan perilaku |
| --- | --- |
| Header | Nama toko di kiri; tautan Beranda, Menu, Tentang, Kontak; ikon keranjang dengan jumlah porsi; menjadi menu lipat di HP; menempel di atas saat menggulir |
| Footer | Nama toko, tautan halaman, WhatsApp, Shopee, tautan Privasi, hak cipta |
| Panel kustomisasi | Panel geser dari bawah di HP dan modal di desktop; dibuka dari tombol Pesan di kartu menu; memuat komponen yang sama dengan halaman Detail Menu |
| Panel keranjang | Panel geser dari kanan yang menampilkan isi keranjang ringkas dan tombol ke halaman Keranjang |
| Bilah keranjang bawah | Hanya di HP saat keranjang berisi: jumlah porsi, total, tombol Lihat Keranjang |
| Tombol WhatsApp mengambang | Sudut kanan bawah; disembunyikan di Keranjang, Checkout, dan Pesanan Terkirim agar tidak menutupi tombol utama |
| Tombol Shopee | Tautan keluar ke halaman toko Shopee, selalu dibuka di tab baru |

### 8.1 Beranda (`/`)

Bagian dari atas ke bawah:

1. **Hero.** Nama toko, tagline, foto unggulan. Tombol Lihat Menu (primer) dan Pesan via WhatsApp (hijau).
2. **Menu unggulan.** Lima kartu menu ringkas (foto, nama, harga, tombol Pesan) dan tautan Lihat semua menu.
3. **Mix Rasa dan Topping.** Dua kalimat penjelasan, contoh satu mix, dan lima chip topping.
4. **Cara Pesan.** Tiga langkah berikon: pilih rasa dan topping, isi keranjang, kirim ke WhatsApp.
5. **Pita Shopee.** Ajakan untuk pelanggan yang lebih suka memesan lewat Shopee, dengan tombol keluar.
6. **Kontak ringkas.** WhatsApp, jam buka, alamat, dan tautan ke halaman Kontak.

SEO: judul `Pisang Royal Pringgodani - Pisang Kembung Aneka Rasa`; deskripsi `Pisang kembung renyah rasa coklat, stroberi, matcha, tiramisu, dan ORI. Rasa bisa di-mix, topping lengkap. Pesan lewat WhatsApp atau Shopee.`

### 8.2 Menu (`/menu`)

- Judul halaman dan satu kalimat aturan: rasa boleh di-mix, harga mix Rp20.000, topping sudah termasuk.
- Grid 5 kartu menu. Isi kartu: foto 4:3, nama, harga, satu baris deskripsi, tombol Pesan (membuka panel kustomisasi), tautan Detail.
- Blok topping: lima chip topping dengan foto kecil.
- Kondisi khusus: menu bertanda Habis tampil redup dengan label dan tombol nonaktif; foto yang gagal dimuat diganti penampung berwarna krem.
- Grid: 1 kolom di HP, 2 di tablet, 3 di desktop.

### 8.3 Detail Menu (`/menu/[id]`)

- Foto besar, nama, harga per porsi, deskripsi singkat.
- **Rasa.** Chip untuk lima rasa; rasa dari halaman ini terpilih lebih dulu; memilih lebih dari satu memunculkan label Mix.
- **Topping.** Lima chip; boleh dikosongkan.
- **Jumlah.** Stepper 1 sampai 99 porsi.
- **Catatan.** Kolom teks maksimal 140 karakter.
- Harga per porsi dan subtotal berubah seketika saat pilihan berubah.
- Tombol Tambah ke keranjang (primer) dan Beli lewat Shopee (sekunder).
- Bagian Menu lainnya berisi kartu empat menu lain.
- Galat: jika tidak ada rasa, tombol nonaktif dan tampil petunjuk "Pilih minimal 1 rasa"; jika melewati batas rasa atau topping, tampil pesan "Maksimal N rasa/topping per porsi" dengan N dari pengaturan.

### 8.4 Keranjang (`/keranjang`)

- Satu baris per porsi: foto kecil, nama (untuk mix ditulis "Mix: Coklat + Matcha"), daftar topping, harga per porsi, stepper jumlah, tombol Ubah dan Hapus.
- Ringkasan: jumlah porsi dan total.
- Tombol Lanjut ke Checkout (primer), Pesan via Shopee (sekunder), dan tautan Tambah menu lain.
- Kondisi kosong: teks "Keranjangmu masih kosong" dan tombol Lihat Menu.
- Isi keranjang yang sama juga tampil di panel geser dari ikon keranjang di header.

### 8.5 Checkout (`/checkout`)

| Kolom | Aturan |
| --- | --- |
| Nama | Wajib |
| Metode | Wajib; pilihan Ambil di tempat atau Antar |
| Alamat lengkap | Wajib bila Antar; disembunyikan bila Ambil di tempat |
| Waktu ambil atau antar | Opsional; teks bebas |
| Catatan pesanan | Opsional; maksimal 280 karakter |

- Ringkasan pesanan dan total tampil di samping formulir (desktop) atau di atasnya (HP).
- Tombol Kirim ke WhatsApp (hijau, utama) membuka WhatsApp dengan pesan terisi sesuai template di lampiran, lalu mengarahkan ke Pesanan Terkirim.
- Validasi ditampilkan di bawah kolom yang bermasalah; isi formulir tidak hilang saat ada galat.
- Keterangan di bawah tombol: ongkos kirim dan ketersediaan dikonfirmasi toko lewat WhatsApp (asumsi, lihat bagian 15). Data hanya dikirim ke WhatsApp toko.

### 8.6 Pesanan Terkirim (`/pesanan-terkirim`)

- Teks utama: "WhatsApp sedang dibuka. Tekan Kirim di WhatsApp agar pesananmu diproses."
- Tombol cadangan: Buka WhatsApp lagi dan Salin isi pesan, untuk perangkat yang tidak membuka WhatsApp otomatis.
- Ringkasan pesanan terakhir.
- Tombol Kosongkan keranjang dan kembali ke menu. Keranjang tidak dikosongkan otomatis, karena website tidak bisa memastikan pesan benar-benar terkirim.

### 8.7 Kontak (`/kontak`)

- WhatsApp +62 877-0002-5038 (ketuk untuk chat), tautan Shopee, alamat, jam buka, dan area antar.
- Tombol Buka di Google Maps; peta tertanam tidak dipakai di v1 demi kecepatan.
- Semua data dibaca dari berkas konfigurasi. Alamat, jam buka, dan area antar belum diberikan (lihat bagian 15).

### 8.8 Tentang (`/tentang`)

- Cerita singkat toko, foto produk atau dapur, dan tiga poin keunggulan; teks disediakan pemilik toko.
- Tombol Lihat Menu di akhir halaman.

### 8.9 Privasi (`/privasi`)

- Penjelasan singkat: tanpa akun, keranjang tersimpan di perangkat, data pesanan hanya dikirim ke WhatsApp toko saat pelanggan menekan tombol kirim, dan cara menghubungi toko.
- Dijelaskan juga bila memakai analitik atau cookie.

### 8.10 Tidak Ditemukan (404)

- Pesan ramah, tombol Lihat Menu dan Kembali ke Beranda.

## 9. Desain visual: kuning kalem

Nuansa utama adalah kuning kalem berupa butter yellow yang lembut di atas latar krem, dengan teks coklat tua agar tetap terbaca jelas; tombol aksi memakai kuning yang sedikit lebih pekat.

| Peran | Warna | Hex | Pemakaian |
| --- | --- | --- | --- |
| Latar halaman | Krem susu | `#FFF9E8` | Latar utama |
| Permukaan | Kuning pucat | `#FBEFC6` | Kartu, bagian bergantian |
| Kuning kalem (primer) | Butter | `#F4D985` | Hero, chip terpilih, ornamen |
| Aksi utama | Kuning madu | `#E3B23C` | Tombol utama, sorotan |
| Teks utama | Coklat tua | `#3B2A0E` | Judul dan isi |
| Teks sekunder | Coklat sedang | `#6B5A3A` | Keterangan |
| Garis | Krem tua | `#EADFBF` | Pembatas, tepi kartu |
| WhatsApp | Hijau tua | `#1F7A52` | Tombol Kirim ke WhatsApp, teks putih |
| Shopee | Oranye | `#EE4D2D` | Tombol Pesan via Shopee (gaya garis tepi) |
| Galat | Merah bata | `#B3402A` | Pesan kesalahan |

**Tipografi.** Judul memakai huruf bulat bersahabat seperti Baloo 2 atau Fredoka; isi memakai Nunito. Ukuran isi 16 px di HP; judul utama 32 sampai 44 px.

**Bentuk dan jarak.** Kelipatan 8 px; sudut kartu 16 px; tombol berbentuk kapsul; bayangan tipis dan lembut; foto berbingkai sudut membulat.

**Komponen utama:** tombol primer, sekunder, dan hijau WhatsApp; kartu menu; chip rasa dan chip topping (keadaan biasa, terpilih, nonaktif); stepper jumlah; label Mix; bilah keranjang bawah; panel geser keranjang.

**Aturan kontras.** Teks pada latar kuning selalu coklat tua, tidak pernah putih. Rasio kontras teks target minimal 4,5 banding 1 dan diverifikasi dengan alat pemeriksa saat desain final. Status terpilih tidak hanya dibedakan lewat warna, tetapi juga ikon centang.

## 10. Konten dan foto

Setiap varian membutuhkan satu foto sesuai rasanya, ditambah foto Mix dan foto topping; foto sebaiknya diambil sendiri oleh toko agar sesuai produk asli dan bebas masalah hak cipta.

| Berkas | Isi foto | Teks alternatif |
| --- | --- | --- |
| `coklat.webp` | Pisang kembung dengan coklat yang meleleh | Pisang kembung rasa coklat |
| `stroberi.webp` | Pisang kembung dengan saus atau irisan stroberi | Pisang kembung rasa stroberi |
| `matcha.webp` | Pisang kembung dengan matcha | Pisang kembung rasa matcha |
| `tiramisu.webp` | Pisang kembung dengan taburan kakao ala tiramisu | Pisang kembung rasa tiramisu |
| `ori.webp` | Pisang kembung polos keemasan | Pisang kembung rasa original |
| `mix.webp` | Satu porsi dengan dua rasa dan topping | Pisang kembung rasa mix |
| `topping-*.webp` | Oreo, keju, choco chips, meises, sprinkle | Nama topping |
| `hero.webp` | Foto unggulan untuk beranda dan pratinjau tautan | Pisang Royal Pringgodani |

**Spesifikasi foto:** rasio 4:3 untuk kartu menu dan 16:9 untuk hero; lebar minimal 1200 px; format WebP dengan ukuran di bawah 150 KB per foto; latar hangat dan terang; pisang jadi titik fokus.

**Sumber foto.** Foto yang dipakai harus milik toko atau berlisensi untuk penggunaan komersial. Foto sementara dari stok berlisensi boleh dipakai selama belum ada foto asli, tetapi harus diganti sebelum rilis publik; foto dari internet tanpa izin tidak dipakai.

**Teks bawaan (usulan, bisa diubah):**

- Tagline: "Pisang kembung renyah, rasanya bisa kamu campur sendiri."
- Penjelasan mix: "Mau dua rasa dalam satu porsi? Boleh. Harganya tetap Rp20.000 dan topping sudah termasuk."
- Bahasa: Indonesia, nada ramah dan santai.

## 11. Kebutuhan non-fungsional

Target utama adalah halaman yang terbuka cepat di HP dengan jaringan 4G dan bisa dipakai semua orang.

| Aspek | Target |
| --- | --- |
| Kecepatan | Largest Contentful Paint 2,5 detik atau kurang di 4G; skor Lighthouse mobile minimal 90 |
| Ukuran halaman | Muatan awal di bawah 1 MB; foto di bawah layar dimuat bertahap (lazy loading) |
| Responsif | Lebar 360 sampai 1440 px; mobile-first |
| Aksesibilitas | Mengacu WCAG 2.1 AA: kontras, fokus papan ketik, teks alternatif, target ketuk minimal 44 px |
| SEO | Judul dan deskripsi unik, sitemap, robots, gambar Open Graph, data terstruktur toko makanan |
| Keamanan | HTTPS wajib; tidak menyimpan data pelanggan di server; data hanya dikirim ke WhatsApp atas tindakan pelanggan |
| Privasi | Keranjang hanya di perangkat pelanggan; halaman kebijakan privasi singkat bila memakai analitik |
| Peramban | Dua versi terakhir Chrome, Safari, Firefox, Edge, dan Samsung Internet |
| Bahasa | Indonesia |
| Perawatan | Harga, ketersediaan, dan kontak diubah dari satu berkas konfigurasi tanpa mengubah kode tampilan |

## 12. Rekomendasi teknis

Versi pertama cukup berupa website statis tanpa backend: data menu dibaca dari satu berkas, keranjang disimpan di perangkat pelanggan, dan pesanan dikirim lewat tautan WhatsApp.

| Lapisan | Rekomendasi | Alasan |
| --- | --- | --- |
| Kerangka | Astro atau Next.js (keluaran statis) | Cepat dibuka, mudah untuk SEO, komponen bisa dipakai ulang |
| Gaya | Tailwind CSS dengan token warna bagian 9 | Konsisten dan cepat disusun |
| Data menu | Berkas `menu.json` di repositori | Pemilik atau pengembang cukup mengubah satu berkas |
| Keranjang | `localStorage` di peramban | Tanpa server dan tanpa akun |
| Pesanan | Tautan `https://wa.me/6287700025038?text=<pesan terkode>` | Satu ketukan membuka WhatsApp dengan pesan terisi |
| Gambar | WebP, ukuran responsif, lazy loading | Sesuai target kecepatan |
| Hosting | Cloudflare Pages, Netlify, atau Vercel (paket gratis) dengan domain sendiri | Murah, HTTPS otomatis, tayang otomatis dari repositori |
| Analitik | Google Analytics 4 atau Plausible | Mencatat peristiwa bagian 13 |

Bila pemilik kelak ingin panel admin penuh tanpa menyentuh berkas, pilihan v2 adalah CMS ringan (misalnya Google Sheets sebagai sumber data, atau CMS berbasis Git) atau platform seperti WooCommerce; keduanya di luar v1.

**Struktur data menu (`menu.json`)**

```json
{
  "toko": {
    "nama": "Pisang Royal Pringgodani",
    "whatsapp": "6287700025038",
    "shopeeUrl": "https://shopee.co.id/universal-link/now-food/shop/20437367?deep_and_deferred=1&shareChannel=copy_link"
  },
  "aturan": {
    "hargaMix": 20000,
    "maksRasaPerPorsi": 2,
    "maksToppingPerPorsi": 2,
    "maksJumlah": 99
  },
  "menu": [
    { "id": "coklat",   "nama": "Pisang Kembung Coklat",   "rasa": "Coklat",   "harga": 20000, "foto": "coklat.webp",   "tersedia": true },
    { "id": "stroberi", "nama": "Pisang Kembung Stroberi", "rasa": "Stroberi", "harga": 20000, "foto": "stroberi.webp", "tersedia": true },
    { "id": "matcha",   "nama": "Pisang Kembung Matcha",   "rasa": "Matcha",   "harga": 20000, "foto": "matcha.webp",   "tersedia": true },
    { "id": "tiramisu", "nama": "Pisang Kembung Tiramisu", "rasa": "Tiramisu", "harga": 20000, "foto": "tiramisu.webp", "tersedia": true },
    { "id": "ori",      "nama": "Pisang Kembung ORI",      "rasa": "ORI",      "harga": 17000, "foto": "ori.webp",      "tersedia": true }
  ],
  "topping": ["Oreo", "Keju", "Choco chips", "Meises", "Sprinkle"]
}
```

**Aturan harga di kode:** jika porsi hanya berisi satu rasa, harga porsi = `harga` rasa itu (ORI Rp17.000, lainnya Rp20.000); jika berisi lebih dari satu rasa, harga porsi = `hargaMix` (Rp20.000). Total = jumlah dari harga porsi dikali jumlah. Perhitungan memakai bilangan bulat rupiah dan ditulis dengan pemisah ribuan titik saat ditampilkan.

## 13. Metrik keberhasilan dan analitik

Keberhasilan diukur dari seberapa banyak pengunjung yang sampai menekan tombol kirim ke WhatsApp atau Shopee. Target di bawah adalah usulan awal yang dikalibrasi ulang setelah 30 hari data nyata.

| Metrik | Definisi | Target awal (usulan) |
| --- | --- | --- |
| Tingkat tambah ke keranjang | Sesi dengan minimal 1 add\_to\_cart dibagi semua sesi | 15% atau lebih |
| Tingkat kirim | Sesi dengan click\_whatsapp dibagi sesi dengan add\_to\_cart | 40% atau lebih |
| Klik Shopee | Jumlah click\_shopee per 100 sesi | Dipantau, belum ada target |
| Pesanan dari website | Jumlah pesan WhatsApp bertanda Sumber: website | Dipantau mingguan oleh pemilik |
| Kecepatan | LCP di 4G | 2,5 detik atau kurang |

**Peristiwa yang dicatat**

| Peristiwa | Kapan terkirim | Parameter |
| --- | --- | --- |
| `view_menu` | Halaman Menu atau bagian menu terlihat | sumber halaman |
| `select_flavor` | Rasa dipilih di panel kustomisasi | id rasa |
| `select_topping` | Topping dipilih | nama topping |
| `add_to_cart` | Tombol Tambah ke keranjang ditekan | jenis (tunggal atau mix), nilai rupiah |
| `begin_checkout` | Halaman Checkout dibuka | total rupiah |
| `click_whatsapp` | Tombol Kirim ke WhatsApp ditekan | total rupiah, jumlah porsi |
| `click_shopee` | Tombol Shopee ditekan | lokasi tombol |

Tautan yang dibagikan di media sosial atau status WhatsApp diberi parameter UTM agar sumber kunjungan terlihat. Data pribadi pelanggan (nama, alamat) tidak pernah dikirim ke alat analitik.

## 14. Rencana rilis

Rilis pertama diperkirakan memakan sekitar 4 minggu kerja, dengan syarat foto, logo, dan teks dari pemilik toko tersedia di minggu pertama. Durasi adalah estimasi awal dan akan disesuaikan setelah pertanyaan terbuka terjawab.

1. **Persiapan (minggu 1).** Menjawab pertanyaan terbuka bagian 15, mengumpulkan foto produk, logo, dan teks. Keluaran: berkas `menu.json` final dan paket konten.
2. **Desain (minggu 1 sampai 2).** Wireframe lalu desain visual HP dan desktop untuk 10 halaman dengan palet bagian 9. Keluaran: desain disetujui pemilik.
3. **Pengembangan (minggu 2 sampai 3).** Membangun halaman, panel kustomisasi, keranjang, dan checkout ke WhatsApp. Keluaran: versi uji di alamat sementara.
4. **Pengujian (minggu 3 sampai 4).** Uji di beberapa HP dan peramban, uji pesan WhatsApp sungguhan, uji kecepatan, kontras, dan aksesibilitas. Keluaran: daftar cacat yang sudah diperbaiki.
5. **Tayang (minggu 4).** Menyambungkan domain, HTTPS, analitik, dan membagikan tautan ke pelanggan.
6. **Setelah tayang.** v1.1: penanda menu habis dan lencana favorit. v2: panel admin, ongkos kirim otomatis, pembayaran online.

**Syarat boleh tayang**

- [ ] Semua fitur P0 lulus kriteria penerimaan bagian 6.
- [ ] Lima menu, harga, dan aturan mix sesuai bagian 4 dan 5.
- [ ] Pesan uji tiba di WhatsApp +62 877-0002-5038 dengan format template lampiran.
- [ ] Tautan Shopee diuji di HP dan desktop.
- [ ] Foto asli menggantikan semua foto sementara.
- [ ] Skor Lighthouse mobile minimal 90 dan kontras teks lolos pemeriksaan.
- [ ] Pemilik toko menyetujui hasil akhir.

## 15. Risiko dan pertanyaan terbuka

Sebelas hal masih perlu dijawab pemilik toko; PRD memakai asumsi sementara supaya desain dan pengembangan bisa jalan, dan semuanya bisa diganti lewat pengaturan tanpa mengubah desain.

**Pertanyaan terbuka untuk pemilik toko**

| No | Pertanyaan | Asumsi sementara di PRD | Yang terdampak |
| --- | --- | --- | --- |
| 1 | Berapa rasa maksimal dalam satu porsi mix? | 2 rasa | Validasi mix, teks petunjuk |
| 2 | Berapa topping maksimal per porsi? | 2 topping | Validasi topping |
| 3 | Mix yang berisi ORI dihargai berapa? | Rp20.000 | Perhitungan harga |
| 4 | Apakah ORI tunggal juga mendapat topping? | Ya, topping boleh dipilih | Panel kustomisasi |
| 5 | Apa isi satu porsi (jumlah potong) dan bagaimana rasa dibagi saat mix? | Tidak ditampilkan | Deskripsi menu, foto mix |
| 6 | Layanan ambil di tempat, antar, atau keduanya? Area, ongkir, minimal order? | Keduanya; ongkir dikonfirmasi lewat WhatsApp | Formulir checkout |
| 7 | Alamat toko, jam buka, hari libur? | Belum ada; kolom kosong disembunyikan | Halaman Kontak |
| 8 | Metode pembayaran yang diterima? | Dikonfirmasi lewat WhatsApp | Teks checkout |
| 9 | Apakah foto produk, logo, dan teks Tentang sudah ada? | Belum; foto diambil sebelum rilis | Jadwal |
| 10 | Nama domain yang diinginkan? | Dipilih pemilik | Tayang |
| 11 | Siapa yang membalas WhatsApp dan di jam berapa? | Pemilik, pada jam buka | Teks Checkout dan Kontak |

**Risiko**

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Foto asli belum tersedia | Tampilan kurang menarik, jadwal mundur | Jadwalkan sesi foto di minggu 1; foto sementara hanya yang berlisensi |
| Pelanggan membuka WhatsApp tetapi tidak menekan Kirim | Pesanan hilang | Halaman Pesanan Terkirim mengingatkan untuk menekan Kirim dan menyediakan tombol cadangan |
| Harga berubah tetapi website tidak diperbarui | Harga di website berbeda dari toko | Satu berkas data; periksa berkas setiap harga berubah |
| Tautan Shopee (Shopee Food) tidak terbuka mulus di semua perangkat atau area | Pelanggan gagal memesan di Shopee | Uji di HP dan desktop sebelum rilis; WhatsApp tetap jalur utama |
| Pesan WhatsApp tidak lengkap atau salah format | Toko harus bertanya ulang | Validasi formulir dan template pesan seragam |
| Pesanan menumpuk di satu orang | Balasan lambat | Tulis jam buka dan waktu balas di website |

## 16. Lampiran

**Template pesan WhatsApp.** Pesan dibuat otomatis dari keranjang; baris Sumber: website membantu pemilik menghitung pesanan dari website.

```text
Halo Pisang Royal Pringgodani, saya mau pesan:

1) Pisang Kembung Mix (Coklat + Matcha) x2
   Topping: Oreo, Keju
   Harga: Rp20.000 x 2 = Rp40.000
   Catatan: tidak terlalu manis

2) Pisang Kembung ORI x1
   Topping: Meises
   Harga: Rp17.000 x 1 = Rp17.000

TOTAL: Rp57.000

Nama: Budi
Metode: Antar
Alamat: Jl. Contoh No. 1
Waktu: Hari ini jam 16.00
Catatan: -

Sumber: website
```

Isi contoh di atas hanya ilustrasi. Pesan dikodekan dengan `encodeURIComponent` sebelum ditempel ke tautan `wa.me`.

**Tautan dan kontak toko**

| Item | Nilai |
| --- | --- |
| WhatsApp | +62 877-0002-5038, tautan `https://wa.me/6287700025038` |
| Shopee | [Halaman toko di Shopee](https://shopee.co.id/universal-link/now-food/shop/20437367?deep_and_deferred=1&shareChannel=copy_link) |

**Istilah**

| Istilah | Arti di dokumen ini |
| --- | --- |
| Mix | Satu porsi yang berisi lebih dari satu rasa |
| Porsi | Satu unit pesanan dengan pilihan rasa dan topping tertentu |
| P0, P1, P2 | Wajib rilis pertama, sebaiknya ada di rilis pertama, menyusul setelahnya |

Sumber isi: seluruh data toko (nama, menu, harga, aturan mix dan topping, nomor WhatsApp, tautan Shopee, nuansa warna) berasal dari pemilik toko. Angka target, batas jumlah, dan persona adalah asumsi yang ditandai di dalam dokumen.
