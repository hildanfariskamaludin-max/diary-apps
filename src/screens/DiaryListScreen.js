// src/screens/DiaryListScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview:
      'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit mengitari kompleks. Udara pagi terasa sejuk dan masih sedikit berkabut. Aku menyeduh teh hangat dan memulai hari dengan hal-hal kecil.',
    moodUri: 'https://picsum.photos/seed/happy/200',
    moodImage: require('../../assets/moods/pagi.jpg'),
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview:
      'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    body: 'Menyelesaikan modul praktikum pada mata kuliah Mobile Programming. Berdiskusi dengan tim kelompok mengenai pembagian tugas dan konfigurasi proyek. Banyak insight baru untuk dicatat.',
    moodUri: 'https://picsum.photos/seed/focus/200',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview:
      'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    body: 'Menikmati senja di taman dekat kampus sambil membaca buku favorit. Langit berubah warna dari jingga ke ungu. Udara mulai mendingin.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    id: 4,
    title: 'Sarapan di Teras Rumah',
    date: '2025-10-03',
    preview:
      'Sarapan sederhana di teras rumah ditemani secangkung kopi hangat dan koran pagi.',
    body: 'Sarapan sederhana di teras rumah: nasi goreng, telur mata sapi, dan secangkung kopi hitam. Membaca koran pagi sambil duduk di kursi lipat. Tidak ada agenda berat, terasa seperti hari libur.',
    moodUri: 'https://picsum.photos/seed/hangout/200',
    moodImage: require('../../assets/moods/terasrumah.jpg'),
    heroUri: 'https://picsum.photos/seed/hangouthero/800/450',
  },
  {
    id: 5,
    title: 'Sore di Atas Atap',
    date: '2025-10-02',
    preview:
      'Sore ini aku menikmati suasana dari atap rumah sambil merekam langit yang mulai jingga.',
    body: 'Naik ke atap rumah untuk merekam langit yang mulai jingga. Angin sore lebih sejuk dibanding siang hari. Suara motor di bawah terdengar samar. Bertahan sampai langit berubah menjadi gelap.',
    moodUri: 'https://picsum.photos/seed/evening/200',
    moodImage: require('../../assets/moods/sore.jpg'),
    heroUri: 'https://picsum.photos/seed/eveninghero/800/450',
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        moodImage={item.moodImage}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{
          padding: SPACE.l,
          gap: SPACE.m,
          paddingTop: SPACE.m,
        }}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada entri.</Text>}
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});
