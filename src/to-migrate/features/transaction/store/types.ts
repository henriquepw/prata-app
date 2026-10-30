import type { Transaction, TransactionKind } from "~/store/db/transaction"

export type { Transaction }

export const TransactionType = {
  INCOME: "INCOME",
  OUTCOME: "OUTCOME",
} as const satisfies Record<TransactionKind, TransactionKind>

export type TransactionType = TransactionKind

export type TransactionFilters = {
  kind: TransactionKind
}

export const queryKeys = {
  all: ["transactions"],
  month: ["transactions", "month"],
  year: ["transactions", "year"],
  list: (filters?: TransactionFilters) => [...queryKeys.all, filters],
  detail: (id: string) => [...queryKeys.all, id],
} as const
