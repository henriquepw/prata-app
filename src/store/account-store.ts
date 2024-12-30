import { useQuery } from "@tanstack/react-query"
import { storage } from "./storage"

const KEY = "account"

export type AccountData = {
  hasAccount: boolean
}

const defaultAccount: AccountData = {
  hasAccount: false,
}

async function getAccount(): Promise<AccountData> {
  try {
    const data = await storage.getItem(KEY)
    if (!data) {
      throw new Error("not found")
    }

    return JSON.parse(data)
  } catch {
    await storage.setItem(KEY, JSON.stringify(defaultAccount))
    return defaultAccount
  }
}

export function useAccount() {
  const query = useQuery({
    queryKey: [KEY],
    queryFn: getAccount,
  })

  return query
}
