// src/styles/moods.js
// Variasi tampilan kartu berdasarkan mood (Tugas Praktikum Pertemuan 2).
// Setiap mood punya warna border/outline, warna latar kartu, dan label badge
// sehingga tampilan kartu berubah-ubah mengikuti suasana hati catatan.

export const MOOD_THEME = {
  happy: {
    label: 'Senang',
    border: '#F59E0B',
    background: '#FFFBEB',
  },
  focus: {
    label: 'Fokus',
    border: '#2563EB',
    background: '#EFF6FF',
  },
  calm: {
    label: 'Tenang',
    border: '#0D9488',
    background: '#ECFDF5',
  },
  hangout: {
    label: 'Santai',
    border: '#DB2777',
    background: '#FDF2F8',
  },
  evening: {
    label: 'Senja',
    border: '#7C3AED',
    background: '#F5F3FF',
  },
  default: {
    label: 'Netral',
    border: '#6B7280',
    background: '#FFFFFF',
  },
};

export const getMoodTheme = (mood) => MOOD_THEME[mood] ?? MOOD_THEME.default;
