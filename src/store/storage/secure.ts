import * as store from "expo-secure-store"
import { Storage } from "./type"

export const secureStorage: Storage = {
  setItem: (key, value) => store.setItemAsync(key, value),
  getItem: (key) => store.getItemAsync(key) ?? null,
  removeItem: (key) => store.deleteItemAsync(key),
}
