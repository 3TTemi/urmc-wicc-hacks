import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { TG } from '@/constants/theme';

type Variant = 'neutral' | 'forest' | 'sunset' | 'ink' | 'kraft';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  children: ReactNode;
  variant?: Variant;
  selected?: boolean;
  onPress?: () => void;
  icon?: ReactNode;
  size?: Size;
  style?: ViewStyle;
};

export function Chip({
  children,
  variant = 'neutral',
  selected,
  onPress,
  icon,
  size = 'md',
  style,
}: Props) {
  const sizeStyle = sizes[size];
  const variantStyle = selected ? selectedStyle : variantStyles[variant];
  const textColor = selected
    ? TG.paper
    : variant === 'forest'
    ? TG.forest
    : variant === 'sunset'
    ? TG.sunsetDeep
    : variant === 'ink'
    ? TG.paper
    : TG.ink;

  const Container: any = onPress ? Pressable : View;
  return (
    <Container
      onPress={onPress}
      style={[styles.base, sizeStyle, variantStyle, style]}>
      {icon ? <View style={{ marginRight: 6 }}>{icon}</View> : null}
      <Text style={[styles.text, { fontSize: sizeStyle.fontSize, color: textColor }]}>
        {children}
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    fontFamily: TG.bodyMedium,
    fontWeight: '500',
  },
});

const sizes: Record<Size, { height: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { height: 28, paddingHorizontal: 11, fontSize: 12 },
  md: { height: 34, paddingHorizontal: 14, fontSize: 13 },
  lg: { height: 40, paddingHorizontal: 18, fontSize: 14 },
};

const variantStyles: Record<Variant, ViewStyle> = {
  neutral: { backgroundColor: TG.paper, borderColor: TG.line },
  forest: { backgroundColor: TG.forestSoft },
  sunset: { backgroundColor: TG.sunsetSoft },
  ink: { backgroundColor: TG.ink },
  kraft: { backgroundColor: TG.kraft, borderColor: TG.line },
};

const selectedStyle: ViewStyle = {
  backgroundColor: TG.sunset,
  borderColor: TG.sunset,
};
