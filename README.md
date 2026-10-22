# Diary App - Praktikum 4 Mobile Programming

Aplikasi Buku Harian (Diary App) berbasis **React Native + Expo CLI**.

Project ini **lanjutan** dari Pertemuan 3. Kalau Pertemuan 3 membahas desain UI,
layout responsif, dan modal detail, Pertemuan 4 membahas **Props dan State**:
data dikirim dari parent ke child lewat props, dan data yang berubah disimpan
di state memakai `useState`.

## Data Mahasiswa

| | |
|---|---|
| Nama | Hldan Faris Kamaludin |
| NIM | 2430511059 |
| Mata Kuliah | Mobile Programming (Multiplatform) |
| Program Studi | Teknik Informatika, Fakultas Sains dan Teknologi, Universitas Muhammadiyah Sukabumi |

## Ringkasan Perubahan dari Pertemuan 3

| Aspek | Pertemuan 3 | Pertemuan 4 |
|---|---|---|
| Sumber data | Array konstanta di dalam file | `state` `entries` di `DiaryListScreen` |
| Pencarian | Belum ada | `SearchBar` + `query` + derived `filtered` |
| Status suka | Belum ada | `likedIds` (`Set`) + callback `onToggleLike` |
| Tambah entri | Belum ada | `EntryForm` terkontrol + callback `onSubmit` |
| Peran `DiaryCard` | Presentational + mood theme | Presentational murni (data & callback dari props) |
| Gambar entri | Lokal + remote | Lokal saja (`assets/moods/`) |
| Layout responsif | 1–2 kolom @600 px | Dipertahankan |

---

## Fitur yang Ditambahkan di Praktikum 4

### 1. `DiaryCard` Menerima Props (`src/components/DiaryCard.js`)

`DiaryCard` sekarang menjadi **presentational component**: ia hanya menampilkan
data dan meneruskan aksi ke parent. Tidak ada `useState` di dalam komponen ini.

| Props | Jenis | Fungsi |
|---|---|---|
| `title`, `date`, `preview` | data | Menampilkan informasi entri |
| `mood`, `moodImage`, `moodUri` | data | Tema mood + sumber gambar |
| `liked` | data (boolean) | Menentukan ikon hati terisi atau kosong |
| `onPress` | callback | Membuka modal detail |
| `onToggleLike` | callback | Meminta parent mengubah status like |

Status like **tidak** disimpan di `DiaryCard`. Kartu hanya menampilkan `liked`
dan memanggil `onToggleLike()`; orang tua yang memutuskan apakah statusnya
berubah.

### 2. `SearchBar` - Local State + Callback (`src/components/SearchBar.js`)

```js
const [queryText, setQueryText] = useState('');

const handleChange = (text) => {
  setQueryText(text);   // local state
  onChange?.(text);     // callback prop -> parent
};
```

`queryText` adalah **local state** milik `SearchBar` karena hanya komponen ini
yang perlu mengetahui isi input. Setiap ketikan langsung diteruskan ke parent
lewat `onChange` supaya `query` di `DiaryListScreen` ikut berubah.

### 3. `EntryForm` - Controlled Form (`src/components/EntryForm.js`)

Setiap input dibaca dari state dan perubahan user disimpan lewat setter
(*controlled*), bukan `defaultValue`:

```js
const [title, setTitle] = useState('');
const [date, setDate] = useState('2026-10-19');
const [preview, setPreview] = useState('');
```

Tombol **Simpan** hanya aktif kalau judul dan ringkasan tidak kosong
(`canSubmit`). Saat ditekan, data dikirim ke parent melalui `onSubmit`, lalu
state form dikosongkan kembali supaya form siap dipakai untuk entri berikutnya.

### 4. `DiaryListScreen` sebagai Container (`src/screens/DiaryListScreen.js`)

`DiaryListScreen` menjadi **single source of truth** dan mengelola empat state
utama:

| State | Peran |
|---|---|
| `entries` | Menyimpan seluruh data diary |
| `query` | Menyimpan kata kunci pencarian dari `SearchBar` |
| `likedIds` | Menyimpan `Set` id entri yang disukai |
| `selected` | Menyimpan entri yang sedang dibuka di modal |

**Derived state** dihitung, bukan disimpan:

