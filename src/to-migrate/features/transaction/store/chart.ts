import { useSuspenseQuery } from "@tanstack/react-query"
import { queryKeys, type Transaction } from "./types"

async function getChartTransactions(): Promise<Transaction[]> {
  return []
}

export function useChartTransactions() {
  return useSuspenseQuery({
    queryKey: queryKeys.year,
    queryFn: getChartTransactions,
  })
}
