import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';


const DEFAULT_MOOD_IMAGE = require('../../assets/moods/default.jpeg');

export default function EntryForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-10-19');
  const [preview, setPreview] = useState('');

  const canSubmit =
    title.trim().length > 0 &&
    preview.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;

    onSubmit?.({
      id: Date.now(),
      title: title.trim(),
      date: date.trim(),
      preview: preview.trim(),
      body: preview.trim(),
      mood: 'default',
      moodImage: DEFAULT_MOOD_IMAGE,
    });

    setTitle('');
    setDate('2026-10-19');
    setPreview('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>Tambah Entri</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul"
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        accessibilityLabel="Judul entri baru"
      />

      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        accessibilityLabel="Tanggal entri baru"
      />

      <TextInput
        value={preview}
        onChangeText={setPreview}
        placeholder="Ringkasan..."
        placeholderTextColor={COLORS.muted}
        style={[styles.input, styles.multiline]}
        accessibilityLabel="Ringkasan entri baru"
        multiline
      />

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        accessibilityRole="button"
        accessibilityLabel="Simpan entri baru"
        accessibilityState={{ disabled: !canSubmit }}
        style={({ pressed }) => [
          styles.button,
          !canSubmit && styles.buttonDisabled,
          pressed && canSubmit && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Simpan</Text>
      </Pressable>

      {!canSubmit && (
        <Text style={styles.hint}>Isi judul dan ringkasan dulu ya.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: SPACE.l,
    gap: SPACE.s,
    marginBottom: SPACE.s,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  heading: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontSize: TYPO.body,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: SPACE.s,
    minHeight: 44,
    justifyContent: 'center',
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: COLORS.surface, fontWeight: '700' },
  hint: { fontSize: TYPO.caption, color: COLORS.mutedStrong },
});
