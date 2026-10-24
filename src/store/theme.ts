import { useCallback } from "react"
import { Appearance } from "react-native"
import { Uniwind } from "uniwind"
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

  return useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark"
    useThemeStore.setState({ theme: newTheme })
    Uniwind.setTheme(newTheme)
    Appearance.setColorScheme(theme)
  }, [theme])
}
