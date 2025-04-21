import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "~/api"

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
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: RecurrenteCreatePayload) => {
      return await api
        .post("/user/recurrences", { json: payload })
        .json<Recurrence>()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.list })
    },
  })
}
