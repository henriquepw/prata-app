import { useAuth } from "@clerk/clerk-expo"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "~/api"

const keys = {
  list: (userId?: string | null) => [userId, "balance"] as const,
}

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

  return useQuery({
    enabled: auth.isSignedIn,
    queryKey: keys.list(auth.userId),
    queryFn: async () => {
      return api
        .get("/user/balance", {
          headers: { authorization: `Bearer ${await auth.getToken()}` },
        })
        .json<Balance>()
    },
  })
}

export function useUpdateBalance() {
  const auth = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (balance: Balance) => {
      return await api
        .post("/user/balance", {
          headers: { authorization: `Bearer ${await auth.getToken()}` },
          json: balance.pieces,
        })
        .json<Balance>()
    },
    onMutate: (balance) => {
      const old = queryClient.getQueryData(keys.list(auth.userId))
      queryClient.setQueryData(keys.list(auth.userId), balance)
      return old as Balance
    },
    onSuccess: (balance) => {
      queryClient.setQueryData(keys.list(auth.userId), balance)
    },
    onError: (_, __, old) => {
      queryClient.setQueryData(keys.list(auth.userId), old)
    },
  })
}
