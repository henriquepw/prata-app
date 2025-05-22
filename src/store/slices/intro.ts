import { create } from "zustand"
import { Frequence } from "./recurrence"

type Income = {
  amount: string
  frequence: Frequence
}

type IntroStore = {
  income?: Income
  setIncome: (i: Income) => void
}

const useIntroStore = create<IntroStore>()((set) => ({
  income: undefined,
  setIncome: (income) => set({ income }),
}))

export const getIncome = () => useIntroStore.getState().income

export const useIncome = () => useIntroStore((s) => s.income)
export const useSetIncome = () => useIntroStore((s) => s.setIncome)
