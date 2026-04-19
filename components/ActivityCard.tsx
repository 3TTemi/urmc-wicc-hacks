import { StyleSheet, Text, View } from 'react-native';

import { Avatar, AvatarStack } from '@/components/Avatar';
import { Chip } from '@/components/Chip';
import { Icon } from '@/components/Icon';
import { Photo } from '@/components/Photo';
import { TG } from '@/constants/theme';
import type { Activity } from '@/data/types';

type Props = {
  activity: Activity;
  isLive?: boolean;
};

export function ActivityCard({ activity, isLive }: Props) {
  return (
    <View style={styles.card}>
      {/* Hero photo takes ~56% */}
      <View style={styles.hero}>
        <Photo uri={activity.image}>
          {/* Activity type chip */}
          <View style={styles.typeChip}>
            <View style={styles.typeChipInner}>
              <Icon name={activity.icon} size={15} strokeWidth={2} color={TG.ink} />
              <Text style={styles.typeText}>{activity.type}</Text>
            </View>
          </View>
          {isLive ? (
            <View style={styles.live}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          ) : null}
        </Photo>
      </View>

      {/* Info block */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {activity.title}
        </Text>

        {/* when / where */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Icon name="map-pin" size={14} color={TG.inkSoft} />
            <Text style={styles.metaText}>{activity.location}</Text>
          </View>
          <Text style={styles.dot}>·</Text>
          <View style={styles.metaItem}>
            <Icon name="clock" size={14} color={TG.inkSoft} />
            <Text style={styles.metaText}>{activity.when}</Text>
          </View>
        </View>

        {/* description */}
        <Text style={styles.desc} numberOfLines={2}>
          {activity.description}
        </Text>

        {/* vibes */}
        <View style={styles.vibes}>
          {activity.vibes.map((v, i) => (
            <Chip key={i} variant={v.variant || 'forest'} size="sm">
              {v.label}
            </Chip>
          ))}
        </View>

        {/* Host + group footer */}
        <View style={styles.footer}>
          <View style={styles.hostRow}>
            <Avatar initial={activity.host.initial} color={activity.host.color} size={32} />
            <View>
              <Text style={styles.hostHandle}>@{activity.host.handle}</Text>
              <Text style={styles.hostLabel}>hosting</Text>
            </View>
          </View>
          <View style={styles.goingRow}>
            <AvatarStack people={activity.going} size={26} />
            <Text style={styles.goingText}>
              {activity.going.length}/{activity.capacity}
              <Text style={styles.goingMeta}> going</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: TG.paper,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#1A1410',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 40,
    elevation: 10,
  },
  hero: {
    flexBasis: '56%',
    flexShrink: 0,
    position: 'relative',
  },
  typeChip: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  typeChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: 'rgba(254, 252, 247, 0.96)',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  typeText: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.ink,
  },
  live: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: TG.sunset,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 999,
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: TG.paper },
  liveText: {
    fontFamily: TG.bodyBold,
    fontSize: 11,
    color: TG.paper,
    letterSpacing: 1.2,
  },
  info: {
    padding: 18,
    paddingHorizontal: 22,
    flex: 1,
    gap: 10,
    minHeight: 0,
  },
  title: {
    fontFamily: TG.display,
    fontSize: 30,
    lineHeight: 32,
    color: TG.ink,
    letterSpacing: -0.3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkSoft,
  },
  dot: {
    color: TG.line,
    fontSize: 12,
  },
  desc: {
    fontFamily: TG.body,
    fontSize: 14,
    lineHeight: 20,
    color: TG.inkSoft,
  },
  vibes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: TG.line,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hostHandle: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.ink,
  },
  hostLabel: {
    fontFamily: TG.body,
    fontSize: 12,
    color: TG.inkFaint,
  },
  goingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goingText: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.ink,
  },
  goingMeta: {
    fontFamily: TG.body,
    fontWeight: '400',
    color: TG.inkFaint,
  },
});
