import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "./types"

async function deleteRecurrence(_id: string) {}

export function useDeleteRecurrence() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteRecurrence,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
