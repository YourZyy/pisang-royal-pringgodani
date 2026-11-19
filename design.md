# Design System & UI/UX Specification — Pisang Royal Pringgodani

> **Pembaruan visual (19 Nov 2026):** Bagian 3 (warna), 4 (tipografi), 5 (bentuk/komponen), dan 6 (motion) di bawah sudah digantikan oleh redesain. Sumber kebenarannya sekarang `src/styles/global.css`.
> - **Warna:** hijau daun pisang `#12392B` + kertas tulang `#F4F2EA` + satu aksen kuning pisang `#F5BE1D`. Teks di atas kuning selalu `#13211A`.
> - **Tipografi:** Archivo (judul, bobot 800) + Plus Jakarta Sans (isi), keduanya self-host lewat `@fontsource-variable`.
> - **Bentuk:** satu radius 8px untuk semua kotak, tombol, dan input. Tanpa kartu pembungkus; hierarki dari foto, tipografi, dan jarak.
> - **Gerak:** smooth scroll Lenis (otomatis mati saat `prefers-reduced-motion`), hero masuk berurutan, judul bagian muncul saat discroll. Kartu menu tetap tanpa scroll-reveal.
> - Aturan alur beli, anti-tabrakan tombol mengambang, copywriting, dan audit foto (Bagian 1, 2, 7, 8, 9) tetap berlaku.

Dokumen ini menjadi acuan desain visual, tata letak, interaksi (`motion/react`), fotografi, dan alur pembelian untuk website e-commerce **Pisang Royal Pringgodani**, disusun berdasarkan [PRD Website E-commerce Pisang Royal Pringgodani.md](./PRD%20Website%20E-commerce%20Pisang%20Royal%20Pringgodani.md), aset foto yang tersedia di workspace, serta standar antarmuka **non-AI-slop** (`design-taste-frontend`, `motion`, `ecommerce-landing-page`, `ecommerce-checkout-optimization`).

---

## 1. Identitas Visual & Klasifikasi Produk

- **Klasifikasi Halaman:** Etalase Produk Kuliner (`product`, `site-kind: other` — makanan ringan lokal dengan transaksi langsung ke WhatsApp & Shopee).
- **Karakter Brand:** Hangat, renyah, rumahan yang rapi (*craft street-bakery*), bersahabat di HP, cepat dipahami dalam 5 detik pertama.
- **Target Emosi:** Menggugah selera tanpa terkesan kekanak-kanakan atau seperti template Canva/SaaS. Warna interface dijaga tenang (90–95% krem susu & kuning pucat) agar warna coklat meleleh, hijau matcha, pink stroberi, krem tiramisu, dan gorengan keemasan pada foto produk yang menjadi pusat perhatian.
- **Alur Konversi Utama (Zero-Friction):**
  `Lihat Menu` -> `Pilih Rasa (Tunggal / Mix) + Topping (Sheet/Modal)` -> `Tambah ke Keranjang` -> `Checkout 1 Langkah` -> `Kirim Pesan Terformat ke WhatsApp` (atau jalur cepat `Pesan via Shopee`).

---

## 2. Prinsip Desain Non-AI-Slop & Guardrail UX Pembelian

Aturan ketat berikut memisahkan etalase Pisang Royal Pringgodani dari situs generik buatan AI sekaligus menjaga kelancaran proses beli:

| Prinsip | Wajib Diterapkan | Dilarang Keras (Anti-Slop & Anti-Friction) |
| :--- | :--- | :--- |
| **Permukaan & Warna** | Latar flat krem susu (`#FFF9E8`) dan kuning pucat (`#FBEFC6`) dengan garis tipis `#EADFBF`. | Gradien latar multi-warna, glassmorphism (`backdrop-blur`), neon glow, shadow tebal berlapis, warna ungu/lavender di UI chrome. |
| **Kejujuran Visual** | Foto pisang kembung nyata sebagai fokus utama, rasio konsisten, sudut membulat `16px`. | Ilustrasi kartun AI, ikon 3D generik, mockup perangkat palsu, badge palsu ("100% Organik", "Best Seller No. 1 Indonesia"), atau testimoni karangan. |
| **Kejelasan Pembelian** | Harga per porsi, aturan mix (`Rp20.000`, maks. 2 rasa), dan status `Habis` langsung terbaca tanpa klik tambahan. | Popup promo/newsletter saat halaman dibuka, carousel hero otomatis yang bergerak saat mau diklik, modal konfirmasi berulang. |
| **Interaksi & Gerak** | Micro-feedback responsif (`hover`, `press`, morph harga saat pilih rasa, bottom-sheet/drawer halus via `motion/react`). | Scroll-reveal fade-in pada setiap kartu menu (memperlambat scan menu di HP), kartu miring/3D tilt saat hover, teks parallax, marquee teks berjalan, efek WebGL/shader. |
| **Tata Letak Bersih** | Satu ide per seksi, tepi kiri-kanan sejajar di container tunggal, hierarki tipografi jelas. | Kotak di dalam kotak di dalam kotak (maks. 2 tingkat), ikon centang berderet untuk copy filler, strip angka statistik palsu. |

---

## 3. Sistem Warna (Kuning Kalem) & Audit Kontras WCAG 2.1 AA

