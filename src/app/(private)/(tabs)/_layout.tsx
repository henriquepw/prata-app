import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui"
import { StatusBar } from "expo-status-bar"
import { HomeIcon, PinIcon } from "lucide-react-native"
import { TransationFab } from "~/features/transaction/components/transation-fab"
import { TabButton, TabView } from "~/shared/components/ui/bottom-tab"
import { useTheme } from "~/shared/store/slices/theme"

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs>
      <StatusBar style={theme === "dark" ? "light" : "dark"} translucent />
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
