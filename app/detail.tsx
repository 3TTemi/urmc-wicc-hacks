import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { Chip } from '@/components/Chip';
import { Icon } from '@/components/Icon';
import { Photo } from '@/components/Photo';
import { TG } from '@/constants/theme';
import { useAppStore } from '@/store/useStore';

export default function DetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const stack = useAppStore((s) => s.stack);
  const maybeAction = useAppStore((s) => s.maybe);
  const joinAction = useAppStore((s) => s.join);
  const skipAction = useAppStore((s) => s.skip);

  const activity = stack.find((a) => String(a.id) === id);

  if (!activity) {
    return (
      <View style={styles.root}>
        <Text style={{ margin: 40, color: TG.inkSoft, fontFamily: TG.body }}>
          Listing not found.
        </Text>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <Icon name="x" size={18} color={TG.ink} />
        </Pressable>
      </View>
    );
  }

  const going = activity.going;
  const openSlots = Math.max(0, activity.capacity - going.length);

  return (
    <View style={styles.root}>
      {/* Hero */}
      <View style={styles.hero}>
        <Photo uri={activity.image}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.closeBtn, { top: insets.top + 10 }]}>
            <Icon name="x" size={18} color={TG.ink} />
          </Pressable>
          <View style={[styles.typeChip, { top: insets.top + 14 }]}>
            <View style={styles.typeChipInner}>
              <Icon name={activity.icon} size={14} strokeWidth={2} color={TG.ink} />
              <Text style={styles.typeText}>{activity.type}</Text>
            </View>
          </View>
        </Photo>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{activity.title}</Text>

        <View style={{ marginTop: 14, gap: 6 }}>
          <View style={styles.metaRow}>
            <Icon name="map-pin" size={15} color={TG.inkSoft} />
            <Text style={styles.metaText}>
              {activity.detailLocation ?? activity.location}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Icon name="clock" size={15} color={TG.inkSoft} />
            <Text style={styles.metaText}>
              {activity.detailWhen ?? activity.when}
            </Text>
          </View>
        </View>

        {/* Host card */}
        <View style={styles.hostCard}>
          <Avatar initial={activity.host.initial} color={activity.host.color} size={46} />
          <View style={{ flex: 1 }}>
            <Text style={styles.hostKicker}>hosted by</Text>
            <Text style={styles.hostHandle}>@{activity.host.handle}</Text>
          </View>
          <Pressable style={styles.dmBtn}>
            <Icon name="instagram" size={14} color={TG.paper} />
            <Text style={styles.dmBtnText}>DM on IG</Text>
          </Pressable>
        </View>

        {/* Who's going */}
        <View style={{ marginTop: 24 }}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Who's going</Text>
            <Text style={styles.sectionMeta}>
              {going.length} of {activity.capacity} going
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 14, paddingTop: 14, paddingBottom: 4 }}>
            {going.map((p, i) => (
              <View key={i} style={styles.personCol}>
                <Avatar initial={p.initial} color={p.color} size={48} />
                <Text style={styles.personName}>{p.name ?? 'Friend'}</Text>
              </View>
            ))}
            {Array.from({ length: openSlots }).map((_, i) => (
              <View key={`open-${i}`} style={styles.personCol}>
                <View style={styles.openSlot}>
                  <Icon name="plus" size={18} color={TG.inkFaint} />
                </View>
                <Text style={styles.openText}>open</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* About */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            {activity.longDescription ?? activity.description}
          </Text>
        </View>

        {/* Vibes */}
        {activity.vibes && activity.vibes.length > 0 ? (
          <View style={{ marginTop: 24 }}>
            <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Vibes</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {activity.vibes.map((v, i) => (
                <Chip key={i} variant={v.variant}>
                  {v.label}
                </Chip>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>

      {/* Bottom action bar */}
      <View style={[styles.actionBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Pressable
          onPress={() => {
            skipAction();
            router.back();
          }}
          style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            maybeAction(activity);
            router.back();
          }}
          style={styles.maybeBtn}>
          <Text style={styles.maybeText}>Maybe later</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            joinAction(activity);
            router.replace({ pathname: '/confirm', params: { id: String(activity.id) } });
          }}
          style={styles.joinBtn}>
          <Text style={styles.joinText}>I'm in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: TG.kraft,
  },
  hero: {
    height: 300,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 54,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254,252,247,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeChip: {
    position: 'absolute',
    left: 68,
  },
  typeChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(254,252,247,0.96)',
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 999,
  },
  typeText: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.ink,
  },
  content: {
    padding: 22,
    paddingBottom: 160,
  },
  title: {
    fontFamily: TG.display,
    fontSize: 34,
    color: TG.ink,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontFamily: TG.body,
    fontSize: 14,
    color: TG.inkSoft,
  },
  hostCard: {
    marginTop: 20,
    padding: 14,
    borderRadius: 18,
    backgroundColor: TG.paper,
    borderWidth: 1,
    borderColor: TG.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hostKicker: {
    fontFamily: TG.body,
    fontSize: 12,
    color: TG.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hostHandle: {
    fontFamily: TG.bodySemi,
    fontSize: 15,
    color: TG.ink,
  },
  dmBtn: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: TG.ink,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dmBtnText: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.paper,
    letterSpacing: -0.1,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: TG.display,
    fontSize: 20,
    color: TG.ink,
    letterSpacing: -0.1,
  },
  sectionMeta: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkSoft,
  },
  personCol: {
    alignItems: 'center',
    gap: 6,
    minWidth: 56,
  },
  personName: {
    fontFamily: TG.bodyMedium,
    fontSize: 12,
    color: TG.ink,
  },
  openSlot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: TG.paper,
    borderWidth: 1.5,
    borderColor: TG.line,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openText: {
    fontFamily: TG.body,
    fontSize: 12,
    color: TG.inkFaint,
  },
  aboutText: {
    marginTop: 10,
    fontFamily: TG.body,
    fontSize: 15,
    lineHeight: 23,
    color: TG.inkSoft,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: TG.kraft,
    borderTopWidth: 1,
    borderTopColor: TG.line,
    paddingHorizontal: 16,
    paddingTop: 14,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  skipBtn: {
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: TG.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontFamily: TG.bodySemi,
    fontSize: 14,
    color: TG.inkSoft,
  },
  maybeBtn: {
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: TG.kraft,
    borderWidth: 1.5,
    borderColor: TG.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maybeText: {
    fontFamily: TG.bodySemi,
    fontSize: 14,
    color: TG.ink,
  },
  joinBtn: {
    flex: 1,
    height: 52,
    borderRadius: 999,
    backgroundColor: TG.sunset,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TG.sunset,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
  joinText: {
    fontFamily: TG.bodySemi,
    fontSize: 15,
    color: TG.paper,
    letterSpacing: -0.1,
  },
});