Mempertahankan seluruh palet warna pemilik toko pada PRD Bagian 9, dipetakan ke CSS custom properties dengan verifikasi rasio kontras matematis (`>= 4.5:1` untuk teks normal, `>= 3:1` untuk border/grafis).

### 3.1 Token Warna Utama

```css
:root {
  /* Permukaan & Latar (Flat — tanpa gradien) */
  --bg-page: #FFF9E8;        /* Krem susu — latar utama halaman */
  --bg-surface: #FBEFC6;     /* Kuning pucat — kartu menu, ringkasan order, seksi selang-seling */
  --bg-elevated: #FFFDF6;    /* Krem cerah — sheet/modal/drawer & input formulir agar kontras dengan #FBEFC6 */
  --border-hairline: #EADFBF;/* Krem tua — garis tepi 1px, pemisah baris keranjang */

  /* Aksen Brand */
  --brand-butter: #F4D985;   /* Kuning kalem — chip terpilih, sorotan halus, area hero aksen */
  --brand-honey: #E3B23C;    /* Kuning madu — tombol aksi utama (CTA primer) */
  --brand-honey-hover: #D4A12A; /* Langkah hover lebih tegas (tetap teks coklat tua) */

  /* Tipografi */
  --ink-primary: #3B2A0E;    /* Coklat tua — judul, teks isi, teks di atas tombol kuning/butter */
  --ink-secondary: #6B5A3A;  /* Coklat sedang — label, deskripsi singkat, catatan */
  --ink-muted-border: rgba(59, 42, 14, 0.16);

  /* Saluran Pesan & Status */
  --wa-green: #1F7A52;       /* Hijau tua — tombol WhatsApp (teks #FFFFFF) */
  --wa-green-hover: #186342;
  --shopee-orange: #EE4D2D;  /* Oranye Shopee — border 1.5px & ikon tas Shopee */
  --shopee-ink: #A82E15;     /* Teks tombol Shopee outline (lolos WCAG AA di atas krem & kuning pucat) */
  --shopee-tint: rgba(238, 77, 45, 0.08);
  --error-brick: #B3402A;    /* Merah bata — pesan validasi & batas pilihan */
}
```

### 3.2 Swatch Visual Varian Rasa (Hanya Titik Indikator Kecil 10px di Chip)

Titik warna mini pada chip rasa membantu pelanggan memindai rasa secara intuitif tanpa mengubah palet UI global:
- **Coklat (`coklat`):** `#5B3721`
- **Stroberi (`stroberi`):** `#C86D8A` *(rose hangat — bukan ungu/violet)*
- **Matcha (`matcha`):** `#7A9455`
- **Tiramisu (`tiramisu`):** `#B39370`
- **ORI (`ori`):** `#D99326`

### 3.3 Tabel Verifikasi Kontras WCAG 2.1 AA

| Pasangan Warna | Rasio Kontras | Status | Penggunaan |
| :--- | :---: | :--- | :--- |
| `#3B2A0E` di atas `#FFF9E8` | **13.11 : 1** | Lolos AAA | Judul & isi pada latar halaman |
| `#3B2A0E` di atas `#FBEFC6` | **11.99 : 1** | Lolos AAA | Judul & harga pada kartu/permukaan |
| `#3B2A0E` di atas `#F4D985` | **9.92 : 1** | Lolos AAA | Teks chip aktif & badge `Mix` |
| `#3B2A0E` di atas `#E3B23C` | **7.02 : 1** | Lolos AAA | Label tombol primer (`Lihat Menu`, `Tambah ke Keranjang`) |
| `#6B5A3A` di atas `#FFF9E8` | **6.34 : 1** | Lolos AA+ | Subjudul, metadata, label sekunder |
| `#6B5A3A` di atas `#FBEFC6` | **5.80 : 1** | Lolos AA+ | Deskripsi kartu & keterangan topping |
| `#FFFFFF` di atas `#1F7A52` | **5.30 : 1** | Lolos AA | Tombol utama WhatsApp |
| `#B3402A` di atas `#FFF9E8` / `#FBEFC6` | **5.42 : 1** / **4.96 : 1** | Lolos AA | Pesan galat formulir & peringatan batas mix |
| `#EE4D2D` di atas `#FFF9E8` / `#FBEFC6` | *3.48 : 1 / 3.18 : 1* | **Hanya Border & Ikon (>= 3:1)** | **Jangan dipakai untuk teks 16px** (diperbaiki dengan `--shopee-ink`) |
| `#A82E15` di atas `#FFF9E8` / `#FBEFC6` | **6.51 : 1** / **5.96 : 1** | Lolos AA+ | Teks label pada tombol outline `Pesan via Shopee` |

> **Aturan Penting:** Teks di atas warna kuning (`#F4D985` atau `#E3B23C`) **selalu** `#3B2A0E`, tidak pernah putih. Status pilihan pada chip rasa/topping tidak hanya dibedakan warna, tetapi juga ikon centang (`✓`) dan border tegas `1.5px solid #3B2A0E`.

---

## 4. Tipografi & Skala Teks

Untuk menghindari kesan "template Canva/kartun" dari font super-tebal (`700–800`), kita mengombinasikan **karakter ramah berjiwa produk kuliner** dengan keterbacaan modern di layar HP:

