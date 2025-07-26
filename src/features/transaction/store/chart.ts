import { useSuspenseQuery } from "@tanstack/react-query"
import { startOfYear } from "date-fns"
import { api, type Page } from "~/shared/api"
import { queryKeys, type Transaction, TransactionType } from "./types"

type ChartData = {
  month: number
  value: number
}
async function getChartTransactions(signal?: AbortSignal) {
  const search = new URLSearchParams()
  search.set("limit", "1000000")
  search.set("startReceivedAt", startOfYear(new Date()).toISOString())

  const trxs = await api
    .get("me/transactions", { signal, searchParams: search })
    .json<Page<Transaction>>()

  const map: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
  }
  for (const t of trxs.items) {
    if (t.type === TransactionType.OUTCOME) {
      const month = new Date(t.receivedAt).getMonth()
      map[month] = map[month] + t.amount
    }
  }

  const d: ChartData[] = []
  for (const [month, value] of Object.entries(map)) {
    d.push({ month: Number(month), value })
  }

  return d
}

export function useChartTransactions() {
  return useSuspenseQuery({
    queryKey: queryKeys.month,
    queryFn: ({ signal }) => getChartTransactions(signal),
  })
}
