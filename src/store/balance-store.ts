import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import { useIsSignedIn } from "./auth-store"

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
}

export function useBalance() {
  const isSignedIn = useIsSignedIn()

  return useQuery({
    enabled: isSignedIn,
    queryKey: keys.list,
    queryFn: () => api.get("user/balance").json<Balance>(),
    throwOnError: true,
  })
}

export function useUpdateBalance() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (balance: Balance) => {
      return await api
        .post("user/balance", { json: balance.pieces })
        .json<Balance>()
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
