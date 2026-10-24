import { ENTITY_DDL, type Entity } from "./entity"

export type TransactionKind = "INCOME" | "OUTCOME"

export type Transaction = Entity<{
  categoryId: string | null
  tagId: string | null
  kind: TransactionKind
  amount: number
  description: string | null
  occurredAt: string
  recurrenceId: string | null
  occurrenceDate: string | null
}>

export const TRANSACTION_DDL = `
  CREATE TABLE IF NOT EXISTS transactions (
    ${ENTITY_DDL}
    categoryId TEXT,
    tagId TEXT,
    kind TEXT NOT NULL CHECK (kind IN ('INCOME','OUTCOME')),
    amount INTEGER NOT NULL,
    description TEXT,
    occurredAt TEXT NOT NULL,
    recurrenceId TEXT,
    occurrenceDate TEXT
  );

  CREATE UNIQUE INDEX IF NOT EXISTS transactions_occurrence_unique
    ON transactions (recurrenceId, occurrenceDate)
    WHERE recurrenceId IS NOT NULL;

  CREATE INDEX IF NOT EXISTS transactions_occurred_at
    ON transactions (occurredAt)
    WHERE deletedAt IS NULL;

  CREATE INDEX IF NOT EXISTS transactions_category
    ON transactions (categoryId)
    WHERE deletedAt IS NULL;
` as const
