import { createMMKV } from "react-native-mmkv"
import type { Storage } from "./type"

const mmkv = createMMKV()

export const storage: Storage = {
  setItem: (key, value) => mmkv.set(key, value),
  getItem: (key) => mmkv.getString(key) ?? null,
  removeItem: (key) => void mmkv.remove(key),
}
