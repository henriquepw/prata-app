import { useAuth } from "@clerk/clerk-expo"
import { Redirect, Stack } from "expo-router"

const opts = { headerShown: false }

export default function PrivateLayout() {
  const { isSignedIn } = useAuth()

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
