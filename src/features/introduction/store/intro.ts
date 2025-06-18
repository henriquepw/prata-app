import { create } from "zustand"
import type { Frequence } from "~/shared/store/slices/recurrence"

type Income = {
  amount: string
  frequence: Frequence
}

type IntroStore = {
  income?: Income
  setIncome: (i: Income) => void
}

const introStore = create<IntroStore>()((set) => ({
  income: undefined,
  setIncome: (income) => set({ income }),
}))

export const getIncome = () => introStore.getState().income

export const useIncome = () => introStore((s) => s.income)

export const useSetIncome = () => introStore((s) => s.setIncome)
