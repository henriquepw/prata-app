import "../../global.css"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { Appearance } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated"
import { GluestackUIProvider } from "~/components/gluestack-ui-provider"
import { useIsSignedIn } from "~/features/auth/store/auth"
import { useTheme } from "~/store/theme"
import { StoreProvider } from "../shared/store"

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
    Appearance.setColorScheme(theme)
  }, [theme])

  return (
    <GluestackUIProvider mode={theme}>
      <StoreProvider>
        <GestureHandlerRootView>
          <StatusBar style={theme === "dark" ? "light" : "dark"} />
          <Main />
        </GestureHandlerRootView>
      </StoreProvider>
    </GluestackUIProvider>
  )
}
