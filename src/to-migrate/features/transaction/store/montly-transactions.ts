import { useSuspenseQuery } from "@tanstack/react-query"
import { queryKeys, type Transaction } from "./types"

async function getMontlyTransactions(): Promise<Transaction[]> {
  return []
}

export function useMontlyTransactions() {
  return useSuspenseQuery({
    queryKey: queryKeys.month,
    queryFn: getMontlyTransactions,
  })
}