- **Display / Judul (`--font-display`):** **`Bricolage Grotesque`** (`wght 500–600`, `opsz 12..96`, `tracking: -0.025em`) — memiliki lekukan *ink-trap* yang hangat dan ekspresif seperti kemasan toko kue/jajanan modern, namun tetap dewasa dan tajam.
  *(Alternatif sesuai PRD bila pemilik tetap ingin huruf geometris bulat penuh: **`Fredoka`** bobot `500`, tracking `-0.015em` — hindari bobot `700`+).*
- **Body / UI (`--font-text`):** **`Nunito`** (`wght 400, 500, 600`) — sesuai PRD Bagian 9; angka harga & stepper wajib memakai `font-variant-numeric: tabular-nums` agar nominal rupiah (`Rp17.000` -> `Rp20.000`) tidak bergeser lebar saat berubah live.
- **Batas Ketebalan:** Maksimal `600` (SemiBold) untuk judul/tombol; dilarang memakai bobot `700/800/900` atau huruf tipis (`300`) di bawah `20px`.
- **Panjang Baris:** Maksimal `60ch` untuk paragraf (`Tentang`, `Privasi`, subjudul hero) agar nyaman dibaca satu tangan di HP.

### Skala Ukuran (Mobile `360–639px` / Desktop `>= 1024px`)

| Peran | Ukuran | Line-Height | Bobot | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| `h1` (Hero) | `32px` -> `clamp(32px, 3vw + 18px, 44px)` | `1.14` | `600` | `-0.025em` |
| `h2` (Judul Seksi) | `24px` -> `clamp(24px, 1.4vw + 18px, 32px)` | `1.20` | `600` | `-0.02em` |
| `h3` (Judul Kartu / Panel) | `18px` -> `20px` | `1.30` | `600` | `-0.01em` |
| Sub-headline / Lead | `17px` -> `19px` | `1.55` | `400` | `0` |
| Harga Produk / Subtotal | `18px` -> `20px` (`tabular-nums`) | `1.20` | `600` | `-0.01em` |
| Body / Deskripsi Menu / Form | `16px` *(wajib >= 16px di HP agar Safari iOS tidak auto-zoom)* | `1.55` | `400` | `0` |
| Label Form / Metadata / Chip | `14px` *(minimal `13px` untuk badge kecil; tidak ada teks < 13px)* | `1.40` | `500` | `0` |

---

## 5. Layout, Grid, Spasi & Sistem Komponen

- **Skala Spasi (Kelipatan 8px):** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px`.
- **Container Tunggal (`.wrap`):** `max-width: 1200px`, padding horizontal `20px` (mobile `360–639px`), `32px` (tablet `640–1023px`), `48px` (desktop `>= 1024px`). Semua header, seksi konten, dan footer rata pada garis tepi yang sama.
- **Grid Menu:** `1` kolom di HP (`< 640px`), `2` kolom di tablet (`640–1023px`), `3` kolom di desktop (`>= 1024px`), jarak antar kartu `24px` (`16px` di HP).
- **Radius Konsisten:**
  - Kartu menu, panel checkout, gambar hero: `16px` (`--r-lg`)
  - Bottom sheet / modal / drawer: `20px` (`--r-sheet`, atas membulat di HP)
  - Foto di dalam kartu: `12px` (`--r-md` — bersarang rapi di dalam padding kartu `16px` atau flush atas dengan radius `16px`)
  - Input formulir & stepper: `12px` (`--r-sm`)
  - Tombol & chip rasa/topping: `9999px` (kapsul/pill penuh)
- **Target Sentuh Minimum:** Semua tombol, chip rasa, chip topping, dan tombol `+ / -` stepper minimal **44×44 px** (tombol aksi utama **48 px** tinggi di HP).

### Spesifikasi Komponen Kunci & State

1. **Tombol (3 Varian Tegas — tidak lebih):**
   - **Primer (Aksi Beli / Menu):** Latar `#E3B23C`, teks `#3B2A0E`, tinggi `48px`, kapsul. Hover: `#D4A12A`, naik `1px`. Tekan: skala `0.985`.
   - **WhatsApp (Aksi Kirim Pesan):** Latar `#1F7A52`, teks `#FFFFFF`, ikon WA crisp SVG, tinggi `48px`, kapsul. Hover: `#186342`.
   - **Shopee (Sekunder / Jalur Alternatif):** Latar transparan / `#FFF9E8`, border `1.5px solid #EE4D2D`, teks `#A82E15`, ikon tas Shopee `#EE4D2D`, tinggi `44–48px`, kapsul. Hover: fill `--shopee-tint`.
   - **Sekunder Netral:** Border `1px solid #3B2A0E` (atau `rgba(59,42,14,0.28)`), teks `#3B2A0E`.

