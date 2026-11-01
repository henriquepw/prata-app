import { openDatabaseSync } from "expo-sqlite"
import { newId } from "~/lib/id"
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
const PROTOCOL_VERSION = 1

export const localDb = openDatabaseSync(DB_NAME)

export async function migrateDb() {
  const result = await localDb.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  )
  const currentDbVersion = result?.user_version ?? 0
  if (currentDbVersion >= DB_VERSION) {
    return
  }

  if (currentDbVersion === 0) {
    await localDb.execAsync("PRAGMA journal_mode = WAL")
    await localDb.execAsync("PRAGMA foreign_keys = ON")
    await localDb.execAsync(SCHEMAS_DDL)
    await localDb.runAsync(
      "INSERT INTO app_state (key, value) VALUES (accountId, ?), (deviceId, ?), (ownerId, ?), (protocolVersion, ?)",
      newId(),
      newId(),
      newId(),
      String(PROTOCOL_VERSION),
    )
  }

  await localDb.execAsync(`PRAGMA user_version = ${DB_VERSION}`)
}
