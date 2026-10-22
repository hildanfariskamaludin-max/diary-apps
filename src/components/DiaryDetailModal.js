import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACE, RADIUS, TYPO, getMoodTheme } from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;

  const theme = getMoodTheme(entry.mood);
  const heroSource =
    entry.heroImage ??
    (entry.heroUri
      ? { uri: entry.heroUri }
      : entry.moodImage ?? (entry.moodUri ? { uri: entry.moodUri } : undefined));

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView
        style={styles.container}
        edges={['top', 'left', 'right', 'bottom']}
      >
        <Image source={heroSource} style={styles.hero} resizeMode="cover" />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{entry.title}</Text>

          <View style={styles.metaRow}>
            <View style={[styles.badge, { backgroundColor: theme.badge }]}>
              <Text style={[styles.badgeText, { color: theme.badgeText }]}>
                {theme.label}
              </Text>
            </View>

            <Text style={styles.date}>{entry.date}</Text>
          </View>

          <Text style={styles.body}>{entry.body ?? entry.preview}</Text>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.85 : 1 },
            ]}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Tutup detail entri"
          >
            <Text style={styles.buttonText}>Tutup</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },

  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.heroPlaceholder,
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: { padding: SPACE.l, gap: SPACE.s, paddingBottom: SPACE.xl },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.s },
  badge: {
    paddingHorizontal: SPACE.s,
    paddingVertical: 2,
    borderRadius: RADIUS.badge,
  },
  badgeText: { fontSize: 10, fontWeight: '700' },
  date: { fontSize: TYPO.caption, color: COLORS.muted },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 22 },
  button: {
    marginTop: SPACE.l,
    minHeight: 44,
    justifyContent: 'center',
    paddingVertical: SPACE.m,
    paddingHorizontal: SPACE.l,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.surface, fontSize: TYPO.body, fontWeight: '700' },
});