2. **Kartu Menu (2 Tingkat Maksimal — Tanpa Nesting Berlebihan):**
   - Latar `#FBEFC6`, border `1px solid #EADFBF`, radius `16px`, tanpa shadow di kondisi diam.
   - Atas: Foto produk rasio `4:3` (`overflow: hidden`) dengan badge status opsional (`Favorit` di pojok atas atau `Habis` jika `tersedia: false`).
   - Bawah (padding `16px` di HP, `20px` di desktop):
     - Nama menu (`h3`, mis. *Pisang Kembung Coklat*) + harga sejajar rapi (`Rp20.000`).
     - 1 baris deskripsi singkat yang jelas (*"Pisang kembung hangat dengan glaze coklat pekat"*).
     - Baris aksi: Tombol primer `Pesan` (membuka panel kustomisasi dengan rasa ini sudah aktif) + link teks `Detail` (ke `/menu/[id]`).
   - **Kondisi Habis (`FR-10`):** Opasitas konten `0.58`, pill label `Habis` bernuansa krem gelap `#EADFBF` dengan teks `#3B2A0E`, tombol `Pesan` diganti status nonaktif `Stok Habis` (`disabled`).

3. **Chip Rasa & Chip Topping (Tactile & Accessible):**
   - **Default:** Latar `#FFFDF6`, border `1px solid #EADFBF`, teks `#3B2A0E`.
   - **Terpilih:** Latar `#F4D985`, border `1.5px solid #3B2A0E`, ikon centang `✓` di kiri/kanan label, bobot `600`.
   - **Batas Tercapai (saat sudah pilih 2 rasa / 2 topping):** Chip lain tidak menghilang, tampil lebih tenang (`opacity: 0.55`), dan mengetuknya tidak error keras—cukup muncul pesan inline halus di bawah grup (*"Maksimal 2 rasa per porsi — ketuk rasa terpilih untuk mengganti"*).

---

## 6. Desain Interaktif & Spesifikasi Motion (`motion/react`)

Seluruh interaksi dan animasi mengikuti prinsip skill **`motion`** (`motion/react`) dan **`design-taste-frontend`**: cepat (`150–300ms`), berbasis *transform/opacity/clip-path* (GPU-accelerated), zero *layout thrash* (`width/height/top/left` tidak dianimasikan sembarangan), serta menghormati preferensi sistem pengguna (`<MotionConfig reducedMotion="user">`).

### 6.1 Peta Animasi & Tujuan UX (Setiap Gerakan Punya Fungsi)

| Elemen | Mekanisme Motion (`motion/react` / CSS) | Timing / Spring | Tujuan Pembelian |
| :--- | :--- | :--- | :--- |
| **1. Hero Entrance (Sekali saat load)** | Headline & CTA masuk ringan (`opacity: 0->1, y: 12->0`); foto hero tenang dari `scale: 1.03 -> 1` tanpa menyembunyikan tombol CTA. | `500ms`, ease `[0.22, 1, 0.36, 1]` | Pelanggan langsung melihat nama toko, harga mulai Rp17.000, dan tombol `Lihat Menu` tanpa delay. |
| **2. Hover Kartu & Foto Menu** | Kartu naik `-2px` (`hover:fine` saja), foto zoom `1.03` di dalam frame `overflow: hidden`. | CSS `180ms` / `500ms` ease `[0.2, 0.8, 0.2, 1]` | Umpan balik visual jelas bahwa kartu bisa diklik. |
| **3. Tap Tombol & Chip** | `whileTap={{ scale: 0.97 }}` pada chip rasa/topping dan tombol CTA. | Spring `visualDuration: 0.16, bounce: 0.1` | Sensasi taktil seperti aplikasi native di HP saat memilih rasa & topping. |
| **4. Live Mix-Flavor Configurator (Interaksi Kunci)** | Saat rasa ke-2 dipilih: pill `"Mix · Rp20.000"` muncul dengan `AnimatePresence` + `scale/opacity`; preview visual di atas/kiri sheet melakukan *split reveal* (menampilkan 2 foto varian rasa bersebelahan dalam satu frame `4:3`); nominal rupiah berganti mulus (`AnimatePresence mode="popLayout"` pada teks harga). | Spring `visualDuration: 0.28, bounce: 0.12` | Menjelaskan aturan "boleh mix, harga tetap Rp20.000" secara visual dalam 1 detik tanpa pelanggan harus membaca paragraf panjang. |
| **5. Panel Kustomisasi (Mobile Bottom Sheet / Desktop Modal)** | Mobile: `y: "100%" -> 0` dengan backdrop fade & drag-down untuk tutup (`drag="y"`, `dragConstraints={{ top: 0 }}`). Desktop: `scale: 0.96 -> 1, opacity: 0 -> 1`. | Spring `visualDuration: 0.30, bounce: 0.08` | Mengatur rasa, topping, dan jumlah tanpa meninggalkan halaman Menu. |
| **6. Panel Geser Keranjang (Cart Drawer)** | Geser dari kanan (`x: "100%" -> 0`), item di dalam list memakai `AnimatePresence` + `layout` saat porsi dihapus/diubah. | Spring `visualDuration: 0.28, bounce: 0` | Mengubah jumlah atau menghapus item terasa instan tanpa reload. |
| **7. Bilah Keranjang Bawah (HP) & Badge Keranjang** | Muncul mulus (`y: 24 -> 0, opacity: 0 -> 1`) hanya saat keranjang terisi (`>= 1` porsi); badge angka di navbar melakukan pop kecil (`scale: [1, 1.18, 1]`) setiap kali `Tambah ke Keranjang` ditekan. | `220ms` ease-out | Memberi konfirmasi pasti bahwa item masuk keranjang dan selalu menampilkan total harga berjalan. |
| **8. Preview Pesan WhatsApp (`/checkout`)** | Expand/collapse ringan dengan `AnimatePresence` + `opacity`/`y` (atau grid-row smooth) tanpa jank layout. | `200ms` ease-out | Menumbuhkan rasa percaya sebelum tombol hijau `Kirim ke WhatsApp` ditekan. |

