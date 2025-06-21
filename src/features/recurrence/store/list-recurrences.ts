import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { create } from "zustand"
import { api, type Page } from "~/shared/api"
import { queryKeys, type Recurrence, type RecurrenceParams } from "./types"

function listRecurrences(params: RecurrenceParams, signal: AbortSignal) {
  const searchParams = new URLSearchParams()
  searchParams.set("cursor", params.cursor || "")
  searchParams.set("limit", String(params.limit || 20))
  searchParams.set("type", params.type || "")

  return api
    .get("me/recurrences", { searchParams, signal })
    .json<Page<Recurrence>>()
}

type ParamsStore = {
  params: RecurrenceParams
  setParams: (q: RecurrenceParams) => void
}
const paramsStore = create<ParamsStore>((set) => ({
  params: {},
  setParams: (params) => set({ params }),
}))

export const useRecurrencesParams = () => paramsStore((s) => s.params)
export const useSetRecurrencesParams = () => paramsStore((s) => s.setParams)

export function useReccurences() {
  const params = useRecurrencesParams()

  const query = useInfiniteQuery({
    queryKey: queryKeys.list(params),
    initialPageParam: null,
    getNextPageParam: (lastPage: Page<Recurrence>) => lastPage.next,
    queryFn: async ({ signal, pageParam }) => {
      return listRecurrences({ ...params, cursor: pageParam }, signal)
    },
  })

  const items = useMemo(
    () => query.data?.pages.flatMap((p) => p.items),
    [query.data?.pages],
  )

  return [items, query] as const
}
