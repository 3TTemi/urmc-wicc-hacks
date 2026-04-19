import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TG } from '@/constants/theme';

type Option = {
  key: string;
  label: string;
  count?: number;
};

type Props<T extends string> = {
  value: T;
  options: (Option & { key: T })[];
  onChange: (v: T) => void;
};

export function Segmented<T extends string>({ value, options, onChange }: Props<T>) {
  return (
    <View style={styles.wrap}>
      {options.map((o) => {
        const on = value === o.key;
        return (
          <Pressable
            key={o.key}
            onPress={() => onChange(o.key)}
            style={[styles.btn, on && { backgroundColor: TG.ink }]}>
            <Text
              style={[styles.label, { color: on ? TG.paper : TG.inkSoft }]}>
              {o.label}
            </Text>
            {o.count != null && o.count > 0 ? (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: on ? TG.sunset : TG.kraft },
                ]}>
                <Text
                  style={[
                    styles.badgeText,
                    { color: on ? TG.paper : TG.inkSoft },
                  ]}>
                  {o.count}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 999,
    backgroundColor: TG.paper,
    borderWidth: 1,
    borderColor: TG.line,
  },
  btn: {
    flex: 1,
    height: 36,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  label: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
  },
  badge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: TG.bodyBold,
    fontSize: 11,
  },
});
