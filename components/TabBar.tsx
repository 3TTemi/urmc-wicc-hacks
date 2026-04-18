import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, IconName } from '@/components/Icon';
import { TG } from '@/constants/theme';
import { useAppStore } from '@/store/useStore';

const TABS: Record<string, { icon: IconName; label: string }> = {
  index: { icon: 'compass', label: 'feed' },
  collections: { icon: 'heart', label: 'collections' },
  create: { icon: 'plus', label: 'post' },
  you: { icon: 'user', label: 'you' },
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const goingCount = useAppStore((s) => s.goingList.length);
  const maybeCount = useAppStore((s) => s.maybeList.length);
  const collectionsBadge = goingCount + maybeCount;

  return (
    <View
      style={[
        styles.bar,
        { paddingBottom: Math.max(insets.bottom, 12), height: 70 + Math.max(insets.bottom, 12) },
      ]}>
      {state.routes.map((route, i) => {
        const config = TABS[route.name] ?? { icon: 'compass' as IconName, label: route.name };
        const focused = state.index === i;
        const badge = route.name === 'collections' ? collectionsBadge : 0;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tab}>
            <View style={{ position: 'relative' }}>
              <Icon
                name={config.icon}
                size={22}
                color={focused ? TG.sunset : TG.inkSoft}
                strokeWidth={focused ? 2 : 1.75}
              />
              {badge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              ) : null}
            </View>
            <Text
              style={[
                styles.label,
                { color: focused ? TG.sunset : TG.inkFaint },
              ]}>
              {config.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: TG.paper,
    borderTopWidth: 1,
    borderTopColor: TG.line,
    paddingTop: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minWidth: 52,
    flex: 1,
  },
  label: {
    fontFamily: TG.bodyMedium,
    fontSize: 10,
    letterSpacing: 0.4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 999,
    backgroundColor: TG.sunset,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: TG.bodyBold,
    fontSize: 10,
    color: TG.paper,
  },
});
