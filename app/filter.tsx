import { router } from 'expo-router';
import { ReactNode, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Icon, IconName } from '@/components/Icon';
import { TG } from '@/constants/theme';
import { useAppStore } from '@/store/useStore';

const FILTER_CATEGORIES: { key: string; label: string; icon: IconName }[] = [
  { key: 'all', label: 'all', icon: 'sparkles' },
  { key: 'hiking', label: 'hiking', icon: 'mountain' },
  { key: 'coffee', label: 'coffee', icon: 'coffee' },
  { key: 'dinner', label: 'dinner', icon: 'utensils' },
  { key: 'brunch', label: 'brunch', icon: 'croissant' },
  { key: 'walk', label: 'walk', icon: 'walk' },
  { key: 'music', label: 'music', icon: 'music' },
  { key: 'study', label: 'study', icon: 'book' },
  { key: 'gym', label: 'gym', icon: 'dumbbell' },
  { key: 'bar', label: 'bar', icon: 'moon' },
  { key: 'games', label: 'games', icon: 'dice' },
  { key: 'outdoors', label: 'outdoors', icon: 'leaf' },
];

const WHEN_OPTIONS = [
  { key: 'any', label: 'anytime' },
  { key: 'today', label: 'today' },
  { key: 'tomorrow', label: 'tomorrow' },
  { key: 'week', label: 'this week' },
  { key: 'weekend', label: 'weekend' },
];

const DISTANCE_OPTIONS = [
  { key: 'walk', label: 'walking only' },
  { key: '5', label: 'within 5 mi' },
  { key: '15', label: 'within 15 mi' },
  { key: 'any', label: 'any distance' },
];

const GROUP_SIZE = [
  { key: 'any', label: 'any' },
  { key: 'small', label: '2–3' },
  { key: 'medium', label: '4–6' },
  { key: 'large', label: '7+' },
];

const AGE_OPTIONS = [
  { key: 'any', label: 'any age' },
  { key: '18-22', label: '18–22' },
  { key: '21-25', label: '21–25' },
  { key: '25-30', label: '25–30' },
  { key: '30+', label: '30+' },
];

const VIBE_OPTIONS = [
  'chill',
  'outdoors',
  'early-bird',
  'nightlife',
  'quiet',
  'meet people',
  'first-timers',
  'active',
  'foodie',
  'creative',
];

export default function FilterSheet() {
  const insets = useSafeAreaInsets();
  const totalCount = useAppStore((s) => s.stack.length);

  const [categories, setCategories] = useState<string[]>(['all']);
  const [whenOpt, setWhenOpt] = useState('any');
  const [distance, setDistance] = useState('any');
  const [groupSize, setGroupSize] = useState('any');
  const [age, setAge] = useState('any');
  const [vibes, setVibes] = useState<string[]>([]);

  const toggleCategory = (k: string) => {
    if (k === 'all') {
      setCategories(['all']);
      return;
    }
    const current = categories.filter((c) => c !== 'all');
    const has = current.includes(k);
    const next = has ? current.filter((c) => c !== k) : [...current, k];
    setCategories(next.length === 0 ? ['all'] : next);
  };

  const toggleVibe = (v: string) => {
    setVibes((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  };

  const reset = () => {
    setCategories(['all']);
    setWhenOpt('any');
    setDistance('any');
    setGroupSize('any');
    setAge('any');
    setVibes([]);
  };

  return (
    <View style={styles.scrim}>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => router.back()} />
      <View style={[styles.sheet, { marginTop: insets.top + 40 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.grabber} />
          <View style={styles.headerRow}>
            <Pressable onPress={reset}>
              <Text style={styles.resetText}>reset</Text>
            </Pressable>
            <Text style={styles.title}>Filters</Text>
            <Pressable onPress={() => router.back()} style={styles.closeBtn}>
              <Icon name="x" size={16} color={TG.ink} />
            </Pressable>
          </View>
        </View>

        {/* Body */}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 140, paddingTop: 4 }}
          showsVerticalScrollIndicator={false}>
          <Section title="categories">
            <View style={styles.wrap}>
              {FILTER_CATEGORIES.map((c) => {
                const on = categories.includes(c.key);
                return (
                  <Chip
                    key={c.key}
                    selected={on}
                    onPress={() => toggleCategory(c.key)}
                    size="md"
                    icon={<Icon name={c.icon} size={13} color={on ? TG.paper : TG.ink} strokeWidth={1.9} />}>
                    {c.label}
                  </Chip>
                );
              })}
            </View>
          </Section>

          <Section title="distance">
            <View style={styles.wrap}>
              {DISTANCE_OPTIONS.map((o) => (
                <Chip
                  key={o.key}
                  selected={distance === o.key}
                  onPress={() => setDistance(o.key)}
                  size="md">
                  {o.label}
                </Chip>
              ))}
            </View>
          </Section>

          <Section title="when">
            <View style={styles.wrap}>
              {WHEN_OPTIONS.map((o) => (
                <Chip
                  key={o.key}
                  selected={whenOpt === o.key}
                  onPress={() => setWhenOpt(o.key)}
                  size="md">
                  {o.label}
                </Chip>
              ))}
            </View>
          </Section>

          <Section title="group size">
            <View style={styles.wrap}>
              {GROUP_SIZE.map((o) => (
                <Chip
                  key={o.key}
                  selected={groupSize === o.key}
                  onPress={() => setGroupSize(o.key)}
                  size="md">
                  {o.label}
                </Chip>
              ))}
            </View>
          </Section>

          <Section title="age range">
            <View style={styles.wrap}>
              {AGE_OPTIONS.map((o) => (
                <Chip
                  key={o.key}
                  selected={age === o.key}
                  onPress={() => setAge(o.key)}
                  size="md">
                  {o.label}
                </Chip>
              ))}
            </View>
          </Section>

          <Section title="vibes">
            <View style={styles.wrap}>
              {VIBE_OPTIONS.map((v) => (
                <Chip
                  key={v}
                  selected={vibes.includes(v)}
                  onPress={() => toggleVibe(v)}
                  size="md">
                  {v}
                </Chip>
              ))}
            </View>
          </Section>
        </ScrollView>

        {/* Sticky apply */}
        <View style={[styles.apply, { paddingBottom: Math.max(insets.bottom, 14) + 16 }]}>
          <Button onPress={() => router.back()}>
            Show {totalCount} {totalCount === 1 ? 'thing' : 'things'}
          </Button>
        </View>
      </View>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ marginTop: 24 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(26,20,16,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    flex: 1,
    backgroundColor: TG.kraft,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 22,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: TG.line,
    backgroundColor: TG.kraft,
  },
  grabber: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: TG.line,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resetText: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkSoft,
    textDecorationLine: 'underline',
    paddingVertical: 4,
  },
  title: {
    fontFamily: TG.display,
    fontSize: 22,
    color: TG.ink,
    letterSpacing: -0.1,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: TG.paper,
    borderWidth: 1,
    borderColor: TG.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: TG.bodySemi,
    fontSize: 11,
    color: TG.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    marginBottom: 12,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  apply: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: TG.kraft,
    borderTopWidth: 1,
    borderTopColor: TG.line,
    paddingHorizontal: 22,
    paddingTop: 14,
  },
});
