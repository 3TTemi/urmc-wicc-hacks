import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import { TG } from '@/constants/theme';
import type { Friend } from '@/data/types';
import { useAppStore } from '@/store/useStore';

const COLORS = ['#2D5940', '#C85F2E', '#8B5A3C', '#5A4E42', '#E87A47'];

export default function FriendsScreen() {
  const insets = useSafeAreaInsets();
  const friends = useAppStore((s) => s.friends);
  const addFriend = useAppStore((s) => s.addFriend);
  const removeFriend = useAppStore((s) => s.removeFriend);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    if (!q.trim()) return friends;
    const s = q.toLowerCase().replace(/^@/, '');
    return friends.filter(
      (f) => f.handle.toLowerCase().includes(s) || f.name.toLowerCase().includes(s)
    );
  }, [q, friends]);

  const handleRaw = q.trim().replace(/^@/, '');
  const canAdd =
    handleRaw.length > 1 &&
    !friends.some((f) => f.handle.toLowerCase() === handleRaw.toLowerCase());

  const handleAdd = () => {
    if (!handleRaw) return;
    const name = handleRaw
      .split('_')
      .map((p) => (p[0] ? p[0].toUpperCase() + p.slice(1) : p))
      .join(' ');
    const f: Friend = {
      handle: handleRaw,
      name,
      initial: handleRaw[0].toUpperCase(),
      color: COLORS[handleRaw.length % COLORS.length],
    };
    addFriend(f);
    setQ('');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Icon name="chevron-left" size={20} color={TG.ink} />
        </Pressable>
        <Text style={styles.title}>Friends</Text>
        <Pressable onPress={handleAdd} style={styles.iconBtn}>
          <Icon name="plus" size={20} color={TG.ink} />
        </Pressable>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10 }}>
        <View style={styles.searchWrap}>
          <Icon name="search" size={16} color={TG.inkFaint} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search by handle..."
            placeholderTextColor={TG.inkFaint}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {q ? (
            <Pressable onPress={() => setQ('')}>
              <Icon name="x" size={14} color={TG.inkFaint} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Add by handle pill */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
        <Pressable
          onPress={canAdd ? handleAdd : undefined}
          disabled={!canAdd}
          style={[styles.addPill, { backgroundColor: canAdd ? TG.sunset : TG.paper, borderColor: canAdd ? TG.sunset : TG.line }]}>
          <Icon name="plus" size={15} color={canAdd ? TG.paper : TG.inkFaint} strokeWidth={2} />
          <Text style={[styles.addPillText, { color: canAdd ? TG.paper : TG.inkFaint }]}>
            Add by handle{q.trim() ? ` · @${handleRaw}` : ''}
          </Text>
        </Pressable>
      </View>

      {/* List */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.listContent}>
        {friends.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Icon name="users" size={26} color={TG.inkSoft} />
            </View>
            <Text style={styles.emptyTitle}>No friends yet.</Text>
            <Text style={styles.emptyBody}>Add someone by their handle.</Text>
          </View>
        ) : filtered.length === 0 ? (
          <Text style={styles.noMatch}>No matches for "{q}"</Text>
        ) : (
          <View style={styles.card}>
            {filtered.map((f, i) => (
              <View
                key={f.handle}
                style={[
                  styles.row,
                  i > 0 && { borderTopWidth: 1, borderTopColor: TG.line },
                ]}>
                <Avatar initial={f.initial} color={f.color} size={40} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={styles.name}>{f.name}</Text>
                  <Text style={styles.handle}>@{f.handle}</Text>
                </View>
                <Pressable
                  onPress={() => removeFriend(f)}
                  style={styles.removeBtn}>
                  <Icon name="x" size={14} color={TG.inkSoft} />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: TG.kraft },
  topBar: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  title: {
    fontFamily: TG.display,
    fontSize: 22,
    color: TG.ink,
    letterSpacing: -0.1,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: TG.paper,
    borderWidth: 1.5,
    borderColor: TG.line,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontFamily: TG.body,
    fontSize: 15,
    color: TG.ink,
  },
  addPill: {
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  addPillText: {
    fontFamily: TG.bodySemi,
    fontSize: 14,
    letterSpacing: -0.1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: TG.paper,
    borderWidth: 1,
    borderColor: TG.line,
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  name: {
    fontFamily: TG.bodySemi,
    fontSize: 15,
    color: TG.ink,
    letterSpacing: -0.1,
  },
  handle: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkFaint,
  },
  removeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: TG.kraft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: 60,
    alignItems: 'center',
    gap: 14,
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
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  emptyBody: {
    fontFamily: TG.body,
    fontSize: 14,
    color: TG.inkSoft,
    textAlign: 'center',
  },
  noMatch: {
    padding: 32,
    fontFamily: TG.body,
    fontSize: 14,
    color: TG.inkFaint,
    textAlign: 'center',
  },
});
