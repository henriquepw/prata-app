import "../../global.css"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated"
import { GluestackUIProvider } from "~/components/gluestack-ui-provider"
import { migrateDb } from "~/store/db"
import { QueryProvider } from "~/store/query"
import { useTheme } from "~/store/theme"

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

const screenOptions = { headerShown: false }

export default function RootLayout() {
  const theme = useTheme()

  useEffect(() => {
    migrateDb().finally(() => SplashScreen.hide())
  }, [])

  return (
    <GluestackUIProvider mode={theme}>
      <GestureHandlerRootView>
        <QueryProvider>
          <StatusBar style={theme === "dark" ? "light" : "dark"} />
          <Stack screenOptions={screenOptions} />
        </QueryProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}
