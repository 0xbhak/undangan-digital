# Undangan Digital Pernikahan: Samsul Bahri & Hilya Melati

Website Undangan Digital Pernikahan dengan tema mewah **Ivory & Gold Luxury** (mengacu pada struktur dan layout referensi *Black Diamond*).

---

## 🤵👰 Data Mempelai & Acara

- **Mempelai Pria:** Samsul Bahri (Bahri)
  - Putra ke-2 dari Bapak Abd Hamid & Ibu Nurasiah
- **Mempelai Wanita:** Hilya Melati (Hilya)
  - Putri ke-8 dari Bapak Burhanuddin & Ibu Fatimah

### Jadwal Acara:
1. **Akad Nikah:**
   - **Hari/Tanggal:** Kamis, 26 November 2026
   - **Waktu:** 09:00 WIB s.d Selesai
   - **Lokasi:** KUA Montasik
   - **Alamat:** Montasik, Aceh Besar
   - **Google Maps:** [https://maps.app.goo.gl/P9ByNdGr3Rw2BReS6](https://maps.app.goo.gl/P9ByNdGr3Rw2BReS6)

2. **Resepsi Pernikahan:**
   - **Hari/Tanggal:** Sabtu, 28 November 2026
   - **Waktu:** 11:00 WIB s.d Selesai
   - **Lokasi:** Dirumah (Kediaman)
   - **Alamat:** Desa Teubang Phui Mesjid, Kecamatan Montasik, Aceh Besar
   - **Google Maps:** [https://maps.app.goo.gl/fesMSQhsnBwfkB6Z7](https://maps.app.goo.gl/fesMSQhsnBwfkB6Z7)

---

## ✨ Fitur Utama Undangan

1. **Cover / Halaman Pembuka (Buka Undangan)**
   - Layar pembuka interaktif dengan nama tamu dinamis.
   - Tombol "Buka Undangan" yang memicu pemutaran musik piano otomatis, membuka scroll kunci, dan menampilkan menu navigasi mengambang.
2. **Nama Tamu Dinamis (URL Parameter)**
   - Mendukung parameter URL `?to=Nama+Tamu` atau `?u=Nama+Tamu`.
   - Nama tamu otomatis tampil di kartu undangan depan dan kolom RSVP form.
   - Contoh: `index.html?to=Bapak+Ahmad+Fauzi+%26+Keluarga`
3. **Generator Link Tamu & WhatsApp Template**
   - Tombol "Buat Link Nama Tamu" di bagian bawah untuk mempermudah calon pengantin membuat link personal tamu dan menyalin teks format WhatsApp sekali klik.
4. **Musik Latar (Instrument Piano)**
   - Musik piano romantis (*Nyoman Paul ft. Andi Rianto - The Way You Look At Me Instrumental*).
   - Tombol kontrol audio melayang berbentuk vinyl piringan hitam yang berputar saat musik diputar.
5. **Countdown Timer Live**
   - Penghitung waktu mundur akurat menuju Akad Nikah (26 November 2026, 09:00 WIB).
6. **Integrasi Google Maps & Kalender**
   - Tombol langsung ke titik Google Maps masing-masing acara.
   - Tombol "Simpan ke Kalender" (Google Calendar langsung & unduh file `.ics` untuk Apple/Outlook).
7. **Ayat Suci Al-Qur'an**
   - Surat Ar-Rum ayat 21 berkaligrafi Arab dengan terjemahan bahasa Indonesia.
8. **Love Story (Perjalanan Cinta)**
   - Timeline interaktif 3 babak: *Awal Pertemuan*, *Komitmen & Doa*, dan *Lamaran & Menuju Pelaminan*.
9. **Galeri Foto Interaktif & Lightbox**
   - Grid galeri foto resolusi tinggi dengan efek zoom.
   - Lightbox modal layar penuh dengan navigasi slide (Next, Prev, Keyboard Arrow, dan swipe mobile).
10. **Wedding Gift (Amplop Digital & Kado Fisik)**
    - **Amplop Digital:** Bank Syariah Indonesia (BSI) No. Rekening `7191305242` a.n **Hilya Melati** dengan tombol "Salin No. Rekening" + notifikasi toast.
    - **Kado Fisik:** Alamat Desa Teubang Phui Mesjid kec montasik, No. HP 082277795054 dengan tombol "Salin Alamat" dan "Konfirmasi via WhatsApp".
11. **Buku Tamu & RSVP Interaktif**
    - Formulir konfirmasi kehadiran (Hadir / Tidak Hadir, Jumlah Tamu, Pesan Doa).
    - Daftar ucapan realtime tersimpan di `localStorage` peramban.
12. **Desain Mewah Ivory & Gold**
    - Palet warna lembut gading (*ivory*) dipadukan aksen emas (*champagne gold*), ornamen floral sudut, crest monogram, dan animasi partikel cahaya emas.
    - Desain responsif mobile-first, sangat nyaman dibuka di ponsel pintar tamu maupun laptop.

---

## 🚀 Cara Menjalankan Secara Lokal

Cukup buka file `index.html` langsung di peramban (browser) favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari), atau jalankan server lokal:

```bash
# Menggunakan Python
python -m http.server 8000

# Atau menggunakan Node.js npx serve
npx serve .
```

Kemudian buka di peramban: `http://localhost:8000/?to=Nama+Tamu`

