import { Link } from "expo-router"
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react-native"
import { Image, Pressable } from "react-native"
import { Box } from "~/shared/components/ui/box"
import { Button, ButtonIcon } from "~/shared/components/ui/button"
import { Heading } from "~/shared/components/ui/heading"
import { Skeleton, SkeletonText } from "~/shared/components/ui/skeleton"
import { Text } from "~/shared/components/ui/text"
import { useIsSignedIn, useLogout } from "~/shared/store/slices/auth"
import { useProfile } from "~/shared/store/slices/profile"
import { useTheme, useToggleTheme } from "~/shared/store/slices/theme"

export function UserHeader() {
  const theme = useTheme()
  const toggleTheme = useToggleTheme()
  const isSignedIn = useIsSignedIn()
  const profile = useProfile()
  const logout = useLogout()

  if (!isSignedIn) {
    return null
  }

  if (profile.isPending) {
    return (
      <Box className="flex-row items-center gap-4">
        <Skeleton className="size-14" />
        <Box>
          <SkeletonText />
          <SkeletonText />
        </Box>
      </Box>
    )
  }

  if (!profile.data) {
    return null
  }

  return (
    <Box className="flex-row items-center gap-4">
      <Box className="h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-primary-500/50">
        {profile.data.avatar ? (
          <Image className="size-14" source={{ uri: profile.data.avatar }} />
        ) : (
          <UserIcon />
        )}
      </Box>
      <Link asChild href="/(auth)/sign-up">
        <Pressable className="flex-1 gap-1 active:opacity-50">
          <Heading
            className="text-typography-900 leading-none"
            numberOfLines={1}
          >
            {profile.data.username}
          </Heading>
          <Text
            className="text-lg text-typography-500 leading-none"
            numberOfLines={1}
          >
            {profile.data.email}
          </Text>
        </Pressable>
      </Link>

      <Button
        action="primary"
        className="w-10"
        onPress={toggleTheme}
        variant="link"
      >
        <ButtonIcon as={theme === "dark" ? MoonIcon : SunIcon} />
      </Button>
      <Button
        action="negative"
        className="w-10"
        onPress={logout}
        variant="link"
      >
        <ButtonIcon as={LogOutIcon} />
      </Button>
    </Box>
  )
}
