import { Box } from "@ui/box"
import { Button, ButtonText } from "@ui/button"
import { Icon } from "@ui/icon"
import { User } from "lucide-react-native"
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
        <Icon as={User} size="xl" />
      </Box>
      <Box className="flex-1">
        <Text className="font-bold text-primary-900 text-xl leading-none">
          {title}
        </Text>
        <Text className="text-neutral-500 underline">{subtitle}</Text>
      </Box>
      <Button onPress={toggleTheme}>
        <ButtonText>{theme}</ButtonText>
      </Button>
    </Box>
  )
}
