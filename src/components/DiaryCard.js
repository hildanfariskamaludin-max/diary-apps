// src/components/DiaryCard.js
// Komponen reusable (Pertemuan 2 - Refactoring).
// Satu kartu diary dipisah menjadi komponen sendiri agar bisa dipakai ulang
// untuk banyak data berbeda. Data dikirim dari parent melalui props.
//
// moodImage : asset lokal hasil require() (opsional)
// moodUri   : URL remote sebagai alternatif (opsional)
// mood      : kunci mood untuk menentukan warna border/outline & badge kartu.

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getMoodTheme } from '../styles/moods';

export default function DiaryCard({
  title,
  date,
  preview,
  moodImage,
  moodUri,
  mood = 'default',
}) {
  const theme = getMoodTheme(mood);
  const source = moodImage ?? (moodUri ? { uri: moodUri } : undefined);

  return (
    <View
      style={[
        styles.card,
        { borderColor: theme.border, backgroundColor: theme.background },
      ]}
    >
      <View style={[styles.accent, { backgroundColor: theme.border }]} />

      <View style={styles.cardBody}>
        <Image source={source} style={styles.mood} />

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>

            <View style={[styles.badge, { backgroundColor: theme.border }]}>
              <Text style={styles.badgeText}>{theme.label}</Text>
            </View>
          </View>

          <Text style={styles.date}>{date}</Text>

          <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
            {preview}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  accent: {
    width: 4,
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    alignItems: 'center',
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eef2ff',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
    color: '#111827',
  },
});
