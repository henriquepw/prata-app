import "../../assets/global.css"

import { Stack } from "expo-router"
import { useColorScheme } from "nativewind"
import { useEffect } from "react"
import { GluestackUIProvider } from "~/components/ui/gluestack-ui-provider"
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
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="transations/register"
            options={{ presentation: "modal" }}
          />
        </Stack>
      </StoreProvider>
    </GluestackUIProvider>
  )
}
