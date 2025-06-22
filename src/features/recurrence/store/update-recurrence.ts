import { useMutation, useQueryClient } from "@tanstack/react-query"
import { formatISO } from "date-fns"
import { api } from "~/shared/api"
import { type Frequence, queryKeys } from "./types"

export type RecurrenceEditDTO = {
  id: string
  balanceId?: string
  amount?: number
  description?: string
  frequence?: Frequence
  endAt?: Date
}

async function updateRecurrence({ id, ...dto }: RecurrenceEditDTO) {
  await api.patch(`me/recurrences/${id}`, {
    json: {
      ...dto,
      endAt: dto.endAt ? formatISO(dto.endAt) : undefined,
    },
  })
}

export function useUpdateRecurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateRecurrence,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
