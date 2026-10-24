export type SyncChecksum = {
  period: string
  checksum: string
  computedAt: string
}

export const SYNC_CHECKSUM_DDL = `
  CREATE TABLE IF NOT EXISTS sync_checksums (
    period TEXT PRIMARY KEY NOT NULL,
    checksum TEXT NOT NULL,
    computedAt TEXT NOT NULL
  );
` as const
