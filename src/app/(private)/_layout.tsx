import { Stack } from "expo-router"
import { SafeAreaView } from "react-native"
import { useBalance } from "~/features/balance/store/balance"
import { Background } from "~/shared/components/background"
import { Skeleton } from "~/shared/components/skeleton"

const opts = {
  headerShown: false,
} as const

const modalOpts = {
  presentation: "transparentModal",
  animation: "fade_from_bottom",
} as const

export const unstable_settings = {
  initialRouteName: "(tabs)",
}

export default function PrivateLayout() {
  const balance = useBalance()
  if (balance.isPending) {
    return (
      <Background>
        <SafeAreaView className="m-4 gap-2">
          <Skeleton className="h-14 rounded" />
          <Skeleton className="h-14 rounded" />
          <Skeleton className="h-14 rounded" />
        </SafeAreaView>
      </Background>
    )
  }

  const showIntro = !balance.data?.pieces?.length

  return (
    <Stack screenOptions={opts}>
      <Stack.Protected guard={showIntro}>
        <Stack.Screen name="intro/start" />
      </Stack.Protected>

      <Stack.Protected guard={!showIntro}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="transations/new-outcome" options={modalOpts} />
        <Stack.Screen name="transations/new-income" options={modalOpts} />
        <Stack.Screen name="recurrences/register" options={modalOpts} />
      </Stack.Protected>
    </Stack>
  )
}
