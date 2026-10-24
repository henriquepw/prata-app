import { openDatabaseSync } from "expo-sqlite"
import { SCHEMAS_DDL } from "./schema"

const DB_NAME = process.env.DB_NAME ?? "local.db"
const DB_VERSION = 1

const db = openDatabaseSync(DB_NAME)

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

export const store = {
  init,
  sql: db.sql,
} as const
