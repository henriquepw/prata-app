import type { TransactionType } from "~/features/transaction/store/transation"

export const queryKeys = {
  all: ["recurrences"],
  list: (q: RecurrenceParams) => [...queryKeys.all, q],
} as const

export enum Frequence {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export type Recurrence = {
  id: string
  userId: string
  balanceId?: string
  description: string
  amount: number
  frequence: Frequence
  type: TransactionType
  startAt: string
  endAt?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  local?: boolean
}

export type RecurrenceParams = {
  cursor?: string | null
  limit?: number
  type?: TransactionType
}
