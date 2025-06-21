import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { api } from "~/shared/api"
import { newId } from "~/shared/utils/id"
import { useIsSignedIn } from "../../../features/auth/store/auth"

const keys = {
  list: ["balance"],
} as const

export type Piece = {
  id: string
  label: string
  color: string
  percent: number
}

type Balance = {
  pieces: Piece[]
  local: boolean
}

const balanceQueryOpts = queryOptions({
  queryKey: keys.list,
  queryFn: ({ signal }) => {
    return api.get("me/balance", { signal }).json<Balance>()
  },
})

export function useBalance() {
  const isSignedIn = useIsSignedIn()
  return useQuery({ enabled: isSignedIn, ...balanceQueryOpts })
}

type BalanceUpdateDTO = Array<{
  id?: string
  label: string
  color: string
  percent: number
}>

export function useUpdateBalance() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (pieces: BalanceUpdateDTO) => {
      return api.put("me/balance", { json: { pieces } }).json<Balance>()
    },
    onMutate: (balance) => {
      const old = queryClient.getQueryData<Balance>(keys.list)
      queryClient.setQueryData<Balance>(keys.list, {
        pieces: balance.map((p) => ({ ...p, id: p.id || newId() })),
        local: true,
      })
      return old
    },
    onSuccess: (balance) => {
      queryClient.setQueryData<Balance>(keys.list, {
        ...balance,
        local: false,
      })
    },
    onError: (_, __, old) => {
      queryClient.setQueryData<Balance>(keys.list, old)
    },
  })
}