### 6.2 Hal yang Sengaja TIDAK Dianimasikan (Menjaga Kelancaran Pembelian)
- **Tidak ada scroll-reveal pada kartu menu, cara pesan, atau daftar keranjang** (agar pelanggan yang scroll cepat di HP 4G tidak melihat ruang kosong menunggu fade-in).
- **Tidak ada animasi terus-menerus** (tombol WA tidak memantul/berkedip terus di pojok layar — cukup statis bersih dengan respon hover/tap).
- **Tidak ada `animate={{ height: "auto" }}` pada konten besar**; gunakan transisi terukur atau `grid-template-rows` / drawer terpisah.

---

## 7. Arsitektur 10 Halaman & Alur Pembelian (PRD Bagian 8)

### Komponen Global & Anti-Tabrakan Fixed UI
- **Header (`position: sticky` / `fixed`, tinggi `64px` desktop, `56px` HP):**
  - Kiri: Wordmark & ikon sederhana Pisang Royal Pringgodani (`#top`).
  - Tengah/Kanan: `Beranda`, `Menu`, `Tentang`, `Kontak` (`15px`, bobot `500`, underline animasi kiri-ke-kanan 1px saat hover, garis bawah 2px pada halaman aktif).
  - Kanan: Tombol `Shopee` (outline ringan di desktop, masuk ke drawer menu di HP `< 640px`) + Ikon Keranjang dengan pill jumlah porsi & akses cepat Cart Drawer.
- **Aturan Anti-Tabrakan Tombol Mengambang (Krusial di Mobile):**
  - **Bilah Keranjang Bawah (HP `< 640px`):** Tampil di paling bawah (`bottom: 0`, aman dengan `env(safe-area-inset-bottom)`) **hanya** saat keranjang `>= 1` item, dan **disembunyikan** di `/keranjang`, `/checkout`, `/pesanan-terkirim`, serta saat panel kustomisasi/menu mobile terbuka.
  - **Tombol WhatsApp Mengambang (`FR-09`):**
    - Tampil di sudut kanan bawah (`bottom: 20px, right: 20px`) pada halaman informasi & katalog.
    - **Otomatis disembunyikan** di `/keranjang`, `/checkout`, `/pesanan-terkirim` (sesuai PRD 8).
    - **Otomatis naik atau bersembunyi saat Bilah Keranjang Bawah aktif di HP:** Agar tidak menumpuk di atas tombol `Lihat Keranjang`, saat bilah keranjang bawah aktif di HP, tombol WA mengambang berpindah rapi ke `bottom: calc(84px + env(safe-area-inset-bottom))` atau disembunyikan sementara ketika panel kustomisasi/drawer terbuka. *Tidak ada satu tombol pun yang saling menutupi.*

### Rancangan Tiap Halaman

1. **Beranda (`/`) — Ringkas, Menggugah, Langsung ke Order (5–6 Layar Terstruktur):**
   - **Hero (Layar Pertama Utuh):** Split layout di desktop (kiri teks, kanan foto unggulan pisang kembung `4:5` / `4:3` bersih tanpa overlay teks di atas pisang); di HP teks terlebih dahulu lalu foto penuh sebelum lipatan layar.
     - Fakta konkret langsung di hero: *"Mulai Rp17.000 · Boleh mix 2 rasa (Rp20.000) · Gratis 5 pilihan topping"*
     - H1: `"Pisang Kembung Pisang Royal Pringgodani"` / `"Pisang kembung renyah, rasanya bisa kamu campur sendiri."`
     - 2 Tombol sejajar (maksimal): Primer **`Lihat Menu`** (scroll ke `#menu-unggulan` / ke `/menu`) + Hijau **`Pesan via WhatsApp`**.
   - **Menu Unggulan (`#menu-unggulan`):** Grid 5 kartu menu sesuai urutan PRD (`Coklat`, `Stroberi`, `Matcha`, `Tiramisu`, `ORI`) dengan tombol **`Pesan`** yang langsung membuka **Panel Kustomisasi Interaktif**, plus link **`Lihat semua menu ->`**.
   - **Mix Rasa & Topping (Blok Interaktif Mini / Penjelasan Visual):** Penjelasan 2 kalimat tentang aturan mix (`Rp20.000`), contoh kartu kombinasi nyata (`Coklat + Matcha + Keju`), dan 5 chip topping (`Oreo`, `Keju`, `Choco chips`, `Meises`, `Sprinkle`) yang menampilkan label *"Sudah termasuk dalam harga porsi"*. (Tambahan UX pintar: mengklik contoh kombinasi mix atau tombol `"Coba Mix Sekarang"` langsung membuka panel kustomisasi dalam mode Mix!).
   - **Cara Pesan (3 Langkah Ringkas):** 3 kolom horizontal sejajar (tanpa kotak bertumpuk berat): `1. Pilih rasa & topping` -> `2. Atur porsi di keranjang` -> `3. Kirim format pesanan ke WhatsApp`.
   - **Pita Shopee (`#FBEFC6`):** 1 seksi datar kuning pucat yang mengarahkan pelanggan yang terbiasa checkout via aplikasi Shopee Food, dengan tombol outline **`Pesan via Shopee`** (`target="_blank" rel="noopener noreferrer"`).
   - **Kontak Ringkas & Footer:** Nomor WhatsApp `+62 877-0002-5038`, info area/jam buka (diisi dari `menu.json` — disembunyikan bila masih kosong sambil ditandai untuk diisi pemilik), tautan navigasi lengkap, tautan Shopee, dan link Privasi.

