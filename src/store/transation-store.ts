import { newId } from "~/utils/id"
import { createPersistStore } from "./storage/persist"

export type TransationType = "INCOME" | "OUTCOME"

export type Transation = {
  id: string
  amount: number
  dueAt: string
  type: TransationType
  tags: string[]
  createdAt: string
  updatedAt: string
  deletedAt?: string
  accountId?: string
  local?: boolean
}

type AddTransation = {
  amount: number
  type: TransationType
  dueAt: Date
}

type TransationStore = {
  transations: Transation[]
  selected: Transation | null

  // Actions
  cleanSelect: () => void
  removeTransation: (id: string) => void
  addTransation: (payload: AddTransation) => void
  selectTransation: (i: Transation) => void
}

export const useTransationStore = createPersistStore<TransationStore>(
  "transations",
  (set) => ({
    transations: [],
    selected: null,

    cleanSelect: () => {
      set({ selected: null })
    },
    selectTransation: (i: Transation) => {
      set({ selected: i })
    },
    removeTransation: (id: string) => {
      set((state) => ({
        transations: state.transations.filter((i) => i.id !== id),
      }))
    },
    addTransation: (payload: AddTransation) => {
      set((state) => ({
        transations: [
          ...state.transations,
          {
            id: newId(),
            type: payload.type,
            amount: payload.amount,
            dueAt: payload.dueAt.toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: [],
            local: true,
          },
        ],
      }))
    },
  }),
)
