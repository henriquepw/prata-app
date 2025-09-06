import { useNavigation } from "expo-router"
import { ChevronLeftIcon } from "lucide-react-native"
import { Platform, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { cn } from "~/shared/utils/cn"
import { Background } from "../background"
import { Box } from "../box"
import { Heading } from "../heading"
import { Icon } from "../icon"

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
      {Platform.OS === "android" && (
        <Background className="absolute bottom-0 h-24 w-full" />
      )}
      <SafeAreaView
        className={cn("flex-1 gap-4 px-4", className)}
        edges={edges}
      >
        {children}
      </SafeAreaView>
    </Background>
  )
}

type HeaderProps = {
  title: string
  children?: React.ReactNode
  onBack?: () => void
}
export function ScreenHeader({ title, children, onBack }: HeaderProps) {
  const navigation = useNavigation()

  const handleBack = () => {
    onBack?.()
    navigation.goBack()
  }

  return (
    <Box className="h-12 flex-row items-center justify-between gap-2">
      {navigation.canGoBack() && (
        <Pressable
          className="size-10 items-start justify-center active:opacity-50"
          onPress={handleBack}
        >
          <Icon as={ChevronLeftIcon} size="xl" />
        </Pressable>
      )}

      <Heading className="flex-1" size="xl">
        {title}
      </Heading>
      {children}
    </Box>
  )
}
