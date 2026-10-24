import { ENTITY_DDL, type Entity } from "./entity"
import type { TransactionKind } from "./transaction"

export type Recurrence = Entity<{
  categoryId: string | null
  kind: TransactionKind
  amount: number
  description: string | null
  rule: string
  startAt: string
  endAt: string | null
}>

export const RECURRENCE_DDL = `
  CREATE TABLE IF NOT EXISTS recurrences (
    ${ENTITY_DDL}
    categoryId TEXT,
    kind TEXT NOT NULL CHECK (kind IN ('INCOME','OUTCOME')),
    amount INTEGER NOT NULL,
    description TEXT,
    rule TEXT NOT NULL,
    startAt TEXT NOT NULL,
    endAt TEXT
  );
` as const
