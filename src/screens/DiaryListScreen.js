// src/screens/DiaryListScreen.js
// Halaman daftar entri Buku Harian (Pertemuan 2 - Komponen Dasar).
// Menampilkan entri dengan View, Text, Image, ScrollView, StyleSheet, dan
// layout Flexbox. Kartu diary dipisah menjadi komponen reusable
// (../components/DiaryCard) dan data dikirim melalui props.

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DiaryCard from '../components/DiaryCard';

// Foto profil pengguna pada header.
const avatar = require('../../assets/moods/avatar.jpg');

const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview:
      'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    mood: 'happy',
    // Gambar lokal (menggantikan URL remote) - lihat folder assets/moods.
    moodImage: require('../../assets/moods/pagi.jpg'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview:
      'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    mood: 'focus',
    // Gambar remote dari internet.
    moodUri: 'https://picsum.photos/seed/focus/80',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview:
      'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    mood: 'calm',
    // Gambar remote dari internet.
    moodUri: 'https://picsum.photos/seed/calm/80',
  },
  {
    id: 4,
    title: 'Sarapan di Teras Rumah',
    date: '2025-10-03',
    preview:
      'Sarapan sederhana di teras rumah ditemani secangkung kopi hangat dan koran pagi.',
    mood: 'hangout',
    moodImage: require('../../assets/moods/terasrumah.jpg'),
  },
  {
    id: 5,
    title: 'Sore di Atas Atap',
    date: '2025-10-02',
    preview:
      'Sore ini aku menikmati suasana dari atap rumah sambil merekam langit yang mulai jingga.',
    mood: 'evening',
    moodImage: require('../../assets/moods/sore.jpg'),
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image source={avatar} style={styles.avatar} />

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Buku Harian</Text>
          <Text style={styles.headerSubtitle}>
            Hldan Faris Kamaludin - 2430511059
          </Text>
        </View>
      </View>

      <Text style={styles.meta}>{diaryEntries.length} entri tersimpan</Text>

      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          mood={entry.mood}
          moodImage={entry.moodImage}
          moodUri={entry.moodUri}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#eef2ff',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
});
