export type AppStateKey =
  | "accountId"
  | "deviceId"
  | "ownerId"
  | "protocolVersion"
  | "syncCursor"
  | "lastSyncAt"

export type AppState = {
  key: AppStateKey
  value: string
}

export const APP_STATE_DDL = `
  CREATE TABLE IF NOT EXISTS app_state (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  );
` as const
