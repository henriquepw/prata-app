import "../../assets/global.css"

import { ClerkProvider } from "@clerk/clerk-expo"
import { tokenCache } from "@clerk/clerk-expo/token-cache"
import { Slot } from "expo-router"
import { useEffect } from "react"
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from "react-native-reanimated"
import { GluestackUIProvider } from "~/components/ui/gluestack-ui-provider"
import { StoreProvider } from "../store"
import { useTheme } from "../store/theme-store"
import { Appearance, Platform } from "react-native"
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function RootLayout() {
  const theme = useTheme()
  useEffect(() => {
    if (Platform.OS !== "web") {
      Appearance.setColorScheme(theme)
    }
  }, [theme])

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <GluestackUIProvider mode={theme}>
        <StoreProvider>
          <Slot />
        </StoreProvider>
      </GluestackUIProvider>
    </ClerkProvider>
  )
}
