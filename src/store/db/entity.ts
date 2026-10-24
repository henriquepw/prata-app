export type Entity<T> = T & {
  id: string
  ownerId: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  serverSeq: number | null
}

export const ENTITY_DDL = `
    id TEXT PRIMARY KEY NOT NULL,
    ownerId TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    deletedAt TEXT,
    serverSeq INTEGER,
` as const
