import { APP_STATE_DDL } from "./app-state"
import { CATEGORY_DDL } from "./category"
import { RECURRENCE_DDL } from "./recurrence"
import { SYNC_CHECKSUM_DDL } from "./sync-checksum"
import { SYNC_OPERATION_DDL } from "./sync-operation"
import { TAG_DDL } from "./tag"
import { TRANSACTION_DDL } from "./transaction"

export const SCHEMAS_DDL = `
  ${APP_STATE_DDL}
  ${CATEGORY_DDL}
  ${TAG_DDL}
  ${TRANSACTION_DDL}
  ${RECURRENCE_DDL}
  ${SYNC_OPERATION_DDL}
  ${SYNC_CHECKSUM_DDL}
`

export type StoreSchemas =
  | "app_state"
  | "categories"
  | "tags"
  | "transactions"
  | "recurrences"
  | "sync_operations"
  | "sync_checksums"
