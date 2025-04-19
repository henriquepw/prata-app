import { useAuth } from "@clerk/clerk-expo"
import { Redirect, Stack } from "expo-router"
import { useEffect } from "react"
import { useBalance } from "~/store/balance-store"
import * as SplashScreen from "expo-splash-screen"

const opts = { headerShown: false }

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth()
  const balance = useBalance()

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hide()
    }
  }, [isLoaded])

  const isReady = isSignedIn && !balance.isPending
  const needIntro = !balance.data?.pieces.length
  if (isReady) {
    return <Redirect href={needIntro ? "/introduction/start" : "/"} />
  }

  return <Stack screenOptions={opts} initialRouteName="sign-in" />
}
