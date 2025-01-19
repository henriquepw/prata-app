import { newId } from "~/utils/id"
import { createPersistStore } from "./storage/persist"

type Frequence = "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "YEARLY"

export type Recurrent = {
  id: string
  description: string
  frequence: Frequence
  startAt: string
  endAt?: string
  installments?: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  local?: boolean
}

export type RecurrentCreatePayload = {
  description: string
  frequence: Frequence
  startAt: Date
  endAt?: Date
  installments?: number
}

type RecurrentStore = {
  // Data
  recurrents: Recurrent[]
  selected: Recurrent | null

  // Actions
  cleanSelect: () => void
  selectRecurrent: (i: Recurrent) => void
  removeRecurrent: (id: string) => void
  createRecurrent: (payload: RecurrentCreatePayload) => void
}

export const useRecurrentStore = createPersistStore<RecurrentStore>(
  "recurrents",
  (set) => ({
    recurrents: [],
    selected: null,

    cleanSelect: () => {
      set({ selected: null })
    },
    selectRecurrent: (i: Recurrent) => {
      set({ selected: i })
    },
    removeRecurrent: (id: string) => {
      set((state) => ({
        recurrents: state.recurrents.filter((i) => i.id !== id),
      }))
    },
    createRecurrent: (payload: RecurrentCreatePayload) => {
      const now = new Date().toISOString()
      const recurrent: Recurrent = {
        id: newId(),
        ...payload,
        startAt: payload.startAt.toISOString(),
        endAt: payload.endAt?.toISOString(),
        createdAt: now,
        updatedAt: now,
        local: true,
      }

      set((state) => ({
        recurrents: [...state.recurrents, recurrent],
      }))
    },
  }),
)
