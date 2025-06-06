import { Stack } from "expo-router"
import { Skeleton } from "~/components/ui/skeleton"
import { useBalance } from "~/store/slices/balance"

const opts = { headerShown: false }

export default function PrivateLayout() {
  const balance = useBalance()

  if (balance.isPending) {
    return <Skeleton />
  }

  console.log("balance", balance.data)
  const showIntro = !balance.data?.pieces?.length

  return (
    <Stack screenOptions={opts}>
      <Stack.Protected guard={showIntro}>
        <Stack.Screen name="intro/start" />
      </Stack.Protected>

      <Stack.Protected guard={!showIntro}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="transations/new-outcome"
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="transations/new-income"
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="recurrences/register"
          options={{ presentation: "transparentModal" }}
        />
      </Stack.Protected>
    </Stack>
  )
}
