import { StateCreator, create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { storage } from "./"

export function createPersistStore<T>(
  name: string,
  initializer: StateCreator<T>,
) {
  return create(
    persist<T>(initializer, {
      name,
      storage: createJSONStorage(() => storage),
    }),
  )
}
