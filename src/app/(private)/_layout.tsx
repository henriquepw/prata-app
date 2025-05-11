import { Stack } from "expo-router"
import { Skeleton } from "~/components/ui/skeleton"
import { useBalance } from "~/store/slices/balance"

const opts = { headerShown: false }

export default function PrivateLayout() {
  const balance = useBalance()

  if (balance.isPending) {
    return <Skeleton />
  }

  const showIntro = !balance.data?.pieces.length

  return (
    <Stack screenOptions={opts}>
      <Stack.Protected guard={showIntro}>
        <Stack.Screen name="intro/balance" />
      </Stack.Protected>

      <Stack.Protected guard={!showIntro}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="transations/register"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="recurrences/register"
          options={{ presentation: "modal" }}
        />
      </Stack.Protected>
    </Stack>
  )
}
