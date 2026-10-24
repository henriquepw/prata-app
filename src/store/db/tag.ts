import { ENTITY_DDL, type Entity } from "./entity"

export type Tag = Entity<{
  name: string
  startAt: string
  endAt: string | null
}>

export const TAG_DDL = `
  CREATE TABLE IF NOT EXISTS tags (
    ${ENTITY_DDL}
    name TEXT NOT NULL,
    startAt TEXT NOT NULL,
    endAt TEXT
  );
` as const
