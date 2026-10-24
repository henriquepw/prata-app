import { Stack } from "expo-router"

export const unstable_settings = {
  anchor: "sign-in",
}

const opts = { headerShown: false }

export default function AuthLayout() {
  return <Stack screenOptions={opts} />
}
