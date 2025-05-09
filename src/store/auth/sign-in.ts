import { useMutation } from "@tanstack/react-query"
import { api } from "~/api"
import { Access, useAuth } from "."

interface SignInReq {
  email: string
  password: string
}
export function useSignIn() {
  const mutation = useMutation({
    mutationFn: async (dto: SignInReq) => {
      const data = await api.post("auth/sign-in", { json: dto }).json<Access>()
      useAuth.setState({ isSignedIn: true, data })
    },
  })

  return mutation
}
