import { openDatabaseSync } from "expo-sqlite"
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

const DB_NAME = process.env.DB_NAME ?? "local.db"
const DB_VERSION = 1

export const db = openDatabaseSync(DB_NAME)

async function init() {
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  )
  const currentDbVersion = result?.user_version ?? 0
  if (currentDbVersion >= DB_VERSION) {
    return
  }

  if (currentDbVersion === 0) {
    await db.execAsync("PRAGMA journal_mode = WAL")
    await db.execAsync("PRAGMA foreign_keys = ON")
    await db.execAsync(SCHEMAS_DDL)
  }

  await db.execAsync(`PRAGMA user_version = ${DB_VERSION}`)
}

export const localDb = {
  init,
  sql: db.sql,
} as const
