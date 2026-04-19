import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AvatarStack } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TG } from '@/constants/theme';
import { useAppStore } from '@/store/useStore';

export default function ConfirmScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const stack = useAppStore((s) => s.stack);
  const joinedInStore = useAppStore((s) => s.joined);
  const confirmDone = useAppStore((s) => s.confirmDone);
  const pendingOrigin = useAppStore((s) => s.pendingJoinOrigin);
  const [copied, setCopied] = useState(false);

  const activity = joinedInStore ?? stack.find((a) => String(a.id) === id);

  // Fail-safe: if activity missing, dismiss
  useEffect(() => {
    if (!activity) router.back();
  }, [activity]);

  if (!activity) return null;

  const close = () => {
    confirmDone();
    // After confirmDone we want to end up on the right surface based on origin.
    if (pendingOrigin === 'maybe') {
      router.replace('/(tabs)/collections');
    } else {
      router.back();
    }
  };

  const handleMessage = () => {
    setCopied(true);
    setTimeout(close, 500);
  };

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync('@' + activity.host.handle);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <Animated.View
      entering={FadeIn.duration(240)}
      style={styles.scrim}>
      <Pressable style={StyleSheet.absoluteFill} onPress={close} />
      <Animated.View
        entering={SlideInDown.springify().damping(18)}
        style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 24) + 12 }]}>
        <View style={styles.grabber} />

        <View style={styles.checkBubble}>
          <Icon name="check" size={32} color={TG.sunset} strokeWidth={2.4} />
        </View>

        <Text style={styles.title}>
          you're in<Text style={{ color: TG.sunset }}>.</Text>
        </Text>

        <Text style={styles.subtitle}>
          <Text style={styles.strong}>@{activity.host.handle}</Text>'s expecting you at{' '}
          <Text style={styles.strong}>{activity.location}</Text> {activity.when.toLowerCase()}.
        </Text>

        <View style={styles.others}>
          <AvatarStack people={activity.going} size={22} />
          <Text style={styles.othersText}>
            {activity.going.length} other{activity.going.length === 1 ? '' : 's'} going
          </Text>
        </View>

        <View style={{ marginTop: 26, gap: 4 }}>
          <Button
            onPress={handleMessage}
            icon={<Icon name="instagram" size={20} color={TG.paper} />}>
            message @{activity.host.handle} on Instagram
          </Button>
          <Pressable onPress={handleCopy} style={styles.copyBtn}>
            {copied ? (
              <>
                <Icon name="check" size={14} color={TG.forest} />
                <Text style={[styles.copyText, { color: TG.forest }]}>copied</Text>
              </>
            ) : (
              <Text style={styles.copyText}>copy handle instead</Text>
            )}
          </Pressable>
        </View>

        <Pressable onPress={close} style={styles.keepLooking}>
          <Text style={styles.keepLookingText}>keep looking</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(26, 20, 16, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: TG.kraft,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  grabber: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: TG.line,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 22,
  },
  checkBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: TG.sunsetSoft,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: TG.display,
    fontSize: 38,
    color: TG.ink,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: TG.body,
    fontSize: 15,
    lineHeight: 22,
    color: TG.inkSoft,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 6,
  },
  strong: {
    color: TG.ink,
    fontFamily: TG.bodySemi,
  },
  others: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  othersText: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkFaint,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  copyText: {
    fontFamily: TG.bodyMedium,
    fontSize: 14,
    color: TG.inkSoft,
    textDecorationLine: 'underline',
  },
  keepLooking: {
    alignSelf: 'center',
    padding: 10,
    marginTop: 8,
  },
  keepLookingText: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkFaint,
  },
});
