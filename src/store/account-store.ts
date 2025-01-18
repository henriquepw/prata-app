import { api } from "~/api"
import { createPersistStore } from "./storage/persist"

type Account = {
  id: string
  name: string
  email: string
}

type AccountData =
  | {
      hasAccount: false
      account: undefined
    }
  | {
      hasAccount: true
      account: Account
    }

type SignUpPayload = {
  name: string
  email: string
  password: string
}

type SignInPayload = {
  email: string
  password: string
}

type AccountActions = {
  logout: () => void
  signUp: (payload: SignUpPayload) => Promise<void>
  signIn: (payload: SignInPayload) => Promise<void>
}

const INITIAL_STATE: AccountData = {
  hasAccount: false,
  account: undefined,
} as const

export const useAccountStore = createPersistStore<AccountData & AccountActions>(
  "account",
  (set) => ({
    ...INITIAL_STATE,
    logout: () => {
      set(INITIAL_STATE)
    },
    signIn: async (payload) => {
      const account = await api
        .post("/auth/sign-in", { json: payload })
        .json<Account>()

      set({ account, hasAccount: true })
    },
    signUp: async (payload) => {
      const account = await api
        .post("/auth/sign-up", { json: payload })
        .json<Account>()

      set({ account, hasAccount: true })
    },
  }),
)