2. **Menu (`/menu`):**
   - Header halaman ringkas dengan 1 kalimat aturan yang bisa dipindai cepat: *"ORI Rp17.000 · Varian rasa & Mix (maks. 2 rasa) Rp20.000 · Gratis hingga 2 topping."*
   - Grid 5 kartu menu (urutan: `Coklat`, `Stroberi`, `Matcha`, `Tiramisu`, `ORI`), tombol `Pesan` (buka Panel Kustomisasi) + tautan `Detail`.
   - Blok **Pilihan Topping** menampilkan ke-5 topping dengan foto/swatch rapi agar pelanggan tahu opsi sebelum membuka panel.

3. **Detail Menu (`/menu/[id]`, mis. `/menu/coklat`):**
   - Layout 2 kolom di desktop (`5:7` foto produk besar di kiri, panel kustomisasi lengkap di kanan); di HP foto di atas lalu panel kustomisasi di bawah.
   - Menggunakan **komponen kustomisasi yang persis sama** dengan Panel Kustomisasi Modal/Bottom-Sheet:
     - Rasa awal (`[id]`) otomatis terpilih.
     - Toggle chip **Rasa** (maks. `2`): memilih rasa kedua otomatis memunculkan badge **`Mix`** dan preview gambar split dua rasa!
     - Toggle chip **Topping** (maks. `2`, opsional / boleh 0).
     - Stepper **Jumlah** (`1–99`) dengan target ketuk `44×44 px`.
     - Input **Catatan porsi** (`maks. 140 karakter` dengan counter karakter `0/140`).
     - Live harga per porsi & subtotal di tombol primer: **`Tambah ke Keranjang — Rp20.000`**, plus tombol sekunder **`Beli lewat Shopee`**.
   - Bawah: Seksi **`Menu lainnya`** menampilkan 4 varian lainnya.

4. **Keranjang (`/keranjang`) & Panel Geser Keranjang:**
   - Tiap baris menampilkan: thumbnail `64×64px` (atau split thumbnail jika Mix), nama (`Pisang Kembung Mix: Coklat + Matcha` atau `Pisang Kembung ORI`), daftar topping, catatan (jika ada), harga per porsi, stepper `+ / -`, tombol teks **`Ubah`** (membuka kembali panel kustomisasi untuk mengedit item tersebut di tempat!), dan tombol **`Hapus`** dengan konfirmasi ringan/undo toast singkat (bukan `window.confirm()` yang mengganggu!).
   - Kolom/Kartu Ringkasan: Total porsi, total harga (`tabular-nums`), tombol primer **`Lanjut ke Checkout`**, tombol outline **`Pesan via Shopee`**, dan link **`Tambah menu lain`**.
   - **Empty State:** Ikon sederhana, pesan *"Keranjangmu masih kosong"*, dan 1 tombol primer **`Lihat Menu`**.

5. **Checkout (`/checkout`):**
   - Fokus 1 tugas tanpa distraksi (tombol WA mengambang mati, header minimal atau tetap ringkas).
   - Desktop: 2 kolom (`7:5`) — kiri **Formulir Data Pemesan**, kanan **Ringkasan Pesanan** + **Preview Pesan WhatsApp** (bisa diintip sebelum dikirim). Mobile: Ringkasan Pesanan ringkas (accordion/ringkasan 1 blok) di atas formulir.
   - **Formulir (Semua Label Terlihat di Atas Input, 16px, Tinggi 48px):**
     1. `Nama` (wajib)
     2. `Metode` (pilihan segmented/radio card besar 48px: **Ambil di tempat** vs **Antar**)
     3. `Alamat lengkap` (muncul halus dengan `AnimatePresence` + wajib hanya saat **Antar** dipilih; tidak mengganggu bila **Ambil di tempat**)
     4. `Waktu ambil atau antar` (opsional, contoh helper: *"Misal: Hari ini jam 16.00"*)
     5. `Catatan pesanan` (opsional, maks. `280` karakter dengan counter)
   - Validasi tampil tepat di bawah kolom yang bermasalah saat submit (`aria-invalid="true"`), tanpa menghapus input lain yang sudah diketik.
   - Tombol utama besar berwarna hijau WhatsApp: **`Kirim ke WhatsApp`** -> membuka `https://wa.me/6287700025038?text=...` (dengan `encodeURIComponent` persis sesuai template Lampiran PRD Bagian 16, termasuk baris `Sumber: website`) lalu mengarahkan tab saat ini ke `/pesanan-terkirim`.
   - Keterangan tenang 14px di bawah tombol: *"Ongkos kirim (jika antar) dan ketersediaan dikonfirmasi toko lewat WhatsApp. Data hanya dikirim ke WhatsApp toko."*

