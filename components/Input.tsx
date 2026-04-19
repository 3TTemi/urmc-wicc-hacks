import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { TG } from '@/constants/theme';

type Props = {
  label?: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  autocomplete?: string[];
  onPick?: (v: string) => void;
  multiline?: boolean;
  minHeight?: number;
};

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  autocomplete,
  onPick,
  multiline,
  minHeight = 52,
}: Props) {
  const [focused, setFocused] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);

  const suggestions = useMemo(() => {
    if (!autocomplete || !value) return [];
    return autocomplete
      .filter((a) => a.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
  }, [autocomplete, value]);

  return (
    <View style={{ gap: 8 }}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={(v) => {
          onChangeText(v);
          setShowSuggest(true);
        }}
        placeholder={placeholder}
        placeholderTextColor={TG.inkFaint}
        multiline={multiline}
        onFocus={() => {
          setFocused(true);
          setShowSuggest(true);
        }}
        onBlur={() => {
          setFocused(false);
          setTimeout(() => setShowSuggest(false), 180);
        }}
        style={[
          styles.input,
          {
            minHeight,
            borderColor: focused ? TG.sunset : TG.line,
            textAlignVertical: multiline ? 'top' : 'center',
            paddingTop: multiline ? 14 : 0,
          },
        ]}
      />
      {showSuggest && suggestions.length > 0 ? (
        <View style={styles.suggest}>
          {suggestions.map((s, i) => (
            <Pressable
              key={s}
              onPress={() => {
                onChangeText(s);
                onPick?.(s);
                setShowSuggest(false);
              }}
              style={[
                styles.suggestRow,
                i > 0 && { borderTopWidth: 1, borderTopColor: TG.line },
              ]}>
              <Icon name="map-pin" size={14} color={TG.inkFaint} />
              <Text style={styles.suggestText}>{s}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: TG.bodyMedium,
    fontSize: 12,
    color: TG.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: TG.paper,
    fontFamily: TG.body,
    fontSize: 16,
    color: TG.ink,
  },
  suggest: {
    backgroundColor: TG.paper,
    borderWidth: 1,
    borderColor: TG.line,
    borderRadius: 14,
    overflow: 'hidden',
  },
  suggestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  suggestText: {
    fontFamily: TG.body,
    fontSize: 14,
    color: TG.ink,
  },
});
