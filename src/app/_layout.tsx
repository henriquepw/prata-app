import "../../assets/global.css"
import "abortcontroller-polyfill/dist/polyfill-patch-fetch"

import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { Appearance, Platform } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated"
import { useIsSignedIn } from "~/features/auth/store/auth"
import { GluestackUIProvider } from "~/shared/components/gluestack-ui-provider"
import { StoreProvider } from "../shared/store"
import { useTheme } from "../shared/store/theme"

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

function Main() {
  const isSignedIn = useIsSignedIn()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(private)" />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  const theme = useTheme()
  useEffect(() => {
    if (Platform.OS !== "web") {
      Appearance.setColorScheme(theme)
    }
  }, [theme])

  return (
    <GluestackUIProvider mode={theme}>
      <StoreProvider>
        <GestureHandlerRootView>
          <Main />
        </GestureHandlerRootView>
      </StoreProvider>
    </GluestackUIProvider>
  )
}