6. **Pesanan Terkirim (`/pesanan-terkirim`):**
   - Menangani kasus bila aplikasi WhatsApp gagal terbuka otomatis di HP tertentu:
     - Judul jelas: *"WhatsApp sedang dibuka. Tekan Kirim di WhatsApp agar pesananmu diproses."*
     - Tombol primer hijau: **`Buka WhatsApp Lagi`** (memakai payload pesan terakhir dari `localStorage`).
     - Tombol sekunder: **`Salin Isi Pesan`** (ubah label jadi **`Pesan Tersalin ✓`** selama 2 detik — sangat membantu untuk desktop yang tidak memasang WhatsApp Desktop).
     - Ringkasan pesanan terakhir + tombol **`Kosongkan Keranjang & Kembali ke Menu`** (keranjang tidak dihapus otomatis sebelum pelanggan konfirmasi).

7. **Kontak (`/kontak`), Tentang (`/tentang`), Privasi (`/privasi`), & 404 (`/404`):**
   - **`/kontak`:** Kartu info toko dari `menu.json` (WhatsApp `+62 877-0002-5038` bisa diketuk langsung, tautan Shopee, alamat, jam buka, area antar) + tombol **`Buka di Google Maps`** (tanpa iframe peta agar ringan di 4G). Field alamat/jam buka yang belum diisi di `menu.json` disembunyikan rapi (tidak boleh tampil teks `[TODO]`).
   - **`/tentang`:** Cerita singkat toko, foto produk besar, 3 poin keunggulan nyata (mis. renyah dibuat hangat, rasa bebas mix Rp20.000, gratis pilihan topping), tombol **`Lihat Menu`**.
   - **`/privasi`:** Penjelasan jujur & ringkas dalam Bahasa Indonesia: tanpa akun, keranjang hanya tersimpan di perangkat (`localStorage`), data hanya dikirim ke WhatsApp saat pelanggan menekan Kirim.
   - **`/404`:** Pesan ramah (*"Halaman ini tidak ditemukan"*), tombol **`Lihat Menu`** & **`Kembali ke Beranda`**.

---

## 8. Audit Aset Foto Nyata & Rencana Produksi Foto

Berdasarkan inspeksi langsung terhadap 5 berkas di `drive-download-20261119T142749Z-1-001.zip`, berikut kondisi aktual aset dan aturan penggunaannya:

| Berkas di ZIP | Dimensi & Rasio | Observasi Visual Aktual | Aturan Pemakaian di Tahap Dev vs Pra-Tayang |
| :--- | :--- | :--- | :--- |
| `pisang kembung coklat_.jpg` | `736 × 896` (Portrait `0.82`) | Pisang dalam kotak kraft coklat dengan lelehan glaze coklat pekat. Pencahayaan cukup baik & menggugah selera. | **Layak untuk Draft/Dev.** Gunakan `aspect-[4/3]` atau `aspect-[4/5]` dengan `object-cover object-center`; konversi ke WebP (`< 150 KB`). |
| `pisang kembung ori.jpg` | `736 × 981` (Portrait `0.75`) | Pisang goreng keemasan polos dalam kotak kraft coklat dengan latar dinding semen terang. | **Layak untuk Draft/Dev** dan kandidat kuat foto sementara hero jika belum ada foto `hero.webp` 16:9. Crop bagian tutup kotak atas agar fokus ke pisang (`object-[50%_75%]`). |
| `pisang kembung stroberi_.jpg` | `736 × 981` (Portrait `0.75`) | Disajikan di wadah styrofoam putih; latar atas tampak botol saus (`BRUNO SAUCE KEEPER`) dan boks lain di sebelah kiri. | **Draft Sementara Saja.** Crop ketat ke area pisang (`object-[55%_68%]`, scale crop halus di CSS saat build) agar botol saus tidak mendominasi frame. **Wajib foto ulang** dengan kotak kraft seragam. |
| `pisang kembung matcha_.jpg` | `736 × 1308` (Portrait tinggi `0.56`) | Close-up glaze matcha hijau di wadah styrofoam putih; tampak garpu plastik magenta di kanan atas dan pantulan jari di kanan bawah. | **Draft Sementara Saja.** Crop fokus tengah (`object-[46%_46%]`) agar porsi matcha memenuhi frame `4:3`. **Wajib foto ulang** tanpa garpu magenta & pantulan jari. |
| `pisang kembung tiramisu_.jpg` | `736 × 920` (Portrait `0.80`) | Pisang dengan glaze tiramisu dalam kotak kraft dipegang dua tangan. **TEMUAN PENTING:** Tutup kotak bagian atas memperlihatkan stiker merek lain bertuliskan **`"D'TENGIL"`**. | **PERHATIAN KHUSUS:** Untuk prototype/dev internal, **wajib di-crop ketat di area bawah** (`object-[50%_82%]` / cropping file lokal ke area pisang saja) agar stiker merek lain **100% tidak terlihat**. **Wajib foto ulang** dengan kotak polos/stiker Pisang Royal Pringgodani sebelum rilis publik! |

