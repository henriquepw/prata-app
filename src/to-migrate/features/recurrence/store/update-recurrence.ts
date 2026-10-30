import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type Frequence, queryKeys } from "./types"

export type RecurrenceEditDTO = {
  id: string
  balanceId?: string
  amount?: number
  description?: string
  frequence?: Frequence
  endAt?: Date
}

async function updateRecurrence(_dto: RecurrenceEditDTO) {}

export function useUpdateRecurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateRecurrence,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
