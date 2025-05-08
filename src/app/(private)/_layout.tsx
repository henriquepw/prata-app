import { Redirect, Stack } from "expo-router"
import { useSetupApi } from "~/api"
import { useIsSignedIn } from "~/store/auth-store"

const opts = { headerShown: false }

export default function PrivateLayout() {
  const isSignedIn = useIsSignedIn()
  useSetupApi()

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Stack screenOptions={opts}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="transations/register"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="recurrents/register"
        options={{ presentation: "modal" }}
      />
    </Stack>
  )
}
