import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api, type Page } from "~/shared/api"
import { formatISO } from "~/shared/utils/format-date"
import { useIsSignedIn } from "../../auth/store/auth"

export enum TransactionType {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
}

export type Transaction = {
  id: string
  userId: string
  balanceId?: string
  type: TransactionType
  description: string
  amount: number
  receivedAt: string
  createdAt: string
  updatedAt: string
}

type TransactionFilters = {
  type: TransactionType
}

const keys = {
  all: ["transactions"],
  list: (filters?: TransactionFilters) => [...keys.all, filters],
  detail: (id: string) => [...keys.all, id],
} as const

export function useTransactions(filters?: TransactionFilters) {
  const isSignedIn = useIsSignedIn()

  return useQuery({
    enabled: !!isSignedIn,
    queryKey: keys.list(filters),
    queryFn: ({ signal }) => {
      return api
        .get<Page<Transaction>>("me/transactions", {
          searchParams: filters,
          signal,
        })
        .json()
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
    mutationFn: async (payload: TransactionCreateDTO[]) => {
      return api
        .post("me/transactions", {
          json: payload.map((p) => ({
            ...p,
            receivedAt: formatISO(p.receivedAt),
          })),
        })
        .json<Transaction>()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.all })
    },
  })
}
