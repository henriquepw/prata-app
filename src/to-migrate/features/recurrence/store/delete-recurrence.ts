import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/to-migrate/shared/api"
import { queryKeys } from "./types"

async function deleteRecurrence(id: string) {
  await api.delete(`me/recurrences/${id}`)
}

export function useDeleteRecurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteRecurrence,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
