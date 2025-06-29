import { useSuspenseQuery } from "@tanstack/react-query"
import { api } from "~/shared/api"
import { queryKeys, type Transaction } from "./types"

function getMontlyTransactions(signal?: AbortSignal) {
  return api.get("me/transactions/month", { signal }).json<Transaction[]>()
}

export function useMontlyTransactions() {
  return useSuspenseQuery({
    queryKey: queryKeys.month,
    queryFn: ({ signal }) => getMontlyTransactions(signal),
  })
}
