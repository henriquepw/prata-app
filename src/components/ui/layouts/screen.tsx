import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "../background"
import { cn } from "~/utils/cn"
import { ChevronLeftIcon } from "lucide-react-native"
import { Pressable } from "react-native"
import { Icon } from "../icon"
import { useNavigation } from "expo-router"
import { Box } from "../box"
import { Heading } from "../heading"

const edges = {
  bottom: "off",
  top: "additive",
  left: "additive",
  right: "additive",
} as const

type RootProps = {
  children: React.ReactNode
  className?: string
}
export function ScreenRoot({ children, className }: RootProps) {
  return (
    <Background>
      <SafeAreaView
        edges={edges}
        className={cn("flex-1 gap-4 px-4", className)}
      >
        {children}
      </SafeAreaView>
    </Background>
  )
}

type HeaderProps = {
  title: string
  children?: React.ReactNode
}
export function ScreenHeader({ title, children }: HeaderProps) {
  const nativagion = useNavigation()

  return (
    <Box className="h-12 flex-row items-center justify-between gap-2">
      {nativagion.canGoBack() && (
        <Pressable
          className="size-10 items-start justify-center active:opacity-50"
          onPress={nativagion.goBack}
        >
          <Icon as={ChevronLeftIcon} size="xl" />
        </Pressable>
      )}

      <Heading size="xl" className="flex-1">
        {title}
      </Heading>
      {children}
    </Box>
  )
}
