export type SyncOperationEntity = "CATEGORY" | "TAG" | "TRANSACTION" | "RECURRENCE"

export type SyncOperationKind = "CREATE" | "UPDATE" | "DELETE"

export type SyncOperation = {
  localSeq: number
  id: string
  serverSeq: number | null
  entity: SyncOperationEntity
  entityId: string
  kind: SyncOperationKind
  payload: string
  protocolVersion: number
  deviceId: string
  ownerId: string
  createdAt: string
}

export const SYNC_OPERATION_DDL = `
  CREATE TABLE IF NOT EXISTS sync_operations (
    localSeq INTEGER PRIMARY KEY AUTOINCREMENT,
    id TEXT NOT NULL UNIQUE,
    serverSeq INTEGER,
    entity TEXT NOT NULL CHECK (entity IN ('CATEGORY','TAG','TRANSACTION','RECURRENCE')),
    entityId TEXT NOT NULL,
    kind TEXT NOT NULL CHECK (kind IN ('CREATE','UPDATE','DELETE')),
    payload TEXT NOT NULL,
    protocolVersion INTEGER NOT NULL,
    deviceId TEXT NOT NULL,
    ownerId TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS sync_operations_pending
    ON sync_operations (localSeq)
    WHERE serverSeq IS NULL;
` as const