```js
const filtered = useMemo(() => {
  if (!query.trim()) return entries;
  const q = query.trim().toLowerCase();
  return entries.filter((entry) =>
    entry.title.toLowerCase().includes(q) ||
    entry.preview.toLowerCase().includes(q) ||
    entry.date.toLowerCase().includes(q)
  );
}, [entries, query]);
```

`filtered` bergantung pada `entries` dan `query`, jadi tidak perlu state
tambahan. Karena `entries` dan `query` berubah, `filtered` dihitung ulang dan
UI langsung menyesuaikan tanpa me-restart aplikasi.

### 5. `likedIds` dengan Set Baru (immutability)

`Set` tidak boleh dimutasi langsung karena React membandingkan referensi.
Setiap toggle membuat `Set` baru:

```js
const toggleLike = (id) => {
  setLikedIds((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
};
```

### 6. Gambar Lokal

Semua entri memakai gambar dari `assets/moods/` (`happy.jpeg`, `focus.jpeg`,
`calm.jpeg`, `default.jpeg`, `sore.jpg`, `terasrumah.jpg`), jadi aplikasi tetap
berjalan tanpa koneksi internet. Entri baru dari `EntryForm` memakai
`default.jpeg`.

### 7. Fitur dari Pertemuan 3 yang Dipertahankan

- Design tokens terpusat di `src/styles/tokens.js`.
- Tema mood per entri (warna border, latar kartu, badge).
- Layout responsif `FlatList`: 1 kolom di ponsel, 2 kolom saat lebar `>= 600 px`.
- `DiaryDetailModal` dengan hero image 16/9 dan tombol Tutup.
- Aksesibilitas: `accessibilityLabel`, `accessibilityRole`, kontras teks
  minimal 4.5:1, target sentuh minimal 44 px.

---

## Penjelasan Props dan State

**Props** adalah data yang dikirim parent ke child. Child memperlakukannya
sebagai input yang **hanya dibaca** - child tidak boleh mengubahnya langsung.
Pada Diary App, `DiaryCard` menerima `title`, `date`, `preview`, `liked`, dan
juga fungsi callback.

**State** adalah data milik sebuah komponen yang bisa berubah. Perubahan state
dipicu lewat setter dari `useState` dan membuat React melakukan re-render.

**Callback props** adalah cara child meminta perubahan pada parent. Alurnya:

```
Aksi pengguna  ->  child memanggil callback props  ->  parent mengubah state
                ->  React re-render  ->  props baru dikirim ke child
```

Contohnya tombol suka:

```
tombol hati ditekan
  -> DiaryCard memanggil onToggleLike()
  -> DiaryListScreen menjalankan toggleLike(id)
  -> setLikedIds(...) membuat Set baru
  -> re-render, DiaryCard menerima liked={true}
  -> ikon hati berubah menjadi terisi
```

**Local state** dipakai kalau datanya hanya dibutuhkan satu komponen
(`queryText` di `SearchBar`, input `EntryForm`). **Shared state** diletakkan di
parent kalau dipakai lebih dari satu child (`entries`, `query`, `likedIds`,
`selected`). **Derived state** adalah nilai yang dihitung dari state lain
(`filtered`).

---

## Struktur Folder

```
diary-app/
├── App.js                        # entry point + SafeAreaProvider + StatusBar
├── assets/
│   ├── moods/                    # aset gambar mood & avatar
│   │   ├── avatar.jpg            # foto profil pengguna (header)
│   │   ├── happy.jpeg            # mood "Senang"
│   │   ├── focus.jpeg            # mood "Fokus"
│   │   ├── calm.jpeg             # mood "Tenang"
│   │   ├── default.jpeg          # mood "Netral" (dipakai entri baru)
│   │   ├── sore.jpg              # mood "Senja"
│   │   └── terasrumah.jpg        # mood "Santai"
│   └── ...                       # icon & splash bawaan template
├── screenshots/                  # dokumentasi tampilan aplikasi
├── src/
│   ├── components/
│   │   ├── DiaryCard.js          # presentational component (props + callback)
│   │   ├── DiaryDetailModal.js   # modal detail entri
│   │   ├── SearchBar.js          # local state + callback onChange
│   │   └── EntryForm.js          # controlled form + callback onSubmit
│   ├── screens/
│   │   └── DiaryListScreen.js    # container: entries, query, likedIds, selected
│   └── styles/
│       └── tokens.js             # design tokens + tema mood
├── eslint.config.js
├── app.json
└── package.json
```

