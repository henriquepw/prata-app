import { Box } from "@ui/box"
import { Button, ButtonIcon } from "@ui/button"
import { Icon } from "@ui/icon"
import { MoonIcon, SunIcon, UserIcon } from "lucide-react-native"
import { Text } from "react-native"
import { useTheme, useToggleTheme } from "../store/theme-store"

type Props = {
  title: string
  subtitle: string
}

export function UserHeader({ title, subtitle }: Props) {
  const toggleTheme = useToggleTheme()
  const theme = useTheme()

  return (
    <Box className="flex-row items-center gap-4">
      <Box className="h-14 w-14 items-center justify-center rounded-full bg-primary-500/50">
        <Icon as={UserIcon} size="xl" />
      </Box>
      <Box className="flex-1">
        <Text className="font-bold text-typography-900 text-xl leading-none">
          {title}
        </Text>
        <Text className="text-typography-500 underline">{subtitle}</Text>
      </Box>
      <Button onPress={toggleTheme} className="w-10">
        <ButtonIcon as={theme === "dark" ? MoonIcon : SunIcon} />
      </Button>
    </Box>
  )
}
