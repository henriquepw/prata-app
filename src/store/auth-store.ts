import { useMutation } from "@tanstack/react-query"
import { createPersistStore } from "./storage/persist"
import { useApi } from "~/api"

interface Access {
  userId: string
  accessToken: string
  accessExpiresIn: string
  refreshToken: string
  refreshExpiresIn: string
}

interface SignInReq {
  email: string
  password: string
}
export function useSignIn() {
  const api = useApi()
  const mutation = useMutation({
    mutationFn: async (dto: SignInReq) => {
      const data = await api.post("/auth/sign-in", { json: dto }).json<Access>()
      useAuth.setState({ isSignedIn: true, data })
    },
  })

  return mutation
}

interface SignUpReq {
  email: string
  password: string
}
export function useSignUp() {
  const api = useApi()
  const mutation = useMutation({
    mutationFn: async (dto: SignUpReq) => {
      const data = await api.post("/auth/sign-up", { json: dto }).json<Access>()
      useAuth.setState({ isSignedIn: true, data })
    },
  })

  return mutation
}

interface Auth {
  isSignedIn: boolean
  data: Access | null
  getToken: () => Promise<string>
}
// TODO: use a persist export segure store
export const useAuth = createPersistStore<Auth>("auth", (_, get) => ({
  isSignedIn: false,
  data: null,
  getToken: async () => get().data?.accessToken || "",
}))

export const useIsSignedIn = () => useAuth((s) => s.isSignedIn)
