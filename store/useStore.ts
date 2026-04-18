import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { DEFAULT_IMAGE_BY_TYPE, TG_SEED, TG_SEED_FRIENDS } from '@/data/listings';
import type { Activity, Friend, ScreenOrigin } from '@/data/types';

type CreateInput = {
  type: string;
  icon: string;
  title: string;
  location: string;
  when: string;
  description: string;
  capacity: number;
  ageRange?: string | null;
};

type AppState = {
  stack: Activity[];
  idx: number;
  liveIds: number[];
  goingList: Activity[];
  maybeList: Activity[];
  friends: Friend[];
  joined: Activity | null;
  copied: boolean;
  pendingJoinOrigin: ScreenOrigin;
  collectionsSegment: 'going' | 'maybe';
  detailActivity: Activity | null;

  // actions
  skip: () => void;
  maybe: (a: Activity) => void;
  join: (a: Activity) => void;
  joinFromMaybe: (a: Activity) => void;
  skipFromMaybe: (a: Activity) => void;
  joinFromDetail: () => void;
  maybeFromDetail: () => void;
  skipFromDetail: () => void;
  confirmDone: () => void;
  clearJoined: () => void;
  markCopied: (v: boolean) => void;
  post: (input: CreateInput) => Activity;
  setDetail: (a: Activity | null) => void;
  setCollectionsSegment: (s: 'going' | 'maybe') => void;
  addFriend: (f: Friend) => void;
  removeFriend: (f: Friend) => void;
  resetAll: () => void;
};

const palettes = ['buttermilk', 'gimme', 'moosewood', 'cascadilla', 'felicias', 'farmers'] as const;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      stack: TG_SEED,
      idx: 0,
      liveIds: [],
      goingList: [],
      maybeList: [],
      friends: TG_SEED_FRIENDS,
      joined: null,
      copied: false,
      pendingJoinOrigin: 'feed',
      collectionsSegment: 'going',
      detailActivity: null,

      skip: () => set((s) => ({ idx: s.idx + 1 })),

      maybe: (a) =>
        set((s) => ({
          maybeList: s.maybeList.some((x) => x.id === a.id) ? s.maybeList : [...s.maybeList, a],
          idx: s.idx + 1,
        })),

      join: (a) =>
        set(() => ({
          joined: a,
          copied: false,
          pendingJoinOrigin: 'feed',
        })),

      joinFromMaybe: (a) =>
        set(() => ({
          joined: a,
          copied: false,
          pendingJoinOrigin: 'maybe',
        })),

      skipFromMaybe: (a) =>
        set((s) => ({ maybeList: s.maybeList.filter((x) => x.id !== a.id) })),

      joinFromDetail: () => {
        const a = get().detailActivity;
        if (!a) return;
        set({ joined: a, copied: false, pendingJoinOrigin: 'detail' });
      },

      maybeFromDetail: () => {
        const a = get().detailActivity;
        if (!a) return;
        set((s) => ({
          maybeList: s.maybeList.some((x) => x.id === a.id) ? s.maybeList : [...s.maybeList, a],
          detailActivity: null,
          idx: s.idx + 1,
        }));
      },

      skipFromDetail: () =>
        set((s) => ({ detailActivity: null, idx: s.idx + 1 })),

      confirmDone: () =>
        set((s) => {
          if (!s.joined) return s;
          const nextGoing = s.goingList.some((a) => a.id === s.joined!.id)
            ? s.goingList
            : [...s.goingList, s.joined];
          const nextMaybe = s.maybeList.filter((a) => a.id !== s.joined!.id);
          const advanceIdx = s.pendingJoinOrigin === 'feed' ? s.idx + 1 : s.idx;
          return {
            goingList: nextGoing,
            maybeList: nextMaybe,
            idx: advanceIdx,
            joined: null,
            detailActivity: null,
            collectionsSegment: s.pendingJoinOrigin === 'maybe' ? 'going' : s.collectionsSegment,
          };
        }),

      clearJoined: () => set({ joined: null }),
      markCopied: (v) => set({ copied: v }),

      post: (input) => {
        const s = get();
        const newId = Math.max(0, ...s.stack.map((x) => x.id)) + 1;
        const newCard: Activity = {
          id: newId,
          palette: palettes[newId % palettes.length],
          image: DEFAULT_IMAGE_BY_TYPE[input.type] || DEFAULT_IMAGE_BY_TYPE.other,
          icon: input.icon,
          type: input.type,
          title: input.title,
          location: input.location,
          when: input.when,
          description: input.description,
          vibes: [
            { label: 'just posted', variant: 'sunset' },
            { label: 'open', variant: 'forest' },
          ],
          host: { handle: 'you', initial: 'Y', color: '#2D5940', name: 'You' },
          going: [{ initial: 'Y', color: '#2D5940', name: 'You' }],
          capacity: input.capacity,
          ageRange: input.ageRange ?? null,
        };
        const insertAt = Math.min(s.idx, s.stack.length);
        const newStack = [...s.stack.slice(0, insertAt), newCard, ...s.stack.slice(insertAt)];
        set({ stack: newStack, liveIds: [...s.liveIds, newId] });
        return newCard;
      },

      setDetail: (a) => set({ detailActivity: a }),
      setCollectionsSegment: (seg) => set({ collectionsSegment: seg }),

      addFriend: (f) =>
        set((s) => ({
          friends: s.friends.some((x) => x.handle === f.handle) ? s.friends : [...s.friends, f],
        })),

      removeFriend: (f) => set((s) => ({ friends: s.friends.filter((x) => x.handle !== f.handle) })),

      resetAll: () =>
        set({
          stack: TG_SEED,
          idx: 0,
          liveIds: [],
          goingList: [],
          maybeList: [],
          friends: TG_SEED_FRIENDS,
          joined: null,
          copied: false,
          detailActivity: null,
        }),
    }),
    {
      name: 'tagalong-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        stack: s.stack,
        idx: s.idx,
        liveIds: s.liveIds,
        goingList: s.goingList,
        maybeList: s.maybeList,
        friends: s.friends,
      }),
    }
  )
);
