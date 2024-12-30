import { AsyncStorage } from "@tanstack/react-query-persist-client"

export const storage: AsyncStorage = {
  setItem: (key, value) => localStorage.setItem(key, value),
  getItem: (key) => localStorage.getItem(key),
  removeItem: (key) => localStorage.removeItem(key),
}
