import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { TG } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'ink' | 'text';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  variant?: Variant;
  icon?: ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export function Button({
  children,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  style,
  fullWidth = true,
}: Props) {
  const variantStyle = variants[variant];
  const textStyle = textVariants[variant];
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        fullWidth && { alignSelf: 'stretch' },
        disabled && { opacity: 0.5 },
        pressed && !disabled && { transform: [{ scale: 0.97 }] },
        pressed && variant === 'primary' && { backgroundColor: TG.sunsetDeep },
        style,
      ]}>
      {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    paddingHorizontal: 28,
    borderRadius: 999,
    borderWidth: 0,
  },
  text: {
    fontFamily: TG.bodySemi,
    fontSize: 17,
    letterSpacing: -0.1,
  },
});

const variants: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: TG.sunset },
  secondary: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: TG.line },
  ghost: { backgroundColor: TG.paper, borderWidth: 1.5, borderColor: TG.line },
  ink: { backgroundColor: TG.ink },
  text: { backgroundColor: 'transparent', height: 40 },
};

const textVariants: Record<Variant, any> = {
  primary: { color: TG.paper },
  secondary: { color: TG.ink },
  ghost: { color: TG.ink },
  ink: { color: TG.paper },
  text: { color: TG.inkSoft, fontSize: 14, textDecorationLine: 'underline' },
};
