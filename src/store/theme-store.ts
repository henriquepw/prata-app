import { useColorScheme } from "nativewind"
import { createPersistStore } from "./storage/persist"

type Theme = "dark" | "light"

type ThemeStore = {
  theme: Theme
}

const useThemeStore = createPersistStore<ThemeStore>("theme", () => ({
  theme: "dark",
}))

export const useTheme = () => useThemeStore((s) => s.theme)

export function useToggleTheme() {
  const theme = useTheme()
  const { setColorScheme } = useColorScheme()

  return () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    useThemeStore.setState({ theme: newTheme })
    setColorScheme(newTheme)
  }
}
