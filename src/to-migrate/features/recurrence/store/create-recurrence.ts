import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type Frequence, queryKeys } from "./types"

export type RecurrenceCreateDTO = {
  amount: number
  balanceId?: string
  type: "INCOME" | "OUTCOME"
  description: string
  frequence: Frequence
  startAt: Date
  endAt?: Date
}

async function createRecurrence(_dto: RecurrenceCreateDTO) {}

export function useCreateRecurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRecurrence,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
