import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Icon, IconName } from '@/components/Icon';
import { Input } from '@/components/Input';
import { TG } from '@/constants/theme';
import { useAppStore } from '@/store/useStore';

const ITHACA_SPOTS = [
  'Buttermilk Falls',
  'Cascadilla Gorge',
  'Ithaca Commons',
  'Moosewood Restaurant',
  'Cornell Botanic Gardens',
  'Gimme Coffee, Cayuga',
  'Stewart Park',
  'Taughannock Falls',
  'Sapsucker Woods',
  'Collegetown Bagels',
];

const ACTIVITY_TYPES: { key: string; icon: IconName }[] = [
  { key: 'hiking', icon: 'mountain' },
  { key: 'coffee', icon: 'coffee' },
  { key: 'dinner', icon: 'utensils' },
  { key: 'study', icon: 'book' },
  { key: 'live music', icon: 'music' },
  { key: 'gym', icon: 'dumbbell' },
  { key: 'brunch', icon: 'croissant' },
  { key: 'walk', icon: 'walk' },
  { key: 'bar', icon: 'moon' },
  { key: 'board games', icon: 'dice' },
  { key: 'other', icon: 'sparkles' },
];

const DAYS = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
const TIMES = ['8am', '10am', '12pm', '2pm', '5pm', '7pm', '9pm'];

const AGE_RANGES = [
  { key: 'any', label: 'any age' },
  { key: '18-22', label: '18–22' },
  { key: '21-25', label: '21–25' },
  { key: '25-30', label: '25–30' },
  { key: '30+', label: '30+' },
];

export default function CreateScreen() {
  const insets = useSafeAreaInsets();
  const post = useAppStore((s) => s.post);

  const [type, setType] = useState('hiking');
  const [otherLabel, setOtherLabel] = useState('');
  const [title, setTitle] = useState('');
  const [where, setWhere] = useState('');
  const [day, setDay] = useState('Sat');
  const [time, setTime] = useState('2pm');
  const [size, setSize] = useState(3);
  const [desc, setDesc] = useState('');
  const [ageRange, setAgeRange] = useState('any');

  const effectiveType = type === 'other' ? otherLabel.trim() || 'other' : type;
  const canPost = title.trim().length > 2 && (type !== 'other' || otherLabel.trim().length > 0);

  const handlePost = () => {
    if (!canPost) return;
    const selectedType = ACTIVITY_TYPES.find((t) => t.key === type)!;
    post({
      type: effectiveType,
      icon: selectedType.icon,
      title: title.trim(),
      location: where.trim() || 'Ithaca, NY',
      when: `${day} ${time}`,
      description: desc.trim() || 'just posted. come say hi.',
      capacity: size,
      ageRange: ageRange === 'any' ? null : ageRange,
    });
    // Clear form and jump back to feed
    setTitle('');
    setWhere('');
    setDesc('');
    setOtherLabel('');
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Icon name="x" size={18} color={TG.ink} />
        </Pressable>
        <Text style={styles.kicker}>new listing</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 220 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={{ paddingHorizontal: 20, paddingBottom: 4 }}>
          <Text style={styles.bigQuestion}>
            {'what do you\nwant to do'}
            <Text style={{ color: TG.sunset }}>?</Text>
          </Text>
        </View>

        {/* Type chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 20, paddingVertical: 18 }}>
          {ACTIVITY_TYPES.map((t) => (
            <Chip
              key={t.key}
              selected={type === t.key}
              onPress={() => setType(t.key)}
              size="lg"
              icon={
                <Icon
                  name={t.icon}
                  size={15}
                  color={type === t.key ? TG.paper : TG.ink}
                  strokeWidth={1.9}
                />
              }>
              {t.key}
            </Chip>
          ))}
        </ScrollView>

        {type === 'other' ? (
          <View style={{ paddingHorizontal: 20, marginBottom: 4 }}>
            <TextInput
              value={otherLabel}
              onChangeText={setOtherLabel}
              placeholder="what kind? e.g. pottery, frisbee, karaoke"
              placeholderTextColor={TG.inkFaint}
              style={styles.otherInput}
            />
          </View>
        ) : null}

        {/* Fields */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12, gap: 22 }}>
          <Input label="give it a title" value={title} onChangeText={setTitle} placeholder="Buttermilk Falls sunrise hike" />
          <Input
            label="where?"
            value={where}
            onChangeText={setWhere}
            placeholder="start typing an Ithaca spot…"
            autocomplete={ITHACA_SPOTS}
          />

          {/* When */}
          <View>
            <Text style={styles.fieldLabel}>when?</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <PickerRow value={day} options={DAYS} onChange={setDay} />
              <PickerRow value={time} options={TIMES} onChange={setTime} />
            </View>
          </View>

          {/* Group size */}
          <View>
            <Text style={styles.fieldLabel}>how many people?</Text>
            <View style={styles.stepper}>
              <Pressable
                onPress={() => setSize(Math.max(2, size - 1))}
                style={styles.stepBtnGhost}>
                <Text style={styles.stepGhostText}>−</Text>
              </Pressable>
              <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.stepNum}>{size}</Text>
                <Text style={styles.stepMeta}> incl. you</Text>
              </View>
              <Pressable
                onPress={() => setSize(Math.min(12, size + 1))}
                style={styles.stepBtnPrimary}>
                <Text style={styles.stepPrimaryText}>+</Text>
              </Pressable>
            </View>
          </View>

          {/* Age range */}
          <View>
            <Text style={styles.fieldLabel}>
              age range <Text style={styles.optional}>(optional)</Text>
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {AGE_RANGES.map((r) => (
                <Chip
                  key={r.key}
                  selected={ageRange === r.key}
                  onPress={() => setAgeRange(r.key)}
                  size="md">
                  {r.label}
                </Chip>
              ))}
            </View>
          </View>

          {/* Description */}
          <View>
            <Text style={styles.fieldLabel}>
              say more <Text style={styles.optional}>(optional)</Text>
            </Text>
            <TextInput
              value={desc}
              onChangeText={setDesc}
              placeholder="chill vibes, bring snacks"
              placeholderTextColor={TG.inkFaint}
              multiline
              style={styles.descInput}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.stickyBtn}>
        <Button onPress={handlePost} disabled={!canPost}>
          post it
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

