import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, RADIUS, TYPO, BREAKPOINTS } from '../styles/tokens';


const avatar = require('../../assets/moods/avatar.jpg');

const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview:
      'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit mengitari kompleks. Udara pagi terasa sejuk dan masih sedikit berkabut. Aku menyeduh teh hangat dan memulai hari dengan hal-hal kecil.',
    mood: 'happy',

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
    mood: 'focus',

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
    mood: 'calm',

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
    mood: 'hangout',
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
    mood: 'evening',
    moodImage: require('../../assets/moods/sore.jpg'),
    heroUri: 'https://picsum.photos/seed/eveninghero/800/450',
  },
  {

    id: 6,
    title: 'Hujan Sore di Kosan',
    date: '2025-10-01',
    preview:
      'Hujan turun deras sejak sore. Aku menutup jendela dan menikmati suara air di atap...',
    body: 'Hujan turun deras sejak pukul empat sore. Aku menutup jendela, menyeduh kopi, dan mendengarkan suara air menghantam atap seng. Tidak ada keinginan untuk keluar, dan itu justru terasa menyenangkan.',
    mood: 'calm',
    moodUri: 'https://picsum.photos/seed/rain/200',
    heroUri: 'https://picsum.photos/seed/rainhero/800/450',
  },
  {

    id: 7,
    title: 'Kumpul Kelompok Malam',
    date: '2025-09-30',
    preview:
      'Rapat kelompok online membahas pembagian tugas praktikum. Diskusi berjalan cair...',
    body: 'Rapat kelompok online membahas pembagian tugas praktikum berikutnya. Diskusi berjalan cair meski hanya lewat panggilan video. Kami menyepakati pembagian bagian dan jadwal kumpul berikutnya sebelum tengah malam.',
    mood: 'hangout',
    moodUri: 'https://picsum.photos/seed/meeting/200',
    heroUri: 'https://picsum.photos/seed/meetinghero/800/450',
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
        mood={item.mood}
        moodImage={item.moodImage}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  const renderHeader = () => (
    <View>
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
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={keyForCols}
        data={diaryEntries}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? styles.column : undefined}
        contentContainerStyle={styles.content}
        ListHeaderComponent={renderHeader}
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
  content: { padding: SPACE.l, gap: SPACE.m },
  column: { gap: SPACE.m },
  itemWrap: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto' },
  itemWrap2: { flex: 1 / 2 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    marginBottom: SPACE.xs,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.avatar,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.moodPlaceholder,
  },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  headerSubtitle: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
  },
  meta: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: SPACE.s,
  },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: SPACE.xl },
});