### Daftar Foto Tambahan yang Masih Perlu Disediakan Pemilik (PRD Bagian 10)
Untuk memenuhi standar rilis publik PRD (`lebar >= 1200px`, WebP `< 150 KB`, pencahayaan hangat seragam tanpa merek lain):
1. `hero.webp` (`16:9` / `4:3` landscape lebar `>= 1200px`): komposisi 1–2 kotak pisang kembung di atas alas kayu/krem hangat. *(Sementara dev, hero memakai frame `4:5` atau kolase bersih `coklat` + `ori` agar tidak pecah di desktop).*
2. `mix.webp` (`4:3`, `>= 1200px`): 1 porsi kombinasi dua rasa dalam satu kotak. *(Selama belum tersedia, sistem UI **otomatis merender foto belah-dua 50/50** dari 2 foto rasa yang dipilih pelanggan — tetap informatif dan rapi).*
3. `topping-*.webp` (`oreo`, `keju`, `choco-chips`, `meises`, `sprinkle` — `1:1` kecil untuk blok topping). *(Selama belum tersedia, chip topping tampil bersih tanpa foto rusak dengan teks jelas + ikon/indikator minimalis, atau ilustrasi foto bahan berlisensi jika disetujui).*

---

## 9. Arahan Copywriting (Bahasa Indonesia, Anti-Slop)

- **Suara Brand:** Ramah, santai, langsung ke inti (*sensory facts + light playful clarity*). Terdengar seperti pemilik toko pisang kembung yang ramah menjawab pelanggan di konter, **bukan** kalimat iklan korporat atau terjemahan bahasa Inggris yang kaku.
- **Aturan Hero & Judul:**
  - Setiap judul memakai kata benda nyata (`Menu Pisang Kembung`, `Campur Rasa & Topping`, `Cara Pesan`, `Kirim ke WhatsApp`).
  - Hero langsung menyebut produk + harga/aturan nyata:
    - *H1:* `Pisang Kembung Renyah, Bebas Mix Rasa.`
    - *Sub-line:* `Pilih dari 5 varian rasa mulai Rp17.000. Boleh campur hingga 2 rasa dengan harga tetap Rp20.000, sudah termasuk topping.`
- **Konsistensi Label Tombol (Verba + Objek):**
  - `Lihat Menu`
  - `Pesan` (pada kartu menu)
  - `Tambah ke Keranjang`
  - `Lihat Keranjang`
  - `Lanjut ke Checkout`
  - `Kirim ke WhatsApp`
  - `Pesan via Shopee`
  - Hindari kata klise: *"Jelajahi"*, *"Selengkapnya"*, *"Klik di sini"*, *"Revolusi rasa"*, *"Sensasi tak terlupakan"*, *"Hadir untuk memanjakan"*.

---

## 10. Rekomendasi Stack Teknis & Checklist Verifikasi Desain

### Stack yang Direkomendasikan (Selaras PRD Bagian 12 & Target Kecepatan 4G)
- **Opsi Utama (Tercepat di 4G Mobile):** **Astro (Static Output) + React Islands (`@astrojs/react`) + Tailwind CSS + `motion/react` (`LazyMotion` + `domMax`/`domAnimation`) + Nanostores + `localStorage`**.
  - Alasan: Halaman statis (`/tentang`, `/privasi`, `/kontak`, `/404`, kerangka Beranda) terkirim nyaris 0 KB JS sehingga LCP di 4G sangat mudah `< 2.5s` dan Lighthouse Mobile `>= 90`; sementara komponen interaktif (Panel Kustomisasi Mix, Cart Drawer, Checkout Form, Sticky Cart Bar) berjalan mulus dengan React & Motion.
- **Opsi Alternatif (Full SPA Transition):** **Next.js App Router (`output: 'export'`) + Tailwind CSS + `motion/react`**, jika diinginkan transisi antar-halaman penuh dengan `AnimatePresence` / shared cart state tanpa island terpisah (tetap jaga `LazyMotion` agar bundle awal ringan).

### Checklist Pengujian Sebelum Tayang (Design & UX Gate)
- [ ] **Non-AI-Slop & Restraint:** Tidak ada gradien hiasan, tidak ada ungu/lavender, tidak ada kartu miring/scroll-reveal lambat, tidak ada kotak di dalam kotak melebihi 2 tingkat.
- [ ] **Kontras & Aksesibilitas:** Semua teks lolos WCAG 2.1 AA (`>= 4.5:1`), termasuk teks `#A82E15` di tombol Shopee, focus ring terlihat jelas, navigasi keyboard + Esc menutup Modal/Drawer/Sheet.
- [ ] **Interaksi Tanpa Halangan:** Memilih rasa mix (Rp20.000) dan ORI tunggal (Rp17.000) mengupdate harga & preview foto secara instan; gagal validasi form tidak menghapus data ketikan.
- [ ] **Anti-Tabrakan Mobile (`360px` & `390px`):** Bilah keranjang bawah, tombol WA mengambang, dan bottom sheet tidak pernah saling bertumpuk; seluruh target ketuk `>= 44px`; nol scroll horizontal.
- [ ] **Kebersihan Aset Foto:** Tidak ada stiker merek lain (`D'TENGIL`) atau botol latar yang terlihat; semua foto WebP `< 150 KB` sebelum rilis publik.
