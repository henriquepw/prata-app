import { baseApi } from "~/api"
import { createPersistStore } from "../storage/persist"
import { isBefore } from "date-fns"

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

type Auth =
  | {
      isSignedIn: true
      data: Access
      getToken: () => Promise<string>
    }
  | {
      isSignedIn: false
      data: null
      getToken: () => Promise<string>
    }

// TODO: use expo segure store
export const useAuth = createPersistStore<Auth>("auth", (set, get) => ({
  isSignedIn: false,
  data: null,
  getToken: async () => {
    const auth = get()
    if (!auth.isSignedIn) {
      return ""
    }

    const expiresIn = new Date(auth.data.accessExpiresAt)
    if (isBefore(new Date(), expiresIn)) {
      return auth.data.accessToken
    }

    const renew = await baseApi
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
