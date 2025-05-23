import { Link } from "expo-router"
import { LogOutIcon, MoonIcon, SunIcon } from "lucide-react-native"
import { Image, Pressable } from "react-native"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { Text } from "~/components/ui/text"
import { useIsSignedIn, useLogout } from "~/store/slices/auth"
import { useTheme, useToggleTheme } from "~/store/slices/theme"

export function UserHeader() {
  const theme = useTheme()
  const toggleTheme = useToggleTheme()
  const isSignedIn = useIsSignedIn()
  const logout = useLogout()

  const user = {} as any // TODO:

  if (!isSignedIn) {
    return null
  }

  return (
    <Box className="flex-row items-center gap-4">
      <Box className="h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-primary-500/50">
        <Image source={{ uri: user.imageUrl }} className="size-14" />
      </Box>
      <Link href="/(auth)/sign-up" asChild>
        <Pressable className="flex-1 gap-1 active:opacity-50">
          <Heading
            className="text-typography-900 leading-none"
            numberOfLines={1}
          >
            {user.fullName}
          </Heading>
          <Text
            className="text-lg text-typography-500 leading-none"
            numberOfLines={1}
          >
            {user.primaryEmailAddress?.emailAddress}
          </Text>
        </Pressable>
      </Link>

      <Button
        variant="link"
        action="primary"
        onPress={toggleTheme}
        className="w-10"
      >
        <ButtonIcon as={theme === "dark" ? MoonIcon : SunIcon} />
      </Button>
      <Button
        variant="link"
        action="negative"
        onPress={logout}
        className="w-10"
      >
        <ButtonIcon as={LogOutIcon} />
      </Button>
    </Box>
  )
}
