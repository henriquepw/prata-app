import { Link } from "expo-router"
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react-native"
import { Image, Pressable } from "react-native"
import { Box } from "~/components/box"
import { Button, ButtonIcon } from "~/components/button"
import { Heading } from "~/components/heading"
import { Skeleton, SkeletonText } from "~/components/skeleton"
import { Text } from "~/components/text"
import { useTheme, useToggleTheme } from "~/store/theme"

const placeholderProfile = {
  isPending: false,
  data: {
    avatar: null as string | null,
    username: "Usuário",
    email: "usuario@email.com",
  },
}

export function UserHeader() {
  const theme = useTheme()
  const toggleTheme = useToggleTheme()
  const profile = placeholderProfile
  const logout = () => {}

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
      <Box className="bg-primary/50 h-14 w-14 items-center justify-center overflow-hidden rounded-full">
        {profile.data.avatar ? (
          <Image className="size-14" source={{ uri: profile.data.avatar }} />
        ) : (
          <UserIcon />
        )}
      </Box>
      <Link asChild href="/">
        <Pressable className="flex-1 gap-1 active:opacity-50">
          <Heading className="text-foreground leading-none" numberOfLines={1}>
            {profile.data.username}
          </Heading>
          <Text
            className="text-muted-foreground text-lg leading-none"
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
