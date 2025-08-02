import { useSuspenseQuery } from "@tanstack/react-query"
import { startOfYear } from "date-fns"
import { api, type Page } from "~/shared/api"
import { queryKeys, type Transaction } from "./types"

async function getChartTransactions(signal?: AbortSignal) {
  const search = new URLSearchParams()
  search.set("limit", "1000000")
  search.set("startReceivedAt", startOfYear(new Date()).toISOString())

  const trxs = await api
    .get("me/transactions", { signal, searchParams: search })
    .json<Page<Transaction>>()

  return trxs.items
}

export function useChartTransactions() {
  return useSuspenseQuery({
    queryKey: queryKeys.year,
    queryFn: ({ signal }) => getChartTransactions(signal),
  })
}
