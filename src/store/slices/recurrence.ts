import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useMemo } from "react"
import { create } from "zustand"
import { Page, api } from "~/api"
import { formatISO } from "~/utils/format-date"
import { TransactionType } from "./transation"

const keys = {
  all: ["recurrences"],
  list: () => [...keys.all],
} as const

export enum Frequence {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export type Recurrence = {
  id: string
  userId: string
  description: string
  amount: number
  frequence: Frequence
  type: "INCOME" | "OUTCOME"
  startAt: string
  endAt?: string
  installments?: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  local?: boolean
}

export type RecurrenteCreateDTO = {
  amount: number
  type: "INCOME" | "OUTCOME"
  description: string
  frequence: Frequence
  startAt: Date
  endAt?: Date
  installments?: number
}

export function useCreateRecurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: RecurrenteCreateDTO) => {
      return api
        .post("me/recurrences", {
          json: {
            ...payload,
            startAt: formatISO(payload.startAt),
            endAt: payload.endAt ? formatISO(payload.endAt) : undefined,
          },
        })
        .json<Recurrence>()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.all })
    },
  })
}

type RecurrenceFilter = {
  cursor?: string
  limit?: number
  type?: TransactionType
}

type FilterStore = {
  params: RecurrenceFilter
  setParams: (q: RecurrenceFilter) => void
}
const _useFilterStore = create<FilterStore>((set) => ({
  params: {},
  setParams: (params) => set({ params }),
}))

export function useReccurences() {
  const query = useInfiniteQuery({
    queryKey: keys.list(),
    initialPageParam: null,
    getNextPageParam: (lastPage: Page<Recurrence>) => lastPage.next,
    queryFn: async ({ signal, pageParam }) => {
      const searchParams = new URLSearchParams()
      searchParams.set("cursor", pageParam || "")
      searchParams.set("limit", "20")

      return api
        .get<Page<Recurrence>>("me/recurrences", {
          searchParams,
          signal,
        })
        .json()
    },
  })

  const items = useMemo(
    () => query.data?.pages.flatMap((p) => p.items),
    [query.data?.pages],
  )

  return [items, query] as const
}
