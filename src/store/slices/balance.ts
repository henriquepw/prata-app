import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"
import { useIsSignedIn } from "./auth"

const keys = {
  list: ["balance"],
} as const

export type Piece = {
  id: string
  label: string
  percent: number
}

type Balance = {
  pieces: Piece[]
  local: boolean
}

type UpdateBalance = Array<{
  id?: string
  label: string
  percent: number
}>

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
    mutationFn: async (balance: UpdateBalance) => {
      return api.put("me/balance", { json: balance }).json<Balance>()
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
