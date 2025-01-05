import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { newId } from "../utils/id"
import { sleep } from "../utils/sleep"
import { createPersistStore } from "./storage/persist"

const _incomes: Income[] = []

const KEYS = {
  all: ["incomes"],
  detail: (id: string) => ["incomes", "detail", id],
} as const

export type Income = {
  id: string
  amount: number
  receivedAt: string
  local?: boolean
}

type IncomeStore = {
  incomes: Income[]
  addIncome: (amount: number, receivedAt: Date) => void
}

export const useIncomes = createPersistStore<IncomeStore>("incomes", (set) => ({
  incomes: [] as Income[],

  addIncome: (amount: number, receivedAt: Date) => {
    set((state) => ({
      incomes: [
        ...state.incomes,
        {
          id: newId(),
          amount,
          local: true,
          receivedAt: receivedAt.toISOString(),
        },
      ],
    }))
  },
}))

async function getIncomes() {
  await sleep(1000)
  return _incomes
}

type NewIncome = {
  amount: number
  receivedAt: string
}
async function addIncome(payload: NewIncome) {
  await sleep(4000)
  _incomes.push({
    id: String(_incomes.length + 1),
    ...payload,
  })
}

export function useIncomess() {
  return useQuery({
    queryKey: KEYS.all,
    queryFn: getIncomes,
  })
}

export function useAddIncome() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addIncome,
    onMutate: async (payload) => {
      const id = newId()
      await queryClient.cancelQueries({ queryKey: KEYS.all })
      queryClient.setQueryData<Income[]>(KEYS.all, (old) => [
        ...(old || []),
        {
          ...payload,
          id,
          local: true,
        },
      ])
      return { id }
    },
    onError: (_, __, payload) => {
      queryClient.setQueryData<Income[]>(KEYS.all, (old) =>
        old?.filter((i) => i.id !== payload?.id),
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.all })
    },
  })
}
