// Tagalong design tokens — direct port of colors_and_type.css
// Single source of truth for colors, fonts, spacing across the app.

export const TG = {
  // Brand colors
  kraft: '#F8F3EA',       // primary background — kraft paper
  paper: '#FEFCF7',       // elevated surface
  ink: '#1A1410',         // primary text (warm near-black)
  inkSoft: '#5A4E42',     // secondary text, labels
  inkFaint: '#8A7D6E',    // tertiary / meta
  sunset: '#E87A47',      // primary accent — golden hour
  sunsetDeep: '#C85F2E',  // pressed sunset
  sunsetSoft: '#FCEADD',  // sunset-tinted surface
  forest: '#2D5940',      // secondary accent — hiking / vibes
  forestSoft: '#EAF0EC',  // forest-tinted surface
  line: '#E8DFD0',        // warm tan hairline
  scrim: 'rgba(26, 20, 16, 0.35)',

  // Typography families (loaded via expo-google-fonts)
  display: 'InstrumentSerif_400Regular',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',

  // Motion
  easeSpring: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
} as const;

export const spacing = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 24,
  s6: 32,
  s7: 48,
  s8: 64,
} as const;

export const radius = {
  sm: 8,
  input: 16,
  card: 24,
  chip: 999,
} as const;

export const typeScale = {
  display: 40,
  h1: 32,
  h2: 24,
  h3: 20,
  body: 16,
  bodySm: 14,
  label: 13,
  meta: 12,
} as const;

export const shadows = {
  card: {
    shadowColor: '#1A1410',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 6,
  },
  float: {
    shadowColor: '#1A1410',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 48,
    elevation: 12,
  },
  press: {
    shadowColor: '#1A1410',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    shadowColor: '#E87A47',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
};
