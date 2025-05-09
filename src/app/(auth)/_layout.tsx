import { Stack } from "expo-router"

const opts = { headerShown: false }

export default function AuthLayout() {
  return <Stack screenOptions={opts} initialRouteName="sign-in" />
}
