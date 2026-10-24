import "../../global.css"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated"
import { GluestackUIProvider } from "~/components/gluestack-ui-provider"
import { useTheme } from "~/store/theme"

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

function Main() {
  return <Stack screenOptions={{ headerShown: false }} />
}

export default function RootLayout() {
  const theme = useTheme()

  return (
    <GluestackUIProvider mode={theme}>
      <GestureHandlerRootView>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <Main />
      </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}
