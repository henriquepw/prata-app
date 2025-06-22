import { create } from "zustand"
import type { Recurrence } from "./types"

type store = {
  recurrence: Recurrence | null
  select: (r: Recurrence) => void
  unselect: () => void
}

const store = create<store>((set) => ({
  recurrence: null,
  select: (recurrence: Recurrence) => set({ recurrence }),
  unselect: () => set({ recurrence: null }),
}))

export const useSelectedRecurrence = () => store((s) => s.recurrence)

export const useSelectRecurrence = () => store((s) => s.select)

export const useUnselectedRecurrence = () => store((s) => s.unselect)
