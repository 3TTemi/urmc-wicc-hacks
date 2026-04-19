export type Person = {
  initial: string;
  color: string;
  name?: string;
};

export type Vibe = {
  label: string;
  variant: 'forest' | 'sunset' | 'neutral' | 'ink';
};

export type Host = {
  handle: string;
  initial: string;
  color: string;
  name?: string;
};

export type Activity = {
  id: number;
  palette: string;
  image: string;
  icon: string;
  type: string;
  title: string;
  location: string;
  when: string;
  detailLocation?: string;
  detailWhen?: string;
  description: string;
  longDescription?: string;
  vibes: Vibe[];
  host: Host;
  going: Person[];
  capacity: number;
  ageRange?: string | null;
};

export type Friend = {
  handle: string;
  name: string;
  initial: string;
  color: string;
};

export type ScreenOrigin = 'feed' | 'maybe' | 'detail';
