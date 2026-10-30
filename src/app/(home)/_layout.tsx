import { BlurTargetView } from "expo-blur"
import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui"
import { HomeIcon, PinIcon } from "lucide-react-native"
import { type ComponentRef, useRef } from "react"
import type { View } from "react-native"
import { TabButton, TabView } from "~/components/bottom-tab"
import { TransationFab } from "~/domains/transaction/components/transation-fab"

export default function Layout() {
  const blurTarget = useRef<ComponentRef<typeof View>>(null)

  return (
    <Tabs>
      <BlurTargetView ref={blurTarget} style={{ flex: 1 }}>
        <TabSlot />
      </BlurTargetView>

      <TabList asChild>
        <TabView blurTarget={blurTarget}>
          <TabTrigger asChild href="/(home)" name="home">
            <TabButton icon={HomeIcon} index={0} label="Geral" />
          </TabTrigger>
          <TabTrigger asChild href="/(home)/recurrences" name="automation">
            <TabButton icon={PinIcon} index={1} label="Fixos" />
          </TabTrigger>
        </TabView>
      </TabList>

      <TransationFab />
    </Tabs>
  )
}
