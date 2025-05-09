import { useMutation } from "@tanstack/react-query"
import { api } from "~/api"
import { Access, useAuth } from "."

interface SignUpReq {
  email: string
  password: string
  username: string
}
export function useSignUp() {
  const mutation = useMutation({
    mutationFn: async (dto: SignUpReq) => {
      const data = await api.post("auth/sign-up", { json: dto }).json<Access>()
      useAuth.setState({ isSignedIn: true, data })
    },
  })

  return mutation
}
