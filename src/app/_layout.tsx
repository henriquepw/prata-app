import "../../assets/global.css"
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
    <StoreProvider>
      <Stack screenOptions={opts}>
        <Stack.Screen
          name="incomes/register"
          options={{ presentation: "modal" }}
        />
      </Stack>
    </StoreProvider>
  )
}
