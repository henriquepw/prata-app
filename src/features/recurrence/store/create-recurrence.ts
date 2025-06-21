import { useMutation, useQueryClient } from "@tanstack/react-query"
import { formatISO } from "date-fns"
import { api } from "~/shared/api"
import { type Frequence, queryKeys, type Recurrence } from "./types"

export type RecurrenceCreateDTO = {
  amount: number
  type: "INCOME" | "OUTCOME"
  description: string
  frequence: Frequence
  startAt: Date
  endAt?: Date
  installments?: number
}

function createRecurrence(dto: RecurrenceCreateDTO) {
  return api
    .post("me/recurrences", {
      json: {
        ...dto,
        startAt: formatISO(dto.startAt),
        endAt: dto.endAt ? formatISO(dto.endAt) : undefined,
      },
    })
    .json<Recurrence>()
}

export function useCreateRecurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRecurrence,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