## Cara Menjalankan Project

Prasyarat: **Node.js LTS** dan **Expo Go** (Android/iOS). Untuk mencoba di HP,
HP dan laptop harus berada pada jaringan Wi-Fi yang sama.

```bash
# 1. Install dependency
npm install

# 2. Jalankan development server
npx expo start
```

3. Scan QR code yang muncul di terminal menggunakan aplikasi **Expo Go**, atau tekan:
   - `a` untuk membuka di Android Emulator,
   - `w` untuk membuka di browser (web),
   - `i` untuk membuka di iOS Simulator (khusus macOS).

Untuk mencoba langsung di browser:

```bash
npm run web
```

Menghentikan server: `Ctrl + C`. Jika terjadi masalah cache:
`npx expo start -c`.

Pemeriksaan kode (lint):

```bash
npx expo lint
```

> Catatan Windows/PowerShell: jika muncul pesan
> `npx.ps1 cannot be loaded because running scripts is disabled`, jalankan
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, atau gunakan `npx.cmd`.

## Cara Kerja Breakpoint 600 px

Jumlah kolom ditentukan sepenuhnya oleh **lebar layar yang terbaca saat itu**,
bukan oleh platform atau ukuran perangkat yang di-hardcode.

1. `useWindowDimensions()` memberikan `width` terkini dan **memaksa render ulang**
   setiap kali ukuran jendela atau orientasi berubah.
2. Nilai itu dibandingkan dengan token `BREAKPOINTS.tablet` (600):

   ```js
   const { width } = useWindowDimensions();
   const twoCols = width >= BREAKPOINTS.tablet;
   ```

3. Kalau `twoCols` bernilai `false` (lebar < 600 px, tipikal ponsel), `FlatList`
   memakai `numColumns={1}` dan kartu ditampilkan dengan `variant="list"`
   (gambar di kiri, teks di kanan).
4. Kalau `twoCols` bernilai `true` (lebar >= 600 px, tipikal tablet atau jendela
   browser yang dilebarkan), `FlatList` memakai `numColumns={2}`, kartu memakai
   `variant="grid"` (gambar di atas, teks di bawah), dan `columnWrapperStyle`
   menambahkan jarak antarkolom.
5. `numColumns` **tidak boleh diubah saat FlatList sudah terpasang**. Karena itu
   `key` FlatList dibuat ikut berubah:

   ```js
   const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);
   ```

   Perubahan `key` membuat FlatList dipasang ulang dengan struktur kolom baru,
   sehingga tidak ada kartu yang tertinggal atau berantakan saat rotasi.
6. Kartu pada baris terakhir grid memakai `flex: 1 / 2`, jadi bila jumlah entri
   ganjil (7 entri) kartu terakhir tetap selebar satu kolom dan tidak melar
   memenuhi baris.

Angka **600** dipilih karena lebar ponsel umumnya 320-480 px, sedangkan tablet
dimulai dari 600 px (setara `sw600dp` pada Android). Dengan batas ini ponsel
selalu mendapat 1 kolom yang nyaman dibaca, sementara layar lebar memanfaatkan
ruasnya untuk 2 kolom tanpa perlu mendeteksi jenis perangkat.

## Screenshot

### Tampilan 1 Kolom (lebar layar < 600 px)

![Tampilan 1 kolom](screenshots/p3-1kolom.png)

Kartu ditampilkan penuh satu baris: gambar mood di kiri, lalu judul + badge mood +
tombol suka + tanggal + cuplikan isi di kanan.

### Tampilan 2 Kolom (lebar layar >= 600 px)

![Tampilan 2 kolom](screenshots/p3-2kolom.png)

Daftar berubah menjadi grid dua kolom dengan gambar mood di atas dan teks di
bawah. Perubahan terjadi otomatis saat lebar layar mencapai 600 px.

## Library yang Digunakan

| Library | Fungsi |
|---|---|
| `expo` | Platform dan toolchain pengembangan |
| `expo-status-bar` | Pengaturan status bar aplikasi |
| `react-native` | Framework UI lintas platform |
| `react-native-safe-area-context` | Menangani area aman (notch/status bar) |
| `react-native-web` | Adapter React Native agar bisa dirender di browser |
| `react-dom` | Renderer DOM untuk target web |
| `@expo/metro-runtime` | Runtime Metro untuk web (hot reload) |
