import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  Coffee,
  Compass,
  Copy,
  Croissant,
  Dices,
  Dumbbell,
  Filter,
  Footprints,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Moon,
  Mountain,
  Music,
  Plus,
  Search,
  Sparkles,
  User,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

import { TG } from '@/constants/theme';

const InstagramIcon = ({
  size = 22,
  color = TG.ink,
  strokeWidth = 1.75,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={3}
      width={18}
      height={18}
      rx={5}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={12}
      cy={12}
      r={4}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={17.5} cy={6.5} r={0.9} fill={color} />
  </Svg>
);

const MAP = {
  'map-pin': MapPin,
  calendar: Calendar,
  clock: Clock,
  users: Users,
  check: Check,
  x: X,
  plus: Plus,
  compass: Compass,
  user: User,
  mountain: Mountain,
  coffee: Coffee,
  utensils: UtensilsCrossed,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'message-circle': MessageCircle,
  'chevron-left': ChevronLeft,
  sparkles: Sparkles,
  heart: Heart,
  leaf: Leaf,
  music: Music,
  croissant: Croissant,
  dumbbell: Dumbbell,
  moon: Moon,
  dice: Dices,
  book: BookOpen,
  walk: Footprints,
  copy: Copy,
  filter: Filter,
  search: Search,
} as const;

export type IconName = keyof typeof MAP | 'instagram';

type Props = {
  name: IconName | string;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function Icon({ name, size = 22, color = TG.ink, strokeWidth = 1.75 }: Props) {
  if (name === 'instagram') {
    return <InstagramIcon size={size} color={color} strokeWidth={strokeWidth} />;
  }
  const Cmp = MAP[name as keyof typeof MAP] || Sparkles;
  return <Cmp size={size} color={color} strokeWidth={strokeWidth} />;
}
