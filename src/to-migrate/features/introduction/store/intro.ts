import { Frequence } from "~/to-migrate/features/recurrence/store/types"

type Income = {
  amount: string
  frequence: Frequence
}

const placeholderIncome: Income = {
  amount: "0",
  frequence: Frequence.MONTHLY,
}

export const getIncome = (): Income | undefined => placeholderIncome

export const useIncome = (): Income | undefined => placeholderIncome

export const useSetIncome = () => (_income: Income) => {}
