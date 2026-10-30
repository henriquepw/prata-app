import type { Recurrence } from "~/store/db/recurrence"
import type { TransactionKind } from "~/store/db/transaction"

export type { Recurrence }

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

export type RecurrenceParams = {
  limit?: number
  kind?: TransactionKind
}
