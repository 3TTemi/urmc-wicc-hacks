import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { Icon, IconName } from '@/components/Icon';
import { StatTile } from '@/components/StatTile';
import { TG } from '@/constants/theme';
import { useAppStore } from '@/store/useStore';

type Row = {
  icon: IconName;
  label: string;
  meta: string;
  onPress?: () => void;
};

export default function YouScreen() {
  const insets = useSafeAreaInsets();
  const goingCount = useAppStore((s) => s.goingList.length);
  const maybeCount = useAppStore((s) => s.maybeList.length);
  const friendsCount = useAppStore((s) => s.friends.length);

  const rows: Row[] = [
    { icon: 'instagram', label: 'connect Instagram', meta: '@you' },
    { icon: 'map-pin', label: 'location', meta: 'Ithaca, NY' },
    { icon: 'sparkles', label: 'vibes', meta: 'outdoors · coffee · chill' },
    { icon: 'users', label: 'friends', meta: String(friendsCount), onPress: () => router.push('/friends') },
    { icon: 'heart', label: 'notifications', meta: 'on' },
  ];

  return (
    <ScrollView
      style={[styles.root]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 40 }]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.profileBlock}>
        <Avatar initial="Y" color={TG.forest} size={84} />
        <Text style={styles.name}>you</Text>
        <Text style={styles.handle}>@you_ithaca · joined apr</Text>
      </View>

      <View style={styles.stats}>
        <StatTile n={goingCount} label="going" />
        <StatTile n={maybeCount} label="maybe" />
        <StatTile n={0} label="hosted" />
        <StatTile n={friendsCount} label="friends" />
      </View>

      <View style={styles.rows}>
        {rows.map((row, i) => (
          <Pressable
            key={i}
            onPress={row.onPress}
            disabled={!row.onPress}
            style={styles.row}>
            <Icon name={row.icon} size={18} color={TG.inkSoft} />
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowMeta}>{row.meta}</Text>
            <Icon name="arrow-right" size={14} color={TG.inkFaint} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: TG.kraft,
  },
  content: {
    paddingBottom: 40,
  },
  profileBlock: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  name: {
    fontFamily: TG.display,
    fontSize: 30,
    color: TG.ink,
    marginTop: 14,
    letterSpacing: -0.3,
  },
  handle: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkFaint,
    marginTop: 2,
  },
  stats: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  rows: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: TG.line,
  },
  rowLabel: {
    flex: 1,
    fontFamily: TG.body,
    fontSize: 15,
    color: TG.ink,
  },
  rowMeta: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkFaint,
  },
});
