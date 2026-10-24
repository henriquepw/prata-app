import { Stack } from "expo-router"

export const unstable_settings = {
  initialRouteName: "sign-in",
}

const opts = { headerShown: false }

export default function AuthLayout() {
  return <Stack screenOptions={opts} />
}
