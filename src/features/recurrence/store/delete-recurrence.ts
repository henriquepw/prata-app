import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "~/shared/api"
import { queryKeys } from "./types"

async function deleteRecurrence(id: string) {
  await api.delete(`me/recurrences/${id}`).json()
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
