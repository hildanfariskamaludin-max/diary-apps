import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';


export default function SearchBar({
  placeholder = 'Cari entri...',
  onChange,
}) {
  const [queryText, setQueryText] = useState('');

  const handleChange = (text) => {
    setQueryText(text);
    onChange?.(text);
  };

  const handleClear = () => {
    setQueryText('');
    onChange?.('');
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        value={queryText}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        style={styles.input}
        accessibilityLabel="Kolom pencarian"
        returnKeyType="search"
        autoCorrect={false}
      />

      {queryText.length > 0 && (
        <Pressable
          onPress={handleClear}
          hitSlop={8}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Hapus kata kunci pencarian"
          style={({ pressed }) => [
            styles.clear,
            pressed && styles.clearPressed,
          ]}
        >
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontSize: TYPO.body,
  },
  clear: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.moodPlaceholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearPressed: { opacity: 0.6 },
  clearText: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
});
