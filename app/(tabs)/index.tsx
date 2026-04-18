import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityCard } from '@/components/ActivityCard';
import { Avatar } from '@/components/Avatar';
import { Chip } from '@/components/Chip';
import { Icon } from '@/components/Icon';
import { TG } from '@/constants/theme';
import type { Activity } from '@/data/types';
import { useAppStore } from '@/store/useStore';

const CATEGORY_CHIPS = [
  { key: 'all', label: 'all', icon: null },
  { key: 'hiking', label: 'hiking', icon: 'mountain' },
  { key: 'coffee', label: 'coffee', icon: 'coffee' },
  { key: 'food', label: 'food', icon: 'utensils' },
  { key: 'music', label: 'music', icon: 'music' },
  { key: 'outdoors', label: 'outdoors', icon: 'leaf' },
];

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const stack = useAppStore((s) => s.stack);
  const idx = useAppStore((s) => s.idx);
  const liveIds = useAppStore((s) => s.liveIds);
  const skip = useAppStore((s) => s.skip);
  const maybe = useAppStore((s) => s.maybe);
  const join = useAppStore((s) => s.join);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const swiperRef = useRef<Swiper<Activity>>(null);
  const feedExhausted = idx >= stack.length;
  const current = stack[idx];

  const handleTap = (cardIndex: number) => {
    const a = stack[cardIndex];
    if (a) router.push({ pathname: '/detail', params: { id: String(a.id) } });
  };

  const handleSwipedLeft = () => {
    skip();
  };

  const handleSwipedRight = (cardIndex: number) => {
    const a = stack[cardIndex];
    if (!a) return;
    join(a);
    router.push({ pathname: '/confirm', params: { id: String(a.id) } });
  };

  const openFilter = () => router.push('/filter');
  const openProfile = () => router.push('/(tabs)/you');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>near you · ithaca</Text>
          <Text style={styles.brand}>
            tagalong<Text style={{ color: TG.sunset }}>.</Text>
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={openFilter} style={styles.iconBtn}>
            <Icon name="filter" size={16} color={TG.ink} />
          </Pressable>
          <Avatar initial="Y" color={TG.forest} size={40} onPress={openProfile} />
        </View>
      </View>

      {/* Category chips */}
      {!feedExhausted ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}>
          {CATEGORY_CHIPS.map((c) => (
            <Chip
              key={c.key}
              size="sm"
              selected={selectedCategory === c.key}
              onPress={() => setSelectedCategory(c.key)}
              icon={c.icon ? <Icon name={c.icon as any} size={13} color={selectedCategory === c.key ? TG.paper : TG.ink} /> : null}>
              {c.label}
            </Chip>
          ))}
        </ScrollView>
      ) : null}

      {/* Swiper or empty state */}
      {feedExhausted ? (
        <EmptyDeck onCreate={() => router.push('/(tabs)/create')} />
      ) : (
        <View style={styles.deck}>
          <Swiper
            ref={swiperRef}
            cards={stack}
            cardIndex={idx}
            renderCard={(card) =>
              card ? <ActivityCard activity={card} isLive={liveIds.includes(card.id)} /> : null
            }
            onSwipedLeft={handleSwipedLeft}
            onSwipedRight={handleSwipedRight}
            onTapCard={handleTap}
            stackSize={3}
            stackScale={8}
            stackSeparation={14}
            backgroundColor="transparent"
            cardVerticalMargin={0}
            cardHorizontalMargin={18}
            disableTopSwipe
            disableBottomSwipe
            animateOverlayLabelsOpacity
            animateCardOpacity
            overlayLabels={{
              left: {
                title: 'SKIP',
                style: {
                  label: {
                    color: TG.inkSoft,
                    borderColor: TG.inkSoft,
                    borderWidth: 3,
                    borderRadius: 10,
                    fontSize: 20,
                    fontFamily: TG.bodyBold,
                    letterSpacing: 2,
                    padding: 8,
                    paddingHorizontal: 16,
                    backgroundColor: 'rgba(254,252,247,0.9)',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 36,
                    marginLeft: -26,
                  },
                },
              },
              right: {
                title: 'JOIN',
                style: {
                  label: {
                    color: TG.sunset,
                    borderColor: TG.sunset,
                    borderWidth: 3,
                    borderRadius: 10,
                    fontSize: 20,
                    fontFamily: TG.bodyBold,
                    letterSpacing: 2,
                    padding: 8,
                    paddingHorizontal: 16,
                    backgroundColor: 'rgba(254,252,247,0.9)',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 36,
                    marginLeft: 26,
                  },
                },
              },
            }}
          />
        </View>
      )}

      {/* Action row */}
      {!feedExhausted ? (
        <>
          <View style={styles.gestureHint}>
            <View style={styles.hintPair}>
              <Icon name="arrow-left" size={12} color={TG.inkFaint} />
              <Text style={styles.hintText}>skip</Text>
            </View>
            <Text style={{ color: TG.line }}>·</Text>
            <View style={styles.hintPair}>
              <Text style={styles.hintText}>join</Text>
              <Icon name="arrow-right" size={12} color={TG.sunset} />
            </View>
          </View>

          <View style={styles.actionRow}>
            <Pressable
              onPress={() => swiperRef.current?.swipeLeft()}
              style={styles.circleBtn}>
              <Icon name="x" size={20} color={TG.inkSoft} />
            </Pressable>

            <Pressable
              onPress={() => current && maybe(current)}
              style={styles.maybePill}>
              <Text style={styles.maybeText}>Maybe later</Text>
            </Pressable>

            <Pressable
              onPress={() => swiperRef.current?.swipeRight()}
              style={styles.joinBtn}>
              <Icon name="heart" size={26} color={TG.paper} strokeWidth={2} />
            </Pressable>
          </View>
        </>
      ) : null}
    </View>
  );
}

