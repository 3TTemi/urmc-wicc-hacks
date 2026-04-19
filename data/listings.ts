// Tagalong — 6 seeded Ithaca activity cards.
// Photo URLs committed as strings. Will be fetched + cached by expo-image
// on first load. Swap with bundled local assets for offline demo if needed.

import type { Activity, Friend, Person } from './types';

// Unsplash photo IDs — evergreen, categorized to match each spot's vibe.
// Replace ?w=1200 with lower res for faster initial load.
const IMG = {
  buttermilk: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=80',
  gimme: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80',
  moosewood: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&auto=format&fit=crop&q=80',
  cascadilla: 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=1200&auto=format&fit=crop&q=80',
  felicias: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=1200&auto=format&fit=crop&q=80',
  farmers: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&auto=format&fit=crop&q=80',
};

export const TG_SEED: Activity[] = [
  {
    id: 1,
    palette: 'buttermilk',
    image: IMG.buttermilk,
    icon: 'mountain',
    type: 'hiking',
    title: 'Buttermilk Falls sunrise hike',
    location: 'Buttermilk Falls',
    when: 'Sat 6:45am',
    detailLocation: 'Buttermilk Falls State Park, lower parking lot',
    detailWhen: 'Saturday, April 19 · 6:45am · ~2 hours',
    description: "starting at the lower lot, collegetown bagels after. slow pace, no shame if you need coffee first.",
    longDescription: "Starting at the lower lot at 6:45 sharp to catch the light hitting the top of the falls. Easy loop, about 1.5 miles. Collegetown Bagels after for whoever wants to extend the morning.",
    vibes: [
      { label: 'outdoors', variant: 'forest' },
      { label: 'early-bird', variant: 'forest' },
      { label: 'chill', variant: 'forest' },
      { label: 'post-hike-bagels', variant: 'sunset' },
    ],
    host: { handle: 'nina_c', initial: 'N', color: '#2D5940', name: 'Nina' },
    going: [
      { initial: 'N', color: '#2D5940', name: 'Nina' },
      { initial: 'R', color: '#8B5A3C', name: 'Ravi' },
    ],
    capacity: 4,
  },
  {
    id: 2,
    palette: 'gimme',
    image: IMG.gimme,
    icon: 'coffee',
    type: 'coffee',
    title: 'Slow morning at Gimme Coffee',
    location: 'Gimme Coffee, Cayuga',
    when: 'Sun 10am',
    description: "working on my novel, want company to pretend i'm writing. bring a book or don't.",
    vibes: [
      { label: 'chill', variant: 'forest' },
      { label: 'quiet', variant: 'forest' },
    ],
    host: { handle: 'ravi_m', initial: 'R', color: '#8B5A3C', name: 'Ravi' },
    going: [{ initial: 'R', color: '#8B5A3C', name: 'Ravi' }],
    capacity: 3,
  },
  {
    id: 3,
    palette: 'moosewood',
    image: IMG.moosewood,
    icon: 'utensils',
    type: 'dinner',
    title: 'Moosewood with new friends',
    location: 'Moosewood Restaurant',
    when: 'Fri 7pm',
    description: "first-timers welcome, we split apps. reservation is under my name, just show up.",
    vibes: [
      { label: 'ithaca classic', variant: 'sunset' },
      { label: 'meet people', variant: 'forest' },
    ],
    host: { handle: 'sarah_k', initial: 'S', color: '#E87A47', name: 'Sarah' },
    going: [
      { initial: 'S', color: '#E87A47', name: 'Sarah' },
      { initial: 'J', color: '#2D5940', name: 'Jules' },
      { initial: 'T', color: '#8B5A3C', name: 'Tam' },
    ],
    capacity: 5,
  },
  {
    id: 4,
    palette: 'cascadilla',
    image: IMG.cascadilla,
    icon: 'leaf',
    type: 'walk',
    title: 'Cascadilla Gorge golden hour',
    location: 'Cascadilla Gorge',
    when: 'Thu 6pm',
    description: "leaves just turned, don't miss it. starting from the commons side, 45 min round trip.",
    vibes: [
      { label: 'golden hour', variant: 'sunset' },
      { label: 'outdoors', variant: 'forest' },
    ],
    host: { handle: 'dani_l', initial: 'D', color: '#C85F2E', name: 'Dani' },
    going: [{ initial: 'D', color: '#C85F2E', name: 'Dani' }],
    capacity: 3,
  },
  {
    id: 5,
    palette: 'felicias',
    image: IMG.felicias,
    icon: 'music',
    type: 'live music',
    title: "Open mic at Felicia's",
    location: "Felicia's Atomic Lounge",
    when: 'Sat 9pm',
    description: "first round on me if you show. no cover, stay as long or short as you want.",
    vibes: [
      { label: 'nightlife', variant: 'sunset' },
      { label: 'drinks', variant: 'forest' },
    ],
    host: { handle: 'mike_r', initial: 'M', color: '#5A4E42', name: 'Mike' },
    going: [
      { initial: 'M', color: '#5A4E42', name: 'Mike' },
      { initial: 'P', color: '#E87A47', name: 'Priya' },
    ],
    capacity: 6,
  },
  {
    id: 6,
    palette: 'farmers',
    image: IMG.farmers,
    icon: 'croissant',
    type: 'brunch',
    title: 'Ithaca Farmers Market run',
    location: 'Ithaca Farmers Market',
    when: 'Sat 11am',
    description: "tent-hopping then stewart park picnic. bring a blanket if you have one, cash for vendors.",
    vibes: [
      { label: 'morning', variant: 'sunset' },
      { label: 'outdoors', variant: 'forest' },
    ],
    host: { handle: 'lou_p', initial: 'L', color: '#2D5940', name: 'Lou' },
    going: [
      { initial: 'L', color: '#2D5940', name: 'Lou' },
      { initial: 'E', color: '#C7845B', name: 'Erin' },
    ],
    capacity: 4,
  },
];

export const TG_SEED_FRIENDS: Friend[] = [
  { handle: 'nina_c', name: 'Nina Chen', initial: 'N', color: '#2D5940' },
  { handle: 'ravi_m', name: 'Ravi Mehta', initial: 'R', color: '#8B5A3C' },
  { handle: 'sarah_k', name: 'Sarah Kim', initial: 'S', color: '#E87A47' },
];

// Fallback image for user-created listings (default per activity type)
export const DEFAULT_IMAGE_BY_TYPE: Record<string, string> = {
  hiking: IMG.buttermilk,
  coffee: IMG.gimme,
  dinner: IMG.moosewood,
  brunch: IMG.farmers,
  walk: IMG.cascadilla,
  'live music': IMG.felicias,
  music: IMG.felicias,
  bar: IMG.felicias,
  gym: IMG.buttermilk,
  study: IMG.gimme,
  'board games': IMG.moosewood,
  other: IMG.cascadilla,
};
