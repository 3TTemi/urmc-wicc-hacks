import { Tabs } from 'expo-router';

import { TabBar } from '@/components/TabBar';
import { TG } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: TG.kraft },
      }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="collections" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="you" />
    </Tabs>
  );
}
