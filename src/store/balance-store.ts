import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useApi } from "~/api"
import { useAuth } from "./auth-store"

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
  const auth = useAuth()
  const api = useApi()

  return useQuery({
    enabled: auth.isSignedIn,
    queryKey: keys.list,
    queryFn: async () => {
      return api.get("/user/balance").json<Balance>()
    },
  })
}

export function useUpdateBalance() {
  const api = useApi()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (balance: Balance) => {
      return await api
        .post("/user/balance", { json: balance.pieces })
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
