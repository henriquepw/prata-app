import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { newId } from "~/lib/id"

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
  queryFn: async (): Promise<Balance> => ({ pieces: [], local: true }),
})

export function useBalance() {
  return useQuery(balanceQueryOpts)
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
    mutationFn: async (pieces: BalanceUpdateDTO): Promise<Balance> => ({
      pieces: pieces.map((p) => ({ ...p, id: p.id || newId() })),
      local: false,
    }),
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
