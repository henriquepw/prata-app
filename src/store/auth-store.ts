import { useMutation } from "@tanstack/react-query"
import { isBefore } from "date-fns"
import { publicApi } from "~/api/public"
import { createSecureStore } from "./storage/persist"

export interface Access {
  userId: string
  accessToken: string
  accessExpiresAt: string
  refreshToken: string
  refreshExpiresAt: string
}

interface Renew {
  accessToken: string
  expiresAt: string
}

type AuthStore =
  | {
      isSignedIn: true
      data: Access
      getToken: () => Promise<string>
      logout: () => void
    }
  | {
      isSignedIn: false
      data: null
      getToken: () => Promise<string>
      logout: () => void
    }

// TODO: use expo segure store
export const useAuth = createSecureStore<AuthStore>("auth", (set, get) => ({
  isSignedIn: false,
  data: null,
  logout: () => {
    set({
      isSignedIn: false,
      data: null,
    })
  },
  getToken: async () => {
    const auth = get()
    if (!auth.isSignedIn) {
      return ""
    }

    const expiresIn = new Date(auth.data.accessExpiresAt)
    if (isBefore(new Date(), expiresIn)) {
      return auth.data.accessToken
    }

    const renew = await publicApi
      .get(`auth/renew/${auth.data.refreshToken}`)
      .json<Renew>()

    set({
      data: {
        ...auth.data,
        accessToken: renew.accessToken,
        accessExpiresAt: renew.expiresAt,
      },
    })

    return renew.accessToken
  },
}))

export const useIsSignedIn = () => useAuth((s) => s.isSignedIn)

interface SignUpReq {
  email: string
  password: string
  username: string
}
export function useSignUp() {
  const mutation = useMutation({
    mutationFn: async (dto: SignUpReq) => {
      const data = await publicApi
        .post("auth/sign-up", { json: dto })
        .json<Access>()

      useAuth.setState({ isSignedIn: true, data })
    },
  })

  return mutation
}

interface SignInReq {
  email: string
  password: string
}
export function useSignIn() {
  const mutation = useMutation({
    mutationFn: async (dto: SignInReq) => {
      const data = await publicApi
        .post("auth/sign-in", { json: dto })
        .json<Access>()

      useAuth.setState({ isSignedIn: true, data })
    },
  })

  return mutation
}
