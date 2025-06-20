import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useMemo } from "react"
import { create } from "zustand"
import { api, type Page } from "~/shared/api"
import { formatISO } from "~/shared/utils/format-date"
import type { TransactionType } from "../../transaction/store/transation"

const keys = {
  all: ["recurrences"],
  list: (q: RecurrenceParams) => [...keys.all, q],
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
  type: TransactionType
  startAt: string
  endAt?: string
  installments?: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  local?: boolean
}

export type RecurrenceCreateDTO = {
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
    mutationFn: async (payload: RecurrenceCreateDTO) => {
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

export function useDeleteRecurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: Recurrence) => {
      await api.delete(`me/recurrences/${payload.id}`).json()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.all })
    },
  })
}

type RecurrenceParams = {
  cursor?: string
  limit?: number
  type?: TransactionType
}

type FilterStore = {
  params: RecurrenceParams
  setParams: (q: RecurrenceParams) => void
}
const _useFilterStore = create<FilterStore>((set) => ({
  params: {},
  setParams: (params) => set({ params }),
}))

export const useRecurrencesParams = () => _useFilterStore((s) => s.params)
export const useSetRecurrencesParams = () => _useFilterStore((s) => s.setParams)

export function useReccurences() {
  const params = useRecurrencesParams()

  const query = useInfiniteQuery({
    queryKey: keys.list(params),
    initialPageParam: null,
    getNextPageParam: (lastPage: Page<Recurrence>) => lastPage.next,
    queryFn: async ({ signal, pageParam }) => {
      const searchParams = new URLSearchParams()
      searchParams.set("cursor", pageParam || "")
      searchParams.set("limit", String(params.limit || 20))
      if (params.type) {
        searchParams.set("type", params.type)
      }

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
