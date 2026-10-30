import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Page } from "~/store/api"
import {
  queryKeys,
  type Transaction,
  type TransactionFilters,
  type TransactionType,
} from "./types"

export function useTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: queryKeys.list(filters),
    queryFn: async (): Promise<Page<Transaction>> => {
      return { items: [] }
    },
  })
}

export type TransactionCreateDTO = {
  balanceId?: string
  type: TransactionType
  description: string
  amount: number
  receivedAt: Date
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (_payload: TransactionCreateDTO[]) => {},
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
