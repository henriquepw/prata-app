import { Redirect, Stack } from "expo-router"
import { useIsSignedIn } from "~/store/auth-store"
import { useBalance } from "~/store/balance-store"

const opts = { headerShown: false }

export default function AuthLayout() {
  const isSignedIn = useIsSignedIn()
  const balance = useBalance()

  const isReady = isSignedIn && !balance.isPending
  const needIntro = !balance.data?.pieces.length
  if (isReady) {
    return <Redirect href={needIntro ? "/intro/start" : "/"} />
  }

  return <Stack screenOptions={opts} initialRouteName="sign-in" />
}
