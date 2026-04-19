import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CompactCard } from '@/components/CompactCard';
import { Icon } from '@/components/Icon';
import { Segmented } from '@/components/Segmented';
import { TG } from '@/constants/theme';
import type { Activity } from '@/data/types';
import { useAppStore } from '@/store/useStore';

export default function CollectionsScreen() {
  const insets = useSafeAreaInsets();
  const goingList = useAppStore((s) => s.goingList);
  const maybeList = useAppStore((s) => s.maybeList);
  const seg = useAppStore((s) => s.collectionsSegment);
  const setSeg = useAppStore((s) => s.setCollectionsSegment);
  const joinFromMaybe = useAppStore((s) => s.joinFromMaybe);
  const skipFromMaybe = useAppStore((s) => s.skipFromMaybe);

  const list = seg === 'going' ? goingList : maybeList;

  const handleJoinFromMaybe = (a: Activity) => {
    joinFromMaybe(a);
    router.push({ pathname: '/confirm', params: { id: String(a.id) } });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.kicker}>your stuff</Text>
        <Text style={styles.brand}>
          collections<Text style={{ color: TG.sunset }}>.</Text>
        </Text>
      </View>

      <View style={{ paddingTop: 4, paddingBottom: 14, paddingHorizontal: 20 }}>
        <Segmented
          value={seg}
          onChange={setSeg}
          options={[
            { key: 'going', label: 'Going', count: goingList.length },
            { key: 'maybe', label: 'Maybe', count: maybeList.length },
          ]}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <EmptyList kind={seg} />
        ) : (
          list.map((a) => (
            <CompactCard
              key={a.id}
              activity={a}
              actions={
                seg === 'going' ? (
                  <Pressable style={styles.msgBtn}>
                    <Icon name="instagram" size={15} color={TG.paper} />
                    <Text style={styles.msgBtnText}>message @{a.host.handle}</Text>
                  </Pressable>
                ) : (
                  <>
                    <Pressable
                      onPress={() => skipFromMaybe(a)}
                      style={styles.skipBtn}>
                      <Text style={styles.skipText}>Skip</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleJoinFromMaybe(a)}
                      style={styles.joinBtn}>
                      <Text style={styles.joinText}>I'm in</Text>
                    </Pressable>
                  </>
                )
              }
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

function EmptyList({ kind }: { kind: 'going' | 'maybe' }) {
  const config =
    kind === 'going'
      ? {
          icon: 'calendar' as const,
          title: 'Nothing on the calendar yet.',
          body: 'Swipe right on something.',
        }
      : {
          icon: 'heart' as const,
          title: 'Nothing saved.',
          body: "Tap Maybe on a card you're thinking about.",
        };
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyIcon}>
        <Icon name={config.icon} size={26} color={TG.inkSoft} />
      </View>
      <Text style={styles.emptyTitle}>{config.title}</Text>
      <Text style={styles.emptyBody}>{config.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: TG.kraft,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  kicker: {
    fontFamily: TG.bodyMedium,
    fontSize: 11,
    color: TG.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  brand: {
    fontFamily: TG.display,
    fontSize: 32,
    color: TG.ink,
    marginTop: 2,
    letterSpacing: -0.3,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  msgBtn: {
    flex: 1,
    height: 38,
    borderRadius: 999,
    backgroundColor: TG.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  msgBtnText: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.paper,
  },
  skipBtn: {
    flex: 1,
    height: 38,
    borderRadius: 999,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: TG.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.inkSoft,
  },
  joinBtn: {
    flex: 1,
    height: 38,
    borderRadius: 999,
    backgroundColor: TG.sunset,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinText: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.paper,
  },
  emptyWrap: {
    marginTop: 60,
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: TG.paper,
    borderWidth: 1,
    borderColor: TG.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: TG.display,
    fontSize: 24,
    color: TG.ink,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: -0.3,
    maxWidth: 280,
  },
  emptyBody: {
    fontFamily: TG.body,
    fontSize: 14,
    color: TG.inkSoft,
    maxWidth: 260,
    textAlign: 'center',
  },
});
