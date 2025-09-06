import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui"
import { HomeIcon, PinIcon } from "lucide-react-native"
import { TransationFab } from "~/features/transaction/components/transation-fab"
import { TabButton, TabView } from "~/shared/components/bottom-tab"

export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />

      <TabList asChild>
        <TabView>
          <TabTrigger asChild href="/(private)/(tabs)" name="home">
            <TabButton icon={HomeIcon} index={0} label="Geral" />
          </TabTrigger>
          <TabTrigger
            asChild
            href="/(private)/(tabs)/recurrences"
            name="automation"
          >
            <TabButton icon={PinIcon} index={1} label="Fixos" />
          </TabTrigger>
        </TabView>
      </TabList>

      <TransationFab />
    </Tabs>
  )
}
