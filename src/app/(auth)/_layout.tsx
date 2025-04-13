import { useAuth } from "@clerk/clerk-expo"
import { Redirect, Stack } from "expo-router"
import { useEffect } from "react"

const opts = { headerShown: false }

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    console.log({ isLoaded, isSignedIn })
  }, [isLoaded, isSignedIn])

  if (isSignedIn) {
    return <Redirect href="/" />
  }

  return <Stack screenOptions={opts} />
}
