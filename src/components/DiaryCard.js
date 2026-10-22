import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO, getMoodTheme } from '../styles/tokens';


export default function DiaryCard({
  title,
  date,
  preview,
  moodUri,
  moodImage,
  mood = 'default',
  liked = false,
  onPress = () => {},
  onToggleLike = () => {},
  variant = 'list',
}) {
  const theme = getMoodTheme(mood);
  const source = moodImage ?? (moodUri ? { uri: moodUri } : undefined);

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: COLORS.border }}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Entri ${title} tanggal ${date}, mood ${theme.label}`}
      accessibilityHint="Membuka detail entri diary"
    >
      <View
        style={[
          styles.card,
          variant === 'grid' && styles.cardGrid,
          { borderColor: theme.border, backgroundColor: theme.background },
        ]}
      >
        <Image
          source={source}
          style={variant === 'grid' ? styles.moodGrid : styles.mood}
        />

        <View style={variant === 'grid' ? styles.contentGrid : styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>

            <View style={[styles.badge, { backgroundColor: theme.badge }]}>
              <Text style={[styles.badgeText, { color: theme.badgeText }]}>
                {theme.label}
              </Text>
            </View>
          </View>

          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
            {preview}
          </Text>
        </View>

        {/*
          Callback prop: child tidak mengubah state liked secara langsung,
          dia meminta parent (DiaryListScreen) untuktoggle lewat onToggleLike.
        */}
        <Pressable
          onPress={onToggleLike}
          hitSlop={8}
          accessible
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Batal suka' : 'Suka entri ini'}
          accessibilityState={{ selected: liked }}
          style={({ pressed }) => [
            styles.likeButton,
            variant === 'grid' && styles.likeButtonGrid,
            pressed && styles.likePressed,
          ]}
        >
          <Text style={[styles.like, liked && styles.likeActive]}>
            {liked ? '♥' : '♡'}
          </Text>
          <Text style={styles.likeLabel}>{liked ? 'Disukai' : 'Suka'}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },

  cardGrid: { flexDirection: 'column', alignItems: 'stretch' },
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: COLORS.moodPlaceholder,
  },
  moodGrid: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: RADIUS.badge,
    backgroundColor: COLORS.moodPlaceholder,
  },
  content: { flex: 1 },

  contentGrid: { width: '100%' },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
  },
  title: { flex: 1, fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  badge: {
    paddingHorizontal: SPACE.s,
    paddingVertical: 2,
    borderRadius: RADIUS.badge,
  },
  badgeText: { fontSize: 10, fontWeight: '700' },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 6 },
  preview: { fontSize: TYPO.body, color: COLORS.text },

  likeButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACE.s,
    borderRadius: RADIUS.badge,
  },
  likePressed: { opacity: 0.6 },
  likeButtonGrid: { alignSelf: 'flex-start' },
  like: { fontSize: 22, lineHeight: 26, color: COLORS.muted },
  likeActive: { color: COLORS.like },
  likeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.mutedStrong,
    marginTop: 2,
  },
});
