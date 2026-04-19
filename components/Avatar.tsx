import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TG } from '@/constants/theme';
import type { Person } from '@/data/types';

type AvatarProps = {
  initial: string;
  color?: string;
  size?: number;
  border?: boolean;
  onPress?: () => void;
};

export function Avatar({
  initial,
  color = TG.forest,
  size = 32,
  border = false,
  onPress,
}: AvatarProps) {
  const content = (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          borderWidth: border ? 2 : 0,
          borderColor: TG.paper,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            fontSize: size * 0.42,
            color: TG.paper,
          },
        ]}>
        {initial}
      </Text>
    </View>
  );
  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }
  return content;
}

type StackProps = {
  people: Person[];
  size?: number;
};

export function AvatarStack({ people, size = 28 }: StackProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {people.map((p, i) => (
        <View key={i} style={{ marginLeft: i === 0 ? 0 : -size * 0.38 }}>
          <Avatar initial={p.initial} color={p.color} size={size} border />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  text: {
    fontFamily: TG.bodySemi,
    letterSpacing: -0.02,
  },
});
