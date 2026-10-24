import * as secureStore from "expo-secure-store"
import sqliteStore from "expo-sqlite/kv-store"
import type { Storage } from "./type"

export const storage: Storage = sqliteStore

export const secureStorage: Storage = {
  setItem: (key, value) => secureStore.setItemAsync(key, value),
  getItem: (key) => secureStore.getItemAsync(key) ?? null,
  removeItem: (key) => secureStore.deleteItemAsync(key),
}
