import "../../assets/global.css"

import { ClerkProvider } from "@clerk/clerk-expo"
import { tokenCache } from "@clerk/clerk-expo/token-cache"
import { Slot } from "expo-router"
import { useColorScheme } from "nativewind"
import { useEffect } from "react"
import {
  ReanimatedLogLevel,
  configureReanimatedLogger,
} from "react-native-reanimated"
import { GluestackUIProvider } from "~/components/ui/gluestack-ui-provider"
import { StoreProvider } from "../store"
import { useTheme } from "../store/theme-store"

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function RootLayout() {
  const { setColorScheme } = useColorScheme()
  const theme = useTheme()

  useEffect(() => {
    setColorScheme(theme)
  }, [theme, setColorScheme])

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
