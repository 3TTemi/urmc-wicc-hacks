import { StyleSheet, Text, View } from 'react-native';

import { TG } from '@/constants/theme';

type Props = {
  n: number;
  label: string;
};

export function StatTile({ n, label }: Props) {
  return (
    <View style={styles.tile}>
      <Text style={styles.num}>{n}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 4,
    backgroundColor: TG.paper,
    borderWidth: 1,
    borderColor: TG.line,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 0,
  },
  num: {
    fontFamily: TG.display,
    fontSize: 26,
    color: TG.ink,
    letterSpacing: -0.5,
  },
  label: {
    fontFamily: TG.bodyMedium,
    fontSize: 10,
    color: TG.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 2,
  },
});
