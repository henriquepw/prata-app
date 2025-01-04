import { createPersistStore } from "./storage/persist"

type Account = {
  id: string
  name: string
  email: string
}

export type AccountData =
  | {
      hasAccount: false
      account: undefined
    }
  | {
      hasAccount: true
      account: Account
    }

const defaultAccount: AccountData = {
  hasAccount: false,
  account: undefined,
}

export const useAccount = createPersistStore<AccountData>("account", (set) => ({
  ...defaultAccount,
  setAccount: (account: Account) => {
    set({ account, hasAccount: true })
  },
  logout: () => {
    set({ account: undefined, hasAccount: false })
  },
}))
