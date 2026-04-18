import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  uri: string;
  children?: ReactNode;
  style?: ViewStyle;
  rounded?: number;
  protection?: boolean;
};

// Hero image wrapper with optional bottom gradient for text protection.
export function Photo({ uri, children, style, rounded, protection = true }: Props) {
  return (
    <View
      style={[
        styles.wrap,
        rounded != null && { borderRadius: rounded, overflow: 'hidden' },
        style,
      ]}>
      <Image
        source={{ uri }}
        style={styles.img}
        contentFit="cover"
        transition={220}
        cachePolicy="memory-disk"
      />
      {protection ? (
        <LinearGradient
          colors={['rgba(26,20,16,0)', 'rgba(26,20,16,0.55)']}
          style={styles.gradient}
          pointerEvents="none"
        />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  img: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '35%',
  },
});
