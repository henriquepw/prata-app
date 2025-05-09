import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import { formatISO } from "~/utils/format-date"

const keys = {
  list: ["recurrences"],
} as const

export enum Frequence {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export interface Recurrence {
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

export interface RecurrenteCreatePayload {
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
    mutationFn: async (payload: RecurrenteCreatePayload) => {
      console.log({
        ...payload,
        startAt: formatISO(payload.startAt),
        endAt: payload.endAt ? formatISO(payload.endAt) : undefined,
      })
      return api
        .post("user/recurrences", {
          json: {
            ...payload,
            startAt: formatISO(payload.startAt),
            endAt: payload.endAt ? formatISO(payload.endAt) : undefined,
          },
        })
        .json<Recurrence>()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.list })
    },
  })
}
