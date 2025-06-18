import { MMKV } from "react-native-mmkv"
import type { Storage } from "./type"

const mmkv = new MMKV()

export const storage: Storage = {
  setItem: (key, value) => mmkv.set(key, value),
  getItem: (key) => mmkv.getString(key) ?? null,
  removeItem: (key) => mmkv.delete(key),
}