function PickerRow({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.picker}
      contentContainerStyle={{ gap: 6, paddingHorizontal: 6, alignItems: 'center' }}>
      {options.map((o) => (
        <Pressable
          key={o}
          onPress={() => onChange(o)}
          style={[
            styles.pickerPill,
            value === o && { backgroundColor: TG.ink, borderColor: TG.ink },
          ]}>
          <Text
            style={[
              styles.pickerPillText,
              value === o && { color: TG.paper },
            ]}>
            {o}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: TG.kraft,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  kicker: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
  },
  bigQuestion: {
    fontFamily: TG.display,
    fontSize: 36,
    color: TG.ink,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  otherInput: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: TG.paper,
    borderWidth: 1.5,
    borderColor: TG.sunset,
    fontFamily: TG.body,
    fontSize: 15,
    color: TG.ink,
  },
  fieldLabel: {
    fontFamily: TG.bodyMedium,
    fontSize: 12,
    color: TG.inkFaint,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  optional: {
    textTransform: 'none',
    letterSpacing: 0,
    color: TG.inkFaint,
  },
  picker: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: TG.paper,
    borderWidth: 1.5,
    borderColor: TG.line,
  },
  pickerPill: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: TG.line,
    backgroundColor: TG.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerPillText: {
    fontFamily: TG.bodySemi,
    fontSize: 13,
    color: TG.ink,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: TG.paper,
    borderWidth: 1.5,
    borderColor: TG.line,
    borderRadius: 16,
    padding: 10,
    paddingHorizontal: 14,
  },
  stepBtnGhost: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TG.kraft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepGhostText: {
    fontFamily: TG.bodyBold,
    fontSize: 22,
    color: TG.ink,
    marginTop: -2,
  },
  stepBtnPrimary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: TG.sunset,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPrimaryText: {
    fontFamily: TG.bodyBold,
    fontSize: 22,
    color: TG.paper,
    marginTop: -2,
  },
  stepNum: {
    fontFamily: TG.display,
    fontSize: 30,
    color: TG.ink,
    letterSpacing: -0.5,
  },
  stepMeta: {
    fontFamily: TG.body,
    fontSize: 13,
    color: TG.inkFaint,
    marginLeft: 8,
  },
  descInput: {
    width: '100%',
    minHeight: 90,
    padding: 18,
    borderRadius: 16,
    backgroundColor: TG.paper,
    borderWidth: 1.5,
    borderColor: TG.line,
    fontFamily: TG.body,
    fontSize: 16,
    color: TG.ink,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  stickyBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: TG.kraft,
    borderTopWidth: 1,
    borderTopColor: TG.line,
  },
});
