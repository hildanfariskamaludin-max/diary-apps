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
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';
import { COLORS, SPACE, RADIUS, TYPO, BREAKPOINTS } from '../styles/tokens';

const IMG = {
  avatar: require('../../assets/moods/avatar.jpg'),
  happy: require('../../assets/moods/happy.jpeg'),
  focus: require('../../assets/moods/focus.jpeg'),
  calm: require('../../assets/moods/calm.jpeg'),
  default: require('../../assets/moods/default.jpeg'),
  sore: require('../../assets/moods/sore.jpg'),
  terasrumah: require('../../assets/moods/terasrumah.jpg'),
};

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview:
      'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit mengitari kompleks. Udara pagi terasa sejuk dan masih sedikit berkabut. Aku menyeduh teh hangat dan memulai hari dengan hal-hal kecil.',
    mood: 'happy',
    moodImage: IMG.happy,
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview:
      'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    body: 'Menyelesaikan modul praktikum pada mata kuliah Mobile Programming. Berdiskusi dengan tim kelompok mengenai pembagian tugas dan konfigurasi proyek. Banyak insight baru untuk dicatat.',
    mood: 'focus',
    moodImage: IMG.focus,
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview:
      'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    body: 'Menikmati senja di taman dekat kampus sambil membaca buku favorit. Langit berubah warna dari jingga ke ungu. Udara mulai mendingin.',
    mood: 'calm',
    moodImage: IMG.calm,
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => {
    if (!query.trim()) return entries;

    const q = query.trim().toLowerCase();

    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q)
    );
  }, [entries, query]);


  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };


  const addEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        mood={item.mood}
        moodImage={item.moodImage}
        moodUri={item.moodUri}
        liked={likedIds.has(item.id)}
        onToggleLike={() => toggleLike(item.id)}
        onPress={() => setSelected(item)}
        variant={twoCols ? 'grid' : 'list'}
      />
    </View>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Image source={IMG.avatar} style={styles.avatar} />

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Buku Harian</Text>
          <Text style={styles.headerSubtitle}>
            Hldan Faris Kamaludin - 2430511059
          </Text>
        </View>
      </View>

      <Text style={styles.meta}>
        {query.trim()
          ? `Menampilkan ${filtered.length} dari ${entries.length} entri`
          : `${entries.length} entri tersimpan`}
        {likedIds.size > 0 ? ` - ${likedIds.size} disukai` : ''}
      </Text>

      <EntryForm onSubmit={addEntry} />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar onChange={setQuery} />

      <FlatList
        key={keyForCols}
        data={filtered}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? styles.column : undefined}
        contentContainerStyle={styles.content}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {query.trim()
              ? 'Tidak ada entri yang cocok dengan pencarian.'
              : 'Belum ada entri.'}
          </Text>
        }
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
