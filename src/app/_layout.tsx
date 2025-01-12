import "@/assets/global.css"

import { GluestackUIProvider } from "@ui/gluestack-ui-provider"
import { Stack } from "expo-router"
import { useColorScheme } from "nativewind"
import { useEffect } from "react"
import { StoreProvider } from "../store"
import { useTheme } from "../store/theme-store"

const opts = { headerShown: false }

export default function RootLayout() {
  const { setColorScheme } = useColorScheme()
  const theme = useTheme()

  useEffect(() => {
    setColorScheme(theme)
  }, [theme, setColorScheme])

  return (
    <GluestackUIProvider mode={theme}>
      <StoreProvider>
        <Stack screenOptions={opts}>
          <Stack.Screen
            name="transations/register"
            options={{ presentation: "modal" }}
          />
        </Stack>
      </StoreProvider>
    </GluestackUIProvider>
  )
}
