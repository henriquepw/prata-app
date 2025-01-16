import { Link } from "expo-router"
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui"
import { HomeIcon, PinIcon, PlusIcon } from "lucide-react-native"
import { TabButton } from "~/components/ui/tab/tab-button"

export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />

      <TabList className="-translate-x-1/2 absolute bottom-10 left-1/2 items-center gap-2 rounded-full border border-neutral-300 bg-background-0 p-1">
        <TabTrigger asChild name="home" href="/(tabs)">
          <TabButton icon={HomeIcon} />
        </TabTrigger>

        <Link asChild href="/transations/register">
          <TabButton icon={PlusIcon} />
        </Link>

        <TabTrigger asChild name="recurrent" href="/(tabs)/recurrent">
          <TabButton icon={PinIcon} />
        </TabTrigger>
      </TabList>
    </Tabs>
  )
}
