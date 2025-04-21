import { useAuth } from "@clerk/clerk-expo"
import { Redirect, Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { useBalance } from "~/store/balance-store"

const opts = { headerShown: false }

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth()
  const balance = useBalance()

  console.log({ isLoaded, isSignedIn })
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
