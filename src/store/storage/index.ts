import { AsyncStorage } from "@tanstack/react-query-persist-client"
import { MMKV } from "react-native-mmkv"

const mmkv = new MMKV()

export const storage: AsyncStorage = {
  setItem: (key, value) => mmkv.set(key, value),
  getItem: (key) => mmkv.getString(key) ?? undefined,
  removeItem: (key) => mmkv.delete(key),
}