function EmptyDeck({ onCreate }: { onCreate: () => void }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Icon name="check" size={34} color={TG.sunset} strokeWidth={2.2} />
      </View>
      <Text style={styles.emptyTitle}>
        you've seen everything nearby<Text style={{ color: TG.sunset }}>.</Text>
      </Text>
      <Text style={styles.emptyBody}>come back later to see more — or post your own thing.</Text>
      <Pressable onPress={onCreate} style={styles.emptyBtn}>
        <Icon name="plus" size={15} color={TG.paper} strokeWidth={2} />
        <Text style={styles.emptyBtnText}>post something</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: TG.kraft,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TG.paper,
    borderWidth: 1,
    borderColor: TG.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryRow: {
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  deck: {
    flex: 1,
    marginTop: 4,
    minHeight: 420,
  },
  gestureHint: {
    paddingTop: 4,
    paddingBottom: 2,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  hintPair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hintText: {
    fontFamily: TG.body,
    fontSize: 12,
    color: TG.inkFaint,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 18,
  },
  circleBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: TG.paper,
    borderWidth: 1.5,
    borderColor: TG.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maybePill: {
    flex: 1,
    maxWidth: 170,
    height: 50,
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
    letterSpacing: -0.1,
  },
  joinBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: TG.sunset,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TG.sunset,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 100,
  },
  emptyIcon: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: TG.sunsetSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontFamily: TG.display,
    fontSize: 30,
    color: TG.ink,
    lineHeight: 34,
    textAlign: 'center',
    letterSpacing: -0.3,
    maxWidth: 280,
  },
  emptyBody: {
    fontFamily: TG.body,
    fontSize: 14,
    color: TG.inkSoft,
    marginTop: 10,
    maxWidth: 260,
    textAlign: 'center',
    lineHeight: 21,
  },
  emptyBtn: {
    marginTop: 22,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: TG.sunset,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: TG.sunset,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
  emptyBtnText: {
    fontFamily: TG.bodySemi,
    fontSize: 14,
    color: TG.paper,
    letterSpacing: -0.1,
  },
});
