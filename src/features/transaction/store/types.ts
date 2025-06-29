export enum TransactionType {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
}

export type Transaction = {
  id: string
  balanceId?: string
  type: TransactionType
  description: string
  amount: number
  receivedAt: string
  createdAt: string
  updatedAt: string
}

export type TransactionFilters = {
  type: TransactionType
}

export const queryKeys = {
  all: ["transactions"],
  month: ["transactions", "month"],
  list: (filters?: TransactionFilters) => [...queryKeys.all, filters],
  detail: (id: string) => [...queryKeys.all, id],
} as const
