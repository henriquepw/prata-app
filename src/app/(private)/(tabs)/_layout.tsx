import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui"
import { StatusBar } from "expo-status-bar"
import { HomeIcon, PinIcon } from "lucide-react-native"
import { TransationFab } from "~/components/features/transations/transation-fab"
import { TabButton, TabView } from "~/components/ui/bottom-tab"
import { useTheme } from "~/store/slices/theme"

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs>
      <StatusBar translucent style={theme === "dark" ? "light" : "dark"} />
      <TabSlot />

      <TabList asChild>
        <TabView>
          <TabTrigger asChild name="home" href="/(private)/(tabs)">
            <TabButton index={0} icon={HomeIcon} label="Geral" />
          </TabTrigger>
          <TabTrigger
            asChild
            name="automation"
            href="/(private)/(tabs)/recurrences"
          >
            <TabButton index={1} icon={PinIcon} label="Fixos" />
          </TabTrigger>
        </TabView>
      </TabList>

      <TransationFab />
    </Tabs>
  )
}
