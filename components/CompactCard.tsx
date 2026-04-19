import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import { Photo } from '@/components/Photo';
import { TG } from '@/constants/theme';
import type { Activity } from '@/data/types';

type Props = {
  activity: Activity;
  actions?: ReactNode;
};

export function CompactCard({ activity, actions }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.hero}>
          <Photo uri={activity.image} protection={false}>
            <View style={styles.typeChip}>
              <View style={styles.typeChipInner}>
                <Icon name={activity.icon} size={11} strokeWidth={2} color={TG.ink} />
                <Text style={styles.typeText}>{activity.type}</Text>
              </View>
            </View>
          </Photo>
        </View>
        <View style={styles.body}>
          <Text numberOfLines={2} style={styles.title}>
            {activity.title}
          </Text>
          <View style={styles.timeRow}>
            <Icon name="clock" size={11} color={TG.inkSoft} />
            <Text style={styles.timeText}>{activity.when}</Text>
          </View>
          <View style={styles.hostRow}>
            <Avatar initial={activity.host.initial} color={activity.host.color} size={18} />
            <Text style={styles.hostText}>
              <Text style={{ color: TG.inkFaint }}>@</Text>
              <Text style={{ fontFamily: TG.bodySemi }}>{activity.host.handle}</Text>
            </Text>
          </View>
        </View>
      </View>
      {actions ? <View style={styles.actions}>{actions}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: TG.paper,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: TG.line,
    overflow: 'hidden',
    shadowColor: '#1A1410',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  hero: {
    width: 110,
    height: 110,
  },
  typeChip: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  typeChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(254, 252, 247, 0.95)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  typeText: {
    fontFamily: TG.bodySemi,
    fontSize: 10,
    color: TG.ink,
  },
  body: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 4,
    justifyContent: 'center',
  },
  title: {
    fontFamily: TG.display,
    fontSize: 20,
    lineHeight: 22,
    color: TG.ink,
    letterSpacing: -0.2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  timeText: {
    fontFamily: TG.body,
    fontSize: 12,
    color: TG.inkSoft,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  hostText: {
    fontFamily: TG.body,
    fontSize: 12,
    color: TG.ink,
  },
  actions: {
    padding: 10,
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: TG.line,
    flexDirection: 'row',
    gap: 8,
  },
});
