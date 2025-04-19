import { useUser } from "@clerk/clerk-expo"
import { useTheme } from "@react-navigation/native"
import { Link } from "expo-router"
import { MoonIcon, SunIcon } from "lucide-react-native"
import { Image, Pressable } from "react-native"
import { Box } from "~/components/ui/box"
import { Button, ButtonIcon } from "~/components/ui/button"
import { Heading } from "~/components/ui/heading"
import { useToggleTheme } from "~/store/theme-store"

export function UserHeader() {
  const toggleTheme = useToggleTheme()
  const theme = useTheme()

  const { isSignedIn, user } = useUser()

  console.log({ user })
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
          <Heading
            className="font-normal text-lg text-typography-500 leading-none"
            numberOfLines={1}
          >
            {user.primaryEmailAddress?.emailAddress}
          </Heading>
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
    </Box>
  )
}
