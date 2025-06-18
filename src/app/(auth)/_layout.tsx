import { Stack } from "expo-router"

const opts = { headerShown: false }

export default function AuthLayout() {
  return <Stack initialRouteName="sign-in" screenOptions={opts} />
}
