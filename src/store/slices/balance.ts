import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import { useIsSignedIn } from "./auth"

const keys = {
  list: ["balance"],
} as const

interface Piece {
  id: string
  label: string
  percent: string
}

interface Balance {
  pieces: Piece[]
  local: boolean
}

export function useBalance() {
  const isSignedIn = useIsSignedIn()

  return useQuery({
    enabled: isSignedIn,
    queryKey: keys.list,
    queryFn: ({ signal }) => {
      return api.get("me/balance", { signal }).json<Balance>()
    },
  })
}

export function useUpdateBalance() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (balance: Balance) => {
      return api.put("me/balance", { json: balance.pieces }).json<Balance>()
    },
    onMutate: (balance) => {
      const old = queryClient.getQueryData(keys.list)
      queryClient.setQueryData(keys.list, balance)
      return old as Balance
    },
    onSuccess: (balance) => {
      queryClient.setQueryData(keys.list, balance)
    },
    onError: (_, __, old) => {
      queryClient.setQueryData(keys.list, old)
    },
  })
}
